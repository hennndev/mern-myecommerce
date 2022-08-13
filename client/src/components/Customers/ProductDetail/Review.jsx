import React from 'react'
import moment from 'moment'
import { AiFillStar } from 'react-icons/ai'

const Review = ({review}) => {
    return (
        <div className="flex flex-col border-b border-1-[#ccc] rounded-sm p-3">
            <div className='flex mb-2'>
                <div className='h-[70px] w-[70px] mr-3'>
                    <img src={review?.userProfile?.profileImage.profileImageURL || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt={review?.username} className='w-full h-full object-contain'/>
                </div>
                <div className='flex flex-col text-[#444]'>
                    <h1 className='mb-1'>{review?.username}</h1>
                    <div className="flexx space-x-1 mb-1">
                        {Array(review?.reviewRating).fill(' ').map((_, idx) => (
                            <AiFillStar className='text-pink-500' key={idx}/>
                        ))}
                    </div>
                    <p className='text-gray-500 text-sm'>{moment(review.createdAt).startOf('hour').fromNow()}</p>
                </div>
            </div>
            <p className='text-gray-500 text-sm'>{review?.reviewBody}</p>
        </div>
    )
}

export default Review