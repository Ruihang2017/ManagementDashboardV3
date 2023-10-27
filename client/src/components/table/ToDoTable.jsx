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
import { ToDoTableRow } from "./ToDoTableRow";



export const TodoTable = ({ todos, taskEmployees }) => {

    // const [taskData, setTaskData] = useState(taskDataInput);
    // const [todoCompleted, setTodoCompleted] = useState(false);

    // newToDo
    const [newToDo, SetNewToDo] = useState({
        name: "Task name",
        description: "Task description",
        employees: [],
    });

    const addToDoEmployee = (data) => {
        SetNewToDo({
            ...newToDo,
            employees: [...newToDo.employees, data],
        });
    }

    const textColor = useColorModeValue("gray.700", "white");

    return (
        <>
            {todos.map((todo) => (
                <ToDoTableRow key={todo.todoID} todo={todo} taskEmployees={taskEmployees} />
            ))}

            <Tr>
                <Td>

                </Td>
                <Td>
                    <Input px="0" maxW={{ md: '3xl', }} defaultValue={newToDo.name} />
                </Td>
                <Td>
                    <Input px="0" maxW={{ md: '3xl', }} defaultValue={newToDo.description} />
                </Td>
                <Td>
                    <HStack spacing="2">
                        <TodoMenu
                            taskEmployees={taskEmployees}
                            addToDoEmployee={addToDoEmployee}
                            icon={<Icon as={TiUserAddOutline} w='24px' h='24px' color={textColor} />} />
                        {/* {console.log(newToDo)} */}
                        {newToDo.employees.map((employee, index) => {
                            return <Avatar key={employee.employeeID} size="sm" name="Christoph Winston" src={employee.avatarURI} />
                        })}
                    </HStack>
                </Td>
                <Td>
                    <HStack spacing="1">
                        <IconButton icon={<FiCheckSquare />}
                            variant="tertiary" aria-label="Edit task" />
                    </HStack>
                </Td>
            </Tr>

        </>
    )
}