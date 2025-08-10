import React from 'react';
import {
  Box,
  Grid,
  Text,
  VStack,
  HStack,
  Card,
  CardBody,
  Heading,
  useColorModeValue
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

export default function UIExamples({ primaryColor, palette }) {
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.100");

  const getShadeColor = (shade) => {
    return palette[shade]?.hex || primaryColor;
  };

  return (
    <VStack spacing={8} align="stretch" mt={8}>
      <Text fontSize="2xl" fontWeight="bold" color={textColor} textAlign="center">
        UI Examples
      </Text>
      
      <Grid 
        templateColumns={{ 
          base: "1fr", 
          md: "repeat(2, 1fr)", 
          lg: "repeat(3, 1fr)" 
        }} 
        gap={6}
      >
        {/* Expense Tracker Card */}
        <Card 
          bg={getShadeColor('100')} 
          borderRadius="2xl" 
          overflow="hidden"
          border="none"
          shadow="lg"
          _hover={{ transform: "translateY(-4px)", shadow: "xl" }}
          transition="all 0.3s ease"
        >
          <CardBody p={6}>
            <VStack align="stretch" spacing={4}>
              {/* Image placeholder */}
              <Box
                h={{ base: "120px", md: "140px" }}
                bg={getShadeColor('200')}
                borderRadius="xl"
                display="flex"
                alignItems="center"
                justifyContent="center"
                backgroundImage="url('https://images.unsplash.com/photo-1681826291722-70bd7e9e6fc3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBmaW5hbmNlJTIwYXBwfGVufDB8fHx8MTc1NDgyMzQ3OHww&ixlib=rb-4.1.0&q=85')"
                backgroundSize="cover"
                backgroundPosition="center"
              />
              
              <VStack align="stretch" spacing={3}>
                <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" color="gray.800">
                  Track your expenses
                </Text>
                
                <VStack align="stretch" spacing={2}>
                  <Text fontWeight="semibold" color="gray.700" fontSize="sm">Expenses</Text>
                  <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" color="gray.800">$12,543</Text>
                  
                  {/* Chart representation */}
                  <HStack spacing={1} h={{ base: "50px", md: "60px" }} align="end" mt={3}>
                    {[32, 38, 28, 52, 44, 58].map((height, i) => (
                      <Box
                        key={i}
                        bg={getShadeColor('400')}
                        h={`${Math.round(height * 0.8)}px`}
                        flex={1}
                        borderRadius="2px"
                        mx="1px"
                      />
                    ))}
                  </HStack>
                  
                  <HStack justify="space-between" fontSize="xs" color="gray.600" mt={1}>
                    <Text>Jan</Text>
                    <Text>Feb</Text>
                    <Text>Mar</Text>
                    <Text>Apr</Text>
                    <Text>May</Text>
                    <Text>Jun</Text>
                  </HStack>
                </VStack>
              </VStack>
            </VStack>
          </CardBody>
        </Card>

        {/* Control Card */}
        <Card 
          bg={getShadeColor('500')} 
          borderRadius="2xl" 
          overflow="hidden"
          border="none"
          shadow="lg"
          _hover={{ transform: "translateY(-4px)", shadow: "xl" }}
          transition="all 0.3s ease"
        >
          <CardBody p={6}>
            <VStack align="stretch" spacing={4}>
              {/* Image placeholder */}
              <Box
                h={{ base: "120px", md: "140px" }}
                bg={getShadeColor('400')}
                borderRadius="xl"
                display="flex"
                alignItems="center"
                justifyContent="center"
                backgroundImage="url('https://images.unsplash.com/photo-1593508512255-86ab42a8e620?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwyfHxWUiUyMGhlYWRzZXR8ZW58MHx8fHwxNzU0ODIzNDg0fDA&ixlib=rb-4.1.0&q=85')"
                backgroundSize="cover"
                backgroundPosition="center"
              />
              
              <VStack align="stretch" spacing={3}>
                <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" color="white">
                  Gain control
                </Text>
              </VStack>
            </VStack>
          </CardBody>
        </Card>

        {/* Budget Creation Card */}
        <Card 
          bg={getShadeColor('400')} 
          borderRadius="2xl" 
          overflow="hidden"
          border="none"
          shadow="lg"
          _hover={{ transform: "translateY(-4px)", shadow: "xl" }}
          transition="all 0.3s ease"
          gridColumn={{ base: "1", md: "span 1", lg: "span 1" }}
        >
          <CardBody p={6}>
            <VStack align="stretch" spacing={4}>
              {/* Image placeholder */}
              <Box
                h={{ base: "100px", md: "120px" }}
                bg={getShadeColor('300')}
                borderRadius="xl"
                display="flex"
                alignItems="center"
                justifyContent="center"
                backgroundImage="url('https://images.unsplash.com/photo-1690264459607-a90b23d887f8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb2xsYWJvcmF0aW9ufGVufDB8fHx8MTc1NDgyMzQ4OXww&ixlib=rb-4.1.0&q=85')"
                backgroundSize="cover"
                backgroundPosition="center"
              />
              
              <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" color="white">
                Create budgets
              </Text>
            </VStack>
          </CardBody>
        </Card>
      </Grid>

      {/* Stats Section - Full Width on Mobile, Side by Side on Desktop */}
      <Grid 
        templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} 
        gap={6} 
        mt={6}
      >
        {/* Categories */}
        <Card bg={cardBg} borderRadius="2xl" border="1px solid" borderColor="gray.200" shadow="lg">
          <CardBody p={{ base: 4, md: 6 }}>
            <Text fontWeight="bold" mb={4} color={textColor} fontSize="lg">Categories</Text>
            <VStack spacing={4}>
              {[
                { name: 'Groceries', transactions: 9, icon: '🛒', bgColor: getShadeColor('100') },
                { name: 'Household', transactions: 12, icon: '🏠', bgColor: getShadeColor('200') },
                { name: 'Travel', transactions: 6, icon: '✈️', bgColor: getShadeColor('300') },
                { name: 'Other', transactions: 6, icon: '💳', bgColor: getShadeColor('400') }
              ].map((category, i) => (
                <HStack key={i} justify="space-between" w="full" p={2} borderRadius="lg" _hover={{ bg: "gray.50" }}>
                  <HStack spacing={3}>
                    <Box 
                      w={{ base: 10, md: 12 }} 
                      h={{ base: 10, md: 12 }} 
                      bg={category.bgColor} 
                      borderRadius="full"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      shadow="sm"
                    >
                      <Text fontSize={{ base: "md", md: "lg" }}>{category.icon}</Text>
                    </Box>
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="semibold" fontSize={{ base: "md", md: "lg" }} color={textColor}>
                        {category.name}
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        {category.transactions} transactions
                      </Text>
                    </VStack>
                  </HStack>
                  <ChevronRightIcon color="gray.400" />
                </HStack>
              ))}
            </VStack>
          </CardBody>
        </Card>

        {/* Income Stats */}
        <Card bg={cardBg} borderRadius="2xl" border="1px solid" borderColor="gray.200" shadow="lg">
          <CardBody p={{ base: 4, md: 6 }}>
            <Text fontWeight="bold" mb={4} color={textColor} fontSize="lg">Financial Overview</Text>
            <VStack spacing={6} align="stretch">
              {[
                { label: 'Income', amount: '$15,989', prev: '$18,871 last period', trend: 'up' },
                { label: 'Expenses', amount: '$12,543', prev: '$10,221 last period', trend: 'up' },
                { label: 'Savings', amount: '$5,210', prev: '10,221 last period', trend: 'down' }
              ].map((stat, i) => (
                <HStack key={i} justify="space-between" align="center" p={3} bg="gray.50" borderRadius="xl">
                  <VStack align="start" spacing={1} flex={1}>
                    <Text color="gray.600" fontSize="sm">{stat.label}</Text>
                    <Text color={textColor} fontSize={{ base: "lg", md: "xl" }} fontWeight="bold">{stat.amount}</Text>
                    <Text color="gray.500" fontSize="xs">{stat.prev}</Text>
                  </VStack>
                  <Box w={{ base: "50px", md: "60px" }} h="30px" position="relative">
                    {/* Simple trend line */}
                    <svg width="100%" height="30" viewBox="0 0 60 30">
                      <path
                        d={stat.trend === 'up' ? "M5 25 L20 15 L35 10 L55 5" : "M5 5 L20 15 L35 20 L55 25"}
                        stroke={getShadeColor('400')}
                        strokeWidth="2"
                        fill="none"
                      />
                      <path
                        d={stat.trend === 'up' ? "M5 25 L20 15 L35 10 L55 5 L55 30 L5 30 Z" : "M5 5 L20 15 L35 20 L55 25 L55 30 L5 30 Z"}
                        fill={getShadeColor('100')}
                        opacity="0.5"
                      />
                    </svg>
                  </Box>
                </HStack>
              ))}
            </VStack>
          </CardBody>
        </Card>
      </Grid>
    </VStack>
  );
}