import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductReview,
  listProductDetails,
} from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

import {
  Flex,
  Grid,
  Button,
  Heading,
  Image,
  Text,
  Select,
  Box,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";

import Rating from "../components/Rating";

const ProductScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      alert("Review submitted");
      setRating(0);
      setComment("");
    }
    dispatch(listProductDetails(id));
  }, [id, dispatch, successProductReview]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(id, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      <Flex mt="2" mb="4">
        <Button colorScheme="gray" as={RouterLink} to="/">
          Go back
        </Button>
      </Flex>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <>
          <Grid templateColumns="5fr 4fr 3fr" gap="10">
            {/* column 1 */}
            <Image src={product.image} alt={product.name} borderRadius="md" />

            {/* column2 */}
            <Flex direction="column">
              <Heading as="h6" fontSize="base" color="gray.500">
                {product.brand}
              </Heading>

              <Heading as="h2" fontSize="4xl" mb="2">
                {product.name}
              </Heading>

              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />

              <Heading
                as="h5"
                mt="5"
                mb="5"
                fontWeight="bold"
                fontSize="4xl"
                color="teal.600"
              >
                ${product.price}
              </Heading>

              <Text>{product.description}</Text>
            </Flex>

            {/* column 3 */}
            <Flex direction="column">
              <Flex justifyContent="space-between" py="2">
                <Text>Price: </Text>
                <Text fontWeight="bold">${product.price}</Text>
              </Flex>

              <Flex justifyContent="space-between" py="2">
                <Text>Status: </Text>
                <Text fontWeight="bold">
                  {product.countInStock > 0 ? "In stock" : "not Available"}
                </Text>
              </Flex>

              <Flex justifyContent="space-between" py="2">
                <Text>Qty: </Text>
                <Select
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  width="30%"
                >
                  {[...Array(product.countInStock).keys()].map((i) => (
                    <option key={i + 1}>{i + 1}</option>
                  ))}
                </Select>
              </Flex>

              <Button
                onClick={addToCartHandler}
                bgColor="gray.800"
                colorScheme="teal"
                my="2"
                textTransform="uppercase"
                letterSpacing="wide"
                isDisabled={product.countInStock === 0}
              >
                Add to Cart
              </Button>
            </Flex>
          </Grid>

          {/* review form */}
          <Box
            p="10"
            bgColor="white"
            rounded="md"
            mt="10"
            borderColor="gray.100"
          >
            <Heading as="h3" size="lg" mb="6">
              Write a review
            </Heading>

            {errorProductReview && (
              <Message type="error">{errorProductReview}</Message>
            )}

            {product.reviews.length === 0 && <Message>No reviews</Message>}

            {product.reviews.length !== 0 && (
              <Box p="4" bgColor="white" rounded="md" mb="1" mt="5">
                {product.reviews.map((review) => (
                  <Flex direction="column" key={review._id} mb="5">
                    <Flex justifyContent="space-between">
                      <Text fontSize="lg">
                        <strong>{review.name}</strong>
                      </Text>
                      <Rating value={review.rating} />
                    </Flex>
                    <Text mt="2"> {review.comment}</Text>
                  </Flex>
                ))}
              </Box>
            )}

            {userInfo ? (
              <form onSubmit={submitHandler}>
                <FormControl id="rating" mb="3">
                  <Select
                    placeholder="select option"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option>Select...</option>
                    <option value="1 ">1 - poor</option>
                    <option value="2">2- okay</option>
                    <option value="3">3 - good</option>
                    <option value="4">4 - better</option>
                    <option value="5">5 - excellent</option>
                  </Select>
                </FormControl>

                <FormControl id="comment" mb="3">
                  <FormLabel>comment</FormLabel>
                  <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></Textarea>
                </FormControl>

                <Button colorScheme="teal" type="submit">
                  post review
                </Button>
              </form>
            ) : (
              <Message>Please log in to write a review</Message>
            )}
          </Box>
        </>
      )}
    </>
  );
};

export default ProductScreen;
