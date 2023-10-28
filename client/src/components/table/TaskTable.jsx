import {
    Avatar,
    Badge,
    Box,
    Checkbox,
    HStack,
    Icon,
    IconButton,
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
import { TaskModal } from '../modal/TaskModal';
import { TaskTableRow } from './TaskTableRow';

//   import { members } from './data'

export const TaskTable = ({ taskData, employeesProfileInfo }) => {

    const disclosure = useDisclosure()
    const [selectedTask, SetSelectedTask] = useState("");

    // const [taskData, setTaskData] = useState(taskDataInput);
    // console.log(employeesProfileInfo);


    return (
        <>
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
                            task={task} employeesProfileInfo={employeesProfileInfo}
                            SetSelectedTask={SetSelectedTask} disclosure={disclosure} isNew={false}
                        />
                    ))}

                </Tbody>
            </Table>
            <TaskModal disclosure={disclosure} selectedTask={selectedTask} employeesProfileInfo={employeesProfileInfo} />
        </>
    )
}