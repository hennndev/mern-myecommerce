import React, { useState } from 'react'
import FilterModal from './FilterModal'
import { IoFilterOutline } from 'react-icons/io5'
import { BsSortAlphaDown, BsSortAlphaDownAlt, BsSortNumericDown, BsSortNumericDownAlt } from 'react-icons/bs'

const FilteringProducts = ({products, setProducts, setProductsCount, setIsLoading, resetSort, sortName, setSortName, sortPrice, setSortPrice, resetPage}) => {

    const [dataFilter, setDataFilter] = useState({
        category: '',
        company: '',
        rating: '',
        price: 0,
        discount: 0
    })
    const [isModal, setIsModal] = useState(false)
    const handleChange = (e) => {
        setDataFilter({
            ...dataFilter,
            [e.target.id]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        resetPage()
        let queries = `?limit=10`
        Object.keys(dataFilter).filter(key => dataFilter[key] && dataFilter[key] !== '0')
            .forEach((key) => {
                queries += `&${key}=${dataFilter[key]}`
            })
        setIsLoading(true)
        setIsModal(false)
        fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/products${queries}`).then(res => res.json()).then((res) => {
            setIsLoading(false)
            const data = res.data.filter(itemData => itemData.isFeatured).map(itemData => ({...itemData, count: 1}))
            setProducts(data)
            setProductsCount(res.count)
            resetSort()
        }).catch(() => {
            setIsLoading(false)
        })
    }

    return (
        <>
            {isModal && <FilterModal 
                values={dataFilter}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleClose={() => setIsModal(false)}
                maxPrice={products.map(item => item.productPrice).sort((a, b) => a - b)[products.length - 1]}/>
            }
            <div className="flexx flex-wrap mb-[20px]">
                <div className='flexx text-[#444] border border-gray-100 rounded-sm px-4 w-max cursor-pointer md:mr-2 text-sm md:text-base mb-[10px] space-x-3 py-[8px] mr-2' 
                    onClick={() => setIsModal(true)} >
                    <IoFilterOutline className='text-lg md:text-2xl'/>
                    <p>Filter Products</p>
                </div>
                <div className='flexx text-[#444] border border-gray-100 rounded-sm px-4 w-max cursor-pointer md:mr-2 text-sm md:text-base mb-[10px] mr-0'>
                    {sortName === 'asc' || sortName === '' ? 
                        <BsSortAlphaDown className='text-lg md:text-2xl'/> :
                        <BsSortAlphaDownAlt className='text-lg md:text-2xl'/>
                    }
                    <select className='border-none outline-none cursor-pointer py-[8px]' value={sortName} onChange={(e) => setSortName(e.target.value, 'productName')}>
                        <option value="">Sort Name</option>
                        <option value="asc">A to Z</option>
                        <option value="desc">Z to A</option>
                    </select>
                </div>
                <div className='flexx text-[#444] border border-gray-100 rounded-sm px-4 w-max cursor-pointer md:mr-2 text-sm md:text-base mb-[10px] mr-1'>
                    {sortPrice === 'asc' || sortPrice === '' ? 
                        <BsSortNumericDown className='text-lg md:text-2xl'/> :
                        <BsSortNumericDownAlt className='text-lg md:text-2xl'/>
                    }
                    <select className='border-none outline-none cursor-pointer py-[8px]' value={sortPrice} onChange={(e) => setSortPrice(e.target.value, 'productPrice')}>
                        <option value="">Sort Price</option>
                        <option value="asc">Low to High</option>
                        <option value="desc">High to Low</option>
                    </select>
                </div>
            </div>
        </>
    )
}

export default FilteringProducts