import { 
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Spacer, 
} from "@chakra-ui/react";
import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { getUserDetails, updateUser } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { USER_UPDATE_RESET } from "../constants/userConstants";


const UserEditScreen =() => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id: userId} = useParams();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdate = useSelector((state) => state.userUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = userUpdate;

    useEffect(() => {
        if(successUpdate) {
            dispatch({ type: USER_UPDATE_RESET });
            navigate('/admin/userlist');
        } else {
            if(!user.name || user._id !== userId ) {
                dispatch(getUserDetails(userId));
            } else {
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.isAdmin);
            }
        }
    },[ dispatch, userId, successUpdate, navigate, ]);

    const submitHandler =  (e) => {
        e.preventDefault();
        dispatch(updateUser({ _id: user._id, name, email, isAdmin }));
    }

  return (
    <>
        <Link as={RouterLink} to='/admin/userlist'>
                Go back
            </Link>
            <Flex w='full' alignItems='center' justifyContent='center' py='5'>
                <FormContainer>
                    <Heading as='h1' mb='8' fontSize='3xl'>
                        Edit user
                    </Heading>

                    {loadingUpdate && <Loader />}
                    {errorUpdate && <Message type='error'>{errorUpdate}</Message>}

                    {loading ? (
                        <Loader/>
                    ) : error ? (
                        <Message type='error'>{error}</Message>
                    ) : (
                        <form onSubmit={submitHandler}>
                            <FormControl id='none' isRequired>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    type='text'
                                    placeholder='Enter full name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </FormControl>
                            <Spacer h='3'/>

                            <FormControl id='email' isRequired>
                                <FormLabel>Email Address</FormLabel>
                                <Input
                                    type='text'
                                    placeholder='Enter full name'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </FormControl>
                            <Spacer h='3'/>

                            <FormControl id='isAdmin' isRequired>
                                <FormLabel>is Admin?</FormLabel>
                                <Checkbox
                                    type='text'
                                    placeholder='Enter full name'
                                    value={isAdmin}
                                    onChange={(e) => setIsAdmin(e.target.checked)}>
                                        is Admin?
                                </Checkbox>
                            </FormControl>
                            <Spacer h='3'/>

                            <Button
                                type='submit'
                                colorScheme='teal'
                                isLoading={loading}
                                mt='4'
                            >
                                update
                            </Button>
                        </form>
                    )}
                </FormContainer>
            </Flex>
    </>
  )
}

export default UserEditScreen