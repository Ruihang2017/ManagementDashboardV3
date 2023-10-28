import {
    Avatar,
    Box,
    Button,
    Container,
    Divider,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    HStack,
    Input,
    InputGroup,
    InputLeftAddon,
    Stack,
    StackDivider,
    Textarea,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    Checkbox,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    CloseButton,
    useDisclosure,
    Icon,
    useColorModeValue,
    // DatePicker,
} from '@chakra-ui/react';
import { Dropzone } from './dropzone/Dropzone';
import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_TASK, CREATE_TASK } from '@utils/mutations';
import { TiUserAddOutline } from "react-icons/ti";

import { TodoTable } from "./table/ToDoTable"
import TaskMenu from "@components/menu/TaskMenu";

export const TaskFrom = ({ selectedTask, employeesProfileInfo, disclosure, isNewTask, taskData, setTaskData }) => {

    const textColor = useColorModeValue("gray.700", "white");

    const [UpdateTask, { UpdateTaskError }] = useMutation(UPDATE_TASK);
    const [CreateTask, { CreateTaskError }] = useMutation(CREATE_TASK);

    const [startDate, setStartDate] = useState(new Date());
    const [completeDate, setCompleteDate] = useState(new Date());
    const [taskEmployees, setTaskEmployees] = useState(() => {
        return employeesProfileInfo.filter(employee => {
            return selectedTask.EmployeeIDs.find(EmployeeID => EmployeeID === employee.employeeID);
        })
    })
    const [availableTaskEmployees, setAvailableTaskEmployees] = useState(() => {
        return employeesProfileInfo.filter(employee => {
            if (!selectedTask.EmployeeIDs.find(EmployeeID => EmployeeID === employee.employeeID)) {
                return employee;
            }
        })
    })
    const [task, setTask] = useState(selectedTask);
    const [showAlert, setShowAlert] = useState(false);

    const {
        isOpen: isVisible,
        onClose,
        onOpen,
    } = useDisclosure({ defaultIsOpen: true })

    useEffect(() => {
        console.log(task);
    }, [task]);


    const changeTaskCompleted = (value) => {
        const updatedTask = {
            ...task,
            completed: value,
        }
        setTask(updatedTask)
    }

    const addTaskEmployee = (data) => {
        // console.log(data);
        // console.log(task);

        setTaskEmployees([...taskEmployees, data]);

        const newAvailableTaskEmployees = availableTaskEmployees.filter(taskEmployee => taskEmployee.employeeID !== data.employeeID);
        setAvailableTaskEmployees(newAvailableTaskEmployees)

        // const EmployeeIDs = task.EmployeeIDs.push(data.employeeID);

        // console.log(EmployeeIDs);

        setTask({
            ...task,
            EmployeeIDs: [...task.EmployeeIDs, data.employeeID],
        })
    }

    const removeTaskEmployee = (data) => {
        setAvailableTaskEmployees([...availableTaskEmployees, data]);
        const newTaskEmployees = taskEmployees.filter(taskEmployee => taskEmployee.employeeID !== data.employeeID);
        setTaskEmployees(newTaskEmployees);
        const newTaskEmployeesID = newTaskEmployees.map(newTaskEmployee => newTaskEmployee.employeeID)
        setTask({
            ...task,
            EmployeeIDs: [...newTaskEmployeesID],
        })
    }

    // updateToDo
    const updateTask = async (_data) => {
        console.log(_data);

        const todos = _data.todos.map(todo => {
            return {
                EmployeeIDs: todo.EmployeeIDs,
                completed: todo.completed,
                description: todo.description,
                name: todo.name,
                todoID: todo.todoID,
            }
        })

        const variables = {
            task: {
                taskID: _data.taskID,
                EmployeeIDs: _data.EmployeeIDs,
                taskDescription: _data.taskDescription,
                taskName: _data.taskName,
                completed: _data.completed,
                todos: todos,
            }
        }
        console.log(variables);

        try {
            const { data } = await UpdateTask({
                variables: variables
            });
            console.log(data);

            setTask(data.updateTask);
            const newTaskData = taskData.map(task => {
                if (task.taskID === data.updateTask.taskID) {
                    return data.updateTask
                }
                return task;
            });
            // const newTaskData = [...filteredTaskData, data.updateTask];
            setTaskData(newTaskData);
        } catch (err) {
            console.error(err);
        }
    }


    return (

        <Container py={{ base: '4', md: '8', }} px={{ base: '2', md: '8', }} maxWidth={"100%"}>
            <Stack spacing="5">
                <HStack spacing="1">
                    <Text minW={"100px"} my={"0px"} color="fg.muted" textStyle="sm">
                        Task ID:    #{selectedTask.taskID}
                    </Text>

                </HStack>
                {/* <Divider /> */}

                <HStack spacing="1">
                    <Text minW={"100px"} my={"0px"} color="fg.muted" textStyle="sm">
                        Task Name:
                    </Text>
                    <Input px="0" maxW={{ md: '3xl', }} defaultValue={selectedTask.taskName} border="none"
                        onChange={(event) => {
                            setTask({
                                ...task,
                                taskName: event.target.value,
                            })
                        }}
                    />
                </HStack>

                <Divider />
                {
                    showAlert && (
                        <Alert status='warning'>
                            <AlertIcon />
                            <Box>
                                <AlertTitle>Warning!</AlertTitle>
                                <AlertDescription>
                                    There are unfinished todos
                                </AlertDescription>
                            </Box>
                            <CloseButton
                                alignSelf='flex-start'
                                position='relative'
                                right={-1}
                                top={-1}
                                onClick={() => {
                                    onClose();
                                    setShowAlert(false);
                                }}
                            />
                        </Alert>)
                }
                <HStack>
                    <Text minW={"100px"} my={"0px"} color="fg.muted" textStyle="sm">
                        Completed:
                    </Text>
                    <Checkbox
                        isChecked={task.completed}
                        onChange={(event) => {
                            if (event.target.checked) {
                                if (task.todos.find(todo => todo.completed === false)) {
                                    console.log("There are unfinished todos");
                                    setShowAlert(true);
                                    return
                                }
                            }
                            changeTaskCompleted(event.target.checked)
                            // props.updateToDo(changedTodo);
                        }}
                    />
                </HStack>

                <Stack spacing="1">
                    <Text minW={"100px"} my={"0px"} color="fg.muted" textStyle="sm">
                        Members:
                    </Text>

                    <HStack spacing="3">
                        <TaskMenu
                            taskEmployees={availableTaskEmployees}
                            addToDoEmployee={addTaskEmployee}
                            icon={<Icon as={TiUserAddOutline} w='64px' h='64px' color={textColor} />} />
                        {taskEmployees.map((taskEmployee, index) => {
                            return <Avatar key={taskEmployee.employeeID} size="lg" name="Christoph Winston" src={taskEmployee.avatarURI}
                                onClick={() => {
                                    removeTaskEmployee(taskEmployee);
                                }} />
                        })}
                    </HStack>
                </Stack>

                <HStack spacing="1">
                    <Stack spacing="1">
                        <Text minW={"100px"} my={"0px"} color="fg.muted" textStyle="sm">
                            Starting Time:
                        </Text>
                        <DatePicker selected={startDate}
                            onChange={(date) => {
                                task.todos
                                setStartDate(date);
                                setTask({
                                    ...task,
                                    startingTime: date,
                                })
                            }} />
                    </Stack>
                    <Stack spacing="1">
                        <Text minW={"100px"} my={"0px"} color="fg.muted" textStyle="sm">
                            Target Time:
                        </Text>
                        <DatePicker selected={completeDate}
                            onChange={(date) => {
                                setCompleteDate(completeDate);
                                setTask({
                                    ...task,
                                    targetTime: date,
                                })
                            }} />
                    </Stack>
                </HStack>

                <Stack spacing="0">
                    <Text minW={"100px"} my={"0px"} color="fg.muted" textStyle="sm">
                        Task Description:
                    </Text>
                    <Textarea
                        onChange={(event) => {
                            setTask({
                                ...task,
                                taskDescription: event.target.value,
                            })
                        }}
                        maxW={{ md: '3xl', }} rows={5} resize="none"
                        defaultValue={selectedTask.taskDescription} border="none" />
                </Stack>

                <Table >
                    <Thead>
                        <Tr>
                            <Th>Completed</Th>
                            <Th>Name</Th>
                            <Th>Description</Th>
                            <Th>Member</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        < TodoTable task={task} todos={task.todos}
                            setTask={setTask} taskEmployees={taskEmployees} changeTaskCompleted={changeTaskCompleted}
                            taskID={selectedTask.taskID} />
                    </Tbody>
                </Table>
                <HStack justifyContent='flex-end'>
                    <Button
                        onClick={() => {
                            updateTask(task);
                            disclosure.onClose();
                        }}

                        colorScheme='blue' mr={3}>
                        Save
                    </Button>
                    <Button onClick={disclosure.onClose}>Cancel</Button>
                </HStack>
            </Stack>

        </Container>
    )
}