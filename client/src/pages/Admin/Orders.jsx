import React, { useState, useEffect } from 'react'
import moment from 'moment'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { useData } from '../../context/appContext'
import AdminSearch from '../../components/Admin/AdminSearch'
import LoadingOverlay from '../../components/Utils/LoadingOverlay'
import AdminPagination from '../../components/Admin/AdminPagination'
import ChangeStatusOrder from '../../components/Admin/Orders/ChangeStatusOrder'
import { BsSortAlphaDown, BsSortAlphaDownAlt, BsSortNumericDown, BsSortNumericDownAlt } from 'react-icons/bs'

const Orders = () => {

    const navigate = useNavigate()
    const { saveDataTemp } = useData()
    const [page, setPage] = useState(1)
    const [orders, setOrders] = useState([])
    const [isModal, setIsModal] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    const [sortData, setSortData] = useState(null)
    const [sortOrderUsername, setSortOrderUsername] = useState('asc')
    const [sortOrderDate, setSortOrderDate] = useState('asc')
    const [sortTotalPrice, setSortTotalPrice] = useState('asc')
    const [sortOrderStatus, setSortOrderStatus] = useState('asc')

    useEffect(() => {
        setIsLoading(true)
        fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/orders`).then(res => res.json()).then(res => {
            const data = res.data
            setIsLoading(false)
            setOrders(data)
        }).catch(err => {
            setIsLoading(false)
        })
    }, [])

    useEffect(() => {
        if(searchTerm) {
            setPage(1)
        }
    }, [searchTerm])
    


    const handleDelete = (orderId) => {
        Swal.fire({
            title: 'Are you sure want to delete this order history?',
            text: "This order history will deleted permanently!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: 'gray',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                setIsLoading(true)
                fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/orders/${orderId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }).then(res => res.json()).then(res => {
                    setIsLoading(false)
                    Swal.fire(
                        'Deleted!',
                        'Order history has been deleted.',
                        'success'
                    )
                }).catch(err => {
                    setIsLoading(false)
                })
            }
        })
    }

    const filteredOrders = orders.filter(order => {
        return order.orderInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            order.orderInfo.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.orderInfo.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
            String(order.orderInfo.telpNumber).includes(searchTerm) || 
            String(order.orderTotalPrice).includes(searchTerm) ||
            moment(order.createdAt).format('L').includes(searchTerm)
    })

    const handleSort = (dataSort) => {
        setSortData(dataSort)
        if(dataSort === 'name') {
            setSortOrderUsername(sortOrderUsername === 'asc' ? 'desc' : 'asc')
        } else if(dataSort === 'createdAt') {
            setSortOrderDate(sortOrderDate === 'asc' ? 'desc' : 'asc')
        } else if(dataSort === 'orderTotalPrice') {
            setSortTotalPrice(sortTotalPrice === 'asc' ? 'desc' : 'asc')
        } else {
            setSortOrderStatus(sortOrderStatus === 'asc' ? 'desc' : 'asc')
        }
    }
    const sortingData = filteredOrders.sort((a, b) => {
        if(sortData === 'name') {
            if(a.orderInfo[sortData] < b.orderInfo[sortData]) {
                return sortOrderUsername === 'asc' ? -1 : 1
            } else if(a.orderInfo[sortData] > b.orderInfo[sortData]) {
                return sortOrderUsername === 'asc' ? 1 : -1
            }
        } else if(sortData === 'orderTotalPrice' || sortData === 'orderStatus') {
            if(a[sortData] < b[sortData]) {
                return sortData === 'orderTotalPrice' ? sortTotalPrice === 'asc' ? -1 : 1 : sortOrderStatus === 'asc' ? -1 : 1
            } else if(a[sortData] > b[sortData]) {
                return sortData === 'orderTotalPrice' ? sortTotalPrice === 'asc' ? 1 : -1 : sortOrderStatus === 'asc' ? 1 : -1
            }
        } else if(sortData === 'createdAt') {
            if(new Date(a[sortData]) < new Date(b[sortData])) {
                return sortOrderDate === 'asc' ? -1 : 1
            } else if(new Date(a[sortData]) > new Date(b[sortData])) {
                return sortOrderDate === 'asc' ? 1 : -1
            }
        } 
        return 0
    })


    return (
        <section className='py-[40px] px-5 flex-1'>
            {isLoading && <LoadingOverlay/>}
            {isModal && <ChangeStatusOrder 
                isModal={isModal} 
                setIsModal={setIsModal}
                setIsLoading={setIsLoading}/> 
            }
            <div>
                <div className='mb-[15px]'>
                    <AdminSearch title="orders" searchTerm={searchTerm} handleSearch={setSearchTerm}/>
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
                                <th className='text-center py-3 px-6 md:px-3 relative group cursor-pointer' onClick={() => handleSort('name')}>
                                    Username
                                    {sortOrderUsername === 'asc' ? 
                                        <BsSortAlphaDown className='hidden group-hover:block absolute right-0 top-[15px] text-lg'/> :
                                        <BsSortAlphaDownAlt className='hidden group-hover:block absolute right-0 top-[15px] text-lg'/>
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
                                <th className='text-center p-3'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortingData.length > 0 ? sortingData.slice((page - 1) * 7, (page * 7)).map((order, idx) => (
                                <tr key={order._id} className="cursor-pointer hover:bg-gray-100">
                                    <td className='p-3 text-center whitespace-nowrap'>{idx + 1 + ((page - 1) * 7)}</td>
                                    <td className='p-3 text-center whitespace-nowrap'>#{order._id.slice(0, 10)}</td>
                                    <td className='p-3 text-center whitespace-nowrap'>{moment(order.createdAt).format('L')}</td>
                                    <td className='p-3 text-center whitespace-nowrap'>{order.orderInfo.name}</td>
                                    <td className='p-3 text-center whitespace-nowrap text-green-700 font-medium'>${order.orderTotalPrice}</td>
                                    <td className={`p-3 text-center text-[15px] whitespace-nowrap ${order.orderStatus} font-medium`}>{order.orderStatus}</td>
                                    <td className='p-3 text-center whitespace-nowrap'>
                                        <button className='btn btn__primary' onClick={() => navigate(`/dashboard/orders-history/${order._id}`)}>Detail</button>
                                        {order.orderStatus !== 'Cancelled' && order.orderStatus !== 'Delivered' ? (
                                            <button className='btn ml-2' onClick={() => setIsModal({
                                                id: order._id,
                                                orderStatus: order.orderStatus
                                            })}>Edit</button>
                                        ) : (
                                            <button className='btn ml-2 btn__danger' onClick={() => handleDelete(order._id)}>Delete</button>
                                        )}
                                    </td>
                                </tr> 
                            )) : (
                                <tr>
                                    {Array(7).fill('').map((_, idx) => (
                                        <td className='p-3 text-center whitespace-nowrap' key={idx}>---</td>
                                    ))}
                                </tr> 
                            )}
                        </tbody>
                    </table>
                </div>
                {filteredOrders.length > 7 && (
                    <div className='flex__center'>
                        <AdminPagination page={page} setPage={setPage} isPage={filteredOrders.length > (page * 7)}/>  
                    </div>
                )}
            </div>
        </section>
    )
}

export default Orders