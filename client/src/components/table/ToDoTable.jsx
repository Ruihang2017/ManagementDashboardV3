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
import { useQuery, useMutation } from '@apollo/client';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';


import { TaskModal } from '../modal/TaskModal';
import TodoMenu from "@components/menu/TodoMenu";
import ToDoTableRow from "@components/table/ToDoTableRow";
import NewToDo from "@components/table/NewToDo";
import { CREATE_TODO, UPDATE_TODO, DELETE_TODO } from '@utils/mutations';


export const TodoTable = (props) => {
    // { todos, setTask, taskEmployees, taskID }
    const [todos, setTodos] = useState(props.todos)
    const [taskEmployees, setTaskEmployees] = useState(props.taskEmployees)
    const [taskID, setTaskID] = useState(props.taskID)
    const [availableTaskEmployees, setAvailableTaskEmployees] = useState(taskEmployees);

    const [createToDo, { createToDoError }] = useMutation(CREATE_TODO);
    const [UpdateToDo, { UpdateToDoError }] = useMutation(UPDATE_TODO);
    const [DeleteToDo, { DeleteToDoError }] = useMutation(DELETE_TODO);

    const [newToDo, SetNewToDo] = useState({
        name: "Task name",
        description: "Task description",
        employees: [],
    });
    // console.log(taskEmployees);
    // console.log(props.taskEmployees);


    useEffect(() => {
        props.setTask({
            ...props.task,
            todos: todos,
        })
        // console.log(todos);
    }, [todos]);

    useEffect(() => {
        setTaskEmployees(props.taskEmployees);
        setAvailableTaskEmployees(props.taskEmployees);
        // console.log(todos);
    }, [props.taskEmployees]);

    const addToDo = async (_data) => {

        const EmployeeIDs = [];
        _data.employees.forEach(employee => {
            EmployeeIDs.push(employee.employeeID);
        });

        const id = uuidv4();

        const variables = {
            taskId: taskID,
            todo: {
                todoID: id,
                name: _data.name,
                description: _data.description,
                completed: false,
                EmployeeIDs: EmployeeIDs,
            }
        };
        // console.log(variables);

        // find the book in `searchedBooks` state by the matching id
        // const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

        // get token
        // const token = Auth.loggedIn() ? Auth.getToken() : null;

        // if (!token) {
        //     return false;
        // }

        try {
            const { data } = await createToDo({
                variables: variables
            });
            setTodos(data.createToDo.todos);
            // setTaskEmployees(props.taskEmployees);
            setAvailableTaskEmployees(props.taskEmployees);
            SetNewToDo({
                name: "Task name",
                description: "Task description",
                employees: [],
            });

            // if book successfully saves to user's account, save book id to state
            // setSavedBookIds([...savedBookIds, bookToSave.bookId]);

        } catch (err) {
            console.error(err);
        }
    }

    // updateToDo
    const updateToDo = async (_data) => {
        // console.log(_data);

        const variables = {
            taskId: taskID,
            todo: {
                EmployeeIDs: _data.EmployeeIDs,
                completed: _data.completed,
                description: _data.description,
                name: _data.name,
                todoID: _data.todoID,
            }
        }
        try {
            const { data } = await UpdateToDo({
                variables: variables
            });
            setTodos(data.updateToDo.todos)
        } catch (err) {
            console.error(err);
        }
    }

    // deleteToDo
    const deleteToDo = async (_data) => {

        const id = uuidv4();

        const variables = {
            taskId: taskID,
            todoId: _data.todoID,
        }
        // console.log(variables);

        try {
            const { data } = await DeleteToDo({
                variables: variables
            });
            setTodos(data.deleteToDo.todos)
            // console.log(data);

        } catch (err) {
            console.error(err);
        }
    }


    return (
        <>
            {todos.map((todo) => (
                <ToDoTableRow key={todo.todoID} todo={todo} taskEmployees={taskEmployees}
                    updateToDo={updateToDo}
                    deleteToDo={deleteToDo}
                    changeTaskCompleted={props.changeTaskCompleted}
                    availableTaskEmployees={availableTaskEmployees} />
            ))}
            <NewToDo taskEmployees={taskEmployees} addToDo={addToDo}
                newToDo={newToDo} SetNewToDo={SetNewToDo}
                availableTaskEmployees={availableTaskEmployees} setAvailableTaskEmployees={setAvailableTaskEmployees} />
        </>
    )
}