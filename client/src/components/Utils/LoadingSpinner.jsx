import React from 'react'

const LoadingSpinner = () => {
    return (
        <div className='inline-block relative w-[80px] h-[80px]'>
            <div className='absolute border-4 border-solid border-pink-400 opacity-100 rounded-full animate-loading'></div>
            <div className='absolute border-4 border-solid border-pink-400 opacity-100 rounded-full animate-loading animation-delay-spinner'></div>
        </div>
    )
}

export default LoadingSpinner