import React, { useReducer, useContext, createContext } from 'react'
import { initState, appReducer } from './appReducer'


const Context = createContext()

const Provider = ({children}) => {

    const [state, dispatch] = useReducer(appReducer, initState)

    const saveDataTemp = (payload) => {
        return dispatch({
            type: 'SAVE_DATA_TEMP',
            payload: payload
        })
    }
    const saveCurrentUser = (payload) => {
        return dispatch({
            type: 'SAVE_CURRENT_USER',
            payload: payload
        })
    }
    const addProductToCart = (payload) => {
        return dispatch({
            type: 'ADD_PRODUCT_TO_CART',
            payload: payload
        })
    }
    const deleteProductInCart = (payload, isDelete = false) => {
        return dispatch({
            type: 'DELETE_PRODUCT_IN_CART',
            payload: payload,
            isDelete: isDelete
        })
    }
    const clearCart = () => {
        return dispatch({
            type: 'CLEAR_CART'
        })
    }
    const handleOpenSidebar = (payload) => {
        return dispatch({
            type: 'OPEN_SIDEBAR',
            payload: payload
        })
    }

    return (
        <Context.Provider value={{
            ...state,
            saveDataTemp,
            saveCurrentUser,
            addProductToCart,
            deleteProductInCart,
            clearCart,
            handleOpenSidebar
        }}>
            {children}
        </Context.Provider>
    )
}

const useData = () => useContext(Context)

export {
    useData,
    Provider
}