import React from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit: (values, { resetForm }) => {
            console.log(values)
        }, 
        validationSchema: Yup.object({
            email: Yup.string().required('Email input is required!').email('Email not valid'),
        })
    })
    const navigate = useNavigate()

    return (
        <div className='container flex__center'>
            <form className='mt-[50px] border border-gray-300 rounded-md p-5 w-[450px]' onSubmit={formik.handleSubmit}>
                <h2 className='text-center text-2xl mb-5 font-medium'>Forgot Password</h2>
                <div className='input__control'>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email"
                        onBlur={formik.handleBlur}
                        {...formik.getFieldProps('email')}
                        placeholder='Type your email here...'/>
                    {formik.errors.email && formik.touched.email && <small className='input__error'>{formik.errors.email}</small>}
                </div>
                <div className='flex__center mt-[30px]'>
                    <button className="btn mr-3" type="submit">Submit</button>
                </div>
                <div className='flex__center flex-col mt-5 text-gray-500 text-[15px]'>
                    <p>already have an account ? <span className='text-blue-500 hover:underline cursor-pointer' onClick={() => navigate('/login')}>Login</span></p>
                </div>
            </form>
        </div>
    )
}

export default ForgotPassword