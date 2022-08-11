import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import { BsArrowRight } from 'react-icons/bs'

const ProductItem = ({product, inCart, handleNavigate, handleAddCart}) => {
    return (
        <div className={`h-[300px] sm:h-[350px] py-3 sm:py-5 px-3 rounded-md shadow-card ${product.productStock < 1 ? 'cursor-not-allowed' : 'cursor-pointer group'} flex flex-col relative overflow-hidden`} onClick={() => product.productStock > 0 && handleNavigate()}>
            {product.productStock < 1 && (
                <>
                    <div className='absolute w-full h-full top-0 bottom-0 left-0 right-0 bg-gray-500 opacity-50 z-30'>
                    </div>
                    <div className="absolute -left-[33px] top-2 bg-red-400 px-8 py-2 rounded text-white z-[31] transform -rotate-45 text-sm md:text-base">Sold Out</div>
                </>
            )}
            {product.productDiscount !== 0 && (
                <div className='absolute z-[10] bg-pink-500 rounded-sm py-1 px-3 top-2 left-2 text-white'>
                    <p className='text-sm'>-{product.productDiscount}%</p>
                </div>
            )}
            {product.reviews.length > 0 && (
                <div className='absolute z-[10] bg-[rgba(0,0,0,0.5)] rounded-sm py-1 px-3 bottom-[160px] right-2 text-white'>
                    <p className='text-[12px] md:text-sm'>{product.reviews.length} reviews</p>
                </div>
            )}
            <div className='w-full h-[120px] sm:h-[150px]'>
                <img src={product.productImage.productImageURL} alt={product.productName} className="w-full h-full object-contain transition duration-300 ease-in transform group-hover:scale-[1.02]"/>
            </div>
            <div className='flex justify-between flex-col flex-1'>
                <div className='mt-5'>
                    <h1 className='font-medium text-[13px] sm:text-[15px] line-clamp-1'>{product.productName}</h1>
                    {/* <h1 className='text-pink-600 font-bold text-[14px] sm:text-xl line-clamp-1'>${product.productPrice}</h1> */}
                    <div className='flexx text-pink-600 font-bold text-[13px] sm:text-lg space-x-1 sm:space-x-2'>
                        <h2 className={`${product.productDiscount !== 0 && 'text-[12px] sm:text-[14px] line-through text-gray-500'}`}>
                            ${product?.productPrice}
                        </h2>
                        {product.productDiscount !== 0 && (
                            <h2>
                                ${((100 - product.productDiscount)/100 * product?.productPrice).toFixed(2)}
                            </h2>  
                        )}       
                    </div>
                    <div className='flexx space-x-1 mt-2'>
                        {Array(product.productRating).fill('').map((_, idx) => (
                            <AiFillStar key={idx} className='text-pink-500 text-[13px] sm:text-[16px]'/>
                        ))}
                    </div>
                </div>
                <div className={`${inCart ? 'bg-gray-400 text-[#444] cursor-not-allowed' : 'btn__primary text-white'} transition duration-300 ease-in rounded-sm w-full text-white py-2 px-3 relative group`}>
                    <p className='text-center text-[13px] sm:text-[15px]' onClick={(e) => !inCart && handleAddCart(e)}>
                        {inCart ? 'In Cart' : 'Add to Cart'}
                    </p>
                    {!inCart && <BsArrowRight className='absolute right-7 transition duration-300 ease-in transform group-hover:translate-x-4 top-3 hidden sm:block'/>}
                </div>
            </div>
        </div>
    )
}

export default ProductItem