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
import TodoMenu from "@components/menu/TodoMenu";


const NewToDo = ({ taskEmployees, addToDo, newToDo, SetNewToDo, availableTaskEmployees, setAvailableTaskEmployees }) => {

    const textColor = useColorModeValue("gray.700", "white");


    const addToDoEmployee = (data) => {
        SetNewToDo({
            ...newToDo,
            employees: [...newToDo.employees, data],
        });

        const newTaskEmployees = availableTaskEmployees.filter(taskEmployee => taskEmployee.employeeID !== data.employeeID);
        setAvailableTaskEmployees(newTaskEmployees)
    }

    const removeToDoEmployee = (data) => {
        const newTaskEmployees = newToDo.employees.filter(employee => employee.employeeID !== data.employeeID);
        SetNewToDo({
            ...newToDo,
            employees: [...newTaskEmployees],
        });

        setAvailableTaskEmployees([...availableTaskEmployees, data])
    }

    return (
        <>
            <Tr>
                <Td>

                </Td>
                <Td>
                    <Input px="0" maxW={{ md: '3xl', }} value={newToDo.name}
                        onChange={(event) => {
                            SetNewToDo({
                                ...newToDo,
                                name: event.target.value,
                            })
                        }} />
                </Td>
                <Td>
                    <Input px="0" maxW={{ md: '3xl', }} value={newToDo.description}
                        onChange={(event) => {
                            SetNewToDo({
                                ...newToDo,
                                description: event.target.value,
                            })
                        }} />
                </Td>
                <Td>
                    <HStack spacing="2">
                        <TodoMenu
                            taskEmployees={availableTaskEmployees}
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
                        <IconButton
                            onClick={() => addToDo(newToDo)}
                            icon={<FiCheckSquare />}
                            variant="tertiary" aria-label="Edit task" />
                    </HStack>
                </Td>
            </Tr>

        </>
    )
}

export default NewToDo;