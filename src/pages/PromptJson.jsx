import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Text,
  VStack,
  IconButton,
  HStack,
  useToast,
  Badge,
  useColorModeValue,
  ScaleFade,
  Flex,
  Icon,
  Divider,
  Code,
  useClipboard,
  Select,
  Textarea,
  Collapse,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stack,
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { 
  AddIcon, 
  DeleteIcon, 
  EditIcon,
  CopyIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  SettingsIcon,
} from "@chakra-ui/icons";
import { 
  FiHome, 
  FiPlus, 
  FiCode, 
  FiZap,
  FiLayers,
  FiTarget,
  FiType,
  FiHash,
  FiList,
  FiPackage,
  FiChevronDown,
  FiChevronRight,
  FiMoreHorizontal,
} from "react-icons/fi";
import { useState } from "react";
import { ReactComponent as SaweriaIcon } from "../assets/iconsweria.svg";

export default function PromptJson() {
  const [subject, setSubject] = useState("");
  const [extras, setExtras] = useState([]);
  const [jsonResult, setJsonResult] = useState("");
  const toast = useToast();
  const { hasCopied, onCopy } = useClipboard(jsonResult);

  // Color mode values
  const bgGradient = useColorModeValue(
    "linear(to-br, teal.50, blue.50, purple.50)",
    "linear(to-br, gray.900, teal.900, blue.900)"
  );
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const mutedColor = useColorModeValue("gray.600", "gray.400");
  const inputBg = useColorModeValue("gray.50", "gray.700");
  const fieldBg = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const borderColorFocus = useColorModeValue("white", "gray.700");

  /* ---------- handlers ---------- */
  const addExtra = () => {
    const newExtra = { 
      id: Date.now(), 
      title: "Detail", 
      value: "" 
    };
    setExtras([...extras, newExtra]);
    toast({
      title: "Field Ditambahkan",
      description: "Field detail baru berhasil ditambahkan",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "bottom-right",
    });
  };

  const updateExtra = (id, field, val) =>
    setExtras(extras.map((e) => (e.id === id ? { ...e, [field]: val } : e)));

  const removeExtra = (id) => {
    setExtras(extras.filter((e) => e.id !== id));
    toast({
      title: "Field Dihapus",
      description: "Field detail berhasil dihapus",
      status: "info",
      duration: 2000,
      isClosable: true,
      position: "bottom-right",
    });
  };

  const editTitle = (id) => {
    const ex = extras.find((e) => e.id === id);
    const newTitle = prompt("Masukkan judul baru:", ex.title);
    if (newTitle && newTitle.trim()) {
      updateExtra(id, "title", newTitle.trim());
    }
  };

  const generate = () => {
    if (!subject.trim()) {
      toast({
        title: "Subjek Diperlukan",
        description: "Mohon masukkan subjek prompt terlebih dahulu",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    const json = { 
      subject, 
      ...extras.reduce((a, e) => ({ ...a, [e.title]: e.value }), {}) 
    };
    setJsonResult(JSON.stringify(json, null, 2));
    
    toast({
      title: "JSON Generated!",
      description: "Prompt JSON berhasil dibuat dan siap untuk dicopy",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  const handleCopy = () => {
    onCopy();
    toast({
      title: "Berhasil Dicopy!",
      description: "JSON prompt telah disalin ke clipboard",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "bottom-right",
    });
  };

  return (
    <Box 
      bgGradient={bgGradient}
      minH="100vh" 
      py={12}
      position="relative"
      overflow="hidden"
    >
      {/* Background decorations */}
      <Box
        position="absolute"
        top="-100px"
        left="-100px"
        width="300px"
        height="300px"
        borderRadius="full"
        bgGradient="linear(to-br, teal.300, blue.300)"
        opacity={0.1}
        zIndex={0}
      />
      <Box
        position="absolute"
        bottom="-50px"
        right="-50px"
        width="200px"
        height="200px"
        borderRadius="full"
        bgGradient="linear(to-tl, purple.300, pink.300)"
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
                    colorScheme="teal" 
                    variant="subtle" 
                    px={3} 
                    py={1}
                    borderRadius="full"
                    fontSize="sm"
                  >
                    <Icon as={FiCode} mr={2} />
                    JSON Generator
                  </Badge>
                  <Heading 
                    color={textColor}
                    fontSize={{ base: "3xl", md: "5xl" }}
                    fontWeight="900"
                    bgGradient="linear(to-r, teal.500, blue.500, purple.500)"
                    bgClip="text"
                    lineHeight="shorter"
                  >
                    Prompt Modular JSON
                  </Heading>
                  <Text 
                    color={mutedColor} 
                    fontSize={{ base: "lg", md: "xl" }}
                    maxW="lg"
                    lineHeight="tall"
                  >
                    Buat prompt Lebih Mudah dan Akurat.
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
                      colorScheme="teal"
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
                      colorScheme="teal"
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

            <Flex gap={8} w="full" direction={{ base: "column", lg: "row" }}>
              {/* Main Input Card */}
              <Box flex={1}>
                <Box
                  bg={cardBg}
                  p={{ base: 8, md: 10 }}
                  borderRadius="3xl"
                  shadow="2xl"
                  w="full"
                  backdropFilter="blur(10px)"
                  border="1px solid"
                  borderColor={borderColorFocus}
                  position="relative"
                  _before={{
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    bgGradient: "linear(to-r, teal.500, blue.500, purple.500)",
                    borderTopRadius: "3xl",
                  }}
                >
                  <VStack spacing={8} align="stretch">
                    {/* Subject Input */}
                    <Box>
                      <HStack mb={4}>
                        <Icon as={FiTarget} color="teal.500" fontSize="20" />
                        <Heading size="md" color={textColor}>
                          Apa yang ingin dibuat?
                        </Heading>
                      </HStack>
                      <Input
                        size="lg"
                        placeholder="Contoh: Generate gambar anime girl dengan style modern"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        borderColor="gray.200"
                        borderRadius="xl"
                        _hover={{ borderColor: "teal.300" }}
                        _focus={{ 
                          borderColor: "teal.500", 
                          boxShadow: "0 0 0 3px rgba(20, 184, 166, 0.1)" 
                        }}
                        bg={inputBg}
                        h="60px"
                        fontSize="md"
                      />
                    </Box>

                    <Divider />

                    {/* Dynamic Fields Section */}
                    <Box>
                      <HStack justify="space-between" mb={4}>
                        <HStack>
                          <Icon as={FiLayers} color="blue.500" fontSize="20" />
                          <Heading size="md" color={textColor}>
                            Detail Tambahan
                          </Heading>
                          <Badge colorScheme="blue" variant="subtle">
                            {extras.length} field{extras.length !== 1 ? 's' : ''}
                          </Badge>
                        </HStack>
                        <Button
                          leftIcon={<AddIcon />}
                          onClick={addExtra}
                          size="sm"
                          colorScheme="teal"
                          variant="ghost"
                          _hover={{ bg: "teal.50" }}
                        >
                          Tambah Field
                        </Button>
                      </HStack>

                      <VStack spacing={4} align="stretch">
                        {extras.map((ex, index) => (
                          <Box
                            key={ex.id}
                            p={4}
                            borderRadius="xl"
                            border="1px solid"
                            borderColor={borderColor}
                            bg={fieldBg}
                          >
                            <VStack spacing={3} align="stretch">
                              <HStack justify="space-between">
                                <HStack>
                                  <Badge colorScheme="purple" variant="outline">
                                    #{index + 1}
                                  </Badge>
                                  <Text fontWeight="bold" color={textColor} fontSize="sm">
                                    {ex.title}
                                  </Text>
                                </HStack>
                                <HStack>
                                  <IconButton
                                    size="sm"
                                    icon={<EditIcon />}
                                    aria-label="Edit title"
                                    onClick={() => editTitle(ex.id)}
                                    colorScheme="blue"
                                    variant="ghost"
                                  />
                                  <IconButton
                                    size="sm"
                                    icon={<DeleteIcon />}
                                    aria-label="Delete field"
                                    onClick={() => removeExtra(ex.id)}
                                    colorScheme="red"
                                    variant="ghost"
                                  />
                                </HStack>
                              </HStack>
                              <Input
                                placeholder="Masukkan detail untuk field ini..."
                                value={ex.value}
                                onChange={(e) => updateExtra(ex.id, "value", e.target.value)}
                                borderColor="gray.200"
                                borderRadius="lg"
                                _focus={{ borderColor: "purple.500" }}
                                bg={cardBg}
                              />
                            </VStack>
                          </Box>
                        ))}

                        {extras.length === 0 && (
                          <Box
                            p={8}
                            textAlign="center"
                            borderRadius="xl"
                            border="2px dashed"
                            borderColor={borderColor}
                          >
                            <Icon as={FiPlus} fontSize="40" color="gray.400" mb={3} />
                            <Text color="gray.500">
                              Belum ada field tambahan.{" "}
                              <Text as="button" color="teal.500" onClick={addExtra}>
                                Klik di sini untuk menambah
                              </Text>
                            </Text>
                          </Box>
                        )}
                      </VStack>
                    </Box>

                    {/* Generate Button */}
                    <Button
                      size="lg"
                      h="60px"
                      bgGradient="linear(to-r, teal.500, blue.500)"
                      color="white"
                      _hover={{
                        bgGradient: "linear(to-r, teal.600, blue.600)",
                        transform: "translateY(-2px)",
                        shadow: "xl",
                      }}
                      _active={{
                        transform: "translateY(0)",
                      }}
                      onClick={generate}
                      isDisabled={!subject.trim()}
                      leftIcon={<Icon as={FiZap} />}
                      borderRadius="xl"
                      fontSize="lg"
                      fontWeight="bold"
                      transition="all 0.3s ease"
                      w="full"
                    >
                      Generate JSON Prompt
                    </Button>
                  </VStack>
                </Box>
              </Box>

              {/* Result Card */}
              {jsonResult && (
                <Box flex={1} minW={{ lg: "400px" }}>
                  <Box
                    bg={cardBg}
                    p={{ base: 6, md: 8 }}
                    borderRadius="3xl"
                    shadow="2xl"
                    w="full"
                    backdropFilter="blur(10px)"
                    border="1px solid"
                    borderColor={borderColorFocus}
                    position="relative"
                    _before={{
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "4px",
                      bgGradient: "linear(to-r, green.500, teal.500)",
                      borderTopRadius: "3xl",
                    }}
                  >
                    <VStack spacing={4} align="stretch">
                      <HStack justify="space-between">
                        <HStack>
                          <Icon as={FiCode} color="green.500" fontSize="20" />
                          <Heading size="md" color={textColor}>
                            JSON Result
                          </Heading>
                          <Badge colorScheme="green" variant="subtle">
                            Ready
                          </Badge>
                        </HStack>
                        <Button
                          size="sm"
                          colorScheme={hasCopied ? "green" : "teal"}
                          variant="outline"
                          onClick={handleCopy}
                          leftIcon={hasCopied ? <CheckIcon /> : <CopyIcon />}
                          _hover={{ transform: "translateY(-1px)" }}
                          transition="all 0.2s ease"
                        >
                          {hasCopied ? "Tersalin!" : "Copy JSON"}
                        </Button>
                      </HStack>
                      
                      <Box
                        bg="gray.900"
                        p={4}
                        borderRadius="xl"
                        maxH="400px"
                        overflowY="auto"
                      >
                        <Code
                          colorScheme="green"
                          fontSize="sm"
                          whiteSpace="pre-wrap"
                          color="green.300"
                          bg="transparent"
                          p={0}
                          display="block"
                          lineHeight="tall"
                        >
                          {jsonResult}
                        </Code>
                      </Box>
                    </VStack>
                  </Box>
                </Box>
              )}
            </Flex>
          </VStack>
        </ScaleFade>
      </Container>
    </Box>
  );
}