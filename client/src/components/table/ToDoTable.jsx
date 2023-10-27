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
import NewToDo from "@components/table/NewToDo";


export const TodoTable = ({ todos, taskEmployees }) => {

    const [availableTaskEmployees, setAvailableTaskEmployees] = useState(taskEmployees);

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

        const newTaskEmployees = availableTaskEmployees.filter(taskEmployee => taskEmployee.employeeID !== data.employeeID);
        setAvailableTaskEmployees(newTaskEmployees)
    }

    const removeToDoEmployee = (data) => {
        console.log(data);
        const newTaskEmployees = newToDo.employees.filter(employee => employee.employeeID !== data.employeeID);
        SetNewToDo({
            ...newToDo,
            employees: [...newTaskEmployees],
        });

        setAvailableTaskEmployees([...availableTaskEmployees, data])
    }

    return (
        <>
            {todos.map((todo) => (
                <ToDoTableRow key={todo.todoID} todo={todo} taskEmployees={taskEmployees} />
            ))}
            <NewToDo newToDo={newToDo} taskEmployees={availableTaskEmployees}
                addToDoEmployee={addToDoEmployee} removeToDoEmployee={removeToDoEmployee} />
        </>
    )
}