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
                h="120px"
                bg={getShadeColor('200')}
                borderRadius="xl"
                display="flex"
                alignItems="center"
                justifyContent="center"
                backgroundImage="url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=120&fit=crop&crop=center')"
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
                  <HStack spacing={1} h="60px" align="end">
                    {[30, 45, 25, 60, 40, 70].map((height, i) => (
                      <Box
                        key={i}
                        bg={getShadeColor(400 + i * 50)}
                        h={`${height}px`}
                        flex={1}
                        borderRadius="sm"
                      />
                    ))}
                  </HStack>
                  
                  <HStack spacing={4} fontSize="xs" color="gray.600">
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
                h="120px"
                bg={getShadeColor('400')}
                borderRadius="xl"
                display="flex"
                alignItems="center"
                justifyContent="center"
                backgroundImage="url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=120&fit=crop&crop=center')"
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
                h="100px"
                bg={getShadeColor('300')}
                borderRadius="xl"
                display="flex"
                alignItems="center"
                justifyContent="center"
                backgroundImage="url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=100&fit=crop&crop=center')"
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