import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js'
import { Bar } from 'react-chartjs-2'



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
    }
   
    
    memberIds = memberIds.map(memberId => boardMembers.find(member => member._id === memberId))
    const labels = memberIds.map(member => member.fullname)

    const data = {
        labels,
        datasets: [
            {
                label: 'Tasks per member',
                
                data: memberTaskCount,
                backgroundColor: [`rgba(255, 99, 132, 0.5)`,`rgba(255, 99, 300, 0.5)`,`rgba(100, 99, 500, 0.5)`],
            },
          
         
           
            
            
        ],
    }

    return <Bar options={options} data={data} />

}

