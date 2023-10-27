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
    useColorModeValue,
} from '@chakra-ui/react'
import { FiEdit2, FiTrash2, FiCheckSquare } from 'react-icons/fi'
import { IoEllipsisHorizontal } from "react-icons/io5";
import { TiUserAddOutline } from "react-icons/ti";


import { useState, useEffect } from 'react';
import { TaskModal } from '../modal/TaskModal';
import TodoMenu from "@components/menu/TodoMenu";



export const ToDoTableItem = ({ todo, taskEmployees }) => {

    // const [taskData, setTaskData] = useState(taskDataInput);
    // const [todoCompleted, setTodoCompleted] = useState(false);

    const textColor = useColorModeValue("gray.700", "white");

    return (
        <>
            <Tr key={todo.todoID}>
                <Td>
                    <Checkbox />
                </Td>
                <Td>
                    <Text color="fg.muted">{todo.name}</Text>
                </Td>
                <Td>
                    <Text color="fg.muted">{todo.description}</Text>
                </Td>
                <Td>
                    <HStack spacing="2">
                        {taskEmployees.map(taskEmployee => {
                            if (todo.EmployeeIDs.find(EmployeeID => EmployeeID === taskEmployee.employeeID)) {
                                return <Avatar key={taskEmployee.employeeID} size="sm" name="Christoph Winston" src={taskEmployee.avatarURI} />
                            }
                        })
                        }
                    </HStack>
                </Td>
                <Td>
                    <HStack spacing="1">
                        <IconButton icon={<FiEdit2 />}
                            variant="tertiary" aria-label="Edit task" />
                    </HStack>
                </Td>
            </Tr>
        </>
    )
}