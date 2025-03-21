import { 
    Box, 
    Button,
    Heading,
    Icon,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { IoCloseCircleSharp } from 'react-icons/io5'

import { listOrders } from '../actions/orderActions'
import Loader from '../components/Loader'
import Message from '../components/Message'



const OrderListScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const orderList = useSelector((state) => state.orderList);
    const { loading, error, orders} = orderList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo} =userLogin;

    useEffect(() => {
        if(userInfo && userInfo.isAdmin) {
            dispatch(listOrders());
        } else {
            navigate('/login');
        }
    }, [dispatch, navigate, userInfo]);


  return (
    <>
         <Heading as='h1' fontSize='3xl' mb='5'>
                Orders
            </Heading>

            {loading ? (
                <Loader />
            ) : error ? (
                <Message type='error'>{error}</Message>
            ) : (
                <Box bgColor='white' rounded='lg' shadow='lg' px='5' py='5'>
                    <Table variant='striped' colorScheme='gray' size='sm'>
                        <Thead>
                            <Tr>
                                <Th>ID</Th>
                                <Th>USER</Th>
                                <Th>DATE</Th>
                                <Th>TOTAL</Th>
                                <Th>PAID</Th>
                                <Th>DELIVERED</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {orders.map((order) => (
                                <Tr key={order._id}>
                                    <Td>{order._id}</Td>
                                    <Td>{order.user ? order.user.name : 'Unknown User'}</Td>
                                    <Td>{order.createdAt.substring(0, 10)}</Td>
                                    <Td>${order.totalPrice}</Td>
                                    <Td>
                                        {order.isPaid ? (
                                            order.paidAt ? order.paidAt.substring(0, 10) : 'N/A'
                                        ) : (
                                            <Icon as={IoCloseCircleSharp}
                                                color='red.800'
                                                w='8'
                                                h='8'

                                            />
                                        )}
                                    </Td>
                                    <Td>
                                        {order.isDelivered ? (
                                            order.deliveredAt ? order.deliveredAt.substring(0, 10) : 'N/A'
                                        ) : (
                                            <Icon as={IoCloseCircleSharp}
                                                color='red.800'
                                                w='8'
                                                h='8'
                                            />
                                        )}
                                    </Td>
                                    <Td>
                                        <Button
                                            as={RouterLink}
                                            to={`/order/${order._id}`}
                                            colorScheme='teal'
                                            size='sm'
                                        >
                                            Details
                                        </Button>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            )}
    </>
  )
}

export default OrderListScreen