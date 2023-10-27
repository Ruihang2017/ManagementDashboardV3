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
import { TaskTable } from '../components/table/TaskTable'

import { useState, useEffect } from 'react';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_TASKS, QUERY_EMPLOYEES_PROFILE_INFO } from '../utils/queries';



export default function Task() {

    //  QUERY_TASKS  
    const { loading: loadingQueryTask, data: dataQueryTask } = useQuery(QUERY_TASKS);
    const taskData = dataQueryTask?.tasks || [];

    //  QUERY_EMPLOYEES_PROFILE_INFO  
    const { loading: loadingQueryEmployeesProfileInfo, data: dataQueryEmployeesProfileInfo } = useQuery(QUERY_EMPLOYEES_PROFILE_INFO);
    const employeesProfileInfo = dataQueryEmployeesProfileInfo?.employees || [];

    // const [taskData, setTaskData] = useState(tasks);

    // useEffect(() => {
    //     setTaskData(tasks)
    //     console.log(tasks);
    // }, [tasks]);

    // //  QUERY_TASKS data 
    // const { loading, data } = useQuery(QUERY_TASKS);

    // const tasks = data?.tasks || [];

    // const [taskData, setTaskData] = useState(tasks);

    // useEffect(() => {
    //     setTaskData(tasks)
    // }, [tasks]);



    const isMobile = useBreakpointValue({
        base: true,
        md: false,
    })

    if (loadingQueryTask || loadingQueryEmployeesProfileInfo) {
        return <div>Loading...</div>;
    }


    return (
        <Container maxW='100%' py={{ base: '4', md: '8', }} px={{ base: '0', md: '8', }}>
            <Box bg="bg.surface" boxShadow={{ base: 'none', md: 'sm', }} borderRadius={{ base: 'none', md: 'lg', }}>
                <Stack spacing="5">
                    <Box px={{ base: '4', md: '6', }} pt="5">
                        <Stack direction={{ base: 'column', md: 'row', }} justify="space-between">
                            <Text textStyle="lg" fontWeight="medium">
                                Tasks
                            </Text>
                            {/* <InputGroup maxW="xs">
                                <InputLeftElement pointerEvents="none">
                                    <Icon as={FiSearch} color="fg.muted" boxSize="5" />
                                </InputLeftElement>
                                <Input placeholder="Search" />
                            </InputGroup> */}
                        </Stack>
                    </Box>
                    <Box overflowX="auto">
                        <TaskTable taskData={taskData} employeesProfileInfo={employeesProfileInfo} />
                    </Box>
                    {/* <Box px={{ base: '4', md: '6', }} pb="5" >
                        <HStack spacing="3" justify="space-between">
                            {!isMobile && (
                                <Text color="fg.muted" textStyle="sm">
                                    Showing 1 to 5 of 42 results
                                </Text>
                            )}
                            <ButtonGroup spacing="3" justifyContent="space-between" width={{ base: 'full', md: 'auto', }}
                                variant="secondary">
                                <Button>Previous</Button>
                                <Button>Next</Button>
                            </ButtonGroup>
                        </HStack>
                    </Box> */}
                </Stack>
            </Box>
        </Container>

    )
}