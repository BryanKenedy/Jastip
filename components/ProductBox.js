import { Box, Flex, Image, Text, Button } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import { CartContext } from "./CartContext";
import { useContext } from "react";
import { CartContextProvider } from "./CartContext";

export default function ProductBox({ _id, title, description, price, images }) {
  const url = "/product/" + _id;
  const { addProduct } = useContext(CartContext);
  return (
    <CartContextProvider>
      <ChakraProvider>
        <Box as="a" href={url} bg="white" borderRadius="lg" p={2} boxShadow="md" cursor="pointer" transition="background-color 0.3s" _hover={{ bg: "#f7fafd" }}>
          <Flex direction="column" align="center">
            <Image src={images[0]} alt={title} maxH="150" objectFit="cover" />
            <Text fontSize="lg" fontWeight="bold" mt={2}>
              {title}
            </Text>
            <Text fontSize="md">${price}</Text>
          </Flex>
          <Flex justify="space-between" mt={2} p={2}>
            <Button onClick={() => addProduct(_id)} bg="#171923" color="white" size="sm" w="full">
              Add to Cart
            </Button>
          </Flex>
        </Box>
      </ChakraProvider>
    </CartContextProvider>
  );
}
