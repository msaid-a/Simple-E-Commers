// ACTION CREATORS 
import axios from 'axios'
import Swal from 'sweetalert2'

export const sendData = (_username, _password) =>{
   return (dispatch) => {

       axios.get(
           'http://localhost:2020/users', 
           {
               params:{
                   username : _username,
                   password : _password
               }
           }
       ).then((res) => {
           if(res.data.length === 0){
               Swal.fire({
                   type: 'error',
                   title: 'Sorry',
                   text: 'Username atau Password Salah!',
                   showConfirmButton:false,
                   timer:900
               })
           }else{
               let {id, username} = res.data[0]
               // kirim id dan username ke reducers
                   localStorage.setItem('userData',JSON.stringify({id, username}))
                   // Action
                   dispatch( {
                       type : "LOGIN_SUCCESS",
                       payload : {
                           id, 
                           username 
                       }
                   }
                   )
               
           }
       })
   }
    
}

export const logoutData = (_id, _username) =>{
    // Action

    // hapus data di local storage
    localStorage.removeItem('userData')
    // hapus data di redux
    return {
        type : "LOGOUT_SUCCESS",
    }
}

export const session = (userData) =>{
    return {
        type : 'LOGIN_SUCCESS',
        payload:{
            id : userData.id,
            username: userData.username
        }
    }
}

export const addToCart = (id_produk,nama_produk,deskripsi,id_user,username,harga,qty,gambar) =>{
    let _harga = parseInt(harga)
    let _qty = parseInt(qty)
    if(isNaN(_qty)){
        _qty = 1
    }
    return (dispatch) =>{

        axios.get('http://localhost:2020/carts',{
            params:{
                id_user : id_user,
                id_produk : id_produk
            }
        }).then(res =>{
            let same=res.data.filter(produk => {
                return produk.id_produk = id_produk
            })
            if(same.length > 0){
                let total = res.data[0].qty + _qty
                axios.patch('http://localhost:2020/carts/'+res.data[0].id,{
                    qty : total
                }).then(res=>{
                Swal.fire({
                        title:'Added to Cart',
                        type : 'success',
                        showConfirmButton:false,
                        timer: 1500,
                })
                })
            }else{
                axios.post('http://localhost:2020/carts', {
                    id_produk,
                    nama_produk,
                    deskripsi,
                    id_user,
                    username,
                    harga: _harga,
                    qty: _qty,
                    gambar
                }).then(res => {
                    Swal.fire({
                        title:'Added to Cart',
                        type : 'success',
                        showConfirmButton:false,
                        timer: 1500,
                })
                    dispatch({
                        type: 'INPUT_SUCCESS',
                        payload: {
                            id_produk,
                            nama_produk,
                            deskripsi,
                            id_user,
                            username,
                            harga,
                            qty,
                            gambar
                        }
                    })
                })
                
            }
        })
}
} 