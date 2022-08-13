import React, { useState, useEffect } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { BsArrowRight } from 'react-icons/bs'
import { useData } from '../../context/appContext'
import ArrowTop from '../../components/Utils/ArrowTop'
import { useParams, useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../components/Utils/LoadingSpinner'
import Review from '../../components/Customers/ProductDetail/Review'
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5'

const ProductDetail = () => {
    const navigate = useNavigate()
    const { productId } = useParams()
    const { addProductToCart, cart } = useData()
    const [product, setProduct] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const existProductInCart = cart.find(item => item?._id === product?._id)

    useEffect(() => {
        try {
            setIsLoading(true)
            fetch(`/api/v1/products/${productId}`).then(res => res.json()).then(res => {
                setIsLoading(false)
                if(!res.data) {
                    navigate('/page-not-found')
                }
                setProduct({...res.data, count: 1})
            }).catch(() => {
                setIsLoading(false)
            })
        } catch (error) {
            navigate('/page-not-found')
        }
    }, [])

    const handleCountTemp = (val = 'add') => {
        let updatedCart = {...product}
        if(val === 'add') {
            updatedCart = {
                ...product, 
                count: updatedCart.count === updatedCart.productStock ? updatedCart.productStock : updatedCart.count === 20 ? 20 : updatedCart.count + 1
            }
        } else {
            updatedCart = {
                ...product, 
                count: updatedCart.count === 1 ? 1 : updatedCart.count - 1
            }
        }
        setProduct(updatedCart)
    }
    return (
        <section className='mt-[50px] container px-5'>
            <ArrowTop/>
            {isLoading && (
                <div className='flex__center mt-[50px]'>
                    <LoadingSpinner/>
                </div>
            )}
                {product && (
                    <div className='flex flex-col items-center md:flex-row md:items-start justify-center'>
                        <div className='w-4/5 h-[300px] md:w-[300px] md:mr-[50px] flex-1 md:flex-[0.4]'>
                            <img src={product?.productImage.productImageURL} alt={product?.productName} className="object-contain w-full h-full"/>
                        </div>
                        <div className='flex-1 md:flex-[0.7] mt-[30px] md:mt-0 text-[#444]'>
                            <h1 className='font-bold text-3xl mb-2'>
                                {product?.productName} {' '}
                                {product.productDiscount !== 0 && (
                                    <span className='bg-pink-500 rounded-sm py-1 px-3 text-white text-sm ml-1'>
                                        -{product.productDiscount}%
                                    </span>
                                )}
                            </h1>
                            <div className='flexx font-bold text-2xl mb-2 space-x-3 text-pink-600'>
                                <h2 className={`${product.productDiscount !== 0 && 'text-xl line-through text-gray-500'}`}>
                                    ${product?.productPrice}
                                </h2>
                                {product.productDiscount !== 0 && (
                                    <h2>
                                        ${((100 - product.productDiscount)/100 * product?.productPrice).toFixed(2)}
                                    </h2>  
                                )}       
                            </div>
                            <div className='flexx space-x-1 mt-1 mb-2'>
                                {Array(product.productRating).fill('').map((_, idx) => (
                                    <AiFillStar key={idx} className='text-pink-500 text-[16px]'/>
                                ))}
                            </div>
                            <div className='flexx space-x-2 font-medium mb-2'>
                                <p className='capitalize'>{product?.productCategory}</p>
                                <p>|</p>
                                <p>{product?.productCompany}</p>
                                <p>|</p>
                                <p>Stock: {product?.productStock}</p>
                            </div>
                            <p className='mb-2'>{product?.productDescription}</p>
                            <div className='flexx space-x-3 mb-5'>
                                <IoRemoveCircleOutline className={`${product?.count === 1 ? 'text-gray-400 cursor-not-allowed' : 'cursor-pointer text-gray-600'} text-[25px]`} onClick={() => handleCountTemp('remove')}/>
                                <p className='text-lg'>{product?.count}</p>
                                <IoAddCircleOutline className={`${product?.count === 20 || product?.count === product?.productStock ? 'cursor-not-allowed text-gray-400' : 'cursor-pointer text-gray-600'} text-[25px]`} onClick={() => handleCountTemp('add')}/>
                            </div>
                            <div className={`${existProductInCart ? 'bg-gray-400 cursor-not-allowed' : 'btn__primary'} text-white transition duration-300 ease-in-out rounded-sm w-[200px] cursor-pointer py-2 px-3 relative group`} onClick={() => !existProductInCart && addProductToCart(product)}>
                                <p className='text-center text-[15px]'>
                                    {existProductInCart ? 'In Cart' : 'Add to Cart'}
                                </p>
                                {!existProductInCart && <BsArrowRight className='absolute right-7 transition duration-300 ease-in transform group-hover:translate-x-4 top-3'/>}
                            </div>
                        </div>
                    </div>
                )}


            <div className='mt-[40px]'>
                {!isLoading && (
                    <>
                        <h1 className='text-xl text-[#444] mb-3'>Product Reviews</h1>
                        <div className='flex flex-col space-y-4'>
                            {product?.reviews.length > 0 ? product?.reviews.map(review => (
                               <Review key={review._id} review={review}/>
                            )) : (
                                <p className='text-[#444]'>Reviews not available</p>
                            )}
                        </div>
                    </>
                )}
            </div>
        </section>
    )
}

export default ProductDetail