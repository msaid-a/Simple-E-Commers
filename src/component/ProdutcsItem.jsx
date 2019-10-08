import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {addToCart} from '../actions/index'
import {Redirect} from 'react-router-dom'

export class ProdutcsItem extends Component {

    state={
        redirect :false
    }

    onAddToCart = (id_produk,nama_produk,deskripsi,id_user,username,harga,qty,gambar) =>{
        if(!username){
            this.setState({redirect:true})
        }else{
            this.props.addToCart(id_produk,nama_produk,deskripsi,id_user,username,harga,qty,gambar)
        }
    }


    render() {
        if(this.state.redirect){
            return <Redirect to='/login'></Redirect>
        }
        let {nama, deskripsi, linkGambar, harga, id} = this.props.barang
        let price = Intl.NumberFormat().format(harga).replace(/,/g, '.')
        return (
                 <div className="card col-10 col-lg-4 col-xl-3 m-5" key={id}>
                     <img src={linkGambar} className="card-img-top" alt="..." />

                     <div className="card-body">
                         <h5 className="card-title">{nama}</h5>
                         <p className="card-text">{deskripsi}</p>
                         <p className="card-text">Rp. {price}</p>
                         <input type="number" className="form-control mb-2" ref={input => {this.qty = input}}/>
                         <Link to={'/detailproducts/'+ id}><button
                             className="btn btn-block btn-outline-primary mb-1">Detail</button></Link>
                         <button className="btn btn-block btn-outline-dark" onClick={() => {this.onAddToCart(id,nama,deskripsi,this.props.iD,this.props.userName,harga,this.qty.value,linkGambar)}}>Add to Cart</button>
                     </div>
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
export default connect(mapStateToProps, {addToCart})(ProdutcsItem)
