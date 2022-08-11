import React from 'react'
import { useCookies } from 'react-cookie'
import { Navigate } from 'react-router-dom'
import { useData } from '../../context/appContext'

const RequireAuth = ({isAuth = null, isAdmin, children}) => {

    const [cookies] = useCookies(['userLogin'])
    const { userLogin } = useData() 

    if(cookies.userLogin) {
        if(isAuth) {
            return <Navigate to="/"/> 
        }
        if(!isAdmin && userLogin?.email !== 'admin@admin.com') {
            return children
        }
        if(userLogin?.email === 'admin@admin.com' && isAdmin) {
            return children
        } else {
            return <Navigate to="/page-not-found"/>
        }
    } else {
        return isAuth ? children : <Navigate to="/login"/>
    }
}

export default RequireAuth