import { Link as RouterLink } from "react-router-dom" 
import { Breadcrumb, BreadcrumbLink, BreadcrumbItem, Flex } from "@chakra-ui/react"
import { IoCaretForward } from "react-icons/io5"

const CheckoutSteps =({ step1, step2, step3, step4}) => {
  return (
    <Flex justifyContent='center' mb='8'>
        <Breadcrumb
            separator={<IoCaretForward  color='gray.500' />}
        >
            {/* step 1 */}
            <BreadcrumbItem>
                {step1 ? (
                    <BreadcrumbLink as={RouterLink} to='/login'>Login</BreadcrumbLink>
                ) : (
                    <BreadcrumbLink disabled color="gray.400"  >Login</BreadcrumbLink>
                )}
            </BreadcrumbItem>

            {/* step 2 */}
            <BreadcrumbItem>
                {step2 ? (
                    <BreadcrumbLink as={RouterLink} to='/shipping'>Shipping</BreadcrumbLink>
                ) : (
                    <BreadcrumbLink disabled color="gray.400" >Shipping</BreadcrumbLink>
                )}
            </BreadcrumbItem>
            
            {/* step 3 */}
            <BreadcrumbItem>
                {step3 ? (
                    <BreadcrumbLink as={RouterLink} to='/payment'>Payment</BreadcrumbLink>
                ) : (
                    <BreadcrumbLink disabled color="gray.400" >Payment</BreadcrumbLink>
                )}
            </BreadcrumbItem>

            {/* step 4 */}
            <BreadcrumbItem>
                {step4 ? (
                    <BreadcrumbLink as={RouterLink} to='/placeorder'>Place Order</BreadcrumbLink>
                ) : (
                    <BreadcrumbLink disabled color="gray.400" >Place Order</BreadcrumbLink>
                )}
            </BreadcrumbItem>
        </Breadcrumb>
    </Flex>
  )
};

export default CheckoutSteps