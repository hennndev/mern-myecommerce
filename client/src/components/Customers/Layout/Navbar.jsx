import React, { useState } from 'react'
import Navigations from './Navigations'
import { useNavigate } from 'react-router-dom'
import { MdOutlineLightMode } from 'react-icons/md'
import { useData } from '../../../context/appContext'
import { AiOutlineShoppingCart, AiOutlineMenu } from 'react-icons/ai'

const Navbar = () => {

    const navigate = useNavigate()
    const [showSidebar, setShowSidebar] = useState(false)
    const { userLogin, saveCurrentUser, cart } = useData()

    const handleRoute = (route) => {
        navigate(route)
        setShowSidebar(false)
    }   
    const totalItems = cart.reduce((currVal, val) => {
        return currVal += val.count
    }, 0)

    return (
        <>
            <header className='flex__between container py-4 px-5'>
                <h1 className='text-xl font-medium text-pink-500' onClick={() => handleRoute('/')}>Agustinaku</h1>
                <ul className={`hidden md:flexx nav__links`}>
                    <Navigations userLogin={userLogin} handleRoute={handleRoute} saveCurrentUser={saveCurrentUser}/>      
                    <MdOutlineLightMode className='cursor-pointer hidden md:block text-lg ml-5 mr-3'/>
                    <div className="relative cursor-pointer" onClick={() => handleRoute('/cart')}>
                        <AiOutlineShoppingCart className='cursor-pointer hidden md:block text-lg'/>
                        {totalItems > 0 && (
                            <div className='absolute py-[1px] px-[7px] text-[12px] text-white -top-3 -right-3 bg-red-500 rounded-full text-center'>{totalItems}</div>
                        )}
                    </div>
                </ul>
                <div className="flexx md:hidden space-x-5">
                    <MdOutlineLightMode className='cursor-pointer text-lg md:ml-5 md:mr-3'/>
                    <div className='relative cursor-pointer' onClick={() => handleRoute('/cart')}>
                        <AiOutlineShoppingCart className='text-lg'/>
                        {totalItems > 0 && (
                            <div className='absolute py-[1px] px-[7px] text-[12px] text-white -top-3 -right-3 bg-red-500 rounded-full text-center'>{totalItems}</div>
                        )}
                    </div>
                    <AiOutlineMenu className='text-lg cursor-pointer z-50' onClick={() => setShowSidebar(!showSidebar)}/>
                </div>
            </header>
            {showSidebar && (
                <ul className={`flex flex-col space-y-2 md:hidden nav__links container px-5 pt-2`}>
                    <Navigations userLogin={userLogin} handleRoute={handleRoute} saveCurrentUser={saveCurrentUser}/>
                </ul>
            )}
        </>
    )
}

export default Navbar