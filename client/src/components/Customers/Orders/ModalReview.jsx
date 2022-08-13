import React from 'react'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import { useFormik } from 'formik'
import Modal from '../../Utils/Modal'
import InputControl from '../../Utils/InputControl'
import LoadingOverlay from '../../Utils/LoadingOverlay'

const ModalReview = ({isLoading, setIsLoading, isReview, handleCancel}) => {

    const formik = useFormik({
        initialValues: {
            reviewRating: '',
            reviewBody: '',
        },
        onSubmit: (values) => {
            Swal.fire({
                title: 'Review this product?',
                text: "We appreciated about your review for this product :)",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: 'gray',
                confirmButtonText: 'Yes, review it!'
                }).then((result) => {
                    if(result.isConfirmed) {
                        setIsLoading(true)
                        const { id, ...reviewData} = isReview
                        fetch(`/api/v1/products/${id}/reviews`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                ...values,
                                ...reviewData,
                                createdAt: new Date()
                            })
                        }).then(res => res.json()).then(() => {
                            setIsLoading(false)
                            Swal.fire({
                                icon: 'success',
                                title: 'Review Successfully',
                                text: 'Thank you for your review this product',
                            }).then(() => {
                                handleCancel()
                                window.location.reload()
                            })
                        }).catch(() => {
                            setIsLoading(false)
                            Swal.fire({
                                icon: 'error',
                                title: 'Review Failed',
                                text: 'Something went wrong',
                            })
                        })
                    }
                })
        },
        validationSchema: Yup.object({
            reviewRating: Yup.number().required('Review rating is required!'),
            reviewBody: Yup.string().required('Review body is required!')
        })
    })

    return (
        <Modal admin>
            {isLoading && <LoadingOverlay/>}
            <form onSubmit={formik.handleSubmit}>
                <h2 className='text-center text-xl mb-5 font-medium text-[#444]'>
                    Review Product <br />
                    <span className='text-sm text-gray-500'>{isReview.productName}</span>
                </h2>
                <InputControl
                    id="reviewRating"
                    labelName="Review Rating"
                    formik={formik}
                    select>
                    <option value="">Select review rating</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </InputControl>
                <InputControl
                    id="reviewBody"
                    labelName="Review Body"
                    placeholder='review body'
                    formik={formik}
                    textarea/>
                <div className='flex__center mt-[30px]'>
                    <button className="btn btn__warning mr-3" type="submit">Submit Review</button>
                    <button className="btn btn__secondary" type="button" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </Modal>
    )
}

export default ModalReview