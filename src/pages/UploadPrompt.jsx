// src/pages/UploadPrompt.jsx
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Text,
  VStack,
  Textarea,
  HStack,
  InputGroup,
  InputLeftElement,
  useToast,
  Icon,
  Flex,
  Badge,
  useColorModeValue,
  ScaleFade,
  Divider,
} from "@chakra-ui/react";
import { 
  AtSignIcon,
  CheckIcon,
} from "@chakra-ui/icons";
import { FiUser, FiCompass, FiFileText, FiUpload, FiHome } from "react-icons/fi";
import { useState } from "react";
import { ReactComponent as SaweriaIcon } from "../assets/iconsweria.svg";

export default function UploadPrompt() {
  const [nickname, setNickname] = useState("");
  const [direction, setDirection] = useState(
    "Upload Your Photo \nCopy Prompt & Paste in ChatGPT"
  );
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

  const handleUpload = async () => {
    if (!nickname || !direction || !prompt) {
      toast({
        title: "Form Tidak Lengkap",
        description: "Harap isi semua kolom yang diperlukan!",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("https://server-laimonprompt.vercel.app/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname, direction, prompt }),
      });
      const json = await res.json();
      
      toast({
        title: "Upload Berhasil!",
        description: json.message,
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      
      setNickname("");
      setDirection("Upload Your Photo \nCopy Prompt & Paste in ChatGPT");
      setPrompt("");
    } catch (err) {
      toast({
        title: "Upload Gagal",
        description: "Gagal mengirim data: " + err.message,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box 
      bgGradient={bgGradient}
      minH="100vh" 
      py={12}
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


      <Container maxW="4xl" position="relative" zIndex={1}>
        <ScaleFade initialScale={0.9} in={true}>
          <VStack spacing={10} w="full">
            {/* Header Section */}
            <Box textAlign="center" w="full">
              <Flex
                justify="space-between"
                align="center" // Memastikan tombol terletak di tengah pada mobile
                mb={6}
                flexWrap="wrap" // Menambahkan flex-wrap untuk mencegah tombol turun
              >
                <VStack align="start" spacing={3} flex={1} maxW="full">
                  <Badge 
                    colorScheme="purple" 
                    variant="subtle" 
                    px={3} 
                    py={1}
                    borderRadius="full"
                    fontSize="sm"
                  >
                    <Icon as={FiUpload} mr={2} />
                    Upload Center
                  </Badge>
                  <Heading 
                    color={textColor}
                    fontSize={{ base: "3xl", md: "5xl" }}
                    fontWeight="900"
                    bgGradient="linear(to-r, purple.500, pink.500, blue.500)"
                    bgClip="text"
                    lineHeight="shorter"
                  >
                    Upload Prompt
                  </Heading>
                  <Text 
                    color={mutedColor} 
                    fontSize={{ base: "lg", md: "xl" }}
                    maxW="md"
                    lineHeight="tall"
                  >
                    Bagikan prompt kreatif Anda dengan komunitas. Kami akan mengecek sebelum dipublikasikan.
                  </Text>
                </VStack>



                {/* Tombol Section */}
                <Box
                  display="flex"
                  gap={4}
                  flexWrap="wrap" // Menambahkan wrap untuk tombol
                  justify="center" // Menambahkan center untuk meratakan tombol
                  w="full" // Membuat tombol tetap responsif
                >


                  {/* Tombol 1 */}
                  <a
                    href="https://laimonprompt.blogspot.com/"
                    target="_self"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="md"
                      variant="ghost"
                      colorScheme="purple"
                      leftIcon={<Icon as={FiHome} />}
                      _hover={{
                        bg: "blue.50",
                        transform: "translateY(-2px)",
                        shadow: "lg",
                      }}
                      transition="all 0.3s ease"
                      w={{ base: "100%", sm: "auto" }} // Tombol full width pada mobile
                    >
                      Home
                    </Button>
                  </a>
                  {/* Tombol 2 */}
                  <a
                    href="https://saweria.co/laimondev/"
                    target="_self"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="md"
                      variant="ghost"
                      colorScheme="purple"
                      leftIcon={<SaweriaIcon width="20px" height="20px" />}
                      _hover={{
                        bg: "blue.50",
                        transform: "translateY(-2px)",
                        shadow: "lg",
                      }}
                      transition="all 0.3s ease"
                      w={{ base: "100%", sm: "auto" }} // Tombol full width pada mobile
                    >
                      Saweria
                    </Button>
                  </a>
                </Box>
              </Flex>
            </Box>

            {/* Main Form Card */}
            <Box
              bg={cardBg}
              p={{ base: 8, md: 12 }}
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
                <VStack spacing={6} align="stretch">
                  {/* Nickname Field */}
                  <Box>
                    <HStack mb={3}>
                      <Icon as={FiUser} color="purple.500" />
                      <Heading size="md" color={textColor}>Nickname</Heading>
                    </HStack>
                    <InputGroup size="lg">
                      <InputLeftElement>
                        <AtSignIcon color="purple.400" />
                      </InputLeftElement>
                      <Input
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        placeholder="Masukkan nickname Anda"
                        borderColor="gray.200"
                        borderRadius="xl"
                        _hover={{ borderColor: "purple.300" }}
                        _focus={{ 
                          borderColor: "purple.500", 
                          boxShadow: "0 0 0 3px rgba(139, 92, 246, 0.1)" 
                        }}
                        bg={inputBg}
                      />
                    </InputGroup>
                  </Box>

                  <Divider />

                  {/* Direction Field */}
                  <Box>
                    <HStack mb={3}>
                      <Icon as={FiCompass} color="blue.500" />
                      <Heading size="md" color={textColor}>Petunjuk Penggunaan</Heading>
                    </HStack>
                    <Textarea
                      value={direction}
                      onChange={(e) => setDirection(e.target.value)}
                      placeholder="Berikan petunjuk cara menggunakan prompt ini..."
                      rows={4}
                      resize="vertical"
                      borderColor="gray.200"
                      borderRadius="xl"
                      _hover={{ borderColor: "blue.300" }}
                      _focus={{ 
                        borderColor: "blue.500", 
                        boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)" 
                      }}
                      bg={inputBg}
                    />
                  </Box>

                  <Divider />

                  {/* Prompt Field */}
                  <Box>
                    <HStack mb={3}>
                      <Icon as={FiFileText} color="green.500" />
                      <Heading size="md" color={textColor}>Prompt Content</Heading>
                    </HStack>
                    <Textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Masukkan prompt lengkap Anda di sini..."
                      rows={6}
                      resize="vertical"
                      borderColor="gray.200"
                      borderRadius="xl"
                      _hover={{ borderColor: "green.300" }}
                      _focus={{ 
                        borderColor: "green.500", 
                        boxShadow: "0 0 0 3px rgba(34, 197, 94, 0.1)" 
                      }}
                      bg={inputBg}
                    />
                  </Box>
                </VStack>

                {/* Submit Button */}
                <Button
                  size="lg"
                  h="60px"
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
                  onClick={handleUpload}
                  isLoading={isLoading}
                  loadingText="Mengirim..."
                  leftIcon={<CheckIcon />}
                  borderRadius="xl"
                  fontSize="lg"
                  fontWeight="bold"
                  transition="all 0.3s ease"
                  w="full"
                >
                  Upload Prompt
                </Button>
              </VStack>
            </Box>
          </VStack>
        </ScaleFade>
      </Container>
    </Box>
  );
}