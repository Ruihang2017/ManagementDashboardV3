import {
    Avatar,
    Badge,
    Box,
    Button,
    Checkbox,
    HStack,
    Icon,
    IconButton,
    Stack,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useDisclosure,
    useColorModeValue,
} from '@chakra-ui/react'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useQuery, useMutation } from '@apollo/client';
import { CREATE_TASK } from '@utils/mutations';
import { TaskModal } from '../modal/TaskModal';
import { TaskTableRow } from './TaskTableRow';
import { QUERY_TASKS } from '@utils/queries';
import PropTypes from 'prop-types';

/**
 * TaskTable component to display and manage tasks.
 * @param {Object} props - Component properties.
 * @param {Array} props.taskData - Array of task data.
 * @param {Array} props.employeesProfileInfo - Array of employee profile information.
 */
export const TaskTable = (props) => {
    const textColor = useColorModeValue("gray.700", "white");
    const paleGray = useColorModeValue("secondaryGray.400", "whiteAlpha.100");
    const white = useColorModeValue('white', 'navy.900');

    // { taskData, employeesProfileInfo }
    const [taskData, setTaskData] = useState(props.taskData);
    const [employeesProfileInfo, setEmployeesProfileInfo] = useState(props.employeesProfileInfo);


    const [CreateTask, { CreateTaskError }] = useMutation(CREATE_TASK, {
        refetchQueries: [QUERY_TASKS],
    });
    const disclosure = useDisclosure()
    const creatTaskDisclosure = useDisclosure()

    const [selectedTask, setSelectedTask] = useState({
        taskID: '',
        taskName: '',
        taskDescription: '',
        EmployeeIDs: [],
        completed: false,
        todos: [],
      });
    const [emptyTask, setEmptyTask] = useState({
        taskID: uuidv4(),
        completed: false,
        taskDescription: "Task Description",
        taskName: "Task Name",
        EmployeeIDs: [],
        todos: []
    });

    /**
     * Function to create a new task.
     */
    async function createTask() {
        const variables = {
            task: emptyTask
        }
        console.log(variables);

        try {
            const { data } = await CreateTask({
                variables: variables
            });
            // console.log(data);
            setTaskData([...taskData, data.createTask]);
            setEmptyTask({
                ...emptyTask,
                taskID: uuidv4()
            })
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <Stack>
                <Box px={{ base: '4', md: '6', }} pt="5"
                    display="flex" justifyContent="flex-end">
                    <Button variant='brand' minW='183px' fontSize='sm' fontWeight='500' ms='auto'
                        onClick={() => {
                            createTask();
                        }}>
                        Create Task
                    </Button>
                </Box>
                <Table >
                    <Thead>
                        <Tr>
                            <Th>Status</Th>
                            <Th>TaskID</Th>
                            <Th>TaskName</Th>
                            <Th>Deadline</Th>
                            <Th>Member</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {[...taskData].reverse().map((task) => (
                            <TaskTableRow key={task.taskID}
                                task={task}
                                employeesProfileInfo={employeesProfileInfo}
                                setSelectedTask={setSelectedTask}
                                disclosure={disclosure}
                                isNew={false}
                            />
                        ))}

                    </Tbody>
                </Table>
                <TaskModal disclosure={disclosure} selectedTask={selectedTask}
                    employeesProfileInfo={employeesProfileInfo} isNewTask={false}
                    taskData={taskData} setTaskData={setTaskData} />
            </Stack>
        </>
    )
}

TaskTable.propTypes = {
    taskData: PropTypes.arrayOf(
      PropTypes.shape({
        taskID: PropTypes.string.isRequired,
      })
    ).isRequired,
    employeesProfileInfo: PropTypes.arrayOf(
      PropTypes.shape({
        employeeID: PropTypes.string.isRequired,
        avatarURI: PropTypes.string.isRequired,
      })
    ).isRequired,
  };