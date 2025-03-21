import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Select,
    Spacer,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, useNavigate } from 'react-router-dom'

import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from '../components/FormContainer'
import { countries } from '../data/countries'

const ShippingScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);
    const { shippingAddress = {} } = cart;

    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({address, city, postalCode, country}));
        navigate('/payment');
        
    };

    return (
        <Flex w='full' alignItems='center' justifyContent="center" py='5' >
            <FormContainer>
            <Heading as='h2' mb='8' fontSize='3xl'>
                Shipping
            </Heading>
            <CheckoutSteps step1 step2 />

            <form onSubmit={submitHandler}>
                {/* address */}
                <FormControl id='address'
                >
                    <FormLabel htmlFor='address'>Address</FormLabel>
                    <Input
                    id='address'
                    type='text'
                    placeholder='Enter address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    ></Input>
                </FormControl>

                <Spacer h='3' />

                {/* city */}
                <FormControl id='city'>
                    <FormLabel htmlFor='city'>City</FormLabel>
                    <Input
                    id='city'
                    type='text'
                    placeholder='Enter city'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    ></Input>
                </FormControl>

                <Spacer h='3' />

                {/* postal code */}
                <FormControl id='postalCode'>
                    <FormLabel htmlFor='postalCode'>Postal Code</FormLabel>
                    <Input
                    id='postalCode'
                    type='text'
                    placeholder='Enter postal code'
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    ></Input>
                </FormControl>

                <Spacer h='3' />

                {/* country */}
                <FormControl id='country'>
                    <FormLabel htmlFor='country'>Country</FormLabel>
                    <Select
                    id='country'
                    placeholder='Select country'
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    >
                        {countries.map((country) => (
                            <option key={country} value={country}>
                                {country}
                            </option>
                        ))}
                    </Select>
                </FormControl>

                <Spacer h='3' />

                <Button type='submit' colorScheme='teal' mt='4'>Continue</Button>
                
            </form>
            </FormContainer>
        </Flex>
    )

};

export default ShippingScreen