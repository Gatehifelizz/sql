import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  } from '@chakra-ui/react'


  
const Modal = ({ isOpen, onClose, title, children, onConfirm }) => {
    
    
    return (
      <>
        <ChakraModal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>{children}</ModalBody>
                <ModalFooter>
                    <Button colorScheme="red" mr={3} onClick={onConfirm}>Delete </Button>
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </ChakraModal>
      </>
    )
  }
  
  export default Modal