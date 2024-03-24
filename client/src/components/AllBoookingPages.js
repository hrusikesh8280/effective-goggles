import { useToast, Container, VStack, Box, Text, Heading, Icon,HStack } from "@chakra-ui/react";
import { FaMapMarkerAlt, FaUser } from 'react-icons/fa'; // Icons for location and user
import React, { useEffect, useState } from "react";
import axios from "axios";

const AllBookingsPage = () => {
  const [allBookings, setAllBookings] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const fetchAllBookings = async () => {
      try {
        const response = await axios.get('http://localhost:9007/api/bookings');
        setAllBookings(response.data);
      } catch (error) {
        toast({
          title: "Error fetching bookings",
          description: error.response?.data?.message || error.message,
          status: "error",
          isClosable: true,
        });
      }
    };

    fetchAllBookings();
  }, []);

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8}>
        {allBookings.map((booking, index) => (
          <Box key={index} p={5} shadow="md" borderWidth="1px" borderRadius="lg">
            <VStack spacing={3} align="start">
              <HStack>
                <Icon as={FaMapMarkerAlt} w={5} h={5} color="blue.500" />
                <Text fontSize="lg" fontWeight="bold">Pickup:</Text>
                <Text fontSize="md">{booking.pickup_location?.address || 'N/A'}</Text>
              </HStack>
              <HStack>
                <Icon as={FaMapMarkerAlt} w={5} h={5} color="green.500" />
                <Text fontSize="lg" fontWeight="bold">Dropoff:</Text>
                <Text fontSize="md">{booking.dropoff_location?.address || 'N/A'}</Text>
              </HStack>
              <HStack>
                <Icon as={FaUser} w={5} h={5} color="orange.500" />
                <Text fontSize="lg" fontWeight="bold">User:</Text>
                <Text fontSize="md">{booking.user?.name || 'N/A'}</Text>
              </HStack>
            </VStack>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};
export default AllBookingsPage;
