import React, { useState, useEffect } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import Modal from '../../components/Utils/Modal'
import { useNavigate, useParams } from 'react-router-dom'
import LoadingOverlay from '../../components/Utils/LoadingOverlay'

const OrderHistoryDetail = () => {
    const navigate = useNavigate()
    const { orderId } = useParams()
    const [order, setOrder] = useState(null)
    const [isModal, setIsModal] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
      if(orderId) {
        getOrder()
      }
    }, [orderId])

    const getOrder = async() => {
        setIsLoading(true)
        try {
            const req = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/orders/${orderId}`)
            const res = await req.json()
            if(res) {
                const data = res.data
                setIsLoading(false)
                setOrder(data)
            }
        } catch (error) {
            setIsLoading(false)
            navigate('/abc')
        }
    }


    return (
        <section className='py-[40px] px-5 flex-1'>
            {isLoading && <LoadingOverlay/>}
            {isModal && (
                <Modal admin>
                    <h1 className='text-center text-xl'>User Info</h1>
                    <div className='mt-3 text-[#444]'>
                        <img src={isModal.orderBuyer.profileImage.profileImageURL || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} alt="image-modal" className='w-[100px] h-[100px] object-contain mb-2'/>
                        <div className='flex flex-col mb-2'>
                            <p className="mb-1">Username : <span className='font-medium'>{isModal.orderInfo.name}</span></p>
                            <p className="mb-1">User Email : <span className='font-medium'>{isModal.orderInfo.emailActive}</span></p>
                            <p className="mb-1">User Country : <span className='font-medium'>{isModal.orderInfo.country || 'Indonesia'}</span></p>
                            <p className="mb-1">User Address : <span className='font-medium'>{isModal.orderInfo.address || 'Still Empty'}</span></p>
                            <p className="mb-1">User Telpon Number : <span className='font-medium'>{isModal.orderInfo.telpNumber || 'Still Empty'}</span></p>
                            <p className="mb-1 text-blue-500 cursor-pointer underline" onClick={() => navigate(`/dashboard/users/${isModal.orderBuyer._id}`)}>Orders History</p>
                        </div>
                        <button className='bg-gray-500 py-2 px-3 rounded-sm text-white transition duration-300 hover:bg-gray-600' onClick={() => setIsModal(false)}>Close Info</button>
                    </div>
                </Modal>
            )}
            <div className='flexx bg-gray-600 text-white py-2 px-5 rounded-sm cursor-pointer w-max transition duration-300 ease-in hover:bg-gray-700 mb-10 sm:mb-5' onClick={() => navigate(-1)}>
                <BiArrowBack className='mr-2 text-lg'/>
                <p>Get Back</p>
            </div>
            <div className='w-full p-5 bg-white'>
                <div className='flex flex-col space-y-2 text-[#444] relative' key={order?._id}>
                    <div className="flex__between">
                        <h1 className='font-medium'>Order ID: #{order?._id.slice(0, 10)}</h1>
                        <p className={`font-medium ${order?.orderStatus} ${order?.orderStatus !== 'Cancelled' && order?.orderStatus !== 'Delivered' && 'animate-pulse'} bg-white shadow-lg rounded-sm py-1 px-[10px] absolute -top-10 -left-2 sm:static`}>{order?.orderStatus}</p>
                    </div>
                    <p>Order Username: {order?.orderInfo.name}</p>
                    <p>Order User Detail: <span className='text-blue-500 underline cursor-pointer' onClick={() => setIsModal(order)}>User Detail</span></p>
                    <p>Total Products: {order?.orderTotalProducts} Products</p>
                    <p className='text-pink-500 font-medium'>Total Price: ${order?.orderTotalPrice}</p>
                    <p className=''>Payment Method: {order?.paymentMethod}</p>
                    <p className=''>Products Ordered: </p>
                    {order?.orderProducts.map(item => (
                        <div className='flexx mb-5' key={item.id}>
                            <div className='h-[150px] flex-[0.4] sm:flex-[0.2] mr-[10px]'>
                                <img src={item.productImage.productImageURL} alt={item.productName} className="object-contain h-full w-full"/>
                            </div>
                            <div className='flex-[0.6] sm:flex-[0.8]'>
                                <h1 className='font-medium'>{item.productName}</h1>
                                <h1 className='text-pink-500 font-medium'>Price: ${item.productPrice}</h1>
                                {item.productDiscount > 0 && <p className='text-[#444]'>Discount: {item.productDiscount}%</p>}
                                <h1>Quantity: {item.count}x</h1>
                                <h1 className='text-pink-500 font-medium'>Total: ${item.count * item.productPrice}</h1>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default OrderHistoryDetail