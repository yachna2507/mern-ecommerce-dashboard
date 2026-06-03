import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar
 } from "react-chartjs-2";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
function AnalyticsChart() {
    const data = {
        labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
        ],
        datasets: [
            {
                label: "Revenue(₹)",

                data: [
                    5000,
                    7000,
                    6000,
                    9000,
                    12000,
                ],
                backgroundColor: [
                    "#4CAF50",
                    "#2196F3",
                    "#FF9800",
                    "#9C27B0",
                    "#F44336",
                    "#00BCD4",
                ],
                borderWidth: 1,
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Monthly Revenue",
            },
            legend: {
                display: true,
                
            },
        },
    };
    
    return (
        <div>
            <Bar data={data} 
            options={options}
            />

</div>
        
    );
}
export default AnalyticsChart;