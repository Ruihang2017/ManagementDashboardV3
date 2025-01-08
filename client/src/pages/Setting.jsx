import {
    Box,
    SimpleGrid,
    Card,
    CardBody,
    CardHeader,
    Heading,
} from "@chakra-ui/react";

import { Stat } from '../components/card/Stat';
import PieChart from '../components/chart/PieChart';
import LineChart from '../components/chart/LineChart';

import {
    pieChartData,
    pieChartOptions,
    lineChartDataTotalSpent,
    lineChartOptionsTotalSpent,
} from "../variables/charts";

// Define statistics data
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

/**
 * Setting component that displays various statistics and charts.
 * @returns {JSX.Element} The rendered component.
 */
export default function Setting() {
    return (
        <Box p={5}>
            <SimpleGrid columns={{ sm: 1, md: 3, "2xl": 3 }} gap={3} mb={5}>
                {stats.map((stat, id) => (
                    <Stat key={id} {...stat} />
                ))}
            </SimpleGrid>
            <SimpleGrid columns={{ sm: 1, md: 2, "2xl": 2 }} gap={3}>
                <Card>
                    <CardHeader>
                        <Heading size='md'>Client Report</Heading>
                    </CardHeader>
                    <CardBody>
                        <PieChart
                            h='100%'
                            w='100%'
                            chartData={pieChartData}
                            chartOptions={pieChartOptions}
                        />
                    </CardBody>
                </Card>
                <Card>
                    <CardHeader>
                        <Heading size='md'>Client Report</Heading>
                    </CardHeader>
                    <CardBody>
                        <Box minH='260px' w='100%' mt='auto'>
                            <LineChart
                                chartData={lineChartDataTotalSpent}
                                chartOptions={lineChartOptionsTotalSpent}
                            />
                        </Box>
                    </CardBody>
                </Card>
            </SimpleGrid>
        </Box>
    );
}
