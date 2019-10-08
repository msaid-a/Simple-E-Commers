// reducers

import { combineReducers } from 'redux'

// nilai awal simpan auth
const initState = {
    id :0,
    username: ''
}

const initCart = {
    id_produk: 0,
    nama_produk: "",
    id_user: 0,
    username: "",
    harga: "",
    qty: 0,
    gambar :'',
    id: 0
}

const authReducer = (state = initState, action) =>{
    switch(action.type){
        case "LOGIN_SUCCESS":
            return {...state, id: action.payload.id, username: action.payload.username}   

        case "LOGOUT_SUCCESS":
            return {...state,...initState} 
        default:
            return state
    }
}

const cart = (state = initCart, action) =>{
    switch(action.type){
        case "INPUT_SUCCESS":
            return {...state, 
                id_produk: action.payload.id_produk,
                nama_produk: action.payload.nama_produk,
                deskripsi : action.payload.deskripsi,
                id_user: action.payload.id_user,
                username: action.payload.username,
                harga: action.payload.harga,
                qty: action.payload.qty,
                gambar :action.payload.gambar,
                id: action.payload.id}   

        default:
            return state
    }
}

// unutnuk menentukan tempat onyeimpanan dari dari setiap reduces
// authReducers alkan memikili tempat penyimpanan auth 
let reducers = combineReducers(
    {
        auth : authReducer,
        cart : cart
    }
)

export default reducers
// action adalah bject yang memiliki 2 properti 
    // type : untuk menentukan reducers mana yang akan mengola 
    // payload : berisi data yang akan di olah
    // {
    //     type: "register",
    //     payload : {name: 'Steave', job : 'Jobs'}
    // }