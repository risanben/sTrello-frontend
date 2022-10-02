import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import faker from 'faker';
// import { faker } from '@faker-js/faker';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const BarChart = ({ boardMembers, memberIds, memberTaskCount }) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false,
                text: 'Chart.js Bar Chart',
            },
        },
    };
    console.log('memberTaskCount', memberTaskCount);
    console.log('memberIds', memberIds);
    memberIds = memberIds.map(memberId => boardMembers.find(member => member._id === memberId))
    const labels = memberIds.map(member => member.fullname)

    const data = {
        labels,
        datasets: [
            {
                label: 'Tasks per member',
                // data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                data: memberTaskCount,
                backgroundColor: [`rgba(255, 99, 132, 0.5)`,`rgba(255, 99, 300, 0.5)`,`rgba(100, 99, 500, 0.5)`],
            },
            // {
            //     label: 'Dataset 2',
            //     data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            //     backgroundColor: 'rgba(53, 162, 235, 0.5)',
            // },
        ],
    };

    return <Bar options={options} data={data} />;

}

