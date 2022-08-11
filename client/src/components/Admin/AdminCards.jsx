import React from 'react'

const AdminCards = ({ordersLength, usersLength, ordersIncome}) => {
    return (
        <div className='grid grid-cols-cards gap-10'>
            <div className='h-[200px] shadow-xl rounded-md bg-white p-3 relative transform transition duration-500 ease-in-out cursor-pointer hover:-translate-y-2'>
                <h1 className='text-lg'>Total Income</h1> 
                <h1 className='text-4xl font-medium mt-5 text-center text-green-600'>${ordersIncome}<span className='text-[16px] font-normal'>/month</span></h1>
                <p className='absolute bottom-3 right-3 cursor-pointer'>Show Detail</p>
            </div>
            <div className='h-[200px] shadow-xl rounded-md bg-white p-3 relative transform transition duration-500 ease-in-out cursor-pointer hover:-translate-y-2'>
                <h1 className='text-lg'>Orders History</h1>
                <h1 className='text-4xl font-medium mt-5 text-center text-orange-600'>{ordersLength}<span className='text-[16px] font-normal'>Orders/month</span></h1>
                <p className='absolute bottom-3 right-3 cursor-pointer'>Show Detail</p>
            </div>
            <div className='h-[200px] shadow-xl rounded-md bg-white p-3 relative transform transition duration-500 ease-in-out cursor-pointer hover:-translate-y-2'>
                <h1 className='text-lg'>Total Users</h1>
                <h1 className='text-4xl font-medium mt-5 text-center text-red-600'>{usersLength}<span className='text-[16px] font-normal'>users</span></h1>
                <p className='absolute bottom-3 right-3 cursor-pointer'>Show Detail</p>
            </div>
        </div>
    )
}

export default AdminCards