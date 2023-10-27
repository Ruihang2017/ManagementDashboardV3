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
import ToDoTableRow from "@components/table/ToDoTableRow";


const NewToDo = ({ newToDo, taskEmployees, addToDoEmployee, removeToDoEmployee }) => {

    const textColor = useColorModeValue("gray.700", "white");

    return (
        <>
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
                        {newToDo.employees.map((employee, index) => {
                            return <Avatar onClick={() => removeToDoEmployee(employee)}
                                key={employee.employeeID} size="sm" name="Christoph Winston" src={employee.avatarURI} />
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

export default NewToDo;