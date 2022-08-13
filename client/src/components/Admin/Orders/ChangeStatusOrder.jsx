import React, { useEffect } from 'react'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import { useFormik } from 'formik'
import Modal from '../../Utils/Modal'
import InputControl from '../../Utils/InputControl'

const ChangeStatusOrder = ({isModal, setIsModal, setIsLoading}) => {

    const formik = useFormik({
        initialValues: { orderStatus: '' },
        onSubmit: (values) => {
            Swal.fire({
                title: `Change status order = ${values.orderStatus}?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: 'gray',
                confirmButtonText: 'Change it!'
            }).then((result) => {
                if(result.isConfirmed) {
                    setIsLoading(true)
                    fetch(`/api/v1/orders/${isModal.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            orderStatus: values.orderStatus
                        })
                    }).then(res => res.json()).then(res => {
                        setIsModal(null)
                        setIsLoading(false)
                        window.location.reload()
                    }).catch(err => {
                        setIsLoading(false)
                    })
                }
            })

        },
        validationSchema: Yup.object({
            orderStatus: Yup.string().required('Order status is required!')
        })
    })

    useEffect(() => {
        if(isModal) {
            formik.setValues({
                orderStatus: isModal.orderStatus !== 'Pending' ? isModal.orderStatus : ''
            })
        }
    }, [isModal])
    

    return (
        <Modal admin>
            <h1 className='text-center text-xl'>Order Status</h1>
            <form onSubmit={formik.handleSubmit}>
                <InputControl
                    id="orderStatus"
                    labelName="Order Status"
                    formik={formik}
                    select>
                    <option value="">Select order status</option>
                    <option value="Ordered">Ordered</option>
                    <option value="Packed">Packed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                </InputControl>
                <div className='flex__center mt-[30px]'>
                    <button className="btn mr-3" type="submit">Submit Change</button>
                    <button className="btn btn__secondary" type="button" onClick={() => setIsModal(null)}>Cancel</button>
                </div>
            </form>
        </Modal>
    )
}

export default ChangeStatusOrder