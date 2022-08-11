import React from 'react'
import { BsArrowLeftSquare, BsArrowRightSquare } from 'react-icons/bs' 

const AdminPagination = ({page, setPage, isPage}) => {

    const handleBack = () => {
        setPage(page - 1)
    }
    const handleNext = () => {
        setPage(page + 1)
    }

    return (
        <div className='flexx space-x-5 mt-[30px]'>
            {page > 1 && (
                <BsArrowLeftSquare className='text-xl cursor-pointer transition duration-300 transform hover:scale-125' onClick={handleBack}/>
            )}
            <p className='text-lg text-[#444]'>{page}</p>
            {isPage && (
                <BsArrowRightSquare className='text-xl cursor-pointer transition duration-300 transform hover:scale-125' onClick={handleNext}/>
            )}
        </div>
    )
}

export default AdminPagination