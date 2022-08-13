import React, { useState } from 'react'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import { useFormik } from 'formik'
import { IoMdCloudUpload } from 'react-icons/io'
import useImagePreview from '../../hooks/useImagePreview'
import LoadingOverlay from '../../components/Utils/LoadingOverlay'
import AdminProductForm from '../../components/Admin/AdminProductForm'

const AddProduct = () => {

    const [isLoading, setIsLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            productName: '',
            productPrice: '',
            productCategory: '',
            productCompany: '',
            productDescription: '',
            productStock: '',
            productRating: '',
            productImage: ''
        },
        onSubmit: (values, { resetForm }) => {
            Swal.fire({
                title: 'Are you sure want to add new product?',
                text: "New product will be added!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: 'gray',
                confirmButtonText: 'Yes, add new product!'
                }).then((result) => {
                    if(result.isConfirmed) {
                        setIsLoading(true)
                        const formDataImage = new FormData()
                        formDataImage.append('file', values.productImage)
                        formDataImage.append('upload_preset', 'qzxb5iq7')

                        fetch('https://api.cloudinary.com/v1_1/hennnpermanadev/image/upload', {
                            method: 'POST',
                            body: formDataImage
                        }).then(res => res.json()).then((image) => {
                            fetch(`/api/v1/products`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    ...values,
                                    productImage: {
                                        productImageURL: image.url,
                                        productImageID: image.public_id
                                    }
                                })
                            }).then(res => res.json()).then(() => {
                                setIsLoading(false)
                                resetForm()
                                document.getElementById('productImage').value = ''
                                setPreviewImage(null)
                                Swal.fire(
                                    'Added!',
                                    'New product has been added.',
                                    'success'
                                ).then(() => {
                                    window.scrollTo({
                                        top: 0,
                                        behavior: 'smooth'
                                    })
                                })
                            }).catch(err => {
                                setIsLoading(false)
                                Swal.fire(
                                    'Failed!',
                                    'Something went wrong.',
                                    'error'
                                )
                            })
                        }).catch(err => {
                            Swal.fire(
                                'Failed!',
                                'Something went wrong.',
                                'error'
                            )
                        })      
                    }
                })
        },
        validationSchema: Yup.object({
            productName: Yup.string().required('Product name is required!'),
            productPrice: Yup.number().required('Product price is required!').min(1, 'Minimum price is more than 0!'),
            productCategory: Yup.string().required('Product category is required!'),
            productCompany: Yup.string().required('Product company is required!'),
            productDescription: Yup.string().required('Product description is required!'),
            productStock: Yup.number().required('Products stock is required').min(1, 'Minimum stock product is more than 0!'),
            productRating: Yup.number().required('Product rating is required!'),
            productImage: Yup.mixed().required('Product image is required!').test('Minimum size', 'Minimum size is less than 2 MB!', (value) => value?.size < 2000000 )
        })
    })
    const { previewImage, setPreviewImage, handleChangeImage } = useImagePreview(formik, 'productImage')

    return (
        <section className='pt-[50px] pb-[50px] flex-1 px-5'>
            {isLoading && <LoadingOverlay/>}
            <AdminProductForm formik={formik} title="Add" setPreviewImage={setPreviewImage}>
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
                        className='hidden'/>
                    {formik.errors.productImage && formik.touched.productImage && <small className='input__error'>{formik.errors.productImage}</small>}
                    {previewImage && <img src={previewImage} alt="preview-image" className='w-[100px] h-[100px] mt-2 object-contain'/>}
                </div>
            </AdminProductForm>
        </section>
    )
}

export default AddProduct