import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Radio,
    RadioGroup,
    Spacer,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, useNavigate } from 'react-router-dom'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from '../components/FormContainer'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'

const PaymentScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const cart = useSelector((state) => state.cart);
    const { shippingAddress, paymentMethod } = cart;

    const [paymentMethodRadio, setPaymentMethodRadio] = useState(paymentMethod || 'paypal');

    useEffect(() => {
        dispatch({ type: ORDER_PAY_RESET });
        dispatch({ type: ORDER_DELIVER_RESET });
        if(!shippingAddress){
            navigate('/shipping');
        }
        
    }, [dispatch, shippingAddress, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethodRadio));
        navigate('/placeorder');
    }


    return(
        <Flex w='full' alignItems='center' justifyContent='center' py='5'>
            <FormContainer>
                <CheckoutSteps step1 step2 step3/>

                <Heading as='h2' mb='8' fontSize='3xl'>
                    Payment Method
                </Heading>

                 <form onSubmit={submitHandler}>
                    <FormControl as='fieldset'>
                        <FormLabel as='legend'>Select Method</FormLabel>
                        <RadioGroup 
                            value={paymentMethodRadio}
                            onChange={setPaymentMethodRadio}>
                            <HStack space='24px'>
                                <Radio value='paypal'>Paypal or Credit/Debit Card</Radio>
                            </HStack>
                        </RadioGroup>
                    </FormControl>

                    <Spacer h='3' />

                    <Button type='submit' colorScheme='teal' mt='4'>
                        Continue
                    </Button>
                 </form>
            </FormContainer>
        </Flex>
    )
};

export default PaymentScreen;