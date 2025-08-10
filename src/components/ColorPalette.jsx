import React from 'react';
import {
  Box,
  Grid,
  Text,
  VStack,
  HStack,
  useToast,
  useColorModeValue
} from '@chakra-ui/react';
import { formatColorValues, isLightColor } from '../utils/colorUtils';

export default function ColorPalette({ palette, colorFormat, onColorCopy }) {
  const toast = useToast();
  const cardBg = useColorModeValue("white", "gray.800");

  const handleColorClick = (colorValue) => {
    navigator.clipboard.writeText(colorValue).then(() => {
      if (onColorCopy) {
        onColorCopy(colorValue);
      }
    });
  };

  const getColorValue = (colorData, format) => {
    const formatted = formatColorValues(colorData);
    switch (format) {
      case 'HEX': return formatted.hex;
      case 'RGB': return formatted.rgb;
      case 'HSL': return formatted.hsl;
      case 'OKLCH': return formatted.oklch;
      default: return formatted.hex;
    }
  };

  const shadeOrder = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];

  return (
    <VStack spacing={6} align="stretch">
      <Text fontSize="2xl" fontWeight="bold" color="gray.800" textAlign="center">
        Color Palette
      </Text>
      
      {/* Desktop Grid */}
      <Box display={{ base: 'none', lg: 'block' }}>
        <Grid 
          templateColumns="repeat(11, 1fr)" 
          gap={2} 
          bg={cardBg} 
          p={3} 
          borderRadius="2xl"
          shadow="lg"
        >
          {shadeOrder.map((shade) => {
            const colorData = palette[shade];
            if (!colorData) return null;

            const isLight = isLightColor(colorData.hex);
            const colorValue = getColorValue(colorData, colorFormat);
            const isBaseColor = shade === '500';

            return (
              <Box
                key={shade}
                position="relative"
                cursor="pointer"
                borderRadius="xl"
                overflow="hidden"
                _hover={{
                  transform: 'scale(1.05)',
                  zIndex: 10,
                  boxShadow: 'xl'
                }}
                transition="all 0.2s"
                onClick={() => handleColorClick(colorValue)}
              >
                <VStack
                  bg={colorData.hex}
                  minH="140px"
                  justify="space-between"
                  p={4}
                  color={isLight ? 'black' : 'white'}
                  position="relative"
                >
                  {/* Lock icon for base color */}
                  {isBaseColor && (
                    <Box
                      position="absolute"
                      top={2}
                      right={2}
                      fontSize="lg"
                    >
                      🔒
                    </Box>
                  )}

                  <Text fontSize="xl" fontWeight="bold" mt={isBaseColor ? 6 : 2}>
                    {shade}
                  </Text>
                  
                  <VStack spacing={1} align="center">
                    <Text fontSize="xs" opacity={0.9} textAlign="center" fontWeight="medium">
                      {colorData.hex.toUpperCase()}
                    </Text>
                  </VStack>
                </VStack>
              </Box>
            );
          })}
        </Grid>
      </Box>

      {/* Mobile/Tablet Grid */}
      <Box display={{ base: 'block', lg: 'none' }}>
        <Grid 
          templateColumns={{ base: "repeat(3, 1fr)", md: "repeat(4, 1fr)" }}
          gap={3}
          bg={cardBg} 
          p={4} 
          borderRadius="2xl"
          shadow="lg"
        >
          {shadeOrder.map((shade) => {
            const colorData = palette[shade];
            if (!colorData) return null;

            const isLight = isLightColor(colorData.hex);
            const colorValue = getColorValue(colorData, colorFormat);
            const isBaseColor = shade === '500';

            return (
              <Box
                key={shade}
                position="relative"
                cursor="pointer"
                borderRadius="xl"
                overflow="hidden"
                _hover={{
                  transform: 'scale(1.02)',
                  boxShadow: 'lg'
                }}
                transition="all 0.2s"
                onClick={() => handleColorClick(colorValue)}
                shadow="md"
              >
                <VStack
                  bg={colorData.hex}
                  minH={{ base: "100px", md: "120px" }}
                  justify="space-between"
                  p={3}
                  color={isLight ? 'black' : 'white'}
                  position="relative"
                >
                  {/* Lock icon for base color */}
                  {isBaseColor && (
                    <Box
                      position="absolute"
                      top={1}
                      right={1}
                      fontSize="sm"
                    >
                      🔒
                    </Box>
                  )}

                  <Text fontSize="lg" fontWeight="bold" mt={isBaseColor ? 4 : 1}>
                    {shade}
                  </Text>
                  
                  <VStack spacing={0} align="center">
                    <Text fontSize="xs" opacity={0.9} textAlign="center" fontWeight="medium">
                      {colorData.hex.toUpperCase()}
                    </Text>
                  </VStack>
                </VStack>
              </Box>
            );
          })}
        </Grid>
      </Box>
    </VStack>
  );
}