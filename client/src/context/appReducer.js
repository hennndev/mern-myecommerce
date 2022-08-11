


export const initState = {
    userLogin: JSON.parse(localStorage.getItem('userLogin')) || null,
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    productDataTemp: null,
    openSidebar: false
}

export const appReducer = (state, action) => {
    switch(action.type) {
        case 'SAVE_DATA_TEMP' :
            return {
                ...state,
                productDataTemp: action.payload
            }
        case 'SAVE_CURRENT_USER' :
            localStorage.setItem('userLogin', JSON.stringify(action.payload))
            return {
                ...state,
                userLogin: action.payload
            }
        case 'ADD_PRODUCT_TO_CART' : 
            let updatedCart = [...state.cart]
            const existProduct = state.cart.find(item => item._id === action.payload._id)
            const existProductIdx = state.cart.indexOf(existProduct)
            if(!existProduct) {
                updatedCart = [...updatedCart, {
                    ...action.payload
                }]
            } else {
                if(existProduct.count === existProduct.productStock) {
                    existProduct.count = existProduct.productStock
                } else {
                    if(existProduct.count === 20) existProduct.count = 20
                    else existProduct.count++
                    updatedCart[existProductIdx] = existProduct
                }
            }
            localStorage.setItem('cart', JSON.stringify(updatedCart))
            return {
                ...state,
                cart: updatedCart
            }
        case 'DELETE_PRODUCT_IN_CART' :
            let updatedDeleteItemCart = [...state.cart]
            const existProductDel = state.cart.find(item => item._id === action.payload._id)
            const existProductIdxDel = state.cart.indexOf(existProductDel)
            if(!action.isDelete) {
                if(existProductDel.count === 1) {
                    updatedDeleteItemCart = state.cart.filter(item => item._id !== action.payload._id)
                } else {
                    existProductDel.count--
                    updatedDeleteItemCart[existProductIdxDel] = existProductDel
                }
            } else {
                updatedDeleteItemCart = state.cart.filter(item => item._id !== action.payload._id)
            }
            localStorage.setItem('cart', JSON.stringify(updatedDeleteItemCart))
            return {
                ...state,
                cart: updatedDeleteItemCart
            }
        case 'CLEAR_CART' :
            localStorage.setItem('cart', JSON.stringify([]))
            return {
                ...state,
                cart: []
            }
        case 'OPEN_SIDEBAR': 
            return {
                ...state,
                openSidebar: action.payload
            }
        default : 
            return state
        
    }
}