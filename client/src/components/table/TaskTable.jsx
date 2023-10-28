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
} from '@chakra-ui/react'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useQuery, useMutation } from '@apollo/client';

import { CREATE_TASK } from '@utils/mutations';
import { TaskModal } from '../modal/TaskModal';
import { TaskTableRow } from './TaskTableRow';
import { QUERY_TASKS } from '@utils/queries';

//   import { members } from './data'

export const TaskTable = (props) => {
    // { taskData, employeesProfileInfo }
    const [taskData, setTaskData] = useState(props.taskData);
    const [employeesProfileInfo, setEmployeesProfileInfo] = useState(props.employeesProfileInfo);


    const [CreateTask, { CreateTaskError }] = useMutation(CREATE_TASK, {
        refetchQueries: [
            QUERY_TASKS,
            'tasks'
        ]
    });
    const disclosure = useDisclosure()
    const creatTaskDisclosure = useDisclosure()

    const [selectedTask, SetSelectedTask] = useState("");
    const [emptyTask, setEmptyTask] = useState({
        taskID: uuidv4(),
        completed: false,
        taskDescription: "Task Description",
        taskName: "Task Name",
        EmployeeIDs: [],
        todos: []
    });
    // console.log(taskData);

    // const [taskData, setTaskData] = useState(taskDataInput);
    // console.log(employeesProfileInfo);
    // createTask
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
                            // creatTaskDisclosure.onOpen();
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
                        {taskData.map((task) => (
                            <TaskTableRow key={task.taskID}
                                task={task}
                                employeesProfileInfo={employeesProfileInfo}
                                SetSelectedTask={SetSelectedTask}
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
