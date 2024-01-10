"use client"
import Navbar from '@/components/Navbar';
import { Bar } from 'react-chartjs-2';
import Card from '@/components/Card';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';


const BarChart = () => {


    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );
    // Sample data
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
            {
                label: 'Monthly Sales',
                data: [50, 60, 70, 80, 90],
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Bar fill color
                borderColor: 'rgba(75, 192, 192, 1)', // Bar border color
                borderWidth: 1, // Bar border width
            },
        ],
    };

    // Chart configuration
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        },
    };

    return (
        <div>
            <Navbar/>
            <h2>Monthly Sales Bar Chart</h2>
            <Bar data={data} options={options} />
            <Card/>
        </div>
    );
};

export default BarChart;
