import React, { Children } from 'react'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'

const InputControl = ({inputType = 'text', labelName, id, formik, placeholder = '', className = '', isShow, handleShow, textarea, select, children}) => {

    let inputField = 
        <input 
            type={inputType} 
            id={id}
            onBlur={formik.handleBlur}
            {...formik.getFieldProps(id)}
            placeholder={`Type ${placeholder} here...`}/>

    if(id === 'password' || id === 'passwordConfirmation') {
        inputField = 
            <div className='flex__between rounded-md border border-gray-200 outline-none pr-[15px]'>
                <input 
                    type={isShow ? 'text' : 'password'}
                    onBlur={formik.handleBlur}
                    {...formik.getFieldProps(id)} 
                    autoComplete="off"
                    className="flex-1 rounded-none border-none"/>
                {isShow ? 
                    <AiOutlineEye className='cursor-pointer text-lg' onClick={handleShow}/> : 
                    <AiOutlineEyeInvisible className='cursor-pointer text-lg' onClick={handleShow}/>
                }
            </div>
    }
    if(textarea) {
        inputField =  
            <textarea 
                id={id}
                onBlur={formik.handleBlur}
                {...formik.getFieldProps(id)}
                placeholder={`Type ${placeholder} here...`} 
                rows="8">
            </textarea>
    }

    if(select) {
        inputField = 
            <select
                id={id}
                onBlur={formik.handleBlur}
                {...formik.getFieldProps(id)}>
                {children}
            </select>
    }

    return (
        <div className={`input__control ${className}`}>
            <label htmlFor={id}>{labelName}</label>
            {inputField}
            {formik.errors[id] && formik.touched[id] && <small className='input__error'>{formik.errors[id]}</small>}
        </div>
    )
}

export default InputControl