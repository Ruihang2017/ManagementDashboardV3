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
import { FiEdit2, FiTrash2, FiCheckSquare, FiSave, FiDelete } from 'react-icons/fi'
import { IoEllipsisHorizontal } from "react-icons/io5";
import { TiUserAddOutline } from "react-icons/ti";


import { useState, useEffect } from 'react';
import { TaskModal } from '../modal/TaskModal';
import TodoMenu from "@components/menu/TodoMenu";



const ToDoTableRow = (props) => {
    // { todo, taskEmployees }
    // const [todoCompleted, setTodoCompleted] = useState(false);
    const [todo, setTodo] = useState(props.todo);
    const [taskEmployees, setTaskEmployees] = useState(props.taskEmployees);

    const [availableTaskEmployees, setAvailableTaskEmployees] = useState(() => {
        return taskEmployees.filter(taskEmployee => {
            if (!todo.EmployeeIDs.find(id => id === taskEmployee.employeeID)) {
                return taskEmployee
            }
        });
    });

    useEffect(() => {
        setTaskEmployees(props.taskEmployees);
    }, [props.taskEmployees]);

    useEffect(() => {
        setAvailableTaskEmployees(() => {
            return taskEmployees.filter(taskEmployee => {
                if (!todo.EmployeeIDs.find(id => id === taskEmployee.employeeID)) {
                    return taskEmployee
                }
            });
        })
    }, [taskEmployees]);


    const [isEdit, setIsEdit] = useState(false);

    const textColor = useColorModeValue("gray.700", "white");


    const addToDoEmployee = (data) => {
        setTodo({
            ...todo,
            EmployeeIDs: [...todo.EmployeeIDs, data.employeeID],
        });

        const newTaskEmployees = availableTaskEmployees.filter(taskEmployee => taskEmployee.employeeID !== data.employeeID);
        setAvailableTaskEmployees(newTaskEmployees)
    }

    const removeToDoEmployee = (data) => {
        const newTaskEmployees = todo.EmployeeIDs.filter(EmployeeIDs => EmployeeIDs !== data.employeeID);
        setTodo({
            ...todo,
            EmployeeIDs: [...newTaskEmployees],
        });
        setAvailableTaskEmployees([...availableTaskEmployees, data])
    }

    return (
        <>
            <Tr key={todo.todoID}>
                <Td>
                    <Checkbox
                        isChecked={todo.completed}
                        onChange={(event) => {
                            if (isEdit) return;
                            const changedTodo = {
                                ...todo,
                                completed: event.target.checked,
                            }
                            setTodo(changedTodo)
                            props.updateToDo(changedTodo);
                            if (!event.target.checked) {
                                props.changeTaskCompleted(false);
                            }

                        }} />
                </Td>
                <Td>
                    {isEdit ?
                        (<Input px="0" maxW={{ md: '3xl', }} defaultValue={todo.name}
                            onChange={(event) => {
                                setTodo({
                                    ...todo,
                                    name: event.target.value,
                                })
                            }}
                        />)
                        :
                        (<Text color="fg.muted">{todo.name}</Text>)}
                </Td>
                <Td>
                    {isEdit ?
                        (<Input px="0" maxW={{ md: '3xl', }} defaultValue={todo.description}
                            onChange={(event) => {
                                setTodo({
                                    ...todo,
                                    description: event.target.value,
                                })
                            }}
                        />)
                        :
                        (<Text color="fg.muted">{todo.description}</Text>)}
                </Td>
                <Td>

                    <HStack spacing="2">
                        <>
                            {isEdit ?
                                (<>
                                    <TodoMenu
                                        taskEmployees={availableTaskEmployees}
                                        addToDoEmployee={addToDoEmployee}
                                        icon={<Icon as={TiUserAddOutline} w='24px' h='24px' color={textColor} />} />
                                    {taskEmployees.map(taskEmployee => {
                                        if (todo.EmployeeIDs.find(EmployeeID => EmployeeID === taskEmployee.employeeID)) {
                                            return <Avatar
                                                key={taskEmployee.employeeID}
                                                onClick={() => removeToDoEmployee(taskEmployee)}
                                                size="sm" name="Christoph Winston" src={taskEmployee.avatarURI} />
                                        }
                                    })
                                    }
                                </>
                                ) : (<>
                                    {taskEmployees.map(taskEmployee => {
                                        if (todo.EmployeeIDs.find(EmployeeID => EmployeeID === taskEmployee.employeeID)) {
                                            return <Avatar
                                                key={taskEmployee.employeeID}
                                                // onClick={() => removeToDoEmployee(taskEmployee)}
                                                size="sm" name="Christoph Winston" src={taskEmployee.avatarURI} />
                                        }
                                    })
                                    }</>)}
                        </>
                    </HStack>
                </Td>
                <Td>
                    <HStack spacing="1">
                        {isEdit ?
                            (
                                <>
                                    <IconButton icon={<FiSave />} variant="tertiary" aria-label="Edit task"
                                        onClick={() => {
                                            setIsEdit(false);
                                            props.updateToDo(todo);
                                        }} />
                                    <IconButton icon={<FiDelete />} variant="tertiary" aria-label="Edit task"
                                        onClick={() => {
                                            setIsEdit(true);
                                            props.deleteToDo(todo);
                                        }} />
                                </>
                            )
                            :
                            (
                                <>
                                    {todo.completed ?
                                        (<></>) :
                                        (<IconButton icon={<FiEdit2 />} variant="tertiary" aria-label="Edit task"
                                            onClick={() => {
                                                setIsEdit(true);
                                            }} />)}
                                </>
                            )}
                    </HStack>
                </Td>
            </Tr >
        </>
    )
}

export default ToDoTableRow;