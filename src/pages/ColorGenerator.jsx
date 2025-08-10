import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  HStack,
  VStack,
  Input,
  Button,
  Grid,
  Flex,
  Badge,
  IconButton,
  useToast,
  Divider,
  Card,
  CardBody,
  useClipboard
} from '@chakra-ui/react';
import { CopyIcon, SettingsIcon, DownloadIcon, StarIcon } from '@chakra-ui/icons';
import { generateShades, formatColorValues, isLightColor } from '../utils/colorUtils';
import ColorPalette from '../components/ColorPalette';
import UIExamples from '../components/UIExamples';

export default function ColorGenerator() {
  const [primaryColor, setPrimaryColor] = useState('#4ade80');
  const [colorFormat, setColorFormat] = useState('HEX');
  const [palette, setPalette] = useState({});
  const [paletteName, setPaletteName] = useState('Palette 1');
  const toast = useToast();

  // Generate palette when primary color changes
  useEffect(() => {
    if (primaryColor) {
      const shades = generateShades(primaryColor);
      setPalette(shades);
    }
  }, [primaryColor]);

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    if (newColor.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
      setPrimaryColor(newColor);
    }
  };

  const handleSavePalette = () => {
    // Save to localStorage
    const savedPalettes = JSON.parse(localStorage.getItem('colorPalettes') || '[]');
    const newPalette = {
      id: Date.now(),
      name: paletteName,
      primaryColor,
      palette,
      createdAt: new Date().toISOString()
    };
    
    savedPalettes.push(newPalette);
    localStorage.setItem('colorPalettes', JSON.stringify(savedPalettes));
    
    toast({
      title: 'Palette saved!',
      description: `"${paletteName}" has been saved to your palettes.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleExportPalette = () => {
    const exportData = {
      name: paletteName,
      primaryColor,
      shades: {}
    };

    Object.entries(palette).forEach(([shade, colors]) => {
      exportData.shades[shade] = formatColorValues(colors);
    });

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${paletteName.toLowerCase().replace(' ', '_')}_palette.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();

    toast({
      title: 'Palette exported!',
      description: 'Your color palette has been downloaded as JSON.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box minH="100vh" bg="gray.50" className="home">
      {/* Header Navigation */}
      <Box bg="white" boxShadow="sm" py={4}>
        <Container maxW="container.xl">
          <HStack justify="space-between">
            <HStack spacing={8}>
              <Flex align="center" gap={2}>
                <Box w={8} h={8} bg="black" borderRadius="md" display="flex" alignItems="center" justifyContent="center">
                  <Text color="white" fontWeight="bold" fontSize="sm">UI</Text>
                </Box>
                <Text fontSize="xl" fontWeight="bold" color="black">Colors</Text>
              </Flex>
              <HStack spacing={6} color="gray.600">
                <Text cursor="pointer" _hover={{color: 'black'}} fontWeight="semibold">Generate</Text>
                <Text cursor="pointer" _hover={{color: 'black'}}>My palettes</Text>
                <Text cursor="pointer" _hover={{color: 'black'}}>Tailwind Colors</Text>
                <Text cursor="pointer" _hover={{color: 'black'}}>More</Text>
              </HStack>
            </HStack>
            <HStack spacing={4}>
              <Text cursor="pointer" color="gray.600" _hover={{color: 'black'}}>Feedback</Text>
              <Button colorScheme="blackAlpha" size="sm" borderRadius="xl">
                Sign in
              </Button>
            </HStack>
          </HStack>
        </Container>
      </Box>

      <Container maxW="container.xl" py={8}>
        <Grid templateColumns="1fr 2fr" gap={12} alignItems="start">
          {/* Left Panel - Controls */}
          <VStack spacing={6} align="stretch">
            <VStack align="stretch" spacing={4}>
              <Heading size="lg" color="black">
                Tailwind CSS Color Generator
              </Heading>
              <Text color="gray.600" fontSize="sm">
                Instantly create stunning color scales by entering a base color or hitting the spacebar.
              </Text>
            </VStack>

            {/* Primary Color Picker */}
            <VStack align="stretch" spacing={4}>
              <HStack justify="space-between">
                <Text fontWeight="semibold" color="black">Primary</Text>
                <HStack>
                  <Text fontSize="sm" color="gray.600">{colorFormat}</Text>
                  <IconButton 
                    size="xs" 
                    variant="ghost" 
                    icon={<SettingsIcon />}
                    onClick={() => {
                      const formats = ['HEX', 'HSL', 'RGB', 'OKLCH'];
                      const currentIndex = formats.indexOf(colorFormat);
                      const nextIndex = (currentIndex + 1) % formats.length;
                      setColorFormat(formats[nextIndex]);
                    }}
                  />
                </HStack>
              </HStack>
              
              <HStack>
                <Box 
                  w={10} 
                  h={10} 
                  bg={primaryColor} 
                  borderRadius="md" 
                  border="2px solid" 
                  borderColor="gray.300"
                  cursor="pointer"
                  position="relative"
                >
                  <Input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    opacity={0}
                    position="absolute"
                    w="full"
                    h="full"
                    cursor="pointer"
                  />
                </Box>
                <Input
                  value={primaryColor}
                  onChange={handleColorChange}
                  placeholder="#4ade80"
                  bg="white"
                  color="black"
                  size="md"
                  maxW="200px"
                />
                <CopyIcon cursor="pointer" color="gray.500" />
              </HStack>
            </VStack>

            {/* Add Secondary Color */}
            <Button 
              bg="black" 
              color="white" 
              size="lg" 
              borderRadius="full"
              _hover={{bg: 'gray.800'}}
              leftIcon={<Text fontSize="xl">+</Text>}
            >
              Add secondary color scale
            </Button>

            <Text fontSize="sm" color="gray.600">
              Color combination scheme: auto
            </Text>

            {/* User Testimonial */}
            <Box bg="white" p={6} borderRadius="xl" mt={8}>
              <HStack mb={4}>
                <Box w={10} h={10} bg="gray.300" borderRadius="full"></Box>
                <Text fontWeight="semibold" color="black">Ruark Vallen</Text>
              </HStack>
              <Text color="gray.600" fontSize="sm" lineHeight="tall">
                I love how every color you select, IT JUST LOOKS GOOD. Now it's just a matter of 
                preference and whether the colors fits the mood you want to create.
              </Text>
            </Box>
          </VStack>

          {/* Right Panel - Palette Display */}
          <VStack spacing={6} align="stretch">
            {/* Palette Header */}
            <HStack justify="space-between">
              <Input
                value={paletteName}
                onChange={(e) => setPaletteName(e.target.value)}
                variant="unstyled"
                fontSize="xl"
                fontWeight="bold"
                color="black"
                maxW="200px"
              />
              <HStack>
                <Button 
                  variant="ghost" 
                  size="sm"
                  leftIcon={<StarIcon />}
                  onClick={handleSavePalette}
                >
                  Save palette
                </Button>
              </HStack>
            </HStack>

            {/* Color Options */}
            <HStack spacing={4}>
              <Text fontSize="lg" fontWeight="semibold" color="black">Apple</Text>
              <HStack spacing={4} ml="auto">
                <Button variant="ghost" size="sm">Contrast grid</Button>
                <Button variant="ghost" size="sm" onClick={handleExportPalette}>Export</Button>
                <Button variant="ghost" size="sm">Edit</Button>
              </HStack>
            </HStack>

            {/* Color Palette */}
            <ColorPalette 
              palette={palette} 
              colorFormat={colorFormat}
              onColorCopy={(color) => {
                navigator.clipboard.writeText(color);
                toast({
                  title: 'Color copied!',
                  description: `${color} copied to clipboard`,
                  status: 'success',
                  duration: 2000,
                  isClosable: true,
                });
              }}
            />

            {/* UI Examples */}
            <UIExamples primaryColor={primaryColor} palette={palette} />
          </VStack>
        </Grid>
      </Container>
    </Box>
  );
}