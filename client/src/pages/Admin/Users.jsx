import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../../components/Utils/Modal'
import AdminSearch from '../../components/Admin/AdminSearch'
import LoadingOverlay from '../../components/Utils/LoadingOverlay'
import AdminPagination from '../../components/Admin/AdminPagination'
import { BsSortAlphaDown, BsSortAlphaDownAlt } from 'react-icons/bs'

const Users = () => {
    
    const navigate = useNavigate()
    const [page, setPage] = useState(1)
    const [users, setUsers] = useState([])
    const [isModal, setIsModal] = useState(null)
    const [sortData, setSortData] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [sortEmail, setSortEmail] = useState('asc')
    const [sortUsername, setSortUsername] = useState('asc')


    useEffect(() => {
        setIsLoading(true)
        fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/users`).then(res => res.json()).then(res => {
            setIsLoading(false)
            setUsers(res.data.filter(user => user.email !== 'admin@admin.com'))
        }).catch(err => {
            setIsLoading(false)
        })
    }, [])

    useEffect(() => {
        if(searchTerm) {
            setPage(1)
        }
    }, [searchTerm])
    

    const filteredUsers = users.filter(user => {
        return user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
            String(user.telpNumber).includes(searchTerm.toLowerCase())
    })

    const handleSort = (dataSort) => {
        setSortData(dataSort)
        if(dataSort === 'username') {
            setSortUsername(sortUsername === 'asc' ? 'desc' : 'asc')
        } else {
            setSortEmail(sortEmail === 'asc' ? 'desc' : 'asc')
        }
    }


    const sortingData = filteredUsers.sort((a, b) => {
        if(a[sortData]?.toLowerCase() < b[sortData]?.toLowerCase()) {
            return sortData === 'username' ? sortUsername === 'asc' ? -1 : 1 : sortEmail === 'asc' ? -1 : 1
        } else if(a[sortData]?.toLowerCase() > b[sortData]?.toLowerCase()) {
            return sortData === 'username' ? sortUsername === 'asc' ? 1 : -1 : sortEmail === 'asc' ? 1 : -1
        } 
        return 0
    })


    return (
        <section className='py-[40px] px-5 flex-1'>
            {isLoading && <LoadingOverlay/>}
            {isModal && (
                <Modal admin>
                    <h1 className='text-center text-xl'>User Info</h1>
                    <div className='mt-3 text-[#444]'>
                        <img src={!isModal.profileImage?.profileImageURL ? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' : isModal.profileImage?.profileImageURL } alt="image-user-profile" className='w-[100px] h-[100px] object-contain mb-2'/>
                        <div className='flex flex-col mb-2'>
                            <p className="mb-1">Username : <span className='font-medium'>{isModal.username}</span></p>
                            <p className="mb-1">User Email : <span className='font-medium'>{isModal.email}</span></p>
                            <p className="mb-1">User Country : <span className='font-medium'>{isModal.country || 'Still Empty'}</span></p>
                            <p className="mb-1">User Address : <span className='font-medium'>{isModal.address || 'Still Empty'}</span></p>
                            <p className="mb-1">User Post Code : <span className='font-medium'>{isModal.postCode || 'Still Empty'}</span></p>
                            <p className="mb-1">User Telpon Number : <span className='font-medium'>{isModal.telpNumber || 'Still Empty'}</span></p>
                        </div>
                        <button className='bg-gray-500 py-2 px-3 rounded-sm text-white transition duration-300 hover:bg-gray-600' onClick={() => setIsModal(false)}>Close Info</button>
                    </div>
                </Modal>
            )}
            <div>
                <div className='mb-[15px]'>
                    <AdminSearch title="users" searchTerm={searchTerm} handleSearch={setSearchTerm}/>
                </div>
                <div className='overflow-x-auto w-full'>
                    <table className='w-full border-collapse border-[1px] border-gray-200 rounded-sm bg-white'>
                        <thead>
                            <tr className='bg-gray-200 text-[#444]'>
                                <th className='text-center p-3'>No</th>
                                <th className='text-center p-3'>Id</th>
                                <th className='text-center p-3 relative group cursor-pointer' onClick={() => handleSort('username')}>
                                    Username
                                    {sortUsername === 'asc' ? 
                                        <BsSortAlphaDown className='hidden group-hover:block absolute right-0 top-[15px] text-lg'/> :
                                        <BsSortAlphaDownAlt className='hidden group-hover:block absolute right-0 top-[15px] text-lg'/>
                                    }
                                </th>
                                <th className='text-center p-3 relative group cursor-pointer' onClick={() => handleSort('email')}>
                                    Email
                                    {sortEmail === 'asc' ? 
                                        <BsSortAlphaDown className='hidden group-hover:block absolute right-0 top-[15px] text-lg'/> : 
                                        <BsSortAlphaDownAlt className='hidden group-hover:block absolute right-0 top-[15px] text-lg'/>
                                    }
                                </th>
                                <th className='text-center p-3'>Country</th>
                                <th className='text-center p-3'>Info</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortingData.length > 0 ? sortingData.slice((page - 1) * 10, (page * 10)).map((user, idx) => (
                                <tr className={`${user.email === 'admin@admin.com' ? 'bg-gray-200' : ''}`} key={user._id}>
                                    <td className='p-3 text-center'>{idx + 1 + ((page - 1) * 10)}</td>
                                    <td className='p-3 text-center whitespace-nowrap'>{user._id.slice(0, 15)}</td>
                                    <td className='p-3 text-center whitespace-nowrap'>{user.username}</td>
                                    <td className='p-3 text-center whitespace-nowrap'>{user.email}</td>
                                    <td className='p-3 text-center whitespace-nowrap'>{user.country ? user.country : "---"}</td>
                                    <td className='p-3 text-center flex__center space-x-3 whitespace-nowrap'>
                                        <p className='cursor-pointer text-blue-600 font-medium underline' onClick={() => setIsModal(user)}>User Info</p>
                                        <p className='cursor-pointer text-green-700 font-medium underline' onClick={() => navigate(`/dashboard/users/${user._id}`)}>Orders History</p>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    {Array(6).fill('').map((_, idx) => (
                                        <td className='p-3 text-center whitespace-nowrap' key={idx}>---</td>
                                    ))}
                                </tr> 
                            )}
                        </tbody>
                    </table>
                </div>
                {filteredUsers.length > 10 && (
                    <div className="flex__center">
                        <AdminPagination page={page} setPage={setPage} isPage={filteredUsers.length > (page * 10)} />  
                    </div>
                )}
            </div>
        </section>
    )
}

export default Users