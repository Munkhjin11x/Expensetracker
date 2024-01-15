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
import RecordTab from '@/components/Record';


const BarChart = () => {


    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const data = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
            {
                label: 'Monthly Sales',
                data: [50, 60, 70, 80, 90],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)', 
                borderWidth: 1,
            },
        ],
    };
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
        <div className='px-[120px]'>
            <Navbar/>
            <h2>Monthly Sales Bar Chart</h2>
            <Bar data={data} options={options} />
            <Card/>
            <RecordTab/>
        </div>
    );
};

export default BarChart;
