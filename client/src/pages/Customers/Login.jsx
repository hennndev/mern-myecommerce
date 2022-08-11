import React, { useState } from 'react'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import { useFormik } from 'formik'
import { FcGoogle } from 'react-icons/fc'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import InputControl from '../../components/Utils/InputControl'
import LoadingOverlay from '../../components/Utils/LoadingOverlay'

const Login = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [visiblePassword, setVisiblePassword] = useState(false)
    const [cookies, setCookie] = useCookies(['userLogin'])
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: async (values, { resetForm }) => {
            setIsLoading(true)
            try {
                const res = await fetch(`${process.env.REACT_APP_BASE_URL}/users/signin`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                })
                const data = await res.json()
                if(data.message) {
                    setIsLoading(false)
                    resetForm()
                    setCookie('userLogin', data.token, {maxAge: 60 * 60 * 24, path: '/'})
                    navigate('/')
                } else throw data.error
            } catch (error) {
                setIsLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: `${error}!`,
                })
            }
        }, 
        validationSchema: Yup.object({
            email: Yup.string().required('Email input is required!').email('Email not valid!'),
            password: Yup.string().required('Password input is required!').min(8, 'Minimum password length is 8 character or more!')
        })
    })

    return (
        <section className='container flex__center px-5'>
            {isLoading && <LoadingOverlay/>}
            <form className='mt-[50px] border border-gray-300 rounded-md p-5 w-[450px]' onSubmit={formik.handleSubmit}>
                <h2 className='text-center text-2xl mb-5 font-medium'>Login Form</h2>
                <InputControl 
                    type="email" 
                    id="email" 
                    labelName="Email" 
                    placeholder="your email" 
                    formik={formik}/>
                <InputControl 
                    type="password" 
                    id="password" 
                    labelName="Password"  
                    formik={formik}
                    isShow={visiblePassword}
                    handleShow={() => setVisiblePassword(!visiblePassword)}/>
                <div className='flex__center mt-[30px]'>
                    <button className="btn mr-3" type="submit">Login Now</button>
                    <button className="btn btn__danger" type="button" onClick={() => formik.resetForm()}>Clear Form</button>
                </div>
                <div className="flex__center mt-[20px]">
                    <div className="flex items-center shadow-md hover:shadow-lg rounded-sm cursor-pointer px-[30px] py-2">
                        <FcGoogle className='text-xl mr-2'/>
                        <p className='text-[#444]'>Signin with Google</p>
                    </div>
                </div>
                <div className='flex__center flex-col mt-5 text-gray-500 text-[15px]'>
                    <p>Don't have an account ? <span className='text-blue-500 hover:underline cursor-pointer' onClick={() => navigate('/register')}>Register</span></p>
                    <p className='text-blue-500 hover:underline cursor-pointer mt-2 text-[15px]' onClick={() => navigate('/forgot-password')}>Forgot Password ?</p>
                </div>
            </form>
        </section>
    )
}

export default Login