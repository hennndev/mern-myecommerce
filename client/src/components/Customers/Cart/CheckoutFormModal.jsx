import React, { useEffect } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import Modal from '../../Utils/Modal'
import InputControl from '../../Utils/InputControl'
import { useData } from '../../../context/appContext'

const CheckoutFormModal = ({handleClose, handleCheckoutSummary}) => {

    const { userLogin } = useData()
    const formik = useFormik({
        initialValues: {
            name: '',
            country: '',
            address: '',
            telpNumber: '',
            emailActive: '',
            paymentMethod: '',
            postCode: ''
        },
        onSubmit: (values) => {
            handleCheckoutSummary({
                ...values,
                orderUserId: userLogin.id
            })
            handleClose()
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Order user name is required!'),
            country: Yup.string().required('Order user country is required!'),
            address: Yup.string().required('Order user address is required!'),
            telpNumber: Yup.number().required('Order user telpon number is required!').min(8, 'Minimum long telp numbers is 8 numbers or more'),
            emailActive: Yup.string().email('Email not valid').required('Order user email active is required!'),
            paymentMethod: Yup.string().required('Payment method is required!'),
            postCode: Yup.number().required('Order post code is required!').min(5, 'Minimum post code is 5 number!')
        })
    })
    useEffect(() => {
        if(userLogin) {
            formik.setValues({
                ...formik.values,
                name: userLogin.username,
                emailActive: userLogin.email,
                country: userLogin.country,
                address: userLogin.address,
                postCode: userLogin.postCode | '',
                telpNumber: userLogin.telpNumber || '',
            })
        }
    }, [userLogin])


    return (
        <Modal>
            <form className='bg-white' onSubmit={formik.handleSubmit}>
                <h2 className='text-center text-2xl mb-8 font-medium text-[#444]'>Order User Form</h2>
                <div className='flex flex-col sm:flex-row sm:space-x-3'>
                    <InputControl 
                        id="name" 
                        labelName="Name" 
                        placeholder="your name" 
                        formik={formik}
                        className="flex-1"/>
                    <InputControl 
                        id="country" 
                        labelName="Country" 
                        placeholder="your country" 
                        formik={formik}
                        className="flex-1"/>
                </div>
                <div className='flex sm:space-x-3 flex-col sm:flex-row'>
                    <InputControl 
                        inputType="number"
                        id="telpNumber" 
                        labelName="Telp Number" 
                        placeholder="your telp number" 
                        formik={formik}
                        className="flex-1"/>
                    <InputControl 
                        type="email"
                        id="emailActive" 
                        labelName="Email" 
                        placeholder="your email active" 
                        formik={formik}
                        className="flex-1"/>
                </div>
                <div className='flex sm:space-x-3 flex-col sm:flex-row'>
                    <InputControl
                        inputType="number"
                        id="postCode"
                        labelName="Post Code"
                        placeholder="post code"
                        formik={formik}
                        className='flex-1'/>
                    <InputControl
                        id="paymentMethod"
                        labelName="Payment Method"
                        formik={formik}
                        select
                        className='flex-1'>
                        <option value="">Select payment method</option>
                        <option value="COD">COD</option>
                        <option value="Credit Card">Credit Card</option>
                    </InputControl>
                </div>
                <InputControl
                    id="address"
                    labelName="Address"
                    placeholder='your address'
                    formik={formik}
                    textarea/>
                <div className='flex__center mt-[30px]'>
                    <button className="btn btn__primary mr-3" type="submit">Checkout</button>
                    <button className="btn btn__secondary" type="button" onClick={handleClose}>Cancel</button>
                </div>
            </form>
        </Modal>
    )
}

export default CheckoutFormModal