import {
    Avatar,
    Box,
    Flex,
    FormLabel,
    Icon,
    Select,
    SimpleGrid,
    Container,
    useColorModeValue,
    Card,
    CardBody,
    CardHeader,
    Heading,
} from "@chakra-ui/react";

// chart
import { CardTwoBtn } from '../components/card/CardTwoBtn';
import { Stat } from '../components/card/Stat';
import PieChart from '../components/chart/PieChart';
import LineChart from '../components/chart/LineChart';
import BarChart from "../components/chart/BarChart";

import {
    pieChartData,
    pieChartOptions,
    // lineChartDataTotalSpent,
    // lineChartOptionsTotalSpent,
    // barChartDataDailyTraffic,
    // barChartOptionsDailyTraffic,
    // barChartDataConsumption,
    // barChartOptionsConsumption,
} from "../variables/charts";

//auth
import Auth from '@utils/auth';

import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import { QUERY_THOUGHTS, QUERY_EMPLOYEES, QUERY_ME, QUERY_TASKS } from '@utils/queries';




export default function Analytics() {

    if (!Auth.loggedIn()) {
        // Alert("Log in or sign up");
        return <Navigate to="/signup" />;
    }

    //  QUERY_ME  
    const { loading: loadingQueryMe, data: dataQueryMe } = useQuery(QUERY_ME);
    const user = dataQueryMe?.me || [];

    //  QUERY_TASKS  
    const { loading: loadingQueryTask, data: dataQueryTask } = useQuery(QUERY_TASKS);
    const tasks = dataQueryTask?.tasks || [];

    //  QUERY_EMPLOYEES_PROFILE_INFO  
    const { loading: loadingQueryEmployees, data: dataQueryEmployees } = useQuery(QUERY_EMPLOYEES);
    const employees = dataQueryEmployees?.employees || [];

    //  QUERY_THOUGHTS  
    const { loading: loadingThoughts, data: dataThoughts } = useQuery(QUERY_THOUGHTS);
    const thoughts = dataThoughts?.thoughts || [];

    //  taskAssignment  
    const assignedTaskCount = tasks.filter(task => task.EmployeeIDs.length).length;
    const taskAssignment = [assignedTaskCount, tasks.length - assignedTaskCount];

    // toDoAssignment
    let toDoAssignment = [0, 0];
    tasks.forEach(task => {
        task.todos.forEach(todo => {
            if (todo.EmployeeIDs.length) {
                toDoAssignment[0] += 1;
            } else {
                toDoAssignment[1] += 1;
            }
        }
        )
    });

    // teamTaskCompletionRate
    const taskCompletionRate = tasks.filter(task => task.completed).length / tasks.length;

    // teamToDoCompletionRate
    let todoCompletion = [0, 0];
    tasks.forEach(task => {
        task.todos.forEach(todo => {
            if (todo.completed) {
                todoCompletion[0] += 1;
            }
            todoCompletion[1] += 1;
        }
        )
    });
    const todoCompletionRate = (todoCompletion[0] / todoCompletion[1]);

    // myTaskCompletionRate
    const myTaskCompletionRate =
        tasks.filter(task => (task.completed && task.EmployeeIDs.find(id => id === user.employeeID))).length
        / tasks.filter(task => task.EmployeeIDs.find(id => id === user.employeeID)).length;

    // employeeActivityData

    const employeeActivityData = employees.map(employee => {
        const employeeActivity = {
            employeeID: "",
            employeeName: "",
            numberOfThoughts: 0,
            numberOfComments: 0,
            numberOfTask: 0,
            numberOfToDo: 0,
            numberOfCompletedTask: 0,
            numberOfCompletedToDo: 0,
            numberOfInCompletedTask: 0,
            numberOfInCompletedToDo: 0,
        }
        employeeActivity.employeeID = employee.employeeID;
        // employeeActivity.employeeName = employee.firstname + " " + employee.lastname;
        employeeActivity.employeeName = employee.firstname;

        employeeActivity.numberOfThoughts = thoughts.filter(thought => thought.EmployeeID === employee.employeeID).length;

        thoughts.forEach(thought => {
            thought.comments.forEach(comment => {
                if (comment.EmployeeID === employee.employeeID) {
                    employeeActivity.numberOfComments += 1;
                }
            });
        });

        employeeActivity.numberOfTask = tasks.filter(task => task.EmployeeIDs.find(id => id === employee.employeeID)).length
        employeeActivity.numberOfCompletedTask = tasks.filter(task => (task.completed && task.EmployeeIDs.find(id => id === employee.employeeID))).length

        tasks.forEach(task => {
            task.todos.forEach(todo => {
                if (todo.EmployeeIDs.find(id => id === employee.employeeID)) {
                    if (todo.completed) {
                        employeeActivity.numberOfCompletedToDo += 1;
                    }
                    employeeActivity.numberOfToDo += 1;
                }
            }
            )
        });

        employeeActivity.numberOfInCompletedTask = employeeActivity.numberOfTask - employeeActivity.numberOfCompletedTask;
        employeeActivity.numberOfInCompletedToDo = employeeActivity.numberOfToDo - employeeActivity.numberOfCompletedToDo;

        return employeeActivity;
    })

    const stats = [
        {
            label: 'My Task Completion Rate',
            value: (myTaskCompletionRate * 100).toFixed(1) + " %",
            delta: {
                value: '0.1%',
                isUpwardsTrend: false,
            },
        },
        {
            label: 'Team Task Completion Rate',
            value: (taskCompletionRate * 100).toFixed(1) + " %",
            delta: {
                value: '320',
                isUpwardsTrend: true,
            },
        },
        {
            label: 'Team Todo Completion Rate',
            value: (todoCompletionRate * 100).toFixed(1) + " %",
            delta: {
                value: '2.3%',
                isUpwardsTrend: true,
            },
        },

    ]

    const lineChartDataTotalSpent = [
        {
            name: "Thought",
            data: employeeActivityData.map(employeeActivity => employeeActivity.numberOfThoughts),
        },
        {
            name: "Comments",
            data: employeeActivityData.map(employeeActivity => employeeActivity.numberOfComments),
        },
    ];

    const lineChartOptionsTotalSpent = {
        chart: {
            toolbar: {
                show: true,
            },
            dropShadow: {
                enabled: true,
                top: 13,
                left: 0,
                blur: 10,
                opacity: 0.1,
                color: "#4318FF",
            },
        },
        colors: ["#4318FF", "#39B8FF"],
        markers: {
            size: 0,
            colors: "white",
            strokeColors: "#7551FF",
            strokeWidth: 3,
            strokeOpacity: 0.9,
            strokeDashArray: 0,
            fillOpacity: 1,
            discrete: [],
            shape: "circle",
            radius: 2,
            offsetX: 0,
            offsetY: 0,
            showNullDataPoints: true,
        },
        tooltip: {
            theme: "dark",
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "smooth",
            type: "line",
        },
        xaxis: {
            type: "numeric",
            categories: employeeActivityData.map(employeeActivity => employeeActivity.employeeName),
            labels: {
                style: {
                    colors: "#A3AED0",
                    fontSize: "12px",
                    fontWeight: "500",
                },
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            show: true,
        },
        legend: {
            show: true,
            position: 'bottom',
        },
        grid: {
            show: true,
            column: {
                color: ["#7551FF", "#39B8FF"],
                opacity: 0.5,
            },
        },
        color: ["#7551FF", "#39B8FF"],
    };

    const barChartDataDailyTraffic = [
        {
            name: "Daily Traffic",
            data: employeeActivityData.map(employeeActivity => employeeActivity.numberOfTask),
        },
    ];

    const barChartOptionsDailyTraffic = {
        chart: {
            toolbar: {
                show: false,
            },
        },
        tooltip: {
            style: {
                fontSize: "12px",
                fontFamily: undefined,
            },
            onDatasetHover: {
                style: {
                    fontSize: "12px",
                    fontFamily: undefined,
                },
            },
            theme: "dark",
        },
        xaxis: {
            categories: employeeActivityData.map(employeeActivity => employeeActivity.employeeName),
            show: false,
            labels: {
                show: true,
                style: {
                    colors: "#A3AED0",
                    fontSize: "14px",
                    fontWeight: "500",
                },
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            show: true,
            color: "black",
            labels: {
                show: true,
                style: {
                    colors: "#CBD5E0",
                    fontSize: "14px",
                },
            },
        },
        grid: {
            show: true,
            strokeDashArray: 5,
            yaxis: {
                lines: {
                    show: true,
                },
            },
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },
        fill: {
            type: "gradient",
            gradient: {
                type: "vertical",
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                colorStops: [
                    [
                        {
                            offset: 0,
                            color: "#4318FF",
                            opacity: 1,
                        },
                        {
                            offset: 100,
                            color: "rgba(67, 24, 255, 1)",
                            opacity: 0.28,
                        },
                    ],
                ],
            },
        },
        dataLabels: {
            enabled: false,
        },
        plotOptions: {
            bar: {
                borderRadius: 10,
                columnWidth: "40px",
            },
        },
    };

    const barChartDataConsumption = [
        {
            name: "Completed Task & ToDo",
            data: employeeActivityData.map(employeeActivity => employeeActivity.numberOfCompletedTask + employeeActivity.numberOfCompletedToDo),
        },
        {
            name: "InCompleted Task & ToDo",
            data: employeeActivityData.map(employeeActivity => employeeActivity.numberOfInCompletedTask + employeeActivity.numberOfInCompletedToDo),
        },
    ];

    const barChartOptionsConsumption = {
        chart: {
            stacked: true,
            toolbar: {
                show: false,
            },
        },
        tooltip: {
            style: {
                fontSize: "12px",
                fontFamily: undefined,
            },
            onDatasetHover: {
                style: {
                    fontSize: "12px",
                    fontFamily: undefined,
                },
            },
            theme: "dark",
        },
        xaxis: {
            categories: employeeActivityData.map(employeeActivity => employeeActivity.employeeName),
            show: false,
            labels: {
                show: true,
                style: {
                    colors: "#A3AED0",
                    fontSize: "14px",
                    fontWeight: "500",
                },
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            show: true,
            color: "black",
            labels: {
                show: true,
                style: {
                    colors: "#A3AED0",
                    fontSize: "14px",
                    fontWeight: "500",
                },
            },
        },

        grid: {
            borderColor: "rgba(163, 174, 208, 0.3)",
            show: true,
            yaxis: {
                lines: {
                    show: true,
                    opacity: 0.5,
                },
            },
            row: {
                opacity: 0.5,
            },
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },
        fill: {
            type: "solid",
            colors: ["#5E37FF", "#6AD2FF"],
        },
        legend: {
            show: true,
            position: 'bottom',
        },
        colors: ["#5E37FF", "#6AD2FF"],
        dataLabels: {
            enabled: false,
        },
        plotOptions: {
            bar: {
                borderRadius: 10,
                columnWidth: "20px",
            },
        },
    };

    const textColor = useColorModeValue("gray.700", "white");
    const paleGray = useColorModeValue("secondaryGray.400", "whiteAlpha.100");
    const white = useColorModeValue('white', 'navy.900');

    if (loadingQueryMe || loadingQueryEmployees || loadingThoughts) {
        return <div>Loading...</div>;
    }
    return (
        <Box >
            <SimpleGrid
                columns={{ sm: 1, md: 3, "2xl": 3 }}
                gap='3'
                m='5'>
                {stats.map((stat, id) => (
                    <Stat key={id} {...stat} />
                ))}
            </SimpleGrid>
            <SimpleGrid
                columns={{ sm: 1, md: 2, "2xl": 2 }}
                gap='3'
                m='5'
            >
                <SimpleGrid
                    columns={{ sm: 1, md: 2, "2xl": 2 }}
                    gap='3'
                    m='0'
                >
                    <Card >
                        <CardBody>
                            <CardHeader>
                                <Heading size='md'>Task Assignment</Heading>
                            </CardHeader>

                            <PieChart
                                h='100%'
                                w='100%'
                                chartData={taskAssignment}
                                chartOptions={pieChartOptions}
                            />
                        </CardBody>
                    </Card>
                    <Card >
                        <CardBody>
                            <CardHeader>
                                <Heading size='md'>Todo Assignment</Heading>
                            </CardHeader>

                            <PieChart
                                h='100%'
                                w='100%'
                                chartData={toDoAssignment}
                                chartOptions={pieChartOptions}
                            />
                        </CardBody>
                    </Card>
                </SimpleGrid>

                <Card>
                    <CardBody>
                        <CardHeader>
                            <Heading size='md'>Employee Activities</Heading>
                        </CardHeader>
                        <Box minH='260px' w='100%' mt='auto'>
                            <LineChart
                                chartData={lineChartDataTotalSpent}
                                chartOptions={lineChartOptionsTotalSpent}
                            />
                        </Box>
                    </CardBody>
                </Card>
            </SimpleGrid>
            <SimpleGrid
                columns={{ sm: 1, md: 2, "2xl": 2 }}
                gap='3'
                m='5'
            >
                <Card>
                    <CardBody>
                        <CardHeader>
                            <Heading size='md'>Task Per Employee</Heading>
                        </CardHeader>
                        <Box h='240px' mt='auto'>
                            <BarChart
                                chartData={barChartDataDailyTraffic}
                                chartOptions={barChartOptionsDailyTraffic}
                            />
                        </Box>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <CardHeader>
                            <Heading size='md'>Employee Task & ToDo</Heading>
                        </CardHeader>
                        <Box h='240px' mt='auto'>
                            <BarChart
                                chartData={barChartDataConsumption}
                                chartOptions={barChartOptionsConsumption}
                            />
                        </Box>
                    </CardBody>
                </Card>

            </SimpleGrid>

        </Box>
    )


}
