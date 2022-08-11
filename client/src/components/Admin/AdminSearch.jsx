import React from 'react'

const AdminSearch = ({title, searchTerm, handleSearch}) => {
    return (
        <div className='w-full lg:w-[500px] flexx border border-gray-200 rounded-md overflow-hidden'>
            <input type="text" className='outline-none py-2 flex-1 px-3' placeholder={`Search ${title} here...`} value={searchTerm} onChange={(e) => handleSearch(e.target.value)}/>
        </div>
    )
}

export default AdminSearch