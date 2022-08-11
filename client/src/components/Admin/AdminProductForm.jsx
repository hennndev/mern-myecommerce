import React from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import InputControl from '../../components/Utils/InputControl'

const AdminProductForm = ({formik, title, children, setPreviewImage}) => {

    const navigate = useNavigate()
    const handleClear = () => {
        formik.resetForm()
        document.getElementById('productImage').value = ''
        setPreviewImage(null)
    }
    return (
        <>
            <div className='flex__center'>
                <div className='w-[650px] mb-5'>
                    <div className='flexx bg-gray-600 text-white py-2 px-5 rounded-sm cursor-pointer w-max transition duration-300 ease-in hover:bg-gray-700' onClick={() => navigate(-1)}>
                        <BiArrowBack className='mr-2 text-lg'/>
                        <p>Get Back</p>
                    </div>
                </div>
            </div>

            <div className='flex__center'>
                <form className='bg-white border border-gray-300 rounded-md p-5 w-[650px]' onSubmit={formik.handleSubmit}>
                    <h2 className='text-center text-2xl mb-5 font-medium text-[#444]'>{title} Form</h2>
                    <InputControl
                        id="productName"
                        labelName="Product Name"
                        placeholder='product name'
                        formik={formik}/>
                    <InputControl
                        id="productCategory"
                        labelName="Product Category"
                        formik={formik}
                        select>
                        <option value="">Select product category</option>
                        <option value="gadget">Gadget</option>
                        <option value="laptop">Laptop</option>
                        <option value="camera">Camera</option>
                    </InputControl>
                    <InputControl
                        id="productCompany"
                        labelName="Product Company"
                        formik={formik}
                        select>
                        <option value="">Select product company</option>
                        <option value="ASUS">ASUS</option>
                        <option value="Apple">Apple</option>
                        <option value="Dell">Dell</option>
                        <option value="Samsung">Samsung</option>
                        <option value="Xiaomi">Xiaomi</option>
                        <option value="Sony">Sony</option>
                        <option value="HP">HP</option>
                        <option value="Huawei">Huawei</option>
                        <option value="Lenovo">Lenovo</option>
                        <option value="Microsoft">Microsoft</option>
                    </InputControl>
                    <InputControl
                        inputType="number"
                        id="productPrice"
                        labelName="Product Price"
                        placeholder='product price'
                        formik={formik}>    
                    </InputControl>
                    <InputControl
                        inputType='number'
                        id="productStock"
                        labelName="Product Stock"
                        placeholder='product stock'
                        formik={formik}/>
                    <InputControl
                        id="productRating"
                        labelName="Product Rating"
                        formik={formik}
                        select>
                         <option value="">Select product rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </InputControl>
                    <InputControl
                        id="productDescription"
                        labelName="Product Description"
                        placeholder='product description'
                        formik={formik}
                        textarea/>
                    {children}
                    <div className='flex__center mt-[30px]'>
                        <button className="btn mr-3" type="submit">{title} Product</button>
                        <button className="btn btn__danger" type="button" onClick={handleClear}>Clear Form</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AdminProductForm