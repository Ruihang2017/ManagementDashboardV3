import {
    Box,
    Container,
    HStack,
    Stack,
    Text,
    useBreakpointValue,
    useColorModeValue,
} from '@chakra-ui/react'
import { TaskTable } from '../components/table/TaskTable'
import { useQuery } from '@apollo/client';
import { QUERY_TASKS, QUERY_EMPLOYEES_PROFILE_INFO } from '../utils/queries';


/**
 * Task component that displays a table of tasks and employee profile information.
 * @returns {JSX.Element} The rendered component.
 */
export default function Task() {
    const paleGray = useColorModeValue("secondaryGray.400", "whiteAlpha.100");
    const white = useColorModeValue('white', 'navy.900');

    // Query for fetching tasks
    const { loading: loadingQueryTask, data: dataQueryTask } = useQuery(QUERY_TASKS);
    const taskData = dataQueryTask?.tasks || [];

    // Query for fetching employees profile info
    const { loading: loadingQueryEmployeesProfileInfo, data: dataQueryEmployeesProfileInfo } = useQuery(QUERY_EMPLOYEES_PROFILE_INFO);
    const employeesProfileInfo = dataQueryEmployeesProfileInfo?.employees || [];


    useBreakpointValue({
        base: true,
        md: false,
    })

    if (loadingQueryTask || loadingQueryEmployeesProfileInfo) {
        return <div>Loading...</div>;
    }


    return (
        <Box height='100%' bgColor={paleGray}>
            <Container maxW='100%' py={{ base: '4', md: '8' }} px={{ base: '0', md: '8' }}>
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
                            <TaskTable taskData={taskData} employeesProfileInfo={employeesProfileInfo} />
                        </Box>
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
}