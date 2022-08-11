import React, { useState, useEffect } from 'react'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import { useFormik } from 'formik'
import { IoMdCloudUpload } from 'react-icons/io' 
import { useData } from '../../context/appContext'
import ArrowTop from '../../components/Utils/ArrowTop'
import useImagePreview from '../../hooks/useImagePreview'
import InputControl from '../../components/Utils/InputControl'
import LoadingOverlay from '../../components/Utils/LoadingOverlay'

const EditProfile = () => {

    const { userLogin } = useData()
    const [isLoading, setIsLoading] = useState(false)
    const formik = useFormik({
        initialValues: {
            username: '',
            telpNumber: '',
            country: '',
            address: '',
            postCode: '',
            profileImage: ''
        },
        onSubmit: (values) => {    
            Swal.fire({
                title: 'Are you sure want to edit your profile?',
                text: "Your profile will be edited!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: 'gray',
                confirmButtonText: 'Yes, edit my profile!'
                })
                .then((result) => {
                    if(result.isConfirmed) {
                        setIsLoading(true)
                        if(values.profileImage?.size) {
                            const formDataImage = new FormData()
                            formDataImage.append('file', values.profileImage)
                            formDataImage.append('upload_preset', 'qzxb5iq7')
                            fetch('https://api.cloudinary.com/v1_1/hennnpermanadev/image/upload', {
                                method: 'POST',
                                body: formDataImage
                            }).then(res => res.json()).then(image => {
                                fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/users/${userLogin.id}`, {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        ...values,
                                        profileImage: {
                                            profileImageURL: image.url,
                                            profileImageID: image.public_id
                                        },
                                        oldProfileImageID: userLogin.profileImage.profileImageID
                                    })
                                }).then(res => res.json()).then(() => {
                                    setIsLoading(false)
                                    Swal.fire(
                                        'Edited!',
                                        'Your profile has been edited.',
                                        'success'
                                    ).then(() => {
                                        window.location.reload()
                                    })
                                }).catch(() => {
                                    setIsLoading(false)
                                    Swal.fire(
                                        'Failed!',
                                        'Something went wrong.',
                                        'error'
                                    )
                                })
                            })
                        } else {
                            fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/users/${userLogin.id}`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    ...values,
                                    oldProfileImageID: !values.profileImage.profileImageID ? userLogin.profileImage.profileImageID : null
                                })
                            }).then(res => res.json()).then(() => {
                                setIsLoading(false)
                                Swal.fire(
                                    'Edited!',
                                    'Your profile has been edited.',
                                    'success'
                                ).then(() => {
                                    window.location.reload()
                                })
                            }).catch(() => {
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
            username: Yup.string().required('Your username is required!')
        })
    })
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        if(userLogin) {
            formik.setValues({
                ...formik.values,
                username: userLogin.username,
                telpNumber: userLogin.telpNumber || "",
                country: userLogin.country,
                address: userLogin.address,
                postCode: userLogin.postCode || "",
                profileImage: userLogin.profileImage
            })
        }
    }, [userLogin]) 

    const { previewImage, setPreviewImage, handleChangeImage } = useImagePreview(formik, 'profileImage')
    const handleClear = () => {
        formik.resetForm()
        document.getElementById('profileImage').value = ''
        setPreviewImage(null)
    }

    return (
        <section className='mt-[50px] container px-[20px] flex__center'>
            {isLoading && <LoadingOverlay/>}
            <ArrowTop/>
            <form className='w-[1000px] shadow-card rounded-md p-5' onSubmit={formik.handleSubmit}>
                <h2 className='text-2xl text-center text-[#444] mb-8'>Edit Profile</h2>
                <InputControl
                    id="username"
                    labelName="Username"
                    placeholder='username'
                    formik={formik}/>
                <InputControl
                    inputType='number'
                    id="telpNumber"
                    labelName="Telp Number"
                    placeholder='telp number'
                    formik={formik}/>
                <InputControl
                    id="country"
                    labelName="Country"
                    placeholder='country'
                    formik={formik}/>
                <InputControl
                    inputType="number"
                    id="postCode"
                    labelName="Post Code"
                    placeholder='post code'
                    formik={formik}/>
                <InputControl
                    id="address"
                    labelName="Address"
                    placeholder='address'
                    formik={formik}
                    textarea/>
                <div className='input__control'>
                    <label htmlFor="profileImage" className='flexx border text-[#444] border-gray-300 rounded py-3 px-4 w-max cursor-pointer shadow-sm transition duration-300 ease-in-out hover:bg-gray-600 group'>
                        <IoMdCloudUpload className='text-2xl mr-3 group-hover:text-white'/>
                        <span className='group-hover:text-white'>Upload Profile Image</span>
                    </label>
                    <input 
                        type="file" 
                        id="profileImage"
                        onChange={handleChangeImage}
                        accept='image/*'
                        className='hidden'/>
                    {previewImage && !formik.values?.profileImage.profileImageURL && <img src={previewImage} alt="preview-image" className='w-[100px] h-[100px] mt-2 object-contain'/>}

                    {formik.values?.profileImage.profileImageURL && (
                        <img src={formik.values?.profileImage.profileImageURL} alt="preview-image" className='w-[100px] h-[100px] mt-2 object-contain'/> 
                    )}
                </div>
                <div className='flex__center mt-[30px]'>
                    <button className="btn mr-3" type="submit">Submit Edit</button>
                    <button className="btn btn__danger" type="button" onClick={handleClear}>Clear Form</button>
                </div>
            </form>
        </section>
    )
}

export default EditProfile