import React from 'react'
import { BiGroup } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { IoAnalyticsOutline } from 'react-icons/io5'
import { useData } from '../../../context/appContext'
import { AiOutlineHome, AiOutlineClose } from 'react-icons/ai'
import { MdOutlineStorefront, MdOutlineHistory, MdOutlineLogout } from 'react-icons/md'

const AdminSidebar = () => {

    const navigate = useNavigate()
    const { openSidebar, handleOpenSidebar } = useData()

    const handleRoute = (route) => {
        handleOpenSidebar(false)
        navigate(route)
    }

    return (
        <div className={`fixed ${openSidebar ? 'left-0' : '-left-full'} top-0 bottom-0 w-[280px] shadow-lg h-screen z-20 flex justify-between flex-col py-5 bg-white lg:sticky`}>
            <div className='absolute block lg:hidden top-3 -right-8 p-2 rounded-sm bg-red-500 cursor-pointer' onClick={() => handleOpenSidebar(false)}>
                <AiOutlineClose className='text-xl text-white'/>
            </div>
            <div>
                <div className='text-center'>
                    <h1 className='text-xl text-[#444] font-medium'>MERN E-Commerce</h1>
                </div>
                <div className='mt-10'>
                    <div className='flex items-center py-3 pl-10 pr-3 cursor-pointer hover:bg-gray-200' onClick={() => handleRoute('/dashboard')}>
                        <AiOutlineHome className='mr-3 text-xl'/>
                        <h2 className='text-lg'>Dashboard</h2>
                    </div>
                    <div className='flex items-center py-3 pl-10 pr-3 cursor-pointer hover:bg-gray-200' onClick={() => handleRoute('/dashboard/analytics')}>
                        <IoAnalyticsOutline className='mr-3 text-xl'/>
                        <h2 className='text-lg'>Analytics</h2>
                    </div>
                    <div className='flex items-center py-3 pl-10 pr-3 cursor-pointer hover:bg-gray-200' onClick={() => handleRoute('/dashboard/products')}>
                        <MdOutlineStorefront className='mr-3 text-xl'/>
                        <h2 className='text-lg'>Products</h2>
                    </div>
                    <div className='flex items-center py-3 pl-10 pr-3 cursor-pointer hover:bg-gray-200' onClick={() => handleRoute('/dashboard/users')}>
                        <BiGroup className='mr-3 text-xl'/>
                        <h2 className='text-lg'>Users</h2>
                    </div>
                    <div className='flex items-center py-3 pl-10 pr-3 cursor-pointer hover:bg-gray-200' onClick={() => handleRoute('/dashboard/orders-history')}>
                        <MdOutlineHistory className='mr-3 text-xl'/>
                        <h2 className='text-lg'>Orders History</h2>
                    </div>
                </div>
            </div>
            <div className='flex items-center py-3 pl-10 pr-3 cursor-pointer hover:bg-gray-200 mt-10' onClick={() => handleRoute('/')}>
                <MdOutlineLogout className='mr-3 text-xl'/>
                <h2 className='text-lg'>Back to Homepage</h2>
            </div>
        </div>
    )
}

export default AdminSidebar