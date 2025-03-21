import { Link, Heading, Flex, Text, Image, Box } from "@chakra-ui/react";
import Rating from "./Rating";
import { Link as RouterLink } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link
      as={RouterLink}
      to={`product/${product._id}`}
      _hover={{ textDecore: "none" }}
    >
      <Box bgColor="white" _hover={{ shadow: "md" }} borderRadius="lg">
        <Image
          src={product.image}
          alt={product.name}
          h="400px"
          w="100%"
          objectFit="cover"
        />
        <Flex py="5" px="4" direction="column" justifyContent="space-between">
          <Heading as="h4" fontSize="lg" mb="3">
            {product.name}
          </Heading>
          <Flex alignItems="center" justifyContent="space-between">
            <Rating value={product.rating} />
            <Text fontSize="2xl" fontWeight="bold" color="blue.600">
              ${product.price}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Link>
  );
};

export default ProductCard;
