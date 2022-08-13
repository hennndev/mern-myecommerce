import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { useNavigate, useParams } from 'react-router-dom'
import AdminSearch from '../../components/Admin/AdminSearch'
import LoadingOverlay from '../../components/Utils/LoadingOverlay'
import AdminPagination from '../../components/Admin/AdminPagination'
import { BsSortAlphaDown, BsSortAlphaDownAlt, BsSortNumericDown, BsSortNumericDownAlt } from 'react-icons/bs'

const OrdersUser = () => {

    const navigate = useNavigate()
    const { userId } = useParams()
    const [page, setPage] = useState(1)
    const [sortData, setSortData] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [userOrders, setUserOrders] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [sortOrderDate, setSortOrderDate] = useState('asc')
    const [sortTotalPrice, setSortTotalPrice] = useState('asc')
    const [sortOrderStatus, setSortOrderStatus] = useState('asc')

    useEffect(() => {
        setIsLoading(true)
        fetch(`/api/v1/users/${userId}`).then(res => res.json()).then(res => {
            setIsLoading(false)
            const data = res.data.ordersHistory
            setUserOrders(data)
        }).catch(err => {
            setIsLoading(false)
        })
    }, [userId])

    const filteredOrders = userOrders.filter(order => {
        return String(order.orderTotalPrice).includes(searchTerm.toLowerCase()) ||
            order.orderStatus.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.paymentMethod.toLowerCase().trim().includes(searchTerm.toLowerCase()) ||
            moment(order.createdAt).format('L').includes(searchTerm)
    })

    const handleSort = (dataSort) => {
        setSortData(dataSort)
        if(dataSort === 'createdAt') {
            setSortOrderDate(sortOrderDate === 'asc' ? 'desc' : 'asc')
        } else if(dataSort === 'orderTotalPrice') {
            setSortTotalPrice(sortTotalPrice === 'asc' ? 'desc' : 'asc')
        } else {
            setSortOrderStatus(sortOrderStatus === 'asc' ? 'desc' : 'asc')
        }
    }
    const sortingData = filteredOrders.sort((a, b) => {
        if(sortData === 'createdAt') {
            if(new Date(a[sortData]) < new Date(b[sortData])) {
                return sortOrderDate === 'asc' ? -1 : 1
            } else if(new Date(a[sortData]) > new Date(b[sortData])) {
                return sortOrderDate === 'asc' ? 1 : -1
            }
        } else if(sortData === 'orderTotalPrice' || sortData === 'orderStatus') {
            if(a[sortData] < b[sortData]) {
                return sortData === 'orderTotalPrice' ? sortTotalPrice === 'asc' ? -1 : 1 : sortOrderStatus === 'asc' ? -1 : 1
            } else if(a[sortData] > b[sortData]) {
                return sortData === 'orderTotalPrice' ? sortTotalPrice === 'asc' ? 1 : -1 : sortOrderStatus === 'asc' ? 1 : -1
            }
        }
        return 0
    })
 

    return (
        <section className='py-[40px] px-5 flex-1'>
            {isLoading && <LoadingOverlay/>}
            <div>
                <div className='mb-[15px]'>
                    <AdminSearch title="users" searchTerm={searchTerm} handleSearch={setSearchTerm}/>
                </div>

                <div className='overflow-x-auto w-full'>
                    <table className='w-full border-collapse border-[1px] border-gray-200 rounded-sm bg-white'>
                        <thead>
                            <tr className='bg-gray-200 text-[#444]'>
                                <th className='text-center p-3'>No</th>
                                <th className='text-center p-3'>Id</th>
                                <th className='text-center p-3 relative group cursor-pointer' onClick={() => handleSort('createdAt')}>
                                    Date
                                    {sortOrderDate === 'asc' ? 
                                        <BsSortNumericDown className='hidden group-hover:block absolute right-0 top-[15px] text-lg'/> :
                                        <BsSortNumericDownAlt className='hidden group-hover:block absolute right-0 top-[15px] text-lg'/>    
                                    }
                                </th>
                                <th className='text-center py-3 px-6 md:px-3 relative group cursor-pointer whitespace-nowrap' onClick={() => handleSort('orderTotalPrice')}>
                                    Total Price
                                    {sortTotalPrice === 'asc' ? 
                                        <BsSortNumericDown className='hidden group-hover:block absolute right-0 top-[15px] text-lg'/> :
                                        <BsSortNumericDownAlt className='hidden group-hover:block absolute right-0 top-[15px] text-lg'/>    
                                    }
                                </th>
                                <th className='text-center py-3 px-6 md:px-3 relative group cursor-pointer whitespace-nowrap' onClick={() => handleSort('orderStatus')}>
                                    Status
                                    {sortOrderStatus === 'asc' ? 
                                        <BsSortAlphaDown className='hidden group-hover:block absolute right-0 top-[15px] text-lg'/> :
                                        <BsSortAlphaDownAlt className='hidden group-hover:block absolute right-0 top-[15px] text-lg'/>
                                    }
                                </th>
                                <th className='text-center p-3'>Info</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortingData.length > 0 ? sortingData.slice((page - 1) * 10, (page * 10)).map((order, idx) => (
                                <tr key={order._id}>
                                    <td className='p-3 text-center'>{idx + 1 + ((page - 1) * 10)}</td>
                                    <td className='p-3 text-center whitespace-nowrap'>#{order._id.slice(0, 10)}</td>
                                    <td className='p-3 text-center whitespace-nowrap'>{moment(order.createdAt).format('L')}</td>
                                    <td className='p-3 text-center whitespace-nowrap text-green-500 font-medium'>${order.orderTotalPrice.toFixed(2)}</td>
                                    <td className={`p-3 text-center whitespace-nowrap ${order.orderStatus}`}>{order.orderStatus}</td>
                                    <td className='p-3 text-center whitespace-nowrap text-blue-500 underline cursor-pointer' onClick={() => navigate(`/dashboard/orders-history/${order._id}`)}>Order Info</td>
                                </tr>
                            )) : (
                                <tr>
                                    {Array(6).fill(' ').map((_, idx) => (
                                        <td className='p-3 text-center whitespace-nowrap' key={idx}>---</td>
                                    ))}
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {filteredOrders.length > 10 && (
                    <div className="flex__center">
                        <AdminPagination page={page} setPage={setPage} isPage={filteredOrders.length > (page * 10)} />  
                    </div>
                )}
            </div>
        </section>
    )
}

export default OrdersUser