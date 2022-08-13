import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import Modal from '../../components/Utils/Modal'
import { useData } from '../../context/appContext'
import AdminSearch from '../../components/Admin/AdminSearch'
import LoadingOverlay from '../../components/Utils/LoadingOverlay'
import AdminPagination from '../../components/Admin/AdminPagination'
import { BsSortAlphaDown, BsSortAlphaDownAlt, BsSortNumericDown, BsSortNumericDownAlt } from 'react-icons/bs'

const Products = () => {

    const navigate = useNavigate()
    const { saveDataTemp } = useData()
    const [page, setPage] = useState(1)
    const [products, setProducts] = useState([])
    const [isModal, setIsModal] = useState(null)
    const [sortData, setSortData] = useState(null)
    const [sortName, setSortName] = useState('asc')
    const [searchTerm, setSearchTerm] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [sortPrice, setSortPrice] = useState('asc')

    useEffect(() => {
        setIsLoading(true)
        fetch(`/api/v1/products`).then(res => res.json()).then(res => {
            const data = res.data
            setIsLoading(false)
            setProducts(data)
        }).catch(err => {
            setIsLoading(false)
        })
    }, [])

    useEffect(() => {
      if(searchTerm) {
        setPage(1)
      }
    }, [searchTerm])
    


    const handleDelete = (product) => {
        Swal.fire({
            title: 'Are you sure want to delete this product?',
            text: "This product will deleted permanently!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: 'gray',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                setIsLoading(true)
                fetch(`/api/v1/products/${product._id}/${product.productImage.productImageID}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }).then(res => res.json()).then(res => {
                    setIsLoading(false)
                    Swal.fire(
                        'Deleted!',
                        'Your product has been deleted.',
                        'success'
                    )
                }).catch(err => {
                    setIsLoading(false)
                })
            }
        })
    }
    const handleShow = (product) => {
        Swal.fire({
            title: `Are you sure want to ${product.isFeatured ? 'hidden' : 'show'} this product?`,
            text: `This product will ${product.isFeatured ? 'hidden' : 'displayed'} in homepage!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Yes, ${product.isFeatured ? 'hidden' : 'show'} it!`
        }).then((result) => {
            if(result.isConfirmed) {
                setIsLoading(true)
                fetch(`/api/v1/products/${product._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        isFeatured: !product.isFeatured
                    })
                }).then(res => res.json()).then(res => {
                    setIsLoading(false)
                    Swal.fire(
                        `${product.isFeatured ? 'Hidden' : 'Showed'}!`,
                        `this product has been ${product.isFeatured ? 'hidden' : 'showed'}.`,
                        'success'
                    ).then(() => {
                        window.location.reload()
                    })
                }).catch(err => {
                    setIsLoading(false)
                })
            }
        })
    }

    const handleEdit = (product) => {
        navigate('/dashboard/products/edit-product')
        saveDataTemp(product)
    }
    const filteredProducts = products.filter(product => {
        return product.productName.toLowerCase().includes(searchTerm.toLowerCase()) || 
            product.productCategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.productCompany.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.productPrice >= +searchTerm
    })
    const handleSort = (dataSort) => {
        setSortData(dataSort)
        if(dataSort === 'productName') {
            setSortName(sortName === 'asc' ? 'desc' : 'asc')
        } else {
            setSortPrice(sortPrice === 'asc' ? 'desc' : 'asc')
        }
    }
    const sortingData = filteredProducts.sort((a, b) => {
        if(a[sortData] < b[sortData]) {
            return sortData === 'productName' ? sortName === 'asc' ? -1 : 1 : sortPrice === 'asc' ? -1 : 1
        } else if(a[sortData] > b[sortData]) {
            return sortData === 'productName' ? sortName === 'asc' ? 1 : -1 : sortPrice === 'asc' ? 1 : -1
        } 
        return 0
    })


    return (
        <section className='py-[40px] px-5 flex-1'>
            {isLoading && <LoadingOverlay/>}
            {isModal && (
                <Modal admin>
                    <h1 className='text-center text-xl'>Product Info</h1>
                    <div className='mt-3'>
                        <img src={isModal.productImage.productImageURL} alt="image-modal" className='w-[100px] h-[100px] object-contain mb-2'/>
                        <div className='flex flex-col mb-2'>
                            <p className="mb-1">Product Name : <span className='font-medium'>{isModal.productName}</span></p>
                            <p className="mb-1">Product Category : <span className='font-medium'>{isModal.productCategory}</span></p>
                            <p className="mb-1">Product Company : <span className='font-medium'>{isModal.productCompany}</span></p>
                            <p className="mb-1">Product Price : <span className='font-medium text-green-700'>${isModal.productPrice}</span></p>
                            <p className="mb-1">Product Stock : <span className='font-medium'>{isModal.productStock}</span></p>
                            <p className="mb-1">Product Discount : <span className='font-medium'>{isModal.productDiscount}%</span></p>
                            <p className="mb-1">Product Description : <br /> <span className='font-medium'>{isModal.productDescription}</span></p>
                            <h3></h3>
                        </div>
                        <button className='bg-gray-500 py-2 px-3 rounded-sm text-white transition duration-300 hover:bg-gray-600' onClick={() => setIsModal(false)}>Close Info</button>
                    </div>
                </Modal>
            )}
            <div>
                <div className='flex flex-col space-y-3 lg:space-y-0 lg:flex-row lg:flex__between mb-[15px]'>
                    <AdminSearch title="products" searchTerm={searchTerm} handleSearch={setSearchTerm}/>
                    <button className='btn w-max' onClick={() => navigate('/dashboard/products/add-product')}>Add new Product</button>
                </div>
                <div className='overflow-x-auto w-full'>
                    <table className='w-full border-collapse border-[1px] border-gray-200 rounded-sm bg-white'>
                        <thead>
                            <tr className='bg-gray-200 text-[#444]'>
                                <th className='text-center p-3'>No</th>
                                <th className='text-center p-3'>Id</th>
                                <th className='text-center p-3'>Image</th>
                                <th className='text-center p-3 relative group cursor-pointer' onClick={() => handleSort('productName')}>
                                    Name
                                    {sortName === 'asc' ? 
                                        <BsSortAlphaDown className='hidden group-hover:block absolute right-0 top-[15px] text-lg'/> :
                                        <BsSortAlphaDownAlt className='hidden group-hover:block absolute right-0 top-[15px] text-lg'/>
                                    }
                                </th>
                                <th className='text-center p-3 relative group cursor-pointer' onClick={() => handleSort('productPrice')}>
                                    Price
                                    {sortPrice === 'asc' ? 
                                        <BsSortNumericDown className='hidden group-hover:block absolute right-0 top-[15px] text-lg'/> :
                                        <BsSortNumericDownAlt className='hidden group-hover:block absolute right-0 top-[15px] text-lg'/>    
                                    }
                                </th>
                                <th className='text-center p-3'>Info</th>
                                <th className='text-center p-3'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortingData.length > 0 ? sortingData.slice((page - 1) * 6, (page * 6)).map((product, idx) => (
                                <tr key={product._id} className={`${product.productStock < 1 && 'bg-red-100'}`}>
                                    <td className='p-3 text-center whitespace-nowrap'>{idx + 1 + ((page - 1) * 6)}</td>
                                    <td className='p-3 text-center whitespace-nowrap'>{product._id.slice(0, 15)}</td>
                                    <td className='p-3 text-center whitespace-nowrap'>
                                        <img src={product.productImage.productImageURL} alt={product.productName} className="w-[50px] h-[50px] object-contain"/>
                                    </td>
                                    <td className='p-3 text-center whitespace-nowrap'>{product.productName}</td>
                                    <td className='py-3 px-5 text-center whitespace-nowrap text-green-700 font-medium'>${product.productPrice.toFixed(2)}</td>
                                    <td className='p-3 text-center whitespace-nowrap'>
                                        <p className='cursor-pointer text-blue-600 font-medium underline' onClick={() => setIsModal(product)}>Product Info</p>
                                    </td>
                                    <td className='p-3 text-center whitespace-nowrap'>
                                        <button className={`btn ${product.isFeatured ? 'btn__warning' : 'btn__success'}`} onClick={() => handleShow(product)}>
                                            {product.isFeatured ? 'Hidden': 'Show'}
                                        </button>
                                        <button className='btn ml-2' onClick={() => handleEdit(product)}>Edit</button>
                                        <button className='btn ml-2 btn__danger' onClick={() => handleDelete(product)}>Delete</button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    {Array(7).fill('').map((_, idx) => (
                                        <td className='p-3 text-center whitespace-nowrap' key={idx}>---</td>
                                    ))}
                                </tr> 
                            )}
                        </tbody>
                    </table>
                </div>
                {filteredProducts.length > 6 && (
                    <div className='flex__center'>
                        <AdminPagination page={page} setPage={setPage} isPage={filteredProducts.length > (page * 6)}/>  
                    </div>
                )}
            </div>
        </section>
    )
}

export default Products