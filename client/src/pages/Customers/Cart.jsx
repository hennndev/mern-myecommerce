import React from 'react'
import { useData } from '../../context/appContext'
import ArrowTop from '../../components/Utils/ArrowTop'
import CartItem from '../../components/Customers/Cart/CartItem'
import Checkout from '../../components/Customers/Cart/Checkout'
import CartEmpty from '../../components/Customers/Cart/CartEmpty'

const Cart = () => {
    const { cart, addProductToCart, deleteProductInCart } = useData()
    return (
        <section className='mt-[50px] container px-5'>
            <ArrowTop/>
            {cart.length > 0 && (
                <>
                    <h1 className='text-[#444] text-center text-2xl font-medium mb-[30px]'>Your Cart</h1>
                    <div className='flex flex-col sm:flex-row relative'>
                        <div className='sm:flex-[0.7] sm:mr-[20px]'>
                            {cart.map(item => (
                                <CartItem 
                                    key={item._id} 
                                    item={item} 
                                    handleAddCount={() => addProductToCart(item)}
                                    handleRemoveCount={() => deleteProductInCart(item)}
                                    handleDelete={() => deleteProductInCart(item, true)}/>
                            ))}
                        </div>
                        <Checkout/>
                    </div>
                </>
            )}
            {cart.length < 1 && <CartEmpty/>}
        </section>
    )
}

export default Cart