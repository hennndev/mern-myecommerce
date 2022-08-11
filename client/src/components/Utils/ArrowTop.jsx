import React, { useState} from 'react'
import { BsFillArrowUpSquareFill } from 'react-icons/bs'

const ArrowTop = () => {

    const [visible, setVisible] = useState(false)
  
    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300){
            setVisible(true)
        } 
        else if (scrolled <= 300) {
            setVisible(false)
        }
    };

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    window.addEventListener('scroll', toggleVisible);

    return (
        document.documentElement.scrollTop > 300 && 
            <div className='fixed bottom-5 right-5 z-[100]'>
                <BsFillArrowUpSquareFill className={`text-pink-600 text-[35px] ${visible} cursor-pointer animate-bounce`} onClick={handleClick}/>
            </div>
    )
}

export default ArrowTop