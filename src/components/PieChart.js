import React from "react";
import {
    Chart as ChartJS, ArcElement, Tooltip, Legend, } from "chart.js";
    import { Pie} from "react-chartjs-2";
    ChartJS.register(ArcElement, Tooltip, Legend);
    function PieChart() {
        const data = {
            labels: [
                "Paid",
                "Pending",
                "Cancelled",
            ],
            datasets: [
                {
                    label: "Orders",
                    data: [
                        15,
                        8,
                        2,

                    ],
                    backgroundColor: [
                        "#4CAF50",
                        "#FFC107",
                        "#F44336",
                    ],
                    borderWidth: 1,
                },
            ],
        };
        return (
            <div 
            style={{
                width: "350px",
                margin: "30px auto",
            }}
            >
                <h3 style={{
                    textAlign: "center",
                }}
                >Order Status</h3>
<Pie data={data} />
            </div>
        );
    }
export default PieChart;