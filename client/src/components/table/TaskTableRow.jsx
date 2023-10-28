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
    Input,
} from '@chakra-ui/react'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'
import { useState, useEffect } from 'react';
import { TaskModal } from '../modal/TaskModal';

//   import { members } from './data'

export const TaskTableRow = ({ task, employeesProfileInfo, SetSelectedTask, disclosure, isNew }) => {

    // const disclosure = useDisclosure()
    // const [selectedTask, SetSelectedTask] = useState("");

    // const [taskData, setTaskData] = useState(taskDataInput);
    // console.log(employeesProfileInfo);
    const [isEditing, SetIsEditing] = useState(false)

    return (
        <>
            <Tr >
                <Td>
                    <Badge size="sm" colorScheme={task.completed ? 'green' : 'red'}>
                        {task.completed ? "Completed" : "Incomplete"}
                    </Badge>
                </Td>
                <Td>
                    <Text color="fg.muted">{task.taskID}</Text>
                    {/* <Input px="0" maxW={{ md: '3xl', }} defaultValue={task.taskID} /> */}
                </Td>
                <Td>
                    <Text color="fg.muted">{task.taskName}</Text>
                </Td>
                <Td>
                    <Text color="fg.muted">{task.targetTime}</Text>
                </Td>
                <Td>
                    <HStack spacing="1">
                        {task.EmployeeIDs.map((id) => {
                            const employee = employeesProfileInfo.find((data) => data.employeeID === id);
                            return (
                                <Avatar key={id} size="sm" name="Christoph Winston" src={employee.avatarURI} />
                            )
                        })}
                    </HStack>
                </Td>
                <Td>
                    <HStack spacing="1">
                        {/* <Checkbox /> */}
                        <IconButton icon={<FiEdit2 />}
                            variant="tertiary" aria-label="Edit task" onClick={() => {
                                disclosure.onOpen();
                                SetSelectedTask(task);
                            }} />
                    </HStack>
                </Td>
            </Tr>
        </>
    )
}