import React from 'react'

const Modal = ({children, orderSummary, admin}) => {
    return (
        <section className='fixed top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.3)] flex__center z-40 px-5'>
            <div className={`bg-white ${orderSummary ? 'w-[400px]' : admin ? 'w-[500px]' : 'w-[800px]'} max-h-[550px] overflow-y-scroll rounded-md p-5`}>
                {children}
            </div>
        </section>
    )
}

export default Modal