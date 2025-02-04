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
import { FiEdit2, FiTrash2 } from 'react-icons/fi'
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * TaskTableRow component to display a single task row in the task table.
 * @param {Object} props - Component properties.
 * @param {Object} props.task - Task data.
 * @param {Array} props.employeesProfileInfo - Array of employee profile information.
 * @param {Function} props.setSelectedTask - Function to set the selected task.
 * @param {Object} props.disclosure - Disclosure object for modal control.
 * @param {boolean} props.isNew - Flag indicating if the task is new.
 */
export const TaskTableRow = ({ task, employeesProfileInfo, setSelectedTask, disclosure, isNew }) => {
    const [isEditing, SetIsEditing] = useState(false)

    return (
        <>
            <Tr >
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
                        <IconButton icon={<FiEdit2 />}
                            variant="tertiary" aria-label="Edit task" onClick={() => {
                                disclosure.onOpen();
                                setSelectedTask(task);
                            }} />
                    </HStack>
                </Td>
            </Tr>
        </>
    )
}

TaskTableRow.propTypes = {
    task: PropTypes.object.isRequired,
    employeesProfileInfo: PropTypes.array.isRequired,
    setSelectedTask: PropTypes.func.isRequired,
    disclosure: PropTypes.object.isRequired,
    isNew: PropTypes.bool,
};