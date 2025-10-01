import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  VStack,
  HStack,
  Button,
  Text,
  Grid,
  GridItem,
  useColorModeValue,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Badge,
  Flex,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ArrowBackIcon, CopyIcon } from '@chakra-ui/icons';

const ColorPicker = () => {
  const [selectedColor, setSelectedColor] = useState('#3182CE');
  const [selectedColorName, setSelectedColorName] = useState('Blue');
  const navigate = useNavigate();
  const toast = useToast();
  
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  // Predefined color palette
  const colorPalette = [
    { name: 'Red', hex: '#E53E3E', category: 'Primary' },
    { name: 'Orange', hex: '#DD6B20', category: 'Primary' },
    { name: 'Yellow', hex: '#D69E2E', category: 'Primary' },
    { name: 'Green', hex: '#38A169', category: 'Primary' },
    { name: 'Teal', hex: '#319795', category: 'Primary' },
    { name: 'Blue', hex: '#3182CE', category: 'Primary' },
    { name: 'Cyan', hex: '#0BC5EA', category: 'Primary' },
    { name: 'Purple', hex: '#805AD5', category: 'Primary' },
    { name: 'Pink', hex: '#D53F8C', category: 'Primary' },
    { name: 'Gray', hex: '#718096', category: 'Neutral' },
    { name: 'Light Red', hex: '#FC8181', category: 'Light' },
    { name: 'Light Orange', hex: '#F6AD55', category: 'Light' },
    { name: 'Light Yellow', hex: '#F6E05E', category: 'Light' },
    { name: 'Light Green', hex: '#68D391', category: 'Light' },
    { name: 'Light Teal', hex: '#4FD1C7', category: 'Light' },
    { name: 'Light Blue', hex: '#63B3ED', category: 'Light' },
    { name: 'Light Cyan', hex: '#76E4F7', category: 'Light' },
    { name: 'Light Purple', hex: '#B794F6', category: 'Light' },
    { name: 'Light Pink', hex: '#F687B3', category: 'Light' },
    { name: 'Light Gray', hex: '#A0AEC0', category: 'Light' },
    { name: 'Dark Red', hex: '#C53030', category: 'Dark' },
    { name: 'Dark Orange', hex: '#C05621', category: 'Dark' },
    { name: 'Dark Yellow', hex: '#B7791F', category: 'Dark' },
    { name: 'Dark Green', hex: '#2F855A', category: 'Dark' },
    { name: 'Dark Teal', hex: '#2C7A7B', category: 'Dark' },
    { name: 'Dark Blue', hex: '#2B6CB0', category: 'Dark' },
    { name: 'Dark Cyan', hex: '#0987A0', category: 'Dark' },
    { name: 'Dark Purple', hex: '#6B46C1', category: 'Dark' },
    { name: 'Dark Pink', hex: '#B83280', category: 'Dark' },
    { name: 'Dark Gray', hex: '#4A5568', category: 'Dark' },
  ];

  const handleColorSelect = (color, name) => {
    setSelectedColor(color);
    setSelectedColorName(name);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: `${text} copied to clipboard`,
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const groupedColors = colorPalette.reduce((acc, color) => {
    if (!acc[color.category]) {
      acc[color.category] = [];
    }
    acc[color.category].push(color);
    return acc;
  }, {});

  return (
    <Box bg={bgColor} minHeight="100vh" py={8}>
      <Container maxW="7xl">
        <VStack spacing={6} align="stretch">
          {/* Header */}
          <Flex justify="space-between" align="center">
            <HStack>
              <IconButton
                aria-label="Back to dashboard"
                icon={<ArrowBackIcon />}
                onClick={() => navigate('/')}
                variant="ghost"
                size="lg"
              />
              <Heading size="xl" color="gray.700">
                Color Picker
              </Heading>
            </HStack>
          </Flex>

          {/* Selected Color Display */}
          <Card bg={cardBg} shadow="lg">
            <CardHeader>
              <Heading size="md">Selected Color</Heading>
            </CardHeader>
            <CardBody>
              <HStack spacing={6} align="center">
                <Box
                  w={20}
                  h={20}
                  bg={selectedColor}
                  borderRadius="lg"
                  border="2px solid"
                  borderColor="gray.200"
                  shadow="md"
                />
                <VStack align="start" spacing={2}>
                  <Text fontSize="xl" fontWeight="bold">
                    {selectedColorName}
                  </Text>
                  <HStack>
                    <Text fontSize="lg" color="gray.600">
                      {selectedColor}
                    </Text>
                    <IconButton
                      aria-label="Copy hex code"
                      icon={<CopyIcon />}
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(selectedColor)}
                    />
                  </HStack>
                  <Text fontSize="sm" color="gray.500">
                    RGB: {parseInt(selectedColor.slice(1, 3), 16)}, {parseInt(selectedColor.slice(3, 5), 16)}, {parseInt(selectedColor.slice(5, 7), 16)}
                  </Text>
                </VStack>
              </HStack>
            </CardBody>
          </Card>

          {/* Color Palette */}
          <Card bg={cardBg} shadow="lg">
            <CardHeader>
              <Heading size="md">Color Palette</Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing={6}>
                {Object.entries(groupedColors).map(([category, colors]) => (
                  <Box key={category} w="full">
                    <HStack mb={4}>
                      <Badge colorScheme="blue" px={3} py={1}>
                        {category} Colors
                      </Badge>
                      <Divider />
                    </HStack>
                    <Grid templateColumns="repeat(auto-fit, minmax(120px, 1fr))" gap={4}>
                      {colors.map((color) => (
                        <GridItem key={color.hex}>
                          <VStack
                            spacing={2}
                            p={3}
                            borderRadius="lg"
                            bg={selectedColor === color.hex ? 'blue.50' : 'transparent'}
                            border={selectedColor === color.hex ? '2px solid' : '1px solid'}
                            borderColor={selectedColor === color.hex ? 'blue.400' : 'gray.200'}
                            cursor="pointer"
                            transition="all 0.2s"
                            _hover={{
                              transform: 'translateY(-2px)',
                              shadow: 'md',
                              borderColor: 'blue.300',
                            }}
                            onClick={() => handleColorSelect(color.hex, color.name)}
                          >
                            <Box
                              w={16}
                              h={16}
                              bg={color.hex}
                              borderRadius="md"
                              border="1px solid"
                              borderColor="gray.200"
                            />
                            <Text fontSize="sm" fontWeight="medium" textAlign="center">
                              {color.name}
                            </Text>
                            <Text fontSize="xs" color="gray.500" textAlign="center">
                              {color.hex}
                            </Text>
                          </VStack>
                        </GridItem>
                      ))}
                    </Grid>
                  </Box>
                ))}
              </VStack>
            </CardBody>
          </Card>

          {/* Action Buttons */}
          <Card bg={cardBg} shadow="lg">
            <CardBody>
              <HStack spacing={4} justify="center">
                <Button
                  colorScheme="blue"
                  onClick={() => copyToClipboard(selectedColor)}
                  leftIcon={<CopyIcon />}
                >
                  Copy Hex Code
                </Button>
                <Button
                  variant="outline"
                  onClick={() => copyToClipboard(`rgb(${parseInt(selectedColor.slice(1, 3), 16)}, ${parseInt(selectedColor.slice(3, 5), 16)}, ${parseInt(selectedColor.slice(5, 7), 16)})`)}
                >
                  Copy RGB
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => navigate('/')}
                >
                  Back to Dashboard
                </Button>
              </HStack>
            </CardBody>
          </Card>
        </VStack>
      </Container>
    </Box>
  );
};

export default ColorPicker;