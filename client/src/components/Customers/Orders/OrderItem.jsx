import React from 'react'
import moment from 'moment'
import OrderProductItem from './OrderProductItem'

const OrderItem = ({order, removeOrder, cancelledOrder, handleReview}) => {
    return (
        <div className='rounded-sm p-5 shadow-lg space-y-2 text-[#444] relative mb-[30px]' key={order._id}>
            <div className="flex__between">
                <h1 className='font-medium'>Order ID: #{order._id.slice(0, 10)}</h1>
                <p className={`font-medium ${order.orderStatus} ${order.orderStatus !== 'Cancelled' && order.orderStatus !== 'Delivered' && 'animate-pulse'} shadow-lg rounded-sm py-1 px-[10px] absolute -top-3 -right-1 sm:static`}>{order.orderStatus}</p>
            </div>
            <p>Ordered On: <span className='underline text-pink-500'>{moment(order.createdAt).format('lll')}</span></p>
            <p>Total Products: {order.orderTotalProducts} Products</p>
            <p className='text-pink-500 font-medium'>Total Price: ${order.orderTotalPrice}</p>
            <p>Payment Method: {order.paymentMethod}</p>
            <p>Products Ordered: </p>
            {order.orderProducts.map(item => (
                <OrderProductItem 
                    key={item.id} 
                    item={item} 
                    isDelivered={order.orderStatus === 'Delivered'} 
                    handleReview={() => handleReview({id: item.id, orderId: order._id, userProfile: order.orderBuyer, username: order.orderInfo.name})}/>
            ))}
            {order.orderStatus === 'Pending' && (
                <div className='flex justify-end'>
                    <button className="btn btn__danger" onClick={cancelledOrder}>Cancelled Order</button>
                </div>
            )}
            {order.orderStatus === 'Delivered' || order.orderStatus === 'Cancelled' ? (
                <div className='flex justify-end'>
                    <button className="btn btn__danger" onClick={removeOrder}>Remove Order</button>
                </div>
            ) : null}
        </div>
    )
}

export default OrderItem