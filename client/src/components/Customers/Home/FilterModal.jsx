import React from 'react'
import Modal from '../../Utils/Modal'

const FilterModal = ({handleClose, values, handleChange, handleSubmit, maxPrice}) => {

    return (
        <Modal>
            <form onSubmit={handleSubmit} className="text-[#444]">
                <h1 className='text-center mb-5 text-xl'>Filter Products</h1>
                <div className="flex flex-col md:flex-row md:items-center md:space-x-3">
                    <div className="input__control mb-[10px] flex-1">
                        <label htmlFor="category">Category</label>
                        <select id="category" value={values.category} onChange={handleChange}>
                            <option value="">All Category</option>
                            <option value="gadget">Gadget</option>
                            <option value="laptop">Laptop</option>
                            <option value="camera">Camera</option>
                        </select>
                    </div>
                    <div className="input__control mb-[10px] flex-1">
                        <label htmlFor="company">Company</label>
                        <select id="company" value={values.company} onChange={handleChange}>
                            <option value="">All Company</option>
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
                        </select>
                    </div>
                </div>
                <div className="input__control mb-[10px]">
                    <label htmlFor="rating">All Rating</label>
                    <select id="rating" value={values.rating} onChange={handleChange}>
                        <option value="">Select product rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:space-x-3">
                    <div className="input__control mb-[10px] flex-1">
                        <label htmlFor="price">Range Price</label>
                        <div className="flexx space-x-2">
                            <input type="range" id="price" value={values.price} onChange={handleChange}
                                step={1}
                                min={0} 
                                max={maxPrice}
                                className="flex-1"/>
                            <p>{values.price}</p>
                        </div>
                    </div>
                    <div className="input__control mb-[10px] flex-1">
                        <label htmlFor="discount">Discount</label>
                        <div className="flexx space-x-2">
                            <input type="range" id="discount" value={values.discount} onChange={handleChange}
                                step={1}
                                min={0} 
                                max={100}
                                className='flex-1'/>
                            <p>{values.discount}</p>
                        </div>
                    </div>
                </div>
                <div className='space-x-3'>
                    <button className='btn btn__primary' type="submit">Submit Filter</button>
                    <button className='btn btn__secondary' onClick={handleClose} type="button">Close</button>
                </div>
            </form>
        </Modal>
    )
}

export default FilterModal