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

import { CardTwoBtn } from '../components/card/CardTwoBtn';
import { Stat } from '../components/card/Stat';
import PieChart from '../components/chart/PieChart';
import LineChart from '../components/chart/LineChart';
import BarChart from "../components/chart/BarChart";

import {
    pieChartData,
    pieChartOptions,
    lineChartDataTotalSpent,
    lineChartOptionsTotalSpent,
    barChartDataDailyTraffic,
    barChartOptionsDailyTraffic,
    barChartDataConsumption,
    barChartOptionsConsumption,
} from "../variables/charts";



const stats = [
    {
        label: 'Total Subscribers',
        value: '71,887',
        delta: {
            value: '320',
            isUpwardsTrend: true,
        },
    },
    {
        label: 'Avg. Open Rate',
        value: '56.87%',
        delta: {
            value: '2.3%',
            isUpwardsTrend: true,
        },
    },
    {
        label: 'Avg. Click Rate',
        value: '12.87%',
        delta: {
            value: '0.1%',
            isUpwardsTrend: false,
        },
    },
]

export default function Analytics() {

    return (
        <Box>
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
                <Card >
                    <CardBody>
                        <CardHeader>
                            <Heading size='md'>Client Report</Heading>
                        </CardHeader>

                        <PieChart
                            h='100%'
                            w='100%'
                            chartData={pieChartData}
                            chartOptions={pieChartOptions}
                        />
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <CardHeader>
                            <Heading size='md'>Client Report</Heading>
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
                            <Heading size='md'>Client Report</Heading>
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
                            <Heading size='md'>Client Report</Heading>
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
