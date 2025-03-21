import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Spacer,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";

import { listProductDetails, updateProduct } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";


const ProductEditScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id : productId } = useParams();

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [countInStock, setCountInStock] = useState(0);
    const [uploading, setUploading] = useState(false);

    const productDetails = useSelector((state) => state.productDetails);
    const {loading, error, product} = productDetails;

    const productUpdate = useSelector((state) => state.productUpdate);
    const {
      loading: loadingUpdate,
      error: errorUpdate,
      success: successUpdate,
    } = productUpdate;

    useEffect (() => {
      if(successUpdate) {
        dispatch({ type: PRODUCT_UPDATE_RESET});
        navigate(`/admin/productlist`);
      } else {
        if(!product.name || product._id !== productId){
          dispatch(listProductDetails(productId));
        } else {
          setName(product.name);
          setPrice(product.price);
          setImage(product.image);
          setBrand(product.brand);
          setCategory(product.category);
          setCountInStock(product.countInStock);
          setDescription(product.description);
        }
      }
    }, [  dispatch, navigate, productId, product, successUpdate]);

    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(
        updateProduct({
          _id: productId,
          name,
          price,
          image,
          brand,
          category,
          description,
          countInStock,
        })
      );
    };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try{
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }

            const { data} = await axios.post(`/api/uploads`, formData, config)
            setImage(data);
            setUploading(false);
        } catch(err) {
            console.error(err)
            setUploading(false)
        }
    }

  return (
    <>
       <Link as={RouterLink} to ='/admin/productlist' >
            Go back
        </Link>

        <Flex w='full' alignItems='center' justifyContent='center' py='5'>
            <FormContainer>
                <Heading as='h1' mb='8' fontSize='3xl'>
                    Edit Product
                </Heading>

                {loadingUpdate && <Loader/ >}
                {errorUpdate && <Message status='error'>{errorUpdate}</Message>}

                {loading ? (
                    <Loader/>
                ) : error ? (
                    <Message type='error'>{error}</Message>
                ) : (
                    <form onSubmit={submitHandler}>
                        {/* Name */}
                        <FormControl id='name' isRequired>
                            <FormLabel>Name</FormLabel>
                            <Input
                                type='text'
                                placeholder = 'Enter name'
                                value= {name}
                                onChange = {(e) => setName(e.target.value)} 
                                />                           
                        </FormControl>
                        <Spacer h='3'/>

                        {/* Price */}
                        <FormControl id='price' isRequired>
                            <FormLabel>Price</FormLabel>
                            <Input 
                                type=' number'
                                placeholder= 'Enter price'
                                value= {price}
                                onChange = {(e) => setPrice(e.target.value)}
                            /> 
                        </FormControl>
                        <Spacer h='3'/>

                        {/* Image */}
                        <FormControl id='image' isRequired>
                            <FormLabel>Image</FormLabel>
                            <Input 
                                type='text'
                                placeholder= 'Enter image'
                                value= {image}
                                onChange = {(e) => setImage(e.target.value)}
            
                            /> 
                             <Input type='file' id="image-file" onChange={uploadFileHandler}/> 
                        </FormControl>
                        <Spacer h='3'/>

                        {/* Description */}
                        <FormControl id='description' isRequired>
                            <FormLabel>Description</FormLabel>
                            <Input 
                                type='text'
                                placeholder= 'Enter description'
                                value= {description}
                                onChange = {(e) => setDescription(e.target.value)}
                            />
                        </FormControl>
                        <Spacer h='3'/>

                        {/* Brand */}
                        <FormControl id='brand' isRequired>
                            <FormLabel>Brand</FormLabel>
                            <Input 
                                type='text'
                                placeholder= 'Enter brand'
                                value= {brand}
                                onChange = {(e) => setBrand(e.target.value)}
                            />
                        </FormControl>
                        <Spacer h='3'/>

                        {/* Category */}
                        <FormControl id='category' isRequired>
                            <FormLabel>Category</FormLabel>
                            <Input 
                                type='text'
                                placeholder= 'Enter category'
                                value= {category}
                                onChange = {(e) => setCategory(e.target.value)}
                            />
                        </FormControl>
                        <Spacer h='3'/>

                        {/* Count In Stock */}
                        <FormControl id='countInStock' isRequired>
                            <FormLabel>Count In Stock</FormLabel>
                            <Input 
                                type='number'
                                placeholder= 'Enter count in stock'
                                value= {countInStock}
                                onChange = {(e) => setCountInStock(e.target.value)}
                            />
                        </FormControl>
                        <Spacer h='3'/>

                        <Button 
                            type='submit'
                            colorScheme='teal'
                            isLoading ={loadingUpdate}
                            mt='4'
                            
                        >
                            Update
                        </Button>
                    </form>
                )}
            </FormContainer>
        </Flex>
    </>
  );
};

export default ProductEditScreen