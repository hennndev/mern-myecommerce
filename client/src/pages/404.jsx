import React from 'react'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {

    const navigate = useNavigate()

    return (
        <section className='container mt-[150px] flex__center flex-col'>
            <h2 className='mb-5 text-xl text-gray-700'>Oops. Page Not Found</h2>
            <button className="btn btn__primary" onClick={() => navigate('/')}>Back to Home</button>
        </section>
    )
}

export default PageNotFound