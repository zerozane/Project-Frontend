import { useRef, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

// Create gradient for bars
const createGradient = (ctx, chartArea, colorStart, colorEnd) => {
    if (!chartArea) return colorStart;
    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, colorStart);
    gradient.addColorStop(1, colorEnd);
    return gradient;
};

export default function BarChart({
    labels = [],
    datasets = [],
    title = '',
    height = 300
}) {
    const chartRef = useRef(null);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 800,
            easing: 'easeOutQuart',
        },
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: !!title,
                text: title,
                font: {
                    size: 16,
                    weight: 'bold',
                    family: "'Inter', sans-serif",
                },
                color: '#1e293b',
            },
            tooltip: {
                backgroundColor: 'rgba(30, 41, 59, 0.95)',
                titleFont: {
                    size: 14,
                    weight: 'bold',
                    family: "'Inter', sans-serif",
                },
                bodyFont: {
                    size: 13,
                    family: "'Inter', sans-serif",
                },
                padding: 14,
                cornerRadius: 12,
                displayColors: false,
                callbacks: {
                    title: (items) => items[0]?.label || '',
                    label: (item) => `${item.dataset.label}: ${item.formattedValue}`,
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        size: 12,
                        weight: '500',
                        family: "'Inter', sans-serif",
                    },
                    color: '#64748b',
                },
            },
            y: {
                grid: {
                    color: 'rgba(148, 163, 184, 0.15)',
                    drawBorder: false,
                },
                ticks: {
                    font: {
                        size: 11,
                        family: "'Inter', sans-serif",
                    },
                    color: '#94a3b8',
                    padding: 8,
                },
                beginAtZero: true,
            },
        },
        interaction: {
            intersect: false,
            mode: 'index',
        },
        onHover: (event, elements) => {
            event.native.target.style.cursor = elements.length ? 'pointer' : 'default';
        },
    };

    // Dynamic gradient colors based on data
    const gradientColors = [
        { start: 'rgba(16, 185, 129, 0.6)', end: 'rgba(5, 150, 105, 1)' },      // Emerald
        { start: 'rgba(59, 130, 246, 0.6)', end: 'rgba(37, 99, 235, 1)' },      // Blue
        { start: 'rgba(245, 158, 11, 0.6)', end: 'rgba(217, 119, 6, 1)' },      // Amber
        { start: 'rgba(139, 92, 246, 0.6)', end: 'rgba(109, 40, 217, 1)' },     // Violet
    ];

    const getData = () => {
        const chart = chartRef.current;

        return {
            labels,
            datasets: datasets.map((ds, idx) => {
                const colorSet = gradientColors[idx % gradientColors.length];
                const backgroundColor = chart?.ctx && chart?.chartArea
                    ? createGradient(chart.ctx, chart.chartArea, colorSet.start, colorSet.end)
                    : ds.backgroundColor || colorSet.start;

                return {
                    label: ds.label || `Dataset ${idx + 1}`,
                    data: ds.data,
                    backgroundColor,
                    hoverBackgroundColor: colorSet.end,
                    borderRadius: 10,
                    borderSkipped: false,
                    barThickness: 'flex',
                    maxBarThickness: 50,
                    borderWidth: 0,
                };
            }),
        };
    };

    // Force update for gradient
    useEffect(() => {
        const chart = chartRef.current;
        if (chart) {
            chart.update();
        }
    }, [datasets]);

    return (
        <div style={{ height }} className="relative">
            <Bar ref={chartRef} options={options} data={getData()} />
        </div>
    );
}
