import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Box, Card, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useGetXDaysChartDataQuery } from "../../redux/apis/chart";
import { format } from 'date-fns'

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
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Velocidade da esteira",
    },
  },
};

const MonitoringChart = () => {
  const { data, isLoading, error } = useGetXDaysChartDataQuery({
    companyId: "USIPAV",
    days: 1,
  });
  const [chartData, setChartData] = useState<Record<string, any>[]>([]);
  const [chartLabels, setChartLabels] = useState<string[]>([]);

  useEffect(() => {
    const ws = io("ws://localhost:3100");

    ws.on("USIPAV", (message) => {
      if (!Array.isArray(message)) {
        message = [message];
      }

      message.filter((x: any) => x.SensorId === 'S15').forEach((item: Record<string, any>) => {
        setChartData((prev) => {
          prev.shift();
          return prev;
        });
        setChartData((prev) => [...prev, item.Value]);

        setChartLabels((prev) => {
          prev.shift();
          return prev;
        });
        setChartLabels((prev) => [...prev, format(new Date(item.timestamp.replace(' ', 'T')), 'dd/M/yyyy hh:mm:ss')]);
      });
    });

    return () => {
      ws.disconnect();
    };
  }, []);

  useEffect(() => {
    console.log(data, isLoading, error);

    if (data && !isLoading) {
      const labels = data.filter((x: any) => x.SensorId === 'S15').map(({ timestamp }: any) => format(new Date(timestamp.replace(' ', 'T')), 'dd/M/yyyy hh:mm:ss'));
      const values = data.filter((x: any) => x.SensorId === 'S15').map(({ Value }: any) => Value);

      setChartData(values);
      setChartLabels(labels);
    }
  }, [data, isLoading]);

  const chart: ChartData<
    "line",
    Record<string, any> | Record<string, any>[],
    string
  > = {
    labels: chartLabels,
    datasets: [
      {
        label: "Velocidade em m/s",
        data: chartData,
        borderColor: "#FF5C00",
        backgroundColor: "black",
        borderWidth: 2,
        pointBorderColor: "white",
        pointBorderWidth: 1,
      },
    ],
  };

  return (
    <Box marginY={3}>
      <Card elevation={5} sx={{ padding: 2 }}>
        {isLoading && !data ? (
          <Box alignItems="center" justifyContent="center" display="flex">
            <CircularProgress />
          </Box>
        ) : (
          <Line options={options} data={chart} />
        )}
      </Card>
    </Box>
  );
};

export default MonitoringChart;
