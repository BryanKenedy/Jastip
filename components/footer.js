import { Box, Flex, IconButton, Input, Stack, Text } from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { ChakraProvider } from "@chakra-ui/react";

export default function Footer() {
  return (
    <ChakraProvider>
      <Box bg="#1A1715" w="full" mt={24} py={6}>
        <Flex justifyContent="center" alignItems="center" h="60" maxH="fit">
          <Box w="50%" p={4}>
            <Text color="white" fontSize="lg" fontWeight="bold" mb={2}>
              Location
            </Text>

            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3227.422717377515!2d104.00273731547003!3d1.1187438991311847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cb334cf43a5e55%3A0xdfbeefb3529d8b1!2sYour%20Location!5e0!3m2!1sen!2sus!4v1629827512345!5m2!1sen!2sus`}
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </Box>
          <Stack spacing={4} p={4}>
            <Text color="white" fontSize="lg" fontWeight="bold" mb={2}>
              Contact Us
            </Text>

            <Input placeholder="Your email" size="md" borderWidth={1} borderColor="gray.300" />
            <IconButton aria-label="Send email" icon={<EmailIcon />} bg="white" color="#1A1715" size="md" />
          </Stack>
          <Stack spacing={4} p={4}>
            <Text color="white" fontSize="lg" fontWeight="bold" mb={2}>
              Social Media
            </Text>

            <IconButton aria-label="Facebook" icon={<FaFacebook />} bg="#1A1715" color="white" border="2px" borderColor="white" size="md" />
            <IconButton aria-label="Twitter" icon={<FaTwitter />} bg="#1A1715" color="white" border="2px" borderColor="white" size="md" />
            <IconButton aria-label="Instagram" icon={<FaInstagram />} bg="#1A1715" color="white" border="2px" borderColor="white" size="md" />
          </Stack>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}
