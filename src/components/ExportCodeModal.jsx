import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Button,
  Text,
  VStack,
  HStack,
  Grid,
  useToast,
  useColorModeValue,
  Code,
  Textarea
} from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';

const ExportCodeModal = ({ isOpen, onClose, palette, paletteName }) => {
  const [selectedFormat, setSelectedFormat] = useState('Hex code');
  const toast = useToast();

  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const mutedColor = useColorModeValue("gray.600", "gray.400");
  const buttonBg = useColorModeValue("gray.100", "gray.700");
  const selectedButtonBg = useColorModeValue("purple.500", "purple.400");

  const formats = [
    { name: 'Tailwind 3', badge: 'free' },
    { name: 'Hex code', badge: 'free' },
    { name: 'Tailwind 4', badge: 'free' },
    { name: 'OKLCH', badge: '' },
    { name: 'CSS', badge: '' },
    { name: 'HSL', badge: '' },
    { name: 'SCSS', badge: '' },
    { name: 'RGB', badge: '' },
    { name: 'SVG / Figma', badge: '' }
  ];

  const generateCodeContent = () => {
    if (!palette || Object.keys(palette).length === 0) return '';

    const colorName = paletteName.toLowerCase().replace(/\s+/g, '-');
    const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];

    switch (selectedFormat) {
      case 'Hex code':
        const hexObject = {};
        shades.forEach(shade => {
          if (palette[shade]) {
            hexObject[shade] = palette[shade].hex.toLowerCase();
          }
        });
        return `'${colorName}': {\n${Object.entries(hexObject)
          .map(([shade, hex]) => `  '${shade}': '${hex}',`)
          .join('\n')}\n},`;

      case 'CSS':
        return shades
          .filter(shade => palette[shade])
          .map(shade => `--color-${colorName}-${shade}: ${palette[shade].hex.toLowerCase()};`)
          .join('\n');

      case 'SCSS':
        return shades
          .filter(shade => palette[shade])
          .map(shade => `$color-${colorName}-${shade}: ${palette[shade].hex.toLowerCase()};`)
          .join('\n');

      case 'Tailwind 3':
      case 'Tailwind 4':
        const tailwindConfig = {};
        shades.forEach(shade => {
          if (palette[shade]) {
            tailwindConfig[shade] = palette[shade].hex.toLowerCase();
          }
        });
        return `// tailwind.config.js\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: {\n        ${colorName}: {\n${Object.entries(tailwindConfig)
          .map(([shade, hex]) => `          ${shade}: '${hex}',`)
          .join('\n')}\n        }\n      }\n    }\n  }\n}`;

      case 'RGB':
        return shades
          .filter(shade => palette[shade])
          .map(shade => {
            const rgb = palette[shade].rgb;
            return `--color-${colorName}-${shade}: ${rgb.r}, ${rgb.g}, ${rgb.b};`;
          })
          .join('\n');

      case 'HSL':
        return shades
          .filter(shade => palette[shade])
          .map(shade => {
            const hsl = palette[shade].hsl;
            return `--color-${colorName}-${shade}: ${hsl.h}, ${hsl.s}%, ${hsl.l}%;`;
          })
          .join('\n');

      case 'OKLCH':
        return shades
          .filter(shade => palette[shade])
          .map(shade => {
            const oklch = palette[shade].oklch;
            return `--color-${colorName}-${shade}: ${oklch.l} ${oklch.c} ${oklch.h};`;
          })
          .join('\n');

      case 'SVG / Figma':
        return shades
          .filter(shade => palette[shade])
          .map(shade => `<stop stop-color="${palette[shade].hex.toLowerCase()}" stop-opacity="1"/>`)
          .join('\n');

      default:
        return '';
    }
  };

  const handleCopyToClipboard = async () => {
    const code = generateCodeContent();
    try {
      await navigator.clipboard.writeText(code);
      toast({
        title: 'Code copied!',
        description: `${selectedFormat} code copied to clipboard`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'Copy failed',
        description: 'Unable to copy to clipboard',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent
        bg={cardBg}
        borderRadius="2xl"
        maxH="90vh"
        mx={4}
      >
        <ModalHeader
          pb={4}
          borderBottom="1px solid"
          borderColor={useColorModeValue("gray.200", "gray.600")}
        >
          <HStack justify="space-between" align="center">
            <Text fontSize="2xl" fontWeight="bold" color={textColor}>
              Export code
            </Text>
            <ModalCloseButton position="static" />
          </HStack>
        </ModalHeader>

        <ModalBody p={6}>
          <Grid
            templateColumns={{ base: "1fr", lg: "300px 1fr" }}
            gap={6}
            h="full"
          >
            {/* Format Selection */}
            <VStack align="stretch" spacing={2}>
              <Grid
                templateColumns={{ base: "repeat(2, 1fr)", lg: "1fr" }}
                gap={2}
              >
                {formats.map((format) => (
                  <Button
                    key={format.name}
                    size="sm"
                    variant={selectedFormat === format.name ? "solid" : "ghost"}
                    bg={selectedFormat === format.name ? selectedButtonBg : buttonBg}
                    color={selectedFormat === format.name ? "white" : textColor}
                    _hover={{
                      bg: selectedFormat === format.name ? selectedButtonBg : useColorModeValue("gray.200", "gray.600")
                    }}
                    onClick={() => setSelectedFormat(format.name)}
                    justifyContent="space-between"
                    borderRadius="lg"
                    px={4}
                    py={3}
                    h="auto"
                  >
                    <Text fontSize="sm" fontWeight="medium">
                      {format.name}
                    </Text>
                    {format.badge && (
                      <Text
                        fontSize="xs"
                        bg={useColorModeValue("gray.200", "gray.600")}
                        px={2}
                        py={1}
                        borderRadius="md"
                        color={mutedColor}
                      >
                        {format.badge}
                      </Text>
                    )}
                  </Button>
                ))}
              </Grid>
            </VStack>

            {/* Code Display */}
            <VStack align="stretch" spacing={4}>
              <Box
                bg={useColorModeValue("gray.50", "gray.900")}
                border="1px solid"
                borderColor={useColorModeValue("gray.200", "gray.600")}
                borderRadius="xl"
                p={4}
                position="relative"
                maxH="400px"
                overflow="auto"
              >
                <Button
                  position="absolute"
                  top={4}
                  right={4}
                  size="sm"
                  colorScheme="gray"
                  variant="solid"
                  bg="gray.800"
                  color="white"
                  _hover={{ bg: "gray.700" }}
                  leftIcon={<CopyIcon />}
                  onClick={handleCopyToClipboard}
                  borderRadius="lg"
                  fontWeight="medium"
                  zIndex={10}
                >
                  Copy to clipboard
                </Button>
                <Code
                  display="block"
                  whiteSpace="pre-wrap"
                  fontSize="sm"
                  bg="transparent"
                  color={textColor}
                  p={0}
                  fontFamily="Monaco, Menlo, 'Ubuntu Mono', monospace"
                  lineHeight="1.5"
                  wordBreak="break-word"
                  maxW="100%"
                  overflow="auto"
                >
                  {generateCodeContent()}
                </Code>
              </Box>
            </VStack>
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ExportCodeModal;