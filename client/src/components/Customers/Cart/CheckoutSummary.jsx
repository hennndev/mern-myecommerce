import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import Modal from '../../Utils/Modal'
import { useNavigate } from 'react-router-dom'
import StripeCheckout from 'react-stripe-checkout'
import { useData } from '../../../context/appContext'
import LoadingOverlay from '../../Utils/LoadingOverlay'

const CheckoutSummary = ({isCheckoutSummary, totalProducts, totalPrice, dataProducts, handleClose}) => {

    const navigate = useNavigate()
    const { clearCart } = useData()
    const [isLoading, setIsLoading] = useState(false)
    const [stripeToken, setStripeToken] = useState(null)
    const onToken = (token) => setStripeToken(token)

    useEffect(() => {
        if(stripeToken) {
            setIsLoading(true)
            fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tokenId: stripeToken.id,
                    amount: totalPrice * 100,
                })
            }).then(res => res.json()).then((res) => {
                fetchingOrder(true)
            })
        }
    }, [stripeToken])
    

    const handleCheckout = () => {
        Swal.fire({
            title: 'Order now?',
            text: "New order will be sended and you will accept your items in few days!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: 'gray',
            confirmButtonText: 'Yes, order now!'
            }).then((result) => {
                if(result.isConfirmed) {
                    setIsLoading(true)
                    fetchingOrder()
                }
            })
    }
    const fetchingOrder = (isStripe = null) => {
        const { paymentMethod, orderUserId, ...orderInfo } = isCheckoutSummary
        fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/orders/${orderUserId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                orderBuyer: orderUserId,
                orderInfo: {...orderInfo},
                orderProducts: dataProducts,
                orderTotalProducts: totalProducts,
                orderTotalPrice: totalPrice,
                orderStatus: isStripe ? 'Ordered' : 'Pending',
                paymentMethod
            })
        }).then(res => res.json()).then(() => {
            setIsLoading(false)
            Swal.fire({
                icon: 'success',
                title: 'Order successfully',
                text: 'Thank you. Your order will be delivered in few days :)',
            }).then(() => {
                clearCart()
                setStripeToken(null)
                handleClose()
                navigate('/orders')
            })
        }).catch(() => {
            setIsLoading(false)
            setStripeToken(null)
            Swal.fire({
                icon: 'error',
                title: 'Order Failed',
                text: 'Something went wrong, please repeat again :(',
            })
        })
    }

    return (
        <Modal orderSummary>
            {isLoading && <LoadingOverlay/>}
            <h2 className='text-center text-xl mb-5 font-medium text-[#444]'>Order Summary</h2>
            <div className='flex flex-col space-y-2'>
                <div className="flex__between">
                    <p>Name: </p>
                    <p>{isCheckoutSummary?.name}</p>
                </div>
                <div className={`${isCheckoutSummary.address.split(' ').length === 1 ? 'flex__between' : 'flex flex-col'}`}>
                    <p>Address: </p>
                    <p>{isCheckoutSummary?.address}</p>
                </div>
                <div className="flex__between">
                    <p>Telp Number: </p>
                    <p>+{isCheckoutSummary?.telpNumber}</p>
                </div>
                <div className="flex__between">
                    <p>Total Products: </p>
                    <p>{totalProducts} Products</p>
                </div>
                <div>
                    <p className='mb-1'>Products Ordered: </p>
                    <div className='bg-gray-200 p-4 flex flex-col space-y-2 rounded-sm'>
                        {dataProducts.map((item, idx) => (
                            <p key={item.id}>{idx + 1}. {item.productName} {item.count}x {' '}
                                <span className='text-sm text-pink-500'>{item.productDiscount > 0 && `Sale ${item.productDiscount}%`}</span>
                            </p>
                        ))}
                    </div>
                </div>
                <div className='flex__between'>
                    <p>Payment Method: </p>
                    <p>{isCheckoutSummary?.paymentMethod}</p>
                </div>
                <div className='flex__between'>
                    <p>Total Price: </p>
                    <p className='text-pink-500 font-medium'>${totalPrice}</p>
                </div>
            </div>
            <div className='flexx mt-4 space-x-3'>
                {isCheckoutSummary.paymentMethod === 'COD' && (
                    <button className='btn btn__primary' onClick={handleCheckout}>Submit Order</button>
                )}
                {isCheckoutSummary.paymentMethod === 'Credit Card' && (
                    <StripeCheckout
                        name="Agustina Co."
                        image="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/company-logo-design-template-e4ab4c68b80a762c8cb43f222748c3c4_screen.jpg?ts=1561508783"
                        description={`Total Price is $${totalPrice}`}
                        amount={totalPrice * 100}
                        currency="USD"
                        shippingAddress
                        billingAddress
                        token={onToken}
                        stripeKey='pk_test_51LTHuLIB5YWtvzhVLBXrPpANbuvioa4KAtmQTtCVvkHH1mBjTDxPZtTwBA6ceNdsamMKJe0N3DpUxQVObtrtv3ol004M034idT'>
                        <button className='btn'>Checkout</button>
                    </StripeCheckout>
                )}
                <button className='btn btn__secondary' onClick={handleClose}>Cancel</button>
            </div>
        </Modal>
    )
}

export default CheckoutSummary