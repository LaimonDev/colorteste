import React from 'react';
import {
  Box,
  Grid,
  Text,
  VStack,
  HStack,
  useToast
} from '@chakra-ui/react';
import { formatColorValues, isLightColor } from '../utils/colorUtils';

export default function ColorPalette({ palette, colorFormat, onColorCopy }) {
  const toast = useToast();

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
    <Box>
      <Grid templateColumns="repeat(11, 1fr)" gap={1} bg="white" p={1} borderRadius="xl">
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
              borderRadius={shade === '50' ? 'xl 0 0 xl' : shade === '950' ? '0 xl xl 0' : '0'}
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
                minH="120px"
                justify="space-between"
                p={3}
                color={isLight ? 'black' : 'white'}
                position="relative"
              >
                {/* Lock icon for base color */}
                {isBaseColor && (
                  <Box
                    position="absolute"
                    top={2}
                    right={2}
                    fontSize="sm"
                  >
                    🔒
                  </Box>
                )}

                <Text fontSize="lg" fontWeight="bold" mt={isBaseColor ? 4 : 0}>
                  {shade}
                </Text>
                
                <VStack spacing={0} align="center">
                  <Text fontSize="xs" opacity={0.8} textAlign="center">
                    {colorData.hex.toUpperCase()}
                  </Text>
                </VStack>
              </VStack>
            </Box>
          );
        })}
      </Grid>
    </Box>
  );
}