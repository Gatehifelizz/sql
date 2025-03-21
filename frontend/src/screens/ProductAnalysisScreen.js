import {
  Image,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  Flex,
  Box,
  Grid,
  Button,
  Icon,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { SiCashapp } from "react-icons/si";

import {
  LuPackageCheck,
  LuLoader,
  LuUsersRound,
  LuPackageMinus,
} from "react-icons/lu";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getOrderAnalysis } from "../actions/orderActions";
import { analyseProduct } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

import { listUsers } from "../actions/userActions";

const ProductAnalysisScreen = () => {
  const dispatch = useDispatch();

  const orderAnalysis = useSelector((state) => state.orderAnalysis);
  const { loading, error, analysis } = orderAnalysis;

  const userList = useSelector((state) => state.userList);
  const { users } = userList;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { success: successDeliver } = orderDeliver;

  const productAnalysis = useSelector((state) => state.productAnalysis);
  const {
    loading: loadingProducts,
    error: errorProducts,
    analysis: productData,
  } = productAnalysis;

  useEffect(() => {
    dispatch(getOrderAnalysis());
    dispatch(analyseProduct());
    dispatch(listUsers());
  }, [dispatch, successDeliver]);

  return (
    <>
      <Flex mt="2" mb="4">
        <Heading
          as="h6"
          mb="5"
          color="gray.600"
          alignSelf="center"
          fontSize="lg"
          fontWeight="bold"
        >
          Sales breakdown
        </Heading>
      </Flex>

      {loading || loadingProducts ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <>
          <Grid
            templateRows="repeat(2, auto)"
            gap={"2"}
            bgColor="gray.100"
            px="5"
            py="5"
            rounded="lg"
          >
            {/* Row 1 */}

            <Grid
              templateColumns="repeat(4,1fr)"
              gap="5"
              mb="2"
              mt="2"
              rounded="lg"
              shadow="lg"
              height="100px"
            >
              <Flex
                direction="column"
                aria-colspan="1"
                bgColor="gray.700"
                rounded="lg"
                shadow="lg"
                py="5"
                px="5"
                
              >
                <Heading
                  as="h6"
                  fontSize="md"
                  fontWeight="semibold"
                  color="white"
                  display="flex"
                >
                  <Icon
                    as={SiCashapp}
                    mr="3"
                    color="green.400"
                    fontSize="xl"
                    fontWeight="bold"
                  />
                  Revenue
                </Heading>
                <Box fontWeight="bold" fontSize="lg" mt="5" color="white">
                  ${analysis.totalSales}
                </Box>
              </Flex>
              <Flex
                direction="column"
                aria-colspan="1"
                bgColor="gray.700"
                rounded="lg"
                shadow="lg"
                py="5"
                px="5"
              >
                <Heading
                  as="h6"
                  fontSize="md"
                  fontWeight="semibold"
                  color="white"
                  display="flex"
                >
                  <Icon
                    as={LuPackageCheck}
                    mr="3"
                    color="green.400"
                    fontSize="xl"
                    fontWeight="bold"
                  />
                  orders
                </Heading>
                <Box fontWeight="bold" fontSize="lg" mt="5" color="white">
                  {analysis.totalOrders}
                </Box>
              </Flex>

              <Flex
                direction="column"
                aria-colspan="1"
                bgColor="gray.700"
                rounded="lg"
                shadow="lg"
                py="5"
                px="5"
              >
                <Heading
                  as="h6"
                  fontSize="md"
                  fontWeight="semibold"
                  color="white"
                  display="flex"
                >
                  <Icon
                    as={LuLoader}
                    mr="3"
                    color="green.400"
                    fontSize="xl"
                    fontWeight="bold"
                  />
                  Pending deliveries
                </Heading>
                <Box fontWeight="bold" fontSize="lg" mt="5" color="white">
                  {analysis.pendingDeliveries}
                </Box>
              </Flex>

              <Flex
                direction="column"
                aria-colspan="1"
                bgColor="gray.700"
                rounded="lg"
                shadow="lg"
                py="5"
                px="5"
              >
                <Heading
                  as="h6"
                  fontSize="md"
                  fontWeight="semibold"
                  color="white"
                  display="flex"
                >
                  <Icon
                    as={LuPackageMinus}
                    mr="3"
                    color="green.400"
                    fontSize="xl"
                    fontWeight="bold"
                  />
                  cancelled Orders
                </Heading>
                <Box fontWeight="bold" fontSize="lg" mt="5" color="white">
                  {analysis.totalCancellations}
                </Box>
              </Flex>
            </Grid>

            <Grid
              templateColumns={"repeat(2,2fr)"}
              gap="5"
              mt="5"
              rounded={"lg"}
              shadow={"lg"}
            >
              <Flex direction={"row"} aria-colspan="1" bgColor={"white"}  wrap="wrap" mt="2" rounded="md" shadow="lg" >
                
                {productData &&
                  productData.mostBought &&
                  productData.mostBought.map((product) => (
                    
                    <Box
                    key={product._id}
                      _hover={{ shadow: "md" }}
                      borderRadius="md"
                      width="150px"
                      bgColor="gray.800"
                      m="2"
                      textAlign="center"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        h="200px"
                        w="100%"
                        objectFit="cover"
                        rounded="md"
                      />
                      <Flex
                        py="2"
                        px="2"
                        direction="column"
                        justifyContent="space-between"
                      >
                        <Heading as="h6" fontSize="sm" mb="1" color="white">
                          {product.name}
                        </Heading>
                        <Flex
                          alignItems="center"
                          justifyContent="space-between"
                        >
                         <Text fontSize="sm" fontWeight="bold" color="blue.600">
                          {product.quantity}
                         </Text>
                        </Flex>
                      </Flex>
                    </Box>
                  ))}
              </Flex>
              <Flex direction={"column"} aria-colspan="1" bgColor={"gray.200"}>
                <div>hello</div>
              </Flex>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default ProductAnalysisScreen;
