import { Box, ChakraProvider, Grid, GridItem, Badge } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useState } from "react";
import Center from "@/components/Center";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import Footer from "@/components/footer";

export default function ProductPage({ product }) {
  const [mainImage, setMainImage] = useState(product.images?.[0]);
  const [selectedImage, setSelectedImage] = useState(product.images?.[0]);

  const handlePreviewClick = (image) => {
    setSelectedImage(image);
    setMainImage(image);
  };

  return (
    <ChakraProvider>
      <Header />
      <Center>
        <div className="mt-20">
          <Grid templateColumns="1fr 2fr" gap={1}>
            <GridItem className="p-0 m-0">
              <Box
                _hover={{ bg: "gray" }}
                bg="#E0E2E9"
                borderRadius="lg"
                p={0}
                cursor="pointer"
                transition="background-color 0.3s"
                onClick={() => handlePreviewClick(mainImage)}
                maxW="60%"
                aspectRatio={1}
              >
                <img src={mainImage} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </Box>
            </GridItem>
            <GridItem maxW="80%">
              <div className="my-4">
                <h1 className="text-2xl font-medium inline-flex items-center">
                  {product.title}{" "}
                  <Badge colorScheme="white" ml={2}>
                    {product.rating}
                    <StarIcon ml={1} color="yellow.300" />
                    <StarIcon ml={1} color="yellow.300" />
                    <StarIcon ml={1} color="yellow.300" />
                    <StarIcon ml={1} color="yellow.300" />
                    <StarIcon ml={1} color="yellow.300" />
                  </Badge>
                  <p className=" font-normal text-sm">(27)</p>
                </h1>
                <p className="text-lg font-medium my-1">${product.price}</p>
                <h1 className="text-sm text-gray-400">Description:</h1>
                <p className="mt-2 text-sm">{product.description}</p>
              </div>
              <button>Add to cart</button>
            </GridItem>
          </Grid>
        </div>

        <div className="flex gap-4 mt-2">
          {product.images?.map((image, index) => (
            <Box
              key={index}
              borderRadius="lg"
              p={0}
              border="2px"
              borderColor="blackAlpha.100"
              cursor="pointer"
              transition="background-color 0.3s"
              _hover={{ bg: "gray" }}
              maxW="5%"
              aspectRatio={1}
              onClick={() => handlePreviewClick(image)}
            >
              <img src={image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </Box>
          ))}
        </div>
      </Center>
      <Footer />
    </ChakraProvider>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
