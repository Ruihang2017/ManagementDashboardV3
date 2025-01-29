import React from 'react';
import {
    Box,
    Container,
    HStack,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import { TaskTable } from '../components/table/TaskTable';
import { useQuery } from '@apollo/client';
import { QUERY_TASKS, QUERY_EMPLOYEES_PROFILE_INFO } from '../utils/queries';

/**
 * Task component that displays a table of tasks and employee profile information.
 * @returns {JSX.Element} The rendered component.
 */
const Task = () => {
    const paleGray = useColorModeValue("secondaryGray.400", "whiteAlpha.100");
    const white = useColorModeValue('white', 'navy.900');

    // Query for fetching tasks
    const { loading: loadingTasks, data: taskData } = useQuery(QUERY_TASKS);
    const tasks = taskData?.tasks || [];

    // Query for fetching employees profile info
    const { loading: loadingEmployees, data: employeeData } = useQuery(QUERY_EMPLOYEES_PROFILE_INFO);
    const employeesProfileInfo = employeeData?.employees || [];

    // Handle loading state
    if (loadingTasks || loadingEmployees) {
        return <div>Loading...</div>;
    }

    return (
        <Box height="100%" bgColor={paleGray}>
            <Container maxW="100%" py={{ base: '4', md: '8' }} px={{ base: '0', md: '8' }}>
                <Box
                    bgColor={white}
                    boxShadow={{ base: 'none', md: 'sm' }}
                    borderRadius={{ base: 'none', md: 'lg' }}
                >
                    <Stack spacing="3">
                        <Box px={{ base: '4', md: '6' }} pt="5">
                            <HStack direction={{ base: 'column', md: 'row' }} justify="space-between">
                                <Text textStyle="lg" fontWeight="medium">
                                    Tasks
                                </Text>
                            </HStack>
                        </Box>
                        <Box overflowX="auto">
                            <TaskTable taskData={tasks} employeesProfileInfo={employeesProfileInfo} />
                        </Box>
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
};

export default Task;