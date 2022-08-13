import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import moment from 'moment'
import millify from 'millify'
import LoadingOverlay from '../../components/Utils/LoadingOverlay'
import {
    Chart,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip
  } from 'chart.js';
  
  Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip
  );

const Analytics = () => {

    const [year, setYear] = useState(2022)
    const [dataOrders, setDataOrders] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        fetch(`/api/v1/orders`).then(res => res.json()).then((data) => {
            setIsLoading(false)
            setDataOrders(data.data.filter(data => new Date(data.createdAt).getFullYear() === year))
        }).catch(() => {
            setIsLoading(false)
        }) 
    }, [year])

    const months = moment.monthsShort()
    const totalOrdersPerMonth = []
    const totalIncomePerMonth = []
    months.forEach((month, idx) => {
        totalOrdersPerMonth.push(
            dataOrders.filter(order => moment(order.createdAt).format('M') === String(idx + 1)).length > 0 ? 
                dataOrders.filter(order => moment(order.createdAt).format('M') === String(idx + 1)).length : 0
        )
    })
    months.forEach((month, idx) => {
        totalIncomePerMonth.push(
            dataOrders.filter(order => moment(order.createdAt).format('M') === String(idx + 1)).length > 0 ? 
                dataOrders.filter(order => {
                    if(order.paymentMethod === 'COD' && order.orderStatus === 'Delivered') {
                        return moment(order.createdAt).format('M') === String(idx + 1)
                    }
                    if(order.paymentMethod === 'Credit Card') {
                        return moment(order.createdAt).format('M') === String(idx + 1)
                    }
                }).reduce((currVal, val) => currVal += val.orderTotalPrice, 0) : 0
        )
    })


    const dataTotalOrders = {
        labels: months,
        datasets: [
            {
                label: `Total Orders`,
                data: totalOrdersPerMonth,
                backgroundColor: '#F65A83',
                borderColor: '#F65A83' 
            },
        ]
    }
    const dataTotalIncome = {
        labels: months,
        datasets: [
            {
                label: `Income`,
                data: totalIncomePerMonth,
                backgroundColor: '#2FDD92',
                borderColor: '#2FDD92'
            }
        ]
    }
    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }

    return (
        <section className='py-[40px] px-5 flex-1'>
            {isLoading && <LoadingOverlay/>}
            {!isLoading && (
                <>
                    <select id="" value={year} onChange={(e) => setYear(e.target.value)} className='mb-5'>
                        {[...new Set(dataOrders?.map(order => new Date(order.createdAt).getFullYear()))]?.map(year => (
                            <option value={year} key={year}>Data Analytic in {year} - {year + 1}</option>
                        ))}
                    </select>
                    <div className='w-full lg:w-[95%] bg-white p-10 rounded-md mb-10'>
                        <h1 className="text-xl lg:text-2xl font-medium mb-5 text-center text-[#444]">Analytic Income {year} - {year + 1}</h1>
                        <Line data={dataTotalIncome} options={options}/>
                    </div>
                    <div className='w-full lg:w-[95%] bg-white p-10 rounded-md mb-10'>
                        <h1 className="text-xl lg:text-2xl font-medium mb-5 text-center text-[#444]">Analytic Orders {year} - {year + 1}</h1>
                        <Line data={dataTotalOrders} options={options}/>
                    </div>
                </>
            )}
        </section>
    )
}

export default Analytics