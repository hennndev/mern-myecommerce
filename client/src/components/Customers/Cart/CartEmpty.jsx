import React from 'react'
import { useNavigate } from 'react-router-dom'

const CartEmpty = () => {
    const navigate = useNavigate()
    return (
        <div className='flex__center flex-col space-y-5 mt-[150px]'>
            <h1 className='text-center text-xl font-medium'>Your cart is still empty</h1>
            <button className='btn btn__primary' onClick={() => navigate('/')}>Shopping Now</button>
        </div>
    )
}

export default CartEmpty