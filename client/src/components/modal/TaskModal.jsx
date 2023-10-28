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
import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_TASK } from '@utils/mutations';

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
                        <TaskFrom selectedTask={selectedTask} employeesProfileInfo={employeesProfileInfo} disclosure={disclosure} />
                    </ModalBody>
                </ModalContent>
            </Modal >
        </>

    )
}