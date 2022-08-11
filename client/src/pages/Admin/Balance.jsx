import React from 'react'

const Balance = () => {
    return (
        <section className='py-[40px] px-5 flex-1'>
            <div className="flex__between space-x-3">
                <div className="flexx space-x-1">
                <h1 className='font-medium text-xl text-green-500'>Income: $1000</h1>
                <h1 className='font-medium text-xl text-gray-700'>Balance: $1000</h1>
                <h1 className='font-medium text-xl text-red-500'>Outcome: -$1000</h1>
                </div>
                <div className="flexx space-x-2">
                    <button className="btn">Income</button>
                    <button className="btn btn__danger">Outcome</button>
                </div>
            </div>
        </section>
    )
}

export default Balance