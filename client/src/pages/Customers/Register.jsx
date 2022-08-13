import React, { useState } from 'react'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import InputControl from '../../components/Utils/InputControl'
import LoadingOverlay from '../../components/Utils/LoadingOverlay'

const Register = () => {

    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [visiblePassword, setVisiblePassword] = useState(false)
    const [visiblePasswordConfirmation, setVisiblePasswordConfirmation] = useState(false)

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: ''
        },
        onSubmit: async (values, { resetForm }) => {
            const {passwordConfirmation, ...valuesData} = values
            setIsLoading(true)
            try {
                const res = await fetch(`/users/signup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(valuesData)
                })
                const data = await res.json()
                if(data.message) {
                    setIsLoading(false)
                    resetForm()
                    Swal.fire({
                        icon: 'success',
                        title: 'Success Register',
                        text: 'Now you can login with your new account',
                    }).then(() => navigate('/login'))
                } else throw data.error
            } catch (error) {
                setIsLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Register Failed',
                    text: `${error}!`,
                })
            }
        }, 
        validationSchema: Yup.object({
            username: Yup.string().required('Username field is required!'),
            email: Yup.string().required('Email field is required!').email('Email not valid'),
            password: Yup.string().required('Password field is required!').min(8, 'Minimum password length is 8 character or more!'),
            passwordConfirmation: Yup.string().required('Password Confirmation field is required!').min(8, 'Minimum password confirmation length is 8 character or more!').oneOf([Yup.ref('password'), null], 'Password confirmation is not match with password field!'),
        })
    })
    
    return (
        <section className='container flex__center px-5'>
            {isLoading && <LoadingOverlay/>}
            <form className='mt-[50px] border border-gray-300 rounded-md p-5 w-[450px]' onSubmit={formik.handleSubmit}>
                <h2 className='text-center text-2xl mb-5 font-medium'>Register Form</h2>
                <InputControl
                    id="username"
                    labelName="Username"
                    placeholder='your username'
                    formik={formik}/>
                <InputControl
                    inputType="email"
                    id="email"
                    labelName="Email"
                    placeholder='your email'
                    formik={formik}/>
                <InputControl 
                    id="password" 
                    labelName="Password"  
                    formik={formik}
                    isShow={visiblePassword}
                    handleShow={() => setVisiblePassword(!visiblePassword)}/>
                <InputControl 
                    id="passwordConfirmation" 
                    labelName="Password Confirmation"  
                    formik={formik}
                    isShow={visiblePasswordConfirmation}
                    handleShow={() => setVisiblePasswordConfirmation(!visiblePasswordConfirmation)}/>
                <div className='flex__center mt-[30px]'>
                    <button className="btn mr-3" type="submit">Register Now</button>
                    <button className="btn btn__danger" type="button" onClick={() => formik.resetForm()}>Clear Form</button>
                </div>
                <div className='flex__center mt-5 text-gray-500 text-[15px]'>
                    <p>Already have an account ? <span className='text-blue-500 hover:underline cursor-pointer' onClick={() => navigate('/login')}>Login</span></p>
                </div>
            </form>
        </section>
    )
}

export default Register