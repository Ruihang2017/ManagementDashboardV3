import {
    Box,
    Button,
    ButtonGroup,
    Container,
    HStack,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    Stack,
    Text,
    useBreakpointValue,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import { TaskFrom } from '../TaskFrom'

export const TaskModal = ({ disclosure, selectedTask, employeesProfileInfo }) => {

    // const isMobile = useBreakpointValue({
    //     base: true,
    //     md: false,
    // })


    return (
        <>
            <Modal closeOnOverlayClick={false}
                isOpen={disclosure.isOpen}
                onClose={disclosure.onClose}
            >
                <ModalOverlay />
                <ModalContent maxW="1400px">
                    <ModalHeader>Task Modal</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6} >
                        <TaskFrom selectedTask={selectedTask} employeesProfileInfo={employeesProfileInfo} />
                    </ModalBody>

                    <ModalFooter  >
                        <Button colorScheme='blue' mr={3}>
                            Save
                        </Button>
                        <Button onClick={disclosure.onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal >
        </>

    )
}