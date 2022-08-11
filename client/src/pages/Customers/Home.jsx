import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useData } from '../../context/appContext'
import ArrowTop from '../../components/Utils/ArrowTop'
import LoadingSpinner from '../../components/Utils/LoadingSpinner'
import ProductItem from '../../components/Customers/Home/ProductItem'
import HomePagination from '../../components/Customers/Home/HomePagination'
import FilteringProducts from '../../components/Customers/Home/FilteringProducts'

const Home = () => {   
    const navigate = useNavigate()
    const [page, setPage] = useState(1)
    const { cart, addProductToCart } = useData()
    const [products, setProducts] = useState([])
    const [sortData, setSortData] = useState('')
    const [sortName, setSortName] = useState('')
    const [sortPrice, setSortPrice] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [productsCount, setProductsCount] = useState(0)
    
    useEffect(() => {
        fetching(1)
    }, [])
    const fetching = (pageVal) => {
        setIsLoading(true)
        fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/products?limit=${10 * pageVal}`)
            .then(res => res.json()).then((res) => {
            setIsLoading(false)
            const data = res.data.filter(itemData => itemData.isFeatured).map(itemData => ({...itemData, count: 1}))
            setProducts(data)
            setProductsCount(res.count)
        }).catch(() => {
            setIsLoading(true)
        })
    }
    products.sort((a, b) => {
        if(a[sortData] < b[sortData]) {
            return sortData === 'productName' ? sortName === 'asc' ? -1 : 1 : sortPrice === 'asc' ? -1 : 1
        } else if(a[sortData] > b[sortData]) {
            return sortData === 'productName' ? sortName === 'asc' ? 1 : -1 : sortPrice === 'asc' ? 1 : -1
        } 
        return 0
    })
    const addCart = (e, product) => {
        e.stopPropagation()
        addProductToCart(product)
    }

    return (
        <section className='mt-[50px] container relative px-5'>
            <ArrowTop/>
            <FilteringProducts products={products} setProducts={setProducts} setProductsCount={setProductsCount} 
                setIsLoading={setIsLoading}
                resetPage={() => setPage(1)}
                sortName={sortName}
                sortPrice={sortPrice}
                resetSort={() => {
                    setSortData('')
                    setSortName('')
                    setSortPrice('')
                }}
                setSortName={(value, val) => {
                    setSortData(val)
                    setSortName(value)
                    setSortPrice('')
                }}
                setSortPrice={(value, val) => {
                    setSortData(val)
                    setSortPrice(value)
                    setSortName('')
                }}/>
            {isLoading && (
                <div className='flex__center mt-[150px]'>
                    <LoadingSpinner/>
                </div>
            )}
            {productsCount > 0 && !isLoading && (
                <>
                    {page === 1 && <p className='text-[#444] mb-5'>{productsCount} items found</p>}
                    <div className='grid grid-cols-mobile sm:grid-cols-tablet md:grid-cols-products gap-[15px] sm:gap-[25px]'>
                        {productsCount > 0 && products.map(product => (
                            <ProductItem 
                                key={product._id}
                                product={product} 
                                handleAddCart={(e) => addCart(e, product)}
                                inCart={cart.find(item => item._id === product._id)}
                                handleNavigate={() => navigate(`/products/${product._id}`)}/>
                        ))}
                    </div>
                </>
            )}
            {productsCount < 1 && !isLoading && (
                <div className='text-center mt-[50px]'>
                    <h1 className='text__center text-[#444] text-lg'>Products not available :(</h1>
                </div>
            )}
            {!isLoading && productsCount > 0 && <HomePagination page={page} setPage={setPage} products={products} fetching={fetching} count={productsCount}/>}
        </section>
    )
}

export default Home