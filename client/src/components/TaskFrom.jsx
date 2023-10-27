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
    // DatePicker,
} from '@chakra-ui/react';

// import { SingleDatepicker } from "chakra-dayzed-datepicker";

import { Dropzone } from './dropzone/Dropzone';
import React, { useState, useEffect } from 'react';
// import { SINGLE_SELECTION_MODE, MINDATE, MAXDATE } from "./DatePicker/utils";
// import { LANG_EN, LANG_FR } from "./DatePicker/utils";
// import DatePicker from "./DatePicker/DatePicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { TodoTable } from "./table/ToDoTable"

export const TaskFrom = ({ selectedTask, employeesProfileInfo }) => {

    const [startDate, setStartDate] = useState(new Date());

    const [taskEmployees, setTaskEmployees] = useState(() => {
        return employeesProfileInfo.filter(employee => {
            return selectedTask.EmployeeIDs.find(EmployeeID => EmployeeID === employee.employeeID);
        })
    })

    return (
        <Container py={{ base: '4', md: '8', }} px={{ base: '2', md: '8', }} maxWidth={"100%"}>
            <Stack spacing="5">
                <HStack spacing="1">
                    <Text minW={"100px"} my={"0px"} color="fg.muted" textStyle="sm">
                        Task ID:
                    </Text>
                    <Input px="0" maxW={{ md: '3xl', }} defaultValue={selectedTask.taskID} border="none" />
                </HStack>
                {/* <Divider /> */}

                <HStack spacing="1">
                    <Text minW={"100px"} my={"0px"} color="fg.muted" textStyle="sm">
                        Task Name:
                    </Text>
                    <Input px="0" maxW={{ md: '3xl', }} defaultValue={selectedTask.taskName} border="none" />
                </HStack>

                <Divider />

                <Stack spacing="1">
                    <Text minW={"100px"} my={"0px"} color="fg.muted" textStyle="sm">
                        Members:
                    </Text>
                    <HStack spacing="3">
                        {taskEmployees.map((taskEmployee, index) => {
                            return <Avatar key={taskEmployee.employeeID} size="lg" name="Christoph Winston" src={taskEmployee.avatarURI} />
                        })}
                    </HStack>
                </Stack>

                <HStack spacing="1">
                    <Stack spacing="1">
                        <Text minW={"100px"} my={"0px"} color="fg.muted" textStyle="sm">
                            Starting Time:
                        </Text>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                    </Stack>
                    <Stack spacing="1">
                        <Text minW={"100px"} my={"0px"} color="fg.muted" textStyle="sm">
                            Target Time:
                        </Text>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                    </Stack>
                </HStack>

                <Stack spacing="0">
                    <Text minW={"100px"} my={"0px"} color="fg.muted" textStyle="sm">
                        Task Description:
                    </Text>
                    <Textarea maxW={{ md: '3xl', }} rows={5} resize="none"
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
                        < TodoTable todos={selectedTask.todos} taskEmployees={taskEmployees} taskID={selectedTask.taskID} />
                    </Tbody>
                </Table>
            </Stack>
        </Container>
    )
}