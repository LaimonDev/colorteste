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
  Flex,
  IconButton,
  useToast,
  Card,
  CardBody,
  useColorModeValue,
  ScaleFade,
  InputGroup,
  useDisclosure
} from '@chakra-ui/react';
import { CopyIcon, SettingsIcon } from '@chakra-ui/icons';
import { FiHome } from 'react-icons/fi';
import { generateShades, formatColorValues, isLightColor } from '../utils/colorUtils';
import ColorPalette from '../components/ColorPalette';
import UIExamples from '../components/UIExamples';
import ExportCodeModal from '../components/ExportCodeModal';

export default function ColorGenerator() {
  const [primaryColor, setPrimaryColor] = useState('#4ade80');
  const [colorFormat, setColorFormat] = useState('HEX');
  const [palette, setPalette] = useState({});
  const [paletteName, setPaletteName] = useState('My Palette');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // Color mode values
  const bgGradient = useColorModeValue(
    "linear(to-br, blue.50, purple.50, pink.50)",
    "linear(to-br, gray.900, purple.900, blue.900)"
  );
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const mutedColor = useColorModeValue("gray.600", "gray.400");
  const inputBg = useColorModeValue("gray.50", "gray.700");

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

  const handleExportCode = () => {
    onOpen();
  };

  return (
    <Box 
      bgGradient={bgGradient}
      minH="100vh" 
      py={{ base: 6, md: 12 }}
      position="relative"
      overflow="hidden"
    >
      {/* Background decoration */}
      <Box
        position="absolute"
        top="-50px"
        right="-50px"
        width="200px"
        height="200px"
        borderRadius="full"
        bgGradient="linear(to-br, purple.300, pink.300)"
        opacity={0.1}
        zIndex={0}
      />
      <Box
        position="absolute"
        bottom="-100px"
        left="-100px"
        width="300px"
        height="300px"
        borderRadius="full"
        bgGradient="linear(to-tr, blue.300, teal.300)"
        opacity={0.1}
        zIndex={0}
      />

      <Container maxW="6xl" position="relative" zIndex={1}>
        <ScaleFade initialScale={0.9} in={true}>
          <VStack spacing={{ base: 6, md: 10 }} w="full">
            {/* Header Section */}
            <Box textAlign="center" w="full">
              <VStack spacing={4}>
                <Flex align="center" gap={3} justify="center">
                  <Box 
                    w={12} 
                    h={12} 
                    bgGradient="linear(to-br, purple.500, pink.500)" 
                    borderRadius="xl" 
                    display="flex" 
                    alignItems="center" 
                    justifyContent="center"
                  >
                    <FiHome color="white" size={24} />
                  </Box>
                  <Heading 
                    color={textColor}
                    fontSize={{ base: "3xl", md: "5xl" }}
                    fontWeight="900"
                    bgGradient="linear(to-r, purple.500, pink.500, blue.500)"
                    bgClip="text"
                  >
                    Color Generator
                  </Heading>
                </Flex>
                <Text 
                  color={mutedColor} 
                  fontSize={{ base: "lg", md: "xl" }}
                  maxW="2xl"
                  lineHeight="tall"
                  px={4}
                >
                  Create stunning color palettes instantly. Pick a base color and get a complete scale with beautiful shades.
                </Text>
              </VStack>
            </Box>

            {/* Main Content Card */}
            <Box
              bg={cardBg}
              p={{ base: 6, md: 10 }}
              borderRadius="3xl"
              shadow="2xl"
              w="full"
              backdropFilter="blur(10px)"
              border="1px solid"
              borderColor={useColorModeValue("white", "gray.700")}
              position="relative"
              _before={{
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                bgGradient: "linear(to-r, purple.500, pink.500, blue.500)",
                borderTopRadius: "3xl",
              }}
            >
              <VStack spacing={8} align="stretch">
                {/* Color Picker Section */}
                <VStack spacing={6} align="stretch">
                  {/* Palette Name */}
                  <InputGroup size="lg">
                    <Input
                      value={paletteName}
                      onChange={(e) => setPaletteName(e.target.value)}
                      placeholder="Enter palette name"
                      borderColor="gray.200"
                      borderRadius="xl"
                      _hover={{ borderColor: "purple.300" }}
                      _focus={{ 
                        borderColor: "purple.500", 
                        boxShadow: "0 0 0 3px rgba(139, 92, 246, 0.1)" 
                      }}
                      bg={inputBg}
                      fontSize="xl"
                      fontWeight="semibold"
                    />
                  </InputGroup>

                  {/* Primary Color Picker */}
                  <VStack align="stretch" spacing={4}>
                    <HStack justify="space-between" align="center">
                      <Text fontWeight="semibold" color={textColor} fontSize="lg">
                        Primary Color
                      </Text>
                      <HStack>
                        <Text fontSize="sm" color={mutedColor}>{colorFormat}</Text>
                        <IconButton 
                          size="sm" 
                          variant="ghost" 
                          icon={<SettingsIcon />}
                          onClick={() => {
                            const formats = ['HEX', 'HSL', 'RGB', 'OKLCH'];
                            const currentIndex = formats.indexOf(colorFormat);
                            const nextIndex = (currentIndex + 1) % formats.length;
                            setColorFormat(formats[nextIndex]);
                          }}
                          borderRadius="lg"
                        />
                      </HStack>
                    </HStack>
                    
                    <HStack spacing={4}>
                      <Box 
                        w={16} 
                        h={16} 
                        bg={primaryColor} 
                        borderRadius="xl" 
                        border="3px solid" 
                        borderColor="gray.200"
                        cursor="pointer"
                        position="relative"
                        shadow="md"
                        _hover={{ transform: 'scale(1.05)', shadow: 'lg' }}
                        transition="all 0.2s"
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
                      <InputGroup flex={1}>
                        <Input
                          value={primaryColor}
                          onChange={handleColorChange}
                          placeholder="#4ade80"
                          bg={inputBg}
                          color={textColor}
                          size="lg"
                          borderRadius="xl"
                          borderColor="gray.200"
                          _hover={{ borderColor: "purple.300" }}
                          _focus={{ 
                            borderColor: "purple.500", 
                            boxShadow: "0 0 0 3px rgba(139, 92, 246, 0.1)" 
                          }}
                        />
                      </InputGroup>
                      <IconButton 
                        icon={<CopyIcon />}
                        size="lg"
                        colorScheme="purple"
                        variant="ghost"
                        borderRadius="xl"
                        onClick={() => {
                          navigator.clipboard.writeText(primaryColor);
                          toast({
                            title: 'Color copied!',
                            description: `${primaryColor} copied to clipboard`,
                            status: 'success',
                            duration: 2000,
                            isClosable: true,
                          });
                        }}
                      />
                    </HStack>
                  </VStack>

                  {/* Export Code Button */}
                  <Button
                    size="lg"
                    bgGradient="linear(to-r, purple.500, pink.500)"
                    color="white"
                    _hover={{
                      bgGradient: "linear(to-r, purple.600, pink.600)",
                      transform: "translateY(-2px)",
                      shadow: "xl",
                    }}
                    _active={{
                      transform: "translateY(0)",
                    }}
                    onClick={handleExportCode}
                    borderRadius="xl"
                    fontSize="lg"
                    fontWeight="bold"
                    transition="all 0.3s ease"
                    leftIcon={<CopyIcon />}
                  >
                    Export Code
                  </Button>
                </VStack>

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
            </Box>
          </VStack>
        </ScaleFade>
      </Container>

      {/* Export Code Modal */}
      <ExportCodeModal
        isOpen={isOpen}
        onClose={onClose}
        palette={palette}
        paletteName={paletteName}
      />
    </Box>
  );
}