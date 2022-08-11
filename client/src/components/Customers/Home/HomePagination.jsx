import React from 'react'
import { BsArrowLeftSquare, BsArrowRightSquare } from 'react-icons/bs' 

const HomePagination = ({page, setPage, fetching, count}) => {

    const handlePrev = () => {
        if(page > 1) {
            fetching(page - 1)
            setPage(page - 1)
        }
        window.scrollTo({
            behavior: 'smooth',
            top: 0,
        })
    }
    const handleNext = () => {
        fetching(page + 1)
        setPage(page + 1)
        window.scrollTo({
            behavior: 'smooth',
            top: 0,
        })
    }
    return (
        <div className='flex__center space-x-5 mt-[30px]'>
            {page > 1 && (
                <BsArrowLeftSquare className='text-xl cursor-pointer transition duration-300 transform hover:scale-125 text-gray-600' onClick={handlePrev}/>
            )}
            <p className='text-lg text-[#444]'>{page}</p>
            {count > (page * 10) && (
                <BsArrowRightSquare className='text-xl cursor-pointer transition duration-300 transform hover:scale-125 text-gray-600' onClick={handleNext}/>
            )}
        </div>
    )
}

export default HomePagination