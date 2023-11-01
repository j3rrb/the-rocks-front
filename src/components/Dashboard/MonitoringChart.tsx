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
import useWebSocket, { ReadyState } from 'react-use-websocket'

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
    const { data, labels } = useSelector((state: RootState) => state.chart)
    // const { lastMessage, readyState } = useWebSocket('ws://localhost:3100/');

    const populateChart = async () => {
        const [labels, values] = await listSensorData('USIPAV', 1)

        dispatch(setLabels(labels));
        dispatch(setData(values))
    }

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:3100");
        ws.onopen = (event) => {
            console.log({ onopen: event });
        };

        ws.onmessage = function (this: WebSocket, ev: MessageEvent) {
            if (this.readyState === 1) {
                console.log(this, ev);
            }
        };

        populateChart()

        return () => {
            ws.close()
        }
    }, [])

    // useEffect(() => {
    //     console.log({ lastMessage });
    // }, [lastMessage])

    // useEffect(() => {
    //     console.log({ readyState });
    // }, [readyState]);

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