import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartData
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Box, Card } from '@mui/material'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { listSensorData } from "../../services";
import { pushData, setData, setLabels } from "../../redux/slices/chart";
import { RootState } from "../../redux/store";
import { io } from "socket.io-client";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Velocidade da esteira',
        },
    },
};

const MonitoringChart = () => {
    const dispatch = useDispatch()
    useWebSocket('ws://localhost:3100', {
        onOpen: (event) => { console.log(event) },
        onMessage(event) {
            console.log(event);
        },
    })
    const { data, labels } = useSelector((state: RootState) => state.chart)

    useEffect(() => {
        listSensorData('USIPAV', 1).then(([labels, values]) => {
            dispatch(setLabels(labels));
            dispatch(setData(values))
        })
    }, [])

    const chartData: ChartData<"line", Record<string, any> | Record<string, any>[], string> = useMemo(() => ({
        labels,
        datasets: [
            {
                label: 'Velocidade em m/s',
                data,
                borderColor: '#FF5C00',
                backgroundColor: 'black',
                borderWidth: 2,
                pointBorderColor: 'white',
                pointBorderWidth: 1,

            },
        ],
    }), [])

    return (
        <Box marginY={3}>
            <Card elevation={5} sx={{ padding: 2 }}>
                <Line options={options} data={chartData} />
            </Card>
        </Box>
    )
}

export default MonitoringChart