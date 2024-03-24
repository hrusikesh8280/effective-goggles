import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Heading,
  Select,
  Button,
  Text,
  VStack,
  HStack,
  Input,
  useToast,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Grid,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import axios from "axios";

const addresses = [
  {
    address:
      "Victoria Memorial Hall, 1, Queens Way, Maidan, Kolkata, West Bengal 700071",
    latitude: 22.5448,
    longitude: 88.3426,
  },
  {
    address: "Howrah Bridge, Hooghly River, Kolkata, West Bengal 700001",
    latitude: 22.5851,
    longitude: 88.3468,
  },
  {
    address:
      "Indian Museum, 27, Jawaharlal Nehru Rd, Colootola, New Market Area, Dharmatala, Taltala, Kolkata, West Bengal 700016",
    latitude: 22.5614,
    longitude: 88.3511,
  },
  {
    address:
      "Dakshineswar Kali Temple, Dakshineswar, Kolkata, West Bengal 700076",
    latitude: 22.6534,
    longitude: 88.3573,
  },
  {
    address:
      "Science City, J.B.S Haldane Avenue, Topsia, Kolkata, West Bengal 700046",
    latitude: 22.5413,
    longitude: 88.3934,
  },
  {
    address:
      "Kalighat Kali Temple, Anami Sangha, Kalighat, Kolkata, West Bengal 700026",
    latitude: 22.5209,
    longitude: 88.3467,
  },
  {
    address: "Eden Gardens, BBD Bagh, Kolkata, West Bengal 700021",
    latitude: 22.5646,
    longitude: 88.3437,
  },
  {
    address:
      "St. Paul's Cathedral, 1A, Cathedral Rd, Maidan, Kolkata, West Bengal 700071",
    latitude: 22.5514,
    longitude: 88.3525,
  },
  {
    address: "Belur Math, Belur, Howrah, West Bengal 711202",
    latitude: 22.6302,
    longitude: 88.3513,
  },
  {
    address: "Park Street, Kolkata, West Bengal 700016",
    latitude: 22.5512,
    longitude: 88.3528,
  },
];

const BookingApp = () => {
  const [pickupIndex, setPickupIndex] = useState("");
  const [dropoffIndex, setDropoffIndex] = useState("");
  const [userName, setUserName] = useState("");
  const [carOptions, setCarOptions] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [distance, setDistance] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate()

  const fetchCarOptions = async () => {
    setIsLoading(true);
    const pickup_location = addresses[pickupIndex];
    const dropoff_location = addresses[dropoffIndex];
    try {
      const response = await axios.post(
        "http://localhost:9007/api/bookings/car",
        {
          pickup_location,
          dropoff_location,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setCarOptions(response.data.options.cars);
      setDistance(response.data.options.distance);
      setIsLoading(false);
    } catch (error) {
      toast({
        title: "Error fetching car options",
        description: error.response?.data?.message || error.message,
        status: "error",
        isClosable: true,
      });
      setIsLoading(false);
    }
  };

  const handleBooking = async () => {
    setIsLoading(true);
    const pickup_location = addresses[pickupIndex];
    const dropoff_location = addresses[dropoffIndex];
    try {
      await axios.post("http://localhost:9007/api/bookings/book", {
        pickup_location,
        dropoff_location,
        userName
      },{
        headers:{
          "Content-Type": "application/json",
        }
      });
      toast({
        title: "Booking Successful",
        description: `Your booking for ${selectedCar?.name} has been confirmed.`,
        status: "success",
        isClosable: true,
      });
      setIsLoading(false);
      onOpen(); // Consider showing toast instead of modal for success message
    } catch (error) {
      toast({
        title: "Error creating booking",
        description: error.response?.data?.message || error.message,
        status: "error",
        isClosable: true,
      });
      setIsLoading(false);
    }
  };
  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={5}>
        <Heading>Welcome to CarBooking</Heading>
        <Select
          placeholder="Select pickup location"
          onChange={(e) => setPickupIndex(e.target.value)}
        >
          {addresses.map((address, index) => (
            <option key={index} value={index}>
              {address.address}
            </option>
          ))}
        </Select>
        <Select
          placeholder="Select dropoff location"
          onChange={(e) => setDropoffIndex(e.target.value)}
        >
          {addresses.map((address, index) => (
            <option key={index} value={index}>
              {address.address}
            </option>
          ))}
        </Select>
        <Button
          colorScheme="blue"
          onClick={fetchCarOptions}
          isLoading={isLoading}
        >
          Search Car
        </Button>
        {carOptions.length > 0 && (
          <>
            <Alert status="info" borderRadius="lg">
              <AlertIcon />
              Please select a car then proceed with your name.
            </Alert>

            <Heading size={"md"}>Toal distance is {distance}</Heading>

            <Grid templateColumns="repeat(2, 1fr)" gap={6} width="full">
              {carOptions.map((car, index) => (
                <Box
                  key={index}
                  p={5}
                  shadow="md"
                  borderWidth="1px"
                  _hover={{ bg: "teal.100", cursor: "pointer" }}
                  bg={selectedCar === car ? "teal.50" : "white"}
                  onClick={() => setSelectedCar(car)}
                >
                  <Heading fontSize="xl">{car.name}</Heading>
                  <Text>Price: ${car.price}</Text>
                </Box>
              ))}
            </Grid>
          </>
        )}
        {selectedCar && (
          <Input
            placeholder="Your Name"
            onChange={(e) => setUserName(e.target.value)}
          />
        )}
        {userName && (
          <Button
            colorScheme="green"
            onClick={handleBooking}
            isLoading={isLoading}
          >
            Book Now
          </Button>
        )}
      </VStack>
      <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Booking Successful</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Congratulations, {userName}! Your booking for {selectedCar?.name}
            has been confirmed.
          </Text>
          <Text>Total distance is {distance}</Text>
          <Text>Price: ${selectedCar?.price}</Text>
          <Text>Your cab is on its way!</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={() => navigate("/all-bookings")}>
            View All Bookings
          </Button>
          <Button colorScheme="gray" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    </Container>
  );
};
export default BookingApp;
