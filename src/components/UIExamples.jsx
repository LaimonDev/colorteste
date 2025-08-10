import React from 'react';
import {
  Box,
  Grid,
  Text,
  VStack,
  HStack,
  Card,
  CardBody,
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
                  { name: 'Groceries', transactions: 9, icon: '🛒', bgColor: getShadeColor('100') },
                  { name: 'Household', transactions: 12, icon: '🏠', bgColor: getShadeColor('200') },
                  { name: 'Travel', transactions: 6, icon: '✈️', bgColor: getShadeColor('300') },
                  { name: 'Other', transactions: 6, icon: '💳', bgColor: getShadeColor('400') }
                ].map((category, i) => (
                  <HStack key={i} justify="space-between" w="full">
                    <HStack>
                      <Box 
                        w={10} 
                        h={10} 
                        bg={category.bgColor} 
                        borderRadius="full"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Text fontSize="md">{category.icon}</Text>
                      </Box>
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="semibold" fontSize="md" color="black">
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
          <Card bg="white" borderRadius="xl" border="1px solid" borderColor="gray.200">
            <CardBody p={4}>
              <VStack spacing={4} align="stretch">
                {[
                  { label: 'Income', amount: '$15,989', prev: '$18,871 last period', trend: 'up' },
                  { label: 'Expenses', amount: '$12,543', prev: '$10,221 last period', trend: 'up' },
                  { label: 'Savings', amount: '$5,210', prev: '10,221 last period', trend: 'down' }
                ].map((stat, i) => (
                  <HStack key={i} justify="space-between" align="center">
                    <VStack align="start" spacing={1}>
                      <Text color="gray.600" fontSize="sm">{stat.label}</Text>
                      <Text color="black" fontSize="xl" fontWeight="bold">{stat.amount}</Text>
                      <Text color="gray.500" fontSize="xs">{stat.prev}</Text>
                    </VStack>
                    <Box w="60px" h="30px" position="relative">
                      {/* Simple trend line */}
                      <svg width="60" height="30" viewBox="0 0 60 30">
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
        </VStack>
      </Grid>
    </VStack>
  );
}