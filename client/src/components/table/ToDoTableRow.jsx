import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    Avatar,
    Checkbox,
    HStack,
    Icon,
    IconButton,
    Td,
    Text,
    Tr,
    Input,
    useColorModeValue,
} from '@chakra-ui/react'
import { FiEdit2, FiSave, FiDelete } from 'react-icons/fi'
import { TiUserAddOutline } from "react-icons/ti";
import TodoMenu from "@components/menu/TodoMenu";

/**
 * ToDoTableRow component that represents a row in the to-do table.
 * @param {Object} props The properties of the component.
 * @param {Object} props.todo The to-do object.
 * @param {Array} props.taskEmployees The task employees object.
 * @param {Function} props.updateToDo The function to update a to-do.
 * @param {Function} props.deleteToDo The function to delete a to-do.
 * @param {Function} props.changeTaskCompleted The function to change the task completed status.
 * @returns {JSX.Element} The JSX element representing the component.
 */
const ToDoTableRow = ({
    todo: initialTodo,
    taskEmployees: initialTaskEmployees,
    updateToDo,
    deleteToDo,
    changeTaskCompleted
    }) => {
    const [todo, setTodo] = useState(initialTodo);
    const [taskEmployees, setTaskEmployees] = useState(initialTaskEmployees);
    const [availableTaskEmployees, setAvailableTaskEmployees] = useState(() => {
        return initialTaskEmployees.filter(taskEmployee => !initialTodo.EmployeeIDs.includes(taskEmployee.employeeID));
    });
    const [isEdit, setIsEdit] = useState(false);
    const textColor = useColorModeValue("gray.700", "white");

    useEffect(() => {
        setTaskEmployees(initialTaskEmployees);
    }, [initialTaskEmployees]);

    useEffect(() => {
        setAvailableTaskEmployees(() => {
            return taskEmployees.filter(taskEmployee => {
                if (!todo.EmployeeIDs.find(id => id === taskEmployee.employeeID)) {
                    return taskEmployee
                }
            });
        })
    }, [taskEmployees, todo.EmployeeIDs]);

    const addToDoEmployee = (employee) => {
        setTodo(prevTodo => ({
            ...prevTodo,
            EmployeeIDs: prevTodo.EmployeeIDs.filter(id => id !== employee.employeeID),
        }));
        setAvailableTaskEmployees(prevEmployees => [...prevEmployees, employee]);
    }

    const removeToDoEmployee = (employee) => {
        setTodo(prevTodo => ({
            ...prevTodo,
            EmployeeIDs: prevTodo.EmployeeIDs.filter(id => id !== employee.employeeID),
        }));
        setAvailableTaskEmployees(prevEmployees => [...prevEmployees, employee]);
    };

    return (
        <Tr key={todo.todoID}>
            <Td>
                <Checkbox
                    isChecked={todo.completed}
                    onChange={(event) => {
                        if (isEdit) return;
                        const updatedTodo = {
                            ...todo,
                            completed: event.target.checked,
                        };
                        setTodo(updatedTodo);
                        updateToDo(updatedTodo);
                        if (!event.target.checked) {
                            changeTaskCompleted(false);
                        }
                    }}
                />
            </Td>
            <Td>
                {isEdit ? (
                    <Input
                        px="0"
                        maxW={{ md: '3xl' }}
                        defaultValue={todo.name}
                        onChange={(event) => setTodo({ ...todo, name: event.target.value })}
                    />
                ) : (
                    <Text color="fg.muted">{todo.name}</Text>
                )}
            </Td>
            <Td>
                {isEdit ? (
                    <Input
                        px="0"
                        maxW={{ md: '3xl' }}
                        defaultValue={todo.description}
                        onChange={(event) => setTodo({ ...todo, description: event.target.value })}
                    />
                ) : (
                    <Text color="fg.muted">{todo.description}</Text>
                )}
            </Td>
            <Td>
                <HStack spacing="2">
                    {isEdit ? (
                        <>
                            <TodoMenu
                                taskEmployees={availableTaskEmployees}
                                addToDoEmployee={addToDoEmployee}
                                icon={<Icon as={TiUserAddOutline} w="24px" h="24px" color={textColor} />}
                            />
                            {taskEmployees.map(taskEmployee => (
                                todo.EmployeeIDs.includes(taskEmployee.employeeID) && (
                                    <Avatar
                                        key={taskEmployee.employeeID}
                                        onClick={() => removeToDoEmployee(taskEmployee)}
                                        size="sm"
                                        name={taskEmployee.name}
                                        src={taskEmployee.avatarURI}
                                    />
                                )
                            ))}
                        </>
                    ) : (
                        taskEmployees.map(taskEmployee => (
                            todo.EmployeeIDs.includes(taskEmployee.employeeID) && (
                                <Avatar
                                    key={taskEmployee.employeeID}
                                    size="sm"
                                    name={taskEmployee.name}
                                    src={taskEmployee.avatarURI}
                                />
                            )
                        ))
                    )}
                </HStack>
            </Td>
            <Td>
                <HStack spacing="1">
                    {isEdit ? (
                        <>
                            <IconButton
                                icon={<FiSave />}
                                variant="tertiary"
                                aria-label="Save task"
                                onClick={() => {
                                    setIsEdit(false);
                                    updateToDo(todo);
                                }}
                            />
                            <IconButton
                                icon={<FiDelete />}
                                variant="tertiary"
                                aria-label="Delete task"
                                onClick={() => {
                                    setIsEdit(false);
                                    deleteToDo(todo);
                                }}
                            />
                        </>
                    ) : (
                        !todo.completed && (
                            <IconButton
                                icon={<FiEdit2 />}
                                variant="tertiary"
                                aria-label="Edit task"
                                onClick={() => setIsEdit(true)}
                            />
                        )
                    )}
                </HStack>
            </Td>
        </Tr>
    );
}

// Define prop types for the component
ToDoTableRow.propTypes = {
    todo: PropTypes.shape({
        todoID: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
        EmployeeIDs: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    taskEmployees: PropTypes.arrayOf(PropTypes.shape({
        employeeID: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        avatarURI: PropTypes.string,
    })).isRequired,
    updateToDo: PropTypes.func.isRequired,
    deleteToDo: PropTypes.func.isRequired,
    changeTaskCompleted: PropTypes.func.isRequired,
};

export default ToDoTableRow;