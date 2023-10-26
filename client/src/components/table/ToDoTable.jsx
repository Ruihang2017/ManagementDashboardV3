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

} from '@chakra-ui/react'
import { FiEdit2, FiTrash2, FiCheckSquare } from 'react-icons/fi'

import { useState, useEffect } from 'react';
import { TaskModal } from '../modal/TaskModal';


export const TodoTable = ({ todos }) => {

    // const [taskData, setTaskData] = useState(taskDataInput);
    // console.log(taskData);
    // const [todoCompleted, setTodoCompleted] = useState(false);

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
                                return <Avatar key={EmployeeID} size="sm" name="Christoph Winston" src="https://tinyurl.com/yhkm2ek8" />
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
                    <Input px="0" maxW={{ md: '3xl', }} defaultValue={" Task name"} />
                </Td>
                <Td>
                    <Input px="0" maxW={{ md: '3xl', }} defaultValue={" Task description"} />
                </Td>
                <Td>
                    <Input px="0" maxW={{ md: '3xl', }} defaultValue={" Members involved"} />
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