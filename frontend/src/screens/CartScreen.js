import {
  Grid,
  Box,
  Flex,
  Text,
  Heading,
  Image,
  Link,
  Select,
  Icon,
  Button,
} from "@chakra-ui/react";

import {
  useParams,
  useSearchParams,
  useNavigate,
  Link as RouterLink,
} from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../actions/cartActions";
import { removeFromCart } from "../actions/cartActions";

import Message from "../components/Message";
import { IoTrashBinSharp } from "react-icons/io5";

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: productId } = useParams();

  const [searchParams] = useSearchParams();
  let qty = searchParams.get("qty");

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;

  useEffect(() => {
    if(!userInfo){
      navigate('/login')
    } else {
      if (productId) {
        dispatch(addToCart(productId, qty));
      }
    };
  }, [dispatch, productId, qty, userInfo, navigate]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkOutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <Grid>
      <Box>
        <Heading mb="8">Shopping Cart</Heading>
        <Flex>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty.{" "}
              <Link as={RouterLink} to="/">
                Go back
              </Link>
            </Message>
          ) : (
            <Grid templateColumns="4fr 2fr" gap="10" w="full">
              <Flex direction="column">
                {cartItems.map((item) => (
                  <Grid
                    key={item.product}
                    size="100%"
                    alignItems="center"
                    justifyContent="space-between"
                    borderBottom="1px"
                    borderColor="gray.200"
                    py="4"
                    px="2"
                    rounded="lg"
                    _hover={{ bgColor: "gray.50" }}
                    templateColumns="1fr 4fr 2fr 2fr 2fr"
                  >
                    {/* product Image */}
                    <Image
                      src={item.image}
                      alt={item.name}
                      borderRadius="lg"
                      height="14"
                      width="14"
                      objectFit="cover"
                    />

                    {/* product name */}
                    <Text fontWeight="semibold" fontSize="lg">
                      <Link as={RouterLink} to={`/product/${item.product}`}>
                        {item.name}
                      </Link>
                    </Text>

                    {/* product price */}
                    <Text fontWeight="semibold" fontSize="lg">
                      ${item.price}
                    </Text>

                    {/* Quantity selectBox*/}
                    <Select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.product, +e.target.value))
                      }
                      width="20"
                    >
                      {[...Array(item.countInStock).keys()].map((i) => (
                        <option key={i + 1}>{i + 1}</option>
                      ))}
                    </Select>

                    {/* delete button */}
                    <Button
                      type="button"
                      colorScheme="red"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <Icon as={IoTrashBinSharp}></Icon>
                    </Button>
                  </Grid>
                ))}
              </Flex>

              {/* Second column */}
              <Flex
                direction="column"
                bgColor="gray.400"
                rounded="md"
                padding="5"
                height="48"
                justifyContent="space-between"
              >
                <Flex direction="column">
                  <Heading as="h2" fontSize="2xl" mb="2">
                    Subtotal (
                    {cartItems.reduce(
                      (acc, currVal) => acc + Number(currVal.qty),
                      0
                    )}{" "}
                    items )
                  </Heading>
                  <Text
                    fontWeight="bold"
                    fontSize="2xl"
                    color="blue.600"
                    mb="4"
                  >
                    $
                    {cartItems.reduce(
                      (acc, currVal) => acc + currVal.qty * currVal.price,
                      0
                    )}
                  </Text>

                  <Button
                    type="button"
                    disabled={cartItems.length === 0}
                    size="lg"
                    colorScheme="teal"
                    bgColor="gray.800"
                    onClick={checkOutHandler}
                  >
                    Proceed to CheckOut
                  </Button>
                </Flex>
              </Flex>
            </Grid>
          )}
        </Flex>
      </Box>
    </Grid>
  );
};

export default CartScreen;
