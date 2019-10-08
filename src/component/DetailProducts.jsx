import React, { Component } from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {addToCart} from '../actions/index'
import Swal from 'sweetalert2'


class DetailProducts extends Component {

    state = {
        products : [],
        redirect :false
    }

    // add to wishlist
    addToWishlist = (id_produk,nama_produk,deskripsi,id_user,username,harga,gambar) =>{
        if(!username){
            return this.setState({redirect:true})
        }
        let _harga = parseInt(harga)
    
            axios.get('http://localhost:2020/wishlist',{
                params:{
                    id_user : id_user,
                    id_produk : id_produk
                }
            }).then(res =>{
                let same=res.data.filter(produk => {
                    return produk.id_produk = id_produk
                })
                if(same.length > 0){
                    Swal.fire({
                            title:'Produk In Wishlist',
                            type : 'warning',
                            showConfirmButton:false,
                            timer: 1500,
                    })
                }else{
                    axios.post('http://localhost:2020/wishlist', {
                        id_produk,
                        nama_produk,
                        deskripsi,
                        id_user,
                        username,
                        harga: _harga,
                        gambar
                    }).then(res => {
                        Swal.fire({
                            title:'Added to Wishlist',
                            type : 'success',
                            showConfirmButton:false,
                            timer: 1500,
                    })
                    })
                    
                }
            })
    }
     

    // add to Cart
    onAddToCart = (id_produk,nama_produk,deskripsi,id_user,username,harga,qty,gambar) =>{
        if(!username){
            this.setState({redirect:true})
        }else{
            this.props.addToCart(id_produk,nama_produk,deskripsi,id_user,username,harga,qty,gambar)
        }
    }

    getData = () =>{
        const id = this.props.match.params.idProduk
        axios.get('http://localhost:2020/products/' + id)
        .then(res => {
            this.setState({
                products: [res.data]
            })
        })
    }

    componentDidMount(){
        this.getData()
    }

    tampil = () =>{
        return this.state.products.map(produk => {
            let {nama, deskripsi, linkGambar, harga, id} = produk
            return (<div className="row my-5 mx-auto" key={produk.id}>
                <div className = "col-4 text-center">
                     <img src={linkGambar} className="card-img-top" alt="..." />
                </div>
                     <div className="col-4">
                            <h1>{nama}</h1>
                         <h5>{nama}</h5>
                         <p>{deskripsi}</p>
                         <p className="h4 text-danger font-weight-bold">Rp. {harga}</p>
                         <input type="number" className="form-control mb-2" ref={input => {this.qty = input}} />
                         <button className="btn btn-block btn-dark" onClick={() => {this.onAddToCart(id,nama,deskripsi,this.props.iD,this.props.userName,harga,this.qty.value,linkGambar)}}>Add to Cart</button>
                         <button className="btn btn-block btn-danger" onClick={() => {this.addToWishlist(id,nama,deskripsi,this.props.iD,this.props.userName,harga,linkGambar)}}>Add to Wishlist</button>
                     </div>
                 </div>)   

        })
    }
    render() {
        if(this.state.redirect){
            return <Redirect to='/login'></Redirect>
        }
        return (
            <div className="container ">
                    {this.tampil()} 
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
      userName : state.auth.username,
      iD : state.auth.id,
    }
  }
export default connect(mapStateToProps,{addToCart})(DetailProducts)
