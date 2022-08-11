import React from 'react'

const LoadingOverlay = () => {
    return (
        <section className='fixed top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.3)] flex__center z-50'>
            <div className='bg-white w-[150px] h-[50px] flex__center rounded-md'>
                <p>Loading.....</p>
            </div>
        </section>
    )
}

export default LoadingOverlay