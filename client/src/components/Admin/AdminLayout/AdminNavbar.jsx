import React from 'react'
import Swal from 'sweetalert2'
import { useCookies } from 'react-cookie'
import { useLocation } from 'react-router-dom'
import { useData } from '../../../context/appContext'
import { MdMenuOpen, MdOutlineLightMode, MdOutlineLogout, MdOutlineAccountCircle } from 'react-icons/md'

const AdminNavbar = () => {

    const location = useLocation()
    const { saveCurrentUser, openSidebar, handleOpenSidebar } = useData()
    const [cookies, setCookie, removeCookie] = useCookies(['userLogin'])

    const titlePage = location.pathname.split('/').reverse()

    const handleLogout = () => {
        Swal.fire({
            title: 'Logout from this App?',
            showCancelButton: true,
            confirmButtonColor: '#F94C66',
            confirmButtonText: 'Logout',
        }).then((result) => {
            if (result.isConfirmed) {
                removeCookie('userLogin', {path: '/'})
                saveCurrentUser(null)
            }
        })  
    }

    let title = 'Order Detail'

    if(/\d/.test(titlePage) && titlePage[1] === 'orders-history') {
        title = 'Order Detail'
    } else {
        title = 'Orders User'
    }

    return (
        <header className='flex__between py-3 px-5 w-full shadow-md sticky top-0 bg-white z-10'>
            <div className="flexx space-x-3 text-[#444]">
                <MdMenuOpen className='block lg:hidden cursor-pointer text-[25px]' onClick={() => handleOpenSidebar(!openSidebar)}/>
                <h1 className='text-xl capitalize'>{/\d/.test(titlePage) ? title : titlePage[0].replace('-', ' ')}</h1>
            </div>
            <ul className='flexx text-[#444]'>
                <MdOutlineAccountCircle className='cursor-pointer text-[20px] mr-[15px]'/>
                <MdOutlineLightMode className='cursor-pointer text-[20px] mr-[15px]'/>
                <MdOutlineLogout className='cursor-pointer text-[20px] text-red-500' onClick={handleLogout}/>
            </ul>
        </header>
    )
}

export default AdminNavbar