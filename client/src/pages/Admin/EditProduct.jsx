import React, { useState, useEffect } from 'react'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { IoMdCloudUpload } from 'react-icons/io' 
import { useData } from '../../context/appContext'
import useImagePreview from '../../hooks/useImagePreview'
import InputControl from '../../components/Utils/InputControl'
import LoadingOverlay from '../../components/Utils/LoadingOverlay'
import AdminProductForm from '../../components/Admin/AdminProductForm'

const EditProduct = () => {

    const navigate = useNavigate()
    const { productDataTemp } = useData()
    const [isLoading, setIsLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            productName: '',
            productPrice: '',
            productCategory: '',
            productDescription: '',
            productStock: '',
            productDiscount: '',
            productRating: '',
            productImage: ''
        },
        onSubmit: (values, { resetForm }) => {
            Swal.fire({
                title: 'Are you sure want to edit this product?',
                text: "This product will be edited!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, edit this product!'
                }).then((result) => {
                    if(result.isConfirmed) {
                        setIsLoading(true)                 
                        if(values.productImage.productImageURL) {
                            fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/products/${productDataTemp._id}`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    ...values
                                })
                            }).then(res => res.json()).then(() => {
                                setIsLoading(false)
                                setPreviewImage(null)
                                resetForm()
                                Swal.fire(
                                    'Edited!',
                                    'This product has been edited.',
                                    'success'
                                ).then(() => navigate(-1))
                            }).catch(err => {
                                setIsLoading(false)      
                                Swal.fire(
                                    'Failed!',
                                    'Something went wrong.',
                                    'error'
                                )           
                            })
                        } else {
                            const formDataImage = new FormData()
                            formDataImage.append('file', values.productImage)
                            formDataImage.append('upload_preset', 'qzxb5iq7')
                            fetch('https://api.cloudinary.com/v1_1/hennnpermanadev/image/upload', {
                                method: 'POST',
                                body: formDataImage
                            }).then(res => res.json()).then((image) => {
                                fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/products/${productDataTemp._id}`, {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        ...values,
                                        productImage: {
                                            productImageURL: image.url,
                                            productImageID: image.public_id
                                        },
                                        oldProductImageID: productDataTemp.productImage.productImageID
                                    })
                                }).then(res => res.json()).then(() => {
                                    setIsLoading(false)  
                                    setPreviewImage(null)
                                    document.getElementById('productImage').value = ''
                                    resetForm()
                                    Swal.fire(
                                        'Edited!',
                                        'This product has been edited.',
                                        'success'
                                    ).then(() => navigate(-1))
                                }).catch(err => {
                                    setIsLoading(false)    
                                    Swal.fire(
                                        'Failed!',
                                        'Something went wrong.',
                                        'error'
                                    )                         
                                })
                            }).catch(err => {
                                setIsLoading(false)  
                                Swal.fire(
                                    'Failed!',
                                    'Something went wrong.',
                                    'error'
                                )                                   
                            })      
                        }
                    }
                })
        },
        validationSchema: Yup.object({
            productName: Yup.string().required('Product name is required!'),
            productPrice: Yup.number().required('Product price is required!').min(1, 'Minimum price is more than 0'),
            productCategory: Yup.string().required('Product category is required!'),
            productCompany: Yup.string().required('Product company is required!'),
            productDescription: Yup.string().required('Product description is required!'),
            productStock: Yup.number().required('Products stock is required!').min(0, 'Minimum product stock is 0!'),
            productDiscount: Yup.number().required('Product discount is required!').min(0, 'Minimum discount in 0%'),
            productRating: Yup.number().required('Product rating is required!'),
            productImage: Yup.mixed().required('Product image is required!').test('Minimum size', 'Minimum size is less than 2 MB!', (value) => value?.size ? value?.size < 2000000 : value?.productImageURL )
        })
    })
    const { previewImage, setPreviewImage, handleChangeImage } = useImagePreview(formik, 'productImage')

    useEffect(() => {
        if(productDataTemp) {
            formik.setValues({
                productName: productDataTemp.productName,
                productPrice: productDataTemp.productPrice,
                productCategory: productDataTemp.productCategory,
                productCompany: productDataTemp.productCompany,
                productDescription: productDataTemp.productDescription,
                productStock: productDataTemp.productStock,
                productDiscount: productDataTemp.productDiscount,
                productRating: productDataTemp.productRating,
                productImage: productDataTemp.productImage
            })
        } else {
            navigate(-1)
        }
    }, [productDataTemp])
    
    return (
        <section className='pt-[50px] pb-[50px] px-5 flex-1'>
            {isLoading && <LoadingOverlay/>}
                <AdminProductForm formik={formik} title="Edit" setPreviewImage={setPreviewImage}>
                    <InputControl
                        inputType='number'
                        id="productDiscount"
                        labelName="Product Discount"
                        placeholder='product discount'
                        formik={formik}/>
                    <div className='input__control'>
                        <label htmlFor="productImage" className='flexx border text-[#444] border-gray-300 rounded py-3 px-4 w-max cursor-pointer shadow-sm transition duration-300 ease-in-out hover:bg-gray-600 group'>
                            <IoMdCloudUpload className='text-2xl mr-3 group-hover:text-white'/>
                            <span className='group-hover:text-white'>Upload Product Image</span>
                        </label>
                        <input 
                            type="file" 
                            id="productImage"
                            onChange={handleChangeImage}
                            accept='image/*'
                            className="hidden"/>
                        {formik.errors.productImage && formik.touched.productImage && <small className='input__error'>{formik.errors.productImage}</small>}
                        {previewImage && !formik.values?.productImage.productImageURL &&
                            <img src={previewImage} alt="preview-image" className='w-[100px] h-[100px] mt-2 object-contain'/> 
                        }
                        {formik.values?.productImage.productImageURL && (
                            <img src={formik.values?.productImage.productImageURL} alt="preview-image" className='w-[100px] h-[100px] mt-2 object-contain'/> 
                        )}
                    </div>
                </AdminProductForm>
        </section>
    )
}

export default EditProduct