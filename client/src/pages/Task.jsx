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

// const taskDataInput = [
//     {
//         "taskID": "301",
//         "taskName": "Menu Update",
//         "taskDescription": "Update the restaurant menu for the new season.",
//         "todos": [
//             {
//                 "todoID": "401",
//                 "name": "Create new menu items",
//                 "description": "Design and create new menu items.",
//                 "completed": false,
//                 "completionTime": "2023-11-10 03:30 PM",
//                 "EmployeeIDs": [
//                     "1"
//                 ]
//             }
//         ],
//         "startingTime": "2023-10-22 08:00 AM",
//         "targetTime": "2023-11-15 05:00 PM",
//         "completed": false,
//         "EmployeeIDs": [
//             "1"
//         ]
//     },
//     {
//         "taskID": "302",
//         "taskName": "Inventory Check",
//         "taskDescription": "Conduct inventory check for supplies and ingredients.",
//         "todos": [],
//         "startingTime": "2023-10-23 10:00 AM",
//         "targetTime": "2023-11-10 03:30 PM",
//         "completionTime": "2023-11-10 03:30 PM",
//         "completed": true,
//         "EmployeeIDs": [
//             "2"
//         ]
//     },
//     {
//         "taskID": "303",
//         "taskName": "Customer Service Training",
//         "taskDescription": "Train staff for exceptional customer service.",
//         "todos": [
//             {
//                 "todoID": "402",
//                 "name": "Create training materials",
//                 "description": "Develop training materials for staff.",
//                 "completed": true,
//                 "completionTime": "2023-10-25 09:30 AM",
//                 "EmployeeIDs": [
//                     "3"
//                 ]
//             }
//         ],
//         "startingTime": "2023-10-24 09:30 AM",
//         "targetTime": "2023-10-24 11:00 AM",
//         "completed": false,
//         "EmployeeIDs": [
//             "3"
//         ]
//     },
//     {
//         "taskID": "304",
//         "taskName": "Weekend Specials",
//         "taskDescription": "Plan and prepare weekend special dishes.",
//         "todos": [],
//         "startingTime": "2023-10-25 10:00 AM",
//         "targetTime": "2023-11-20 05:00 PM",
//         "completed": false,
//         "EmployeeIDs": [
//             "4"
//         ]
//     },
//     {
//         "taskID": "305",
//         "taskName": "Cleaning and Sanitization",
//         "taskDescription": "Ensure the restaurant is clean and sanitized daily.",
//         "todos": [
//             {
//                 "todoID": "403",
//                 "name": "Sanitize kitchen equipment",
//                 "description": "Regularly sanitize kitchen equipment.",
//                 "completed": true,
//                 "completionTime": "2023-10-26 02:00 PM",
//                 "EmployeeIDs": [
//                     "5",
//                     "1"
//                 ]
//             }
//         ],
//         "startingTime": "2023-10-26 11:00 AM",
//         "targetTime": "2023-11-15 03:30 PM",
//         "completionTime": "2023-11-15 03:30 PM",
//         "completed": true,
//         "EmployeeIDs": [
//             "5",
//             "1"
//         ]
//     }
// ]

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