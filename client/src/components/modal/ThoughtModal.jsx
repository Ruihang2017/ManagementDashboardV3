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
// import { UPDATE_TASK } from '@utils/mutations';
import NewThought from '@pages/forum/components/NewThought'
// client\src\pages\forum\components\NewThought.jsx

export const ThoughtModal = (props) => {
    const { ...rest } = props;

    // const isMobile = useBreakpointValue({
    //     base: true,
    //     md: false,
    // })


    return (
        <>
            <Modal closeOnOverlayClick={false}
                isOpen={props.disclosure.isOpen}
                onClose={props.disclosure.onClose}
            >
                <ModalOverlay />
                <ModalContent maxW="1400px">
                    <ModalHeader>Share your thought</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6} >
                        <NewThought {...rest} />
                        {/* <TaskFrom selectedTask={selectedTask} employeesProfileInfo={employeesProfileInfo}
                            disclosure={disclosure} isNewTask={isNewTask}
                            taskData={taskData} setTaskData={setTaskData} /> */}
                    </ModalBody>
                </ModalContent>
            </Modal >
        </>

    )
}