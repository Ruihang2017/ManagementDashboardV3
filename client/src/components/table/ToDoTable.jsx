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



export const TodoTable = ({ todos, employeesProfileInfo }) => {

    // const [taskData, setTaskData] = useState(taskDataInput);
    // const [todoCompleted, setTodoCompleted] = useState(false);

    const [newToDo, SetNewToDo] = useState({
        name: "Task name",
        description: "Task description",
        EmployeeIDs: [],
    });

    const textColor = useColorModeValue("gray.700", "white");

    console.log(employeesProfileInfo);
    return (
        <>
            {todos.map((todo) => (
                <Tr key={todo.todoID}>
                    <Td>
                        {/* <Checkbox isChecked={todo.completed} /> */}
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
                            {todo.EmployeeIDs.map((EmployeeID, index) => {
                                const employee = employeesProfileInfo.find((data) => data.employeeID === EmployeeID);
                                return <Avatar key={EmployeeID} size="sm" name="Christoph Winston" src={employee.avatarURI} />
                            })}
                        </HStack>
                    </Td>
                    <Td>
                        <HStack spacing="1">
                            <IconButton icon={<FiEdit2 />}
                                variant="tertiary" aria-label="Edit task" />
                        </HStack>
                    </Td>
                </Tr>
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
                    {/* <Input px="0" maxW={{ md: '3xl', }} defaultValue={newToDo.EmployeeIDs} /> */}
                    <TodoMenu
                        employeesProfileInfo={employeesProfileInfo}
                        icon={<Icon as={TiUserAddOutline} w='24px' h='24px' color={textColor} />} />
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