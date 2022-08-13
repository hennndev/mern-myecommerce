import React from 'react'
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5'

const CartItem = ({item, handleAddCount, handleRemoveCount, handleDelete}) => {
    return (
        <div className='sm:h-[220px] md:h-[250px] p-3 rounded-md shadow-lg flex flex-col sm:flex-row mb-[40px] relative'>
            {item.productDiscount !== 0 && (
                <div className='absolute bg-pink-500 rounded-sm py-1 px-3 top-0 -left-2 text-white'>
                    <p className='text-sm'>-{item.productDiscount}%</p>
                </div>
            )}
            <div className='h-[200px] sm:h-full sm:flex-[0.3] mb-[20px] sm:mb-0 sm:mr-[20px]'>
                <img src={item.productImage.productImageURL} alt={item.productName} className="w-full h-full object-contain"/>
            </div>
            <div className='flex py-2 flex-[0.7] justify-between'>
                <div className='flex flex-col justify-between'>
                    <div className='flex flex-col text-[#444]'>
                        <h1 className='font-medium text-[16px] md:text-xl mb-1 md:mb-2 line-clamp-1'>
                            {item.productName} 
                        </h1>
                        <div className='flexx space-x-2 text-[15px] md:text-base font-medium mb-1 md:mb-2'>
                            <p className='capitalize'>{item.productCategory}</p>
                            <p>|</p>
                            <p>{item.productCompany}</p>
                            <p>|</p>
                            <p>Stock: {item.productStock}</p>
                        </div>
                        <p className='text-sm text-gray-700 mb-2 line-clamp-2'>{item.productDescription}</p>
                        <div className='flexx space-x-3 mb-3'>
                            <IoRemoveCircleOutline className={`text-[25px] ${item.count === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 cursor-pointer'}`} onClick={() => item.count > 1 && handleRemoveCount()}/>
                            <p className='md:text-lg'>{item?.count}</p>
                            <IoAddCircleOutline className={`text-[25px] ${item.count === 20 || item.count === item.productStock ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 cursor-pointer'}`} onClick={() => item.count < 20 && handleAddCount()}/>
                        </div>
                    </div>
                    <button className='btn btn__danger w-max mt-3 sm:mt-0' onClick={handleDelete}>Remove</button>
                </div>
                <div className='flex items-end justify-between flex-col'>
                    <div className='flex flex-col space-y-1'>
                        <p className={`${item.productDiscount === 0 ? 'font-medium text-pink-500 md:text-lg' : 'font-medium line-through text-gray-500 text-sm'}`}>${item.productPrice.toFixed(2)}</p>
                        {item.productDiscount !== 0 && (
                            <p className='font-medium text-pink-500 md:text-lg'>
                                ${(((100 - item.productDiscount)/100) * item.productPrice).toFixed(2)}
                            </p>
                        )}
                    </div>
                    <p className='font-medium text-pink-500 md:text-lg'>Total <br /> 
                        ${(((100 - item.productDiscount)/100 * item.productPrice) * item.count).toFixed(2)}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CartItem