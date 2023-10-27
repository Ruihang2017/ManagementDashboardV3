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
} from '@chakra-ui/react'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'
import { useState, useEffect } from 'react';
import { TaskModal } from '../modal/TaskModal';

//   import { members } from './data'

const members = [
    {
        id: '1',
        name: 'Christian Nwamba',
        handle: '@christian',
        email: 'christian@chakra-ui.com',
        avatarUrl: 'https://bit.ly/code-beast',
        status: 'active',
        role: 'Senior Developer Advocate',
        rating: 4,
    },
    {
        id: '2',
        name: 'Kent C. Dodds',
        handle: '@kent',
        email: 'kent@chakra-ui.com',
        avatarUrl: 'https://bit.ly/kent-c-dodds',
        status: 'active',
        role: 'Director of DX',
        rating: 4,
    },
    {
        id: '3',
        name: 'Prosper Otemuyiwa',
        handle: '@prosper',
        email: 'prosper@chakra-ui.com',
        avatarUrl: 'https://bit.ly/prosper-baba',
        status: 'active',
        role: 'Director of Evangelism',
        rating: 4,
    },
    {
        id: '4',
        name: 'Ryan Florence',
        handle: '@ryan',
        email: 'ryan@chakra-ui.com',
        avatarUrl: 'https://bit.ly/ryan-florence',
        status: 'active',
        role: 'Co-Founder',
        rating: 4,
    },
    {
        id: '5',
        name: 'Segun Adebayo',
        handle: '@segun',
        email: 'segun@chakra-ui.com',
        avatarUrl: 'https://bit.ly/sage-adebayo',
        status: 'active',
        role: 'Frontend UI Engineer',
        rating: 4,
    },
]

const taskDataInput = [
    {
        "taskID": "301",
        "taskName": "Menu Update",
        "taskDescription": "Update the restaurant menu for the new season.",
        "todos": [
            {
                "todoID": "401",
                "name": "Create new menu items",
                "description": "Design and create new menu items.",
                "completed": false,
                "completionTime": "2023-11-10 03:30 PM",
                "EmployeeIDs": [
                    "1"
                ]
            }
        ],
        "startingTime": "2023-10-22 08:00 AM",
        "targetTime": "2023-11-15 05:00 PM",
        "completed": false,
        "EmployeeIDs": [
            "1"
        ]
    },
    {
        "taskID": "302",
        "taskName": "Inventory Check",
        "taskDescription": "Conduct inventory check for supplies and ingredients.",
        "todos": [],
        "startingTime": "2023-10-23 10:00 AM",
        "targetTime": "2023-11-10 03:30 PM",
        "completionTime": "2023-11-10 03:30 PM",
        "completed": true,
        "EmployeeIDs": [
            "2"
        ]
    },
    {
        "taskID": "303",
        "taskName": "Customer Service Training",
        "taskDescription": "Train staff for exceptional customer service.",
        "todos": [
            {
                "todoID": "402",
                "name": "Create training materials",
                "description": "Develop training materials for staff.",
                "completed": true,
                "completionTime": "2023-10-25 09:30 AM",
                "EmployeeIDs": [
                    "3"
                ]
            }
        ],
        "startingTime": "2023-10-24 09:30 AM",
        "targetTime": "2023-10-24 11:00 AM",
        "completed": false,
        "EmployeeIDs": [
            "3"
        ]
    },
    {
        "taskID": "304",
        "taskName": "Weekend Specials",
        "taskDescription": "Plan and prepare weekend special dishes.",
        "todos": [],
        "startingTime": "2023-10-25 10:00 AM",
        "targetTime": "2023-11-20 05:00 PM",
        "completed": false,
        "EmployeeIDs": [
            "4"
        ]
    },
    {
        "taskID": "305",
        "taskName": "Cleaning and Sanitization",
        "taskDescription": "Ensure the restaurant is clean and sanitized daily.",
        "todos": [
            {
                "todoID": "403",
                "name": "Sanitize kitchen equipment",
                "description": "Regularly sanitize kitchen equipment.",
                "completed": true,
                "completionTime": "2023-10-26 02:00 PM",
                "EmployeeIDs": [
                    "5",
                    "1"
                ]
            }
        ],
        "startingTime": "2023-10-26 11:00 AM",
        "targetTime": "2023-11-15 03:30 PM",
        "completionTime": "2023-11-15 03:30 PM",
        "completed": true,
        "EmployeeIDs": [
            "5",
            "1"
        ]
    }
]

export const TaskTable = ({ taskData, employeesProfileInfo }) => {

    const disclosure = useDisclosure()
    const [selectedTask, SetSelectedTask] = useState("");

    // const [taskData, setTaskData] = useState(taskDataInput);
    // console.log(employeesProfileInfo);


    return (
        <>
            <Table >
                <Thead>
                    <Tr>
                        <Th>Status</Th>
                        <Th>TaskID</Th>
                        <Th>TaskName</Th>
                        <Th>Deadline</Th>
                        <Th>Member</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {taskData.map((task) => (
                        <Tr key={task.taskID}>

                            <Td>
                                <Badge size="sm" colorScheme={task.completed ? 'green' : 'red'}>
                                    {task.completed ? "Completed" : "Incomplete"}
                                </Badge>
                            </Td>
                            <Td>
                                <Text color="fg.muted">{task.taskID}</Text>
                            </Td>
                            <Td>
                                <Text color="fg.muted">{task.taskName}</Text>
                            </Td>
                            <Td>
                                <Text color="fg.muted">{task.targetTime}</Text>
                            </Td>
                            <Td>
                                <HStack spacing="1">
                                    {task.EmployeeIDs.map((id) => {
                                        const employee = employeesProfileInfo.find((data) => data.employeeID === id);
                                        return (
                                            <Avatar key={id} size="sm" name="Christoph Winston" src={employee.avatarURI} />
                                        )
                                    })}
                                </HStack>
                            </Td>
                            <Td>
                                <HStack spacing="1">
                                    {/* <Checkbox /> */}
                                    <IconButton icon={<FiEdit2 />}
                                        variant="tertiary" aria-label="Edit task" onClick={() => {
                                            disclosure.onOpen();
                                            SetSelectedTask(task);
                                        }} />
                                </HStack>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <TaskModal disclosure={disclosure} selectedTask={selectedTask} employeesProfileInfo={employeesProfileInfo} />
        </>
    )
}