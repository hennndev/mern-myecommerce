import React from 'react'

const OrderProductItem = ({item, isDelivered, handleReview}) => {
    return (
        <div className='flexx relative'>
            <div className='h-[150px] flex-[0.4] sm:flex-[0.2] mr-[10px]'>
                <img src={item.productImage.productImageURL} alt={item.productName} className="object-contain h-full w-full"/>
            </div>
            <div className='flex flex-col md:flex-row md:flex__between flex-[0.6] sm:flex-[0.8]'>
                <div>
                    <h1 className='font-medium'>{item.productName}</h1>
                    {item.productDiscount > 0 && <h1 className='font-medium bg-pink-500 text-sm text-white py-1 px-2 rounded-sm absolute top-0 left-0'>Sale {item.productDiscount}%</h1>}
                    <h1 className='font-medium text-pink-500'>Price: {' '}
                        <span className={`${item.productDiscount > 0 ? 'text-sm text-gray-600 line-through' : 'text-pink-500 text-base'}`}>${item.productPrice}</span> {' '}
                        {item.productDiscount > 0 && 
                            <span>
                                ${((100 - item.productDiscount)/100) * item.productPrice}
                            </span>
                        }                  
                    </h1>
                    <h1>Quantity: {item.count}x</h1>
                    <h1 className='text-pink-500 font-medium'>Total: ${((100 - item.productDiscount)/100) * (item.productPrice * item.count)}</h1>
                </div>
                {!item?.isReview && isDelivered && (
                    <button className='btn w-max btn__warning text-[13px] md:text-sm md:h-max mt-1 px-[8px] py-[5px]' onClick={handleReview}>Add Review</button>
                )}
            </div>
        </div>
    )
}

export default OrderProductItem