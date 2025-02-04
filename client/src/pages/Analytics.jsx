import {
    // Avatar,
    Box,
    // Flex,
    // FormLabel,
    // Icon,
    // Select,
    SimpleGrid,
    // Container,
    Card,
    CardBody,
    CardHeader,
    Heading,
} from "@chakra-ui/react";

// chart
import { Stat } from '../components/card/Stat';
import PieChart from '../components/chart/PieChart';
import LineChart from '../components/chart/LineChart';
import BarChart from "../components/chart/BarChart";

import {
    pieChartOptions,
} from "../variables/charts";

//auth
import Auth from '@utils/auth';

import { Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_THOUGHTS, QUERY_EMPLOYEES, QUERY_ME, QUERY_TASKS } from '@utils/queries';

/**
 * Analytics component that checks if the user is logged in and renders the AnalyticsContent component.
 * If the user is not logged in, the user is redirected to the signup page.
 * @returns <AnalyticsContent />
 */

export default function Analytics() {
    if (!Auth.loggedIn()) {
        return <Navigate to="/signup" />;
    }

    return <AnalyticsContent />;
}

/**
 * AnalyticsContent component that fetches data using GraphQL queries and displays various charts and statistics.
 * @returns 
 */
function AnalyticsContent(){

    //  Fetch user data  
    const { loading: loadingQueryMe, data: dataQueryMe } = useQuery(QUERY_ME);
    const user = dataQueryMe?.me || [];

    //  Fetch task data
    const { loading: loadingQueryTask, data: dataQueryTask } = useQuery(QUERY_TASKS);
    const tasks = dataQueryTask?.tasks || [];

    //  Fetch employees data
    const { loading: loadingQueryEmployees, data: dataQueryEmployees } = useQuery(QUERY_EMPLOYEES);
    const employees = dataQueryEmployees?.employees || [];

    //  Fetch thoughts data
    const { loading: loadingThoughts, data: dataThoughts } = useQuery(QUERY_THOUGHTS);
    const thoughts = dataThoughts?.thoughts || [];

    //  Calculate task assignment  
    const assignedTaskCount = tasks.filter(task => task.EmployeeIDs.length).length;
    const taskAssignment = [assignedTaskCount, tasks.length - assignedTaskCount];

    // Calculate to-do assignment
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

    // Calculate team task completion rate
    const taskCompletionRate = tasks.filter(task => task.completed).length / tasks.length;

    // Calculate team to-do completion rate
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

    // Calculate my task completion rate
    const myTaskCompletionRate =
        tasks.filter(task => (task.completed && task.EmployeeIDs.find(id => id === user.employeeID))).length
        / tasks.filter(task => task.EmployeeIDs.find(id => id === user.employeeID)).length;

    // Calculate employee activity data
    const employeeActivityData = employees.map(employee => {
        const employeeActivity = {
            employeeID: employee.employeeID,
            employeeName: employee.firstname,
            numberOfThoughts: thoughts.filter(thought => thought.EmployeeID === employee.employeeID).length,
            numberOfComments: 0,
            numberOfTask: tasks.filter(task => task.EmployeeIDs.find(id => id === employee.employeeID)).length,
            numberOfCompletedTask: tasks.filter(task => (task.completed && task.EmployeeIDs.find(id => id === employee.employeeID))).length,
            numberOfToDo: 0,
            numberOfCompletedToDo: 0,
            numberOfInCompletedTask: 0,
            numberOfInCompletedToDo: 0,
        };

        thoughts.forEach(thought => {
            thought.comments.forEach(comment => {
                if (comment.EmployeeID === employee.employeeID) {
                    employeeActivity.numberOfComments += 1;
                }
            });
        });

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

    // Define stats for display
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

    // Define bar chart data for daily traffic
    const barChartDataDailyTraffic = [
        {
            name: "Daily Traffic",
            data: employeeActivityData.map(employeeActivity => employeeActivity.numberOfTask),
        },
    ];

    // Define bar chart options for daily traffic
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

    // Define bar chart data for task and to-do consumption
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

    // Define bar chart options for task and to-do consumption
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

    if (loadingQueryMe || loadingQueryEmployees || loadingThoughts || loadingQueryTask) {
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
    );
}
