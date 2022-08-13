import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import CheckoutSummary from './CheckoutSummary'
import CheckoutFormModal from './CheckoutFormModal'
import { useData } from '../../../context/appContext'
import LoadingOverlay from '../../Utils/LoadingOverlay'

const Checkout = () => {

    const navigate = useNavigate()
    const [cookies] = useCookies(['userLogin'])
    const { userLogin, cart, clearCart } = useData()
    const [isLoading, setIsLoading] = useState(false)
    const [isCheckoutSummary, setIsCheckoutSummary] = useState(null)
    const [IsCheckoutFormModal, setIsCheckoutFormModal] = useState(null)

    const totalProducts = cart.reduce((currVal, val) => {
        return currVal += val.count
    }, 0)
    const totalPrice = cart.reduce((currVal, val) => {
        return currVal += (((100 - val.productDiscount)/100 * val.productPrice) * val.count)
    }, 0)
    const dataProducts = cart.map(item => {
        const { _id, createdAt, reviews, ...dataItem } = item
        return {
            ...dataItem,
            isReview: false,
            id: _id
        }
    })

    const handleOrder = () => {
        setIsLoading(true)
        fetch(`/api/v1/products/checkStock`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                orderProducts: dataProducts
            })
        }).then(res => res.json()).then((res) => {
            setIsLoading(false)
            if(res.data.length > 0) {
                setIsLoading(false)
                let msgsOutStock = ""
                res.data.forEach((item, idx) => {
                    msgsOutStock += `${idx > 0 ? " and " : ""}${item.productName}`
                })
                Swal.fire({
                    icon: 'error',
                    title: 'Failed',
                    text: `Oops, ${msgsOutStock} is out of stock!`,
                })
            } else {
                setIsCheckoutFormModal(true)
            }
        }).catch((err) => {
            setIsLoading(false)
        })
    }

    return (
        <div className='flex-[0.3] rounded-sm shadow-md py-[20px] px-5 h-max sticky top-[30px]'>
            {isLoading && <LoadingOverlay/>}
            {IsCheckoutFormModal && (
                <CheckoutFormModal 
                    handleCheckoutSummary={setIsCheckoutSummary}
                    handleClose={() => setIsCheckoutFormModal(null)}/> 
            )}
            {isCheckoutSummary && (
                <CheckoutSummary 
                    totalPrice={totalPrice}
                    dataProducts={dataProducts}
                    totalProducts={totalProducts}
                    isCheckoutSummary={isCheckoutSummary}
                    handleClose={() => setIsCheckoutSummary(null)}/>
            )}
            <h1 className='text-center text-xl font-medium mb-[30px] text-[#444]'>Checkout Summary</h1>
            <div className='flex text-base sm:text-[15px] md:text-base flex-col space-y-2 border-b-[1px] border-gray-300 pb-[30px]'>
                <div className="flex__between">
                    <p>Total Products: </p>
                    <p>{totalProducts}</p>
                </div>
                <div className="flex__between">
                    <p>Shipping Cost: </p>
                    <p>Free</p>
                </div>
                <div className="flex__between">
                    <p>Payment Cost: </p>
                    <p>Free</p>
                </div>
            </div>
            <div className='flex flex-col space-y-2 pt-[30px]'>
                <div className="flex__between">
                    <p>Subtotal: </p>
                    <p className='text-pink-500 font-medium tracking-wide'>${totalPrice}</p>
                </div>
                <div className="flex__between">
                    <p>Tax: </p>
                    <p>0%</p>
                </div>
                <div className="flex__between">
                    <p>Total: </p>
                    <p className='text-pink-500 text-lg font-bold tracking-wide'>${totalPrice.toFixed(2)}</p>
                </div>
            </div>
            <div className="flexx space-x-3 mt-3">
                <button className={`btn w-full ${userLogin?.email === 'admin@admin.com' ? 'btn__secondary cursor-not-allowed ' : 'btn__primary'} text-base sm:text-[14px] md:text-base`} onClick={() => cookies?.userLogin && userLogin?.email === "admin@admin.com" ? null : cookies?.userLogin ? handleOrder() : navigate('/login')}>
                    {cookies?.userLogin && userLogin?.email === "admin@admin.com" ? 'Not Allowed' : cookies?.userLogin ? 'Order' : 'Login'}
                </button>
                <button className='btn btn__danger w-full text-base sm:text-[14px] md:text-base' onClick={clearCart}>Clear</button>
            </div>
        </div>
    )
}

export default Checkout