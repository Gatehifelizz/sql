import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { IoAdd, IoPencilSharp, IoTrashBinSharp } from "react-icons/io5";

import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Modal from "../components/Modal";
import { set } from "mongoose";

const ProductListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose} = useDisclosure();
  const [productIdToDelete, setProductIdToDelete] = useState(null);

  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  const { success } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingSuccess,
    error: errorSuccess,
    product: createdProduct,
    success: successCreate,
  } = productCreate;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if(!userInfo.isAdmin) {
      navigate("/login");
    }

    if(successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts());
    }
  }, [dispatch, navigate, userInfo, success, successCreate, createdProduct]);

  const deleteHandler = (id) => {
    setProductIdToDelete(id);
    onOpen();
  };

  const confirmDeleteHandler = () => {
    dispatch(deleteProduct(productIdToDelete));
    setProductIdToDelete(null);
    onClose();
  }

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <Flex mb="5" alignItems="center" justifyContent="space-between">
        <Heading as="h1" fontSize="3xl" mb="5">
          Product
        </Heading>
        <Button onClick={createProductHandler} colorScheme="teal">
          <Icon as={IoAdd} mr="2" fontSize="xl" fontWeight="bold" /> Create
          Product
        </Button>
      </Flex>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <Box bgColor="white" rounded="lg" shadow="lg" py="5" px="5">
          <Table variant="striped" colorScheme="gray" size="sm">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>NAME</Th>
                <Th>PRICE</Th>
                <Th>CATEGORY</Th>
                <Th>BRAND</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.map((product) => (
                <Tr key={product._id}>
                  <Td>{product._id}</Td>
                  <Td>{product.name}</Td>
                  <Td>{product.price}</Td>
                  <Td>{product.category}</Td>
                  <Td>{product.brand}</Td>
                  <Td>
                    <Flex justifyContent={"flex-end"} alignItems="center">
                      <Button
                        mr="4"
                        as={RouterLink}
                        to={`/admin/product/${product._id}/edit`}
                        colorScheme="teal"
                      >
                        <Icon as={IoPencilSharp} color="white" size="sm" />
                      </Button>
                      <Button
                        mr="4"
                        colorScheme="red"
                        onClick={() => deleteHandler(product._id)}
                      >
                        <Icon as={IoTrashBinSharp} color="white" size="sm" />
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
      <Modal
        isOpen ={isOpen}
        onClose={onClose}
        title="consirm deletion"
        onConfirm={confirmDeleteHandler} >
          Are you sure you want to delete this product?
      </Modal>
    </>
  );
};

export default ProductListScreen;
