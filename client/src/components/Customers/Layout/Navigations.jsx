import React from 'react'
import Swal from 'sweetalert2'
import { useCookies } from 'react-cookie'

const Navigations = ({userLogin, handleRoute, saveCurrentUser}) => {

    const [cookies, setCookie, removeCookie] = useCookies(['userLogin'])

    const handleLogout = () => {
        Swal.fire({
            title: 'Logout from this App?',
            showCancelButton: true,
            confirmButtonColor: '#F94C66',
            confirmButtonText: 'Logout',
        }).then((result) => {
            if(result.isConfirmed) {
                removeCookie('userLogin', {path:'/'})
                saveCurrentUser(null)
            }
        })  
    }

    return (
        <>
            <li onClick={() => handleRoute('/')} className='nav__link'>Home</li>
            {
                cookies.userLogin && userLogin?.email !== 'admin@admin.com' && (
                    <>
                        <li onClick={() => handleRoute('/orders')} className='nav__link'>Orders</li>
                        <li onClick={() => handleRoute('/profile')} className='nav__link'>Profile</li>
                    </>
                )
            }
            {
                userLogin?.email === 'admin@admin.com' && (
                    <li onClick={() => handleRoute('/dashboard')} className='nav__link'>Dashboard</li>
                )
            }
            {
                cookies?.userLogin ? 
                    <li className='nav__link text-red-500' onClick={handleLogout}>Logout</li> :
                    <li onClick={() => handleRoute('/login')} className='nav__link'>Login</li>
            }
        </>
    )
}

export default Navigations