import React from 'react';
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
  Icon,
  Badge,
  Flex,
  Avatar,
  Divider,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { 
  FiPalette, 
  FiUpload, 
  FiCode, 
  FiExternalLink, 
  FiUser, 
  FiGithub, 
  FiStar, 
  FiFork 
} from 'react-icons/fi';

const Dashboard = () => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const accentColor = useColorModeValue('blue.500', 'blue.300');

  const dashboardFeatures = [
    {
      id: 'color-picker',
      title: 'Color Picker',
      description: 'Pilih dan eksplorasi berbagai warna dengan mudah',
      icon: FiPalette,
      route: '/color-picker',
      color: 'purple',
      isNew: true,
    },
    {
      id: 'upload-prompt',
      title: 'Upload Prompt',
      description: 'Upload dan kelola prompt untuk berbagai keperluan',
      icon: FiUpload,
      route: '/UploadPrompt',
      color: 'blue',
      isNew: false,
    },
    {
      id: 'prompt-json',
      title: 'Prompt JSON',
      description: 'Kelola dan edit prompt dalam format JSON',
      icon: FiCode,
      route: '/PromptJson',
      color: 'green',
      isNew: false,
    },
    {
      id: 'blog',
      title: 'Visit Blog',
      description: 'Kunjungi blog untuk konten dan tutorial terbaru',
      icon: FiExternalLink,
      route: 'https://laimonprompt.blogspot.com/',
      color: 'orange',
      isExternal: true,
    },
  ];

  const handleNavigation = (feature) => {
    if (feature.isExternal) {
      window.open(feature.route, '_blank');
    } else {
      navigate(feature.route);
    }
  };

  return (
    <Box bg={bgColor} minHeight="100vh" py={8}>
      <Container maxW="7xl">
        <VStack spacing={8} align="stretch">
          {/* Header Section */}
          <Box textAlign="center">
            <VStack spacing={4}>
              <Avatar size="xl" name="LaimonDev" bg={accentColor} color="white" />
              <VStack spacing={2}>
                <Heading size="2xl" color={accentColor}>
                  LaimonDev Portfolio
                </Heading>
                <Text fontSize="lg" color="gray.600" maxW="2xl">
                  Selamat datang di dashboard portfolio saya. Eksplorasi berbagai fitur dan tools yang telah saya kembangkan.
                </Text>
              </VStack>
            </VStack>
          </Box>

          {/* Stats Cards */}
          <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap={6}>
            <GridItem>
              <Card bg={cardBg} shadow="md">
                <CardBody>
                  <HStack justify="space-between">
                    <VStack align="start" spacing={1}>
                      <Text fontSize="2xl" fontWeight="bold" color={accentColor}>
                        4
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        Features
                      </Text>
                    </VStack>
                    <Icon as={FiStar} boxSize={6} color="yellow.400" />
                  </HStack>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem>
              <Card bg={cardBg} shadow="md">
                <CardBody>
                  <HStack justify="space-between">
                    <VStack align="start" spacing={1}>
                      <Text fontSize="2xl" fontWeight="bold" color={accentColor}>
                        React
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        Framework
                      </Text>
                    </VStack>
                    <Icon as={FiCode} boxSize={6} color="blue.400" />
                  </HStack>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem>
              <Card bg={cardBg} shadow="md">
                <CardBody>
                  <HStack justify="space-between">
                    <VStack align="start" spacing={1}>
                      <Text fontSize="2xl" fontWeight="bold" color={accentColor}>
                        Chakra UI
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        UI Library
                      </Text>
                    </VStack>
                    <Icon as={FiPalette} boxSize={6} color="teal.400" />
                  </HStack>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem>
              <Card bg={cardBg} shadow="md">
                <CardBody>
                  <HStack justify="space-between">
                    <VStack align="start" spacing={1}>
                      <Text fontSize="2xl" fontWeight="bold" color={accentColor}>
                        Open
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        Source
                      </Text>
                    </VStack>
                    <Icon as={FiGithub} boxSize={6} color="gray.600" />
                  </HStack>
                </CardBody>
              </Card>
            </GridItem>
          </Grid>

          {/* Features Grid */}
          <Box>
            <VStack spacing={6}>
              <HStack w="full" justify="space-between" align="center">
                <Heading size="lg" color="gray.700">
                  Available Features
                </Heading>
                <Badge colorScheme="blue" px={3} py={1}>
                  {dashboardFeatures.length} Tools
                </Badge>
              </HStack>
              
              <Grid 
                templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(2, 1fr)' }} 
                gap={6} 
                w="full"
              >
                {dashboardFeatures.map((feature) => (
                  <GridItem key={feature.id}>
                    <Card 
                      bg={cardBg} 
                      shadow="lg" 
                      cursor="pointer"
                      transition="all 0.3s ease"
                      _hover={{
                        transform: 'translateY(-4px)',
                        shadow: 'xl',
                        borderColor: `${feature.color}.400`,
                      }}
                      onClick={() => handleNavigation(feature)}
                      border="2px solid transparent"
                      h="full"
                    >
                      <CardHeader pb={3}>
                        <Flex justify="space-between" align="start">
                          <HStack spacing={3}>
                            <Box
                              p={3}
                              borderRadius="lg"
                              bg={`${feature.color}.100`}
                              color={`${feature.color}.600`}
                            >
                              <Icon as={feature.icon} boxSize={6} />
                            </Box>
                            <VStack align="start" spacing={1}>
                              <HStack>
                                <Heading size="md" color="gray.700">
                                  {feature.title}
                                </Heading>
                                {feature.isNew && (
                                  <Badge colorScheme="red" size="sm">
                                    NEW
                                  </Badge>
                                )}
                                {feature.isExternal && (
                                  <Icon as={FiExternalLink} boxSize={4} color="gray.400" />
                                )}
                              </HStack>
                            </VStack>
                          </HStack>
                        </Flex>
                      </CardHeader>
                      <CardBody pt={0}>
                        <Text color="gray.600" fontSize="sm" lineHeight="tall">
                          {feature.description}
                        </Text>
                      </CardBody>
                    </Card>
                  </GridItem>
                ))}
              </Grid>
            </VStack>
          </Box>

          {/* Footer */}
          <Box>
            <Divider mb={6} />
            <Flex 
              direction={{ base: 'column', md: 'row' }} 
              justify="space-between" 
              align="center"
              gap={4}
            >
              <Text color="gray.600" fontSize="sm">
                © 2024 LaimonDev. Built with React & Chakra UI.
              </Text>
              <HStack spacing={4}>
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<Icon as={FiGithub} />}
                  onClick={() => window.open('https://github.com/LaimonDev/colorteste', '_blank')}
                >
                  View Source
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<Icon as={FiUser} />}
                  onClick={() => window.open('https://laimonprompt.blogspot.com/', '_blank')}
                >
                  About Me
                </Button>
              </HStack>
            </Flex>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default Dashboard;