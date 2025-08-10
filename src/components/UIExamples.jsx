import React from 'react';
import {
  Box,
  Grid,
  Text,
  VStack,
  HStack,
  Card,
  CardBody,
  Image,
  Badge,
  Button,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Flex,
  Icon,
  Heading
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

export default function UIExamples({ primaryColor, palette }) {
  const getShadeColor = (shade) => {
    return palette[shade]?.hex || primaryColor;
  };

  return (
    <VStack spacing={6} align="stretch" mt={8}>
      <Heading size="md" color="black">UI Examples</Heading>
      
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        {/* Expense Tracker Card */}
        <Card 
          bg={getShadeColor('100')} 
          borderRadius="2xl" 
          overflow="hidden"
          border="none"
        >
          <CardBody p={6}>
            <VStack align="stretch" spacing={4}>
              {/* Image placeholder */}
              <Box
                h="140px"
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
                <Text fontSize="2xl" fontWeight="bold" color="gray.800">
                  Track your expenses
                </Text>
                
                <VStack align="stretch" spacing={2}>
                  <Text fontWeight="semibold" color="gray.700">Expenses</Text>
                  <Text fontSize="2xl" fontWeight="bold" color="gray.800">$12,543</Text>
                  
                  {/* Chart representation */}
                  <HStack spacing={1} h="60px" align="end" mt={3}>
                    {[32, 38, 28, 52, 44, 58].map((height, i) => (
                      <Box
                        key={i}
                        bg={getShadeColor('400')}
                        h={`${height}px`}
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
        >
          <CardBody p={6}>
            <VStack align="stretch" spacing={4}>
              {/* Image placeholder */}
              <Box
                h="140px"
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
                <Text fontSize="2xl" fontWeight="bold" color="white">
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
          gridColumn="span 1"
        >
          <CardBody p={6}>
            <VStack align="stretch" spacing={4}>
              {/* Image placeholder */}
              <Box
                h="120px"
                bg={getShadeColor('300')}
                borderRadius="xl"
                display="flex"
                alignItems="center"
                justifyContent="center"
                backgroundImage="url('https://images.unsplash.com/photo-1690264459607-a90b23d887f8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb2xsYWJvcmF0aW9ufGVufDB8fHx8MTc1NDgyMzQ4OXww&ixlib=rb-4.1.0&q=85')"
                backgroundSize="cover"
                backgroundPosition="center"
              />
              
              <Text fontSize="2xl" fontWeight="bold" color="white">
                Create budgets
              </Text>
            </VStack>
          </CardBody>
        </Card>

        {/* Stats Card */}
        <VStack spacing={4} align="stretch">
          {/* Categories */}
          <Card bg="white" borderRadius="xl" border="1px solid" borderColor="gray.200">
            <CardBody p={4}>
              <Text fontWeight="semibold" mb={4} color="black">Categories</Text>
              <VStack spacing={3}>
                {[
                  { name: 'Groceries', transactions: 9, icon: '🛒' },
                  { name: 'Household', transactions: 12, icon: '🏠' },
                  { name: 'Travel', transactions: 6, icon: '✈️' },
                  { name: 'Other', transactions: 6, icon: '💳' }
                ].map((category, i) => (
                  <HStack key={i} justify="space-between" w="full">
                    <HStack>
                      <Box 
                        w={8} 
                        h={8} 
                        bg={getShadeColor(200)} 
                        borderRadius="full"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Text fontSize="sm">{category.icon}</Text>
                      </Box>
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="medium" fontSize="sm" color="black">
                          {category.name}
                        </Text>
                        <Text fontSize="xs" color="gray.600">
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
          <Card bg="white" borderRadius="xl" border="1px solid" borderColor="gray.200">
            <CardBody p={4}>
              <VStack spacing={3} align="stretch">
                <Stat>
                  <StatLabel color="gray.600" fontSize="sm">Income</StatLabel>
                  <StatNumber color="black" fontSize="xl">$15,989</StatNumber>
                  <StatHelpText color="gray.500" fontSize="xs">
                    $18,871 last period
                  </StatHelpText>
                </Stat>
                
                <Stat>
                  <StatLabel color="gray.600" fontSize="sm">Expenses</StatLabel>
                  <StatNumber color="black" fontSize="xl">$12,543</StatNumber>
                  <StatHelpText color="gray.500" fontSize="xs">
                    $10,221 last period
                  </StatHelpText>
                </Stat>
                
                <Stat>
                  <StatLabel color="gray.600" fontSize="sm">Savings</StatLabel>
                  <StatNumber color="black" fontSize="xl">$5,210</StatNumber>
                  <StatHelpText color="gray.500" fontSize="xs">
                    10,221 last period
                  </StatHelpText>
                </Stat>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </Grid>
    </VStack>
  );
}