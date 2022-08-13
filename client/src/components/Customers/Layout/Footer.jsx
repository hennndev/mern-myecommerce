import React from 'react'
import { useLocation } from 'react-router-dom'

const Footer = () => {
    const location = useLocation()
    return (
        <footer className={`text-[#444] flex__center ${location.pathname === '/cart' ? 'mt-[50px]' : 'mt-[100px]'} mb-[50px]`}>
            Copyright &copy; Hennndev 2022
        </footer>
    )
}

export default Footer