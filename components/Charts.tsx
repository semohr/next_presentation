import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import useSQL from "lib/useSQL";

ChartJS.register(ArcElement, Tooltip, Legend);

// Set global font color
ChartJS.defaults.color = "#d1cfc7";

export const getColor = (index: number) => {
    // Colorblind friendly colors
    const colors = [
        "#3366CC",
        "#DC3912",
        "#FF9900",
        "#109618",
        "#990099",
        "#3B3EAC",
        "#0099C6",
        "#DD4477",
        "#66AA00",
        "#B82E2E",
        "#316395",
        "#994499",
        "#22AA99",
        "#AAAA11",
        "#6633CC",
        "#E67300",
        "#8B0707",
        "#329262",
        "#5574A6",
        "#3B3EAC",
    ];

    return colors[index % colors.length];
};

export const TypesGraph = (props) => {
    const sql = `SELECT COALESCE(type,"RAW") as type, COUNT(*) * 100.0/ sum(COUNT(*)) over
    () as percent FROM messages GROUP BY type;`;

    const { results: data, isLoading } = useSQL(sql);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    //Wrangle data
    console.log(data);
    const labels = Array.from(data).map((d: any) => d.type);
    const values = Array.from(data).map((d: any) => parseFloat(d.percent));

    const dataChart = {
        labels,
        datasets: [
            {
                label: "Count",
                data: values,
                backgroundColor: labels.map((_, i) => getColor(i)),
            },
        ],
    };
    const options = {
        plugins: {
            legend: {
                position: "chartArea" as const,
                //Align to the left of the figure

                rtl: false,
                labels: {
                    font: {
                        size: 20,
                    },
                },
            },
        },
        maintainAspectRatio: false,
        responsive: true,
    };

    return (
        <div {...props}>
            <Pie data={dataChart} options={options} />
        </div>
    );
};
