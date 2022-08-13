import React, { useState, useEffect } from 'react'
import moment from 'moment'
import millify from 'millify'
import { Line } from 'react-chartjs-2'
import { useNavigate } from 'react-router-dom'
import AdminCards from '../../components/Admin/AdminCards'
import LoadingOverlay from '../../components/Utils/LoadingOverlay'

const Dashboard = () => {

    const navigate = useNavigate()
    const [orders, setOrders] = useState([])
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        Promise.all([
            fetch(`/api/v1/orders`),
            fetch(`/api/v1/users`)
        ]).then((res) => Promise.all(res.map(r => r.json()))).then(data => {
            setIsLoading(false)
            const ordersData = data[0].data.filter(data => new Date(data.createdAt).getFullYear() === new Date().   getFullYear())
            setOrders(ordersData)
            setUsers(data[1].data.filter(user => user.email !== 'admin@admin.com' && new Date(user.createdAt).getMonth() === new Date().getMonth()))
        }).catch((err) => {
            setIsLoading(false)
        })
    }, [])

    const income = orders.filter(order => order.orderStatus !== 'Pending').reduce((currVal, val) => {
        return currVal += val.orderTotalPrice
    }, 0)
    const totalOrders = orders.filter(order => new Date(order.createdAt).getMonth() === new Date().getMonth())

    

    const months = moment.monthsShort()
    const totalOrdersPerMonth = []
    const totalIncomePerMonth = []
    months.forEach((month, idx) => {
        totalOrdersPerMonth.push(
            orders.filter(order => moment(order.createdAt).format('M') === String(idx + 1)).length > 0 ? 
                orders.filter(order => moment(order.createdAt).format('M') === String(idx + 1)).length : 0
        )
    })
    months.forEach((month, idx) => {
        totalIncomePerMonth.push(
            orders.filter(order => moment(order.createdAt).format('M') === String(idx + 1)).length > 0 ? 
                orders.filter(order => moment(order.createdAt).format('M') === String(idx + 1)).reduce((currVal, val) => currVal += val.orderTotalPrice, 0) : 0
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
            <AdminCards ordersLength={totalOrders.length} usersLength={users.length} ordersIncome={millify(income)}/>
            <div className='mt-5 bg-white p-5'>
                <div className="flex__between mb-3">
                    <h2 className='text-xl lg:text-2xl font-medium text-[#444]'>Orders Today</h2>
                    <p className='cursor-pointer text-blue-600 hover:underline' onClick={() => navigate('/dashboard/orders-history')}>Show More</p>
                </div>
                <div className='overflow-x-auto w-full'>
                    <table className='w-full border-collapse border-[1px] border-gray-200 rounded-sm bg-white'>
                        <thead>
                            <tr className='bg-gray-200 text-[#444]'>
                                <th className='text-center p-3'>No</th>
                                <th className='text-center p-3'>Id</th>
                                <th className='text-center p-3'>Date</th>
                                <th className='text-center p-3'>Username</th>
                                <th className='text-center p-3'>Status</th>
                                <th className='text-center p-3'>Info Detail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.filter(order => new Date(order.createdAt).getDay() === new Date().getDay()).length > 0 ? orders.filter(order => new Date(order.createdAt).getDay() === new Date().getDay()).slice(0, 5).map((order, idx) => (
                                <tr key={order._id}>
                                    <td className='p-3 text-center'>{idx + 1}</td>
                                    <td className='p-3 text-center whitespace-nowrap'>#{order?._id.slice(0, 10)}</td>
                                    <td className='p-3 text-center whitespace-nowrap'>
                                        {moment(order?.createdAt).calendar()}
                                    </td>
                                    <td className='p-3 text-center whitespace-nowrap'>
                                        {order?.orderInfo.name}
                                    </td>
                                    <td className={`p-3 text-center whitespace-nowrap ${order.orderStatus}`}>
                                        {order?.orderStatus}
                                    </td>
                                    <td className='p-3 text-center text-blue-600 underline cursor-pointer whitespace-nowrap' onClick={() => navigate(`/dashboard/orders-history/${order._id}`)}>Orders Detail</td>
                                </tr>
                            )) : (
                                <tr>
                                     {Array(6).fill(" ").map((_, idx) => (
                                        <td className='p-3 text-center whitespace-nowrap' key={idx}>
                                            ---
                                        </td>
                                    ))}
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='mt-5 bg-white p-5'>
                <div className="flex__between mb-3">
                    <h2 className='text-xl lg:text-2xl font-medium text-[#444]'>New Users this Month</h2>
                    <p className='cursor-pointer text-blue-600 hover:underline' onClick={() => navigate('/dashboard/users')}>Show More</p>
                </div>
                <div className='overflow-x-auto w-full'>
                    <table className='w-full border-collapse border-[1px] border-gray-200 rounded-sm bg-white'>
                        <thead>
                            <tr className='bg-gray-200 text-[#444]'>
                                <th className='text-center p-3'>No</th>
                                <th className='text-center p-3'>Id</th>
                                <th className='text-center p-3'>Username</th>
                                <th className='text-center p-3'>Email</th>
                                <th className='text-center p-3'>Country</th>
                                <th className='text-center p-3'>Info Detail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? users.map((user, idx) => (
                                <tr key={user._id}>
                                    <td className='p-3 text-center'>{idx + 1}</td>
                                    <td className='p-3 text-center whitespace-nowrap'>{user?._id.slice(0, 15)}</td>
                                    <td className='p-3 text-center whitespace-nowrap'>
                                        {user?.username}
                                    </td>
                                    <td className='p-3 text-center whitespace-nowrap'>
                                        {user?.email}
                                    </td>
                                    <td className='p-3 text-center whitespace-nowrap'>
                                        {user?.country || '---'}
                                    </td>
                                    <td className='p-3 text-center text-blue-600 underline cursor-pointer whitespace-nowrap' onClick={() => navigate(`/dashboard/users/${user._id}`)}>Orders History</td>
                                </tr>
                            )) : (
                                <tr>
                                     {Array(6).fill(" ").map((_, idx) => (
                                        <td className='p-3 text-center whitespace-nowrap' key={idx}>
                                            ---
                                        </td>
                                    ))}
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='w-full lg:w-[95%] bg-white p-10 rounded-md mt-10'>
                <h1 className="text-xl lg:text-2xl font-medium mb-5 text-center text-[#444]">Analytic Business {new Date().getFullYear()} - {new Date().getFullYear() + 1}</h1>
                <Line data={dataTotalOrders} options={options}/>
            </div>
        </section>
    )
}

export default Dashboard