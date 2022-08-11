import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../../context/appContext'

const Profile = () => {

    const navigate = useNavigate()
    const { userLogin } = useData()
    
    return (
        <section className='mt-[50px] container px-5 flex__center'>
            <div className='shadow-card p-5 w-[500px] rounded-md'>
                <div className="flex__center flex-col w-full">
                    <div className='h-[100px] w-[100px]'>
                        <img src={userLogin.profileImage.profileImageURL || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt={userLogin.username} className='w-full h-full object-contain rounded-full'/>
                    </div>
                </div>
                <div className='flex flex-col space-y-2 mt-5'>
                    <h1>Username: {userLogin.username}</h1>
                    <h1>Email: {userLogin.email}</h1>
                    <h1>Telp Number: {userLogin.telpNumber ? userLogin.telpNumber : '---'}</h1>
                    <h1>Country: {userLogin.country ? userLogin.country : '---'}</h1>
                    <h1>Address: {userLogin.address ? userLogin.address : '---'}</h1>
                    <h1>Post Code: {userLogin?.postCode ? userLogin?.postCode : '---'}</h1>
                    <h1>My Orders History: <span onClick={() => navigate('/orders')} className='text-blue-500 underline cursor-pointer'>Orders History</span></h1>
                </div>
                <div className='flex__center mt-5'>
                    <button className="btn btn__primary" onClick={() => navigate('/profile/edit-profile')}>Edit Profile</button>
                </div>
            </div>
        </section>
    )
}

export default Profile