import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DonutChart({
    labels = [],
    data = [],
    colors = [],
    title = '',
    height = 250
}) {
    const defaultColors = [
        'rgba(16, 185, 129, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(139, 92, 246, 0.8)',
    ];

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 20,
                    usePointStyle: true,
                    font: {
                        size: 12,
                    },
                },
            },
            title: {
                display: !!title,
                text: title,
                font: {
                    size: 16,
                    weight: 'bold',
                },
            },
        },
    };

    const chartData = {
        labels,
        datasets: [
            {
                data,
                backgroundColor: colors.length ? colors : defaultColors.slice(0, data.length),
                borderWidth: 0,
            },
        ],
    };

    return (
        <div style={{ height }}>
            <Doughnut options={options} data={chartData} />
        </div>
    );
}
