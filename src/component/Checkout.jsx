import React, { Component } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class Checkout extends Component {

    state={
        redirect : false
    }

    //Render 
    renderCheckout = () =>{
        return this.props.cart.map(produk =>{
            let hargaRp = Intl.NumberFormat().format(produk.harga).replace(/,/g, '.')
            let {id,nama_produk,harga,qty} = produk
            let total = harga*qty
            return  <tr>
                        <td>{id}</td>
                        <td>{nama_produk}</td>
                        <td>Rp. {hargaRp}</td>
                        <td>{qty}</td>
                        <td>Rp. {Intl.NumberFormat().format(total).replace(/,/g, '.')}</td>
                    </tr>
        })
    }

// hitung total semua
    allTotal = () =>{
        let allTotal = 0
        this.props.cart.map(produk => {
            allTotal += produk.harga * produk.qty
        })
        return allTotal
    }

// bayar
    pay = () =>{
        let uang = parseInt(this.uang.value)
        if(isNaN(uang)){
            uang=0
        }
        let hasil = uang - this.allTotal()
        
        if(hasil <= 0 ){
            Swal.fire({
                title:'Uang Tidak Cukup',
                type : 'error',
                // showConfirmButton:false,
                timer: 1500,
              })
        }else{
            axios.get('http://localhost:2020/carts',{
                params :{
                    id_user : this.props.iD
                }
            }).then(res =>{
                res.data.map(produk => {
                    axios.delete('http://localhost:2020/carts/'+produk.id)
                })
            }).then(res=>{
                this.setState({redirect:true})
                Swal.fire({
                    title:'Success Kebalian = '+Intl.NumberFormat().format(hasil).replace(/,/g, '.')+',00',
                    type : 'success',
                    showConfirmButton:false,
                    timer: 1500,
                  })
            })
        }
    }   

    render() {
        if(this.state.redirect){
            return <Redirect to="/"></Redirect>
        }
        return (
            <div>
                <table className="table table-hover text-center">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAMA</th>
                            <th>Harga</th>
                            <th>Qty</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderCheckout()}
                        <td>Total</td>
                        <td colSpan='4' className="text-right">Rp. {Intl.NumberFormat().format(this.allTotal()).replace(/,/g, '.')+',00'}</td>
                    </tbody>
                </table>
                <form onSubmit={e =>{e.preventDefault()}}>
                    <input type="text" name="" id="" placeholder='Masukan Uang' className='form-control mb-2' ref={input => {this.uang = input}}/>
                    <button className='btn btn-danger' onClick={this.pay}>Bayar</button>
                </form>
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


export default connect(mapStateToProps)(Checkout)
