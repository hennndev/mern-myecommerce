import { useState } from 'react'

const useImagePreview = (formik, imgField) => {
    
    const [previewImage, setPreviewImage] = useState(null)

    const handleChangeImage = (e) => {
        const { files } = e.target
        formik.setValues({
            ...formik.values,
            [imgField]: files[0]
        })
        if(files[0]?.size < 2000000) {
            handlePreviewImage(files[0])
        } else {
            setPreviewImage(null)
        }
    }
    const handlePreviewImage = (image) => {
        const readerImg = new FileReader()
        readerImg.readAsDataURL(image)
        readerImg.onloadend = () => {
            setPreviewImage(readerImg.result)
        }
    }

    return {
        previewImage,
        setPreviewImage,
        handleChangeImage,
    }
}

export default useImagePreview