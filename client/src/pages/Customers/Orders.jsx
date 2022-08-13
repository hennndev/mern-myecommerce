import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { useData } from '../../context/appContext'
import ArrowTop from '../../components/Utils/ArrowTop'
import LoadingSpinner from '../../components/Utils/LoadingSpinner'
import OrderItem from '../../components/Customers/Orders/OrderItem'
import ModalReview from '../../components/Customers/Orders/ModalReview'

const Orders = () => {

    const navigate = useNavigate()
    const { userLogin } = useData()
    const [isReview, setIsReview] = useState(false)
    const [ordersUser, setOrdersUser] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        fetch(`/api/v1/users/${userLogin.id}`).then(res => res.json()).then((res) => {
            const dataOrders = res.data.ordersHistory.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            setIsLoading(false)
            setOrdersUser(dataOrders)
        }).catch(() => {
            setIsLoading(false)
        })
    },[userLogin.id])
    

    const cancelledOrder = (order) => {
        Swal.fire({
            title: 'Are you sure want to cancelled your order?',
            text: "This order will be cancelled!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: 'gray',
            confirmButtonText: 'Yes, cancelled now!'
            }).then((result) => {
                if(result.isConfirmed) {
                    setIsLoading(true)
                    fetch(`/api/v1/orders/${order._id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            orderStatus: 'Cancelled',
                            orderProducts: order.orderProducts
                        })
                    }).then(res => res.json()).then(() => {
                        setIsLoading(false)
                        Swal.fire({
                            icon: 'success',
                            title: 'Order has been cancelled',
                            text: 'This order cancelled permanent. Thank you',
                        }).then(() => {
                            window.location.reload()
                        })
                    }).catch(() => {
                        setIsLoading(false)
                        Swal.fire({
                            icon: 'error',
                            title: 'Order failed cancelled',
                            text: 'Something went wrong',
                        })
                    })
                }
            })
    }

    const removeOrder = (orderId) => {
        Swal.fire({
            title: 'Are you sure want to remove this order history?',
            text: "This order history will be removed!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: 'gray',
            confirmButtonText: 'Yes, remove now!'
            }).then((result) => {
                if(result.isConfirmed) {
                    setIsLoading(true)
                    fetch(`/api/v1/users/${userLogin?.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            orderId: orderId
                        })
                    }).then(res => res.json()).then(() => {
                        setIsLoading(false)
                        Swal.fire({
                            icon: 'success',
                            title: 'Order has been removed',
                            text: 'This order removed permanent. Thank you',
                        }).then(() => {
                            window.location.reload()
                        })
                    }).catch(() => {
                        setIsLoading(false)
                        Swal.fire({
                            icon: 'error',
                            title: 'Order failed removed',
                            text: 'Something went wrong',
                        })
                    })
                }
            })
    }

    
    return (
        <section className='mt-[50px] container px-5'>
            <ArrowTop/>
            {isReview && <ModalReview 
                isReview={isReview} 
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                handleCancel={() => setIsReview(false)}/> }
            {isLoading && (
                <div className='flex__center mt-[150px]'>
                    <LoadingSpinner/>
                </div>
            )}
            {ordersUser.length > 0 && !isLoading && (
                <>
                    <h1 className='text-center text-2xl font-medium mb-[30px] text-[#444]'>Your Orders</h1>
                    {ordersUser.map(order => (
                        <OrderItem 
                            key={order._id} 
                            order={order} 
                            removeOrder={() => removeOrder(order._id)} 
                            cancelledOrder={() => cancelledOrder(order)} 
                            handleReview={setIsReview}/>
                    ))}
                </>
            )}
            {ordersUser.length < 1 && !isLoading && (
                <div className='flex__center flex-col space-y-5 mt-[150px]'>
                    <h1 className='text-center text-xl font-medium'>Your orders is still empty</h1>
                    <button className='btn btn__primary' onClick={() => navigate('/')}>Shopping Now</button>
                </div>
            )}
        </section>
    )
}

export default Orders