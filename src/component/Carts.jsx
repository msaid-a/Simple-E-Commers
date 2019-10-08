import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import Swal from 'sweetalert2'

import Checkout from './Checkout'
import {Redirect, Link} from 'react-router-dom'

class Carts extends Component {
    
    state ={
        carts:[],
        modal:false,
    }
// modal Checkout
    toggleCheckout = () =>{
        this.setState(prevState => ({
        modal: !prevState.modal,
        }));
            
      }

      toggleCancel = () =>{
        this.setState(prevState => ({
            modal : !prevState.modal,
        }))
    }


// get Data
    getData = () =>{
        axios.get('http://localhost:2020/carts',{
            params :{
                id_user : this.props.iD
            }
        }).then(res => {
            this.setState({carts : res.data})
        })
    }

    componentDidMount = () =>{
        this.getData()
    }

// render Data
    renderCarts = () =>{
        return this.state.carts.map(produk => {
            let {id,nama_produk,deskripsi,harga,qty,gambar} = produk
            let hargaRp = Intl.NumberFormat().format(harga).replace(/,/g, '.')
            return <tr>
                <td>{id}</td>
                <td>{nama_produk}</td>
                <td>{deskripsi}</td>
                <td>Rp. {hargaRp}</td>
                <td>{qty}</td>
                <td>
                    <img src={gambar} alt="" style={{width: 60}}/>
                </td>
                <td>
                    <button onClick={() => {this.onDeleteClick(produk.id)}} className="btn btn-danger ">Delete</button>
                </td>
            </tr>
        })
    }
// Delete 
onDeleteClick = (id)=>{
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
          if (result.value) {
            axios.delete('http://localhost:2020/carts/' + id).then(res =>{
                this.getData()
            })
              Swal.fire({
                title:'Your file has been Deleted.',
                type : 'success',
                showConfirmButton:false,
                timer: 1500,
              })
              
        }
      })
}
    render() {
        if(!this.props.userName){
            return <Redirect to="/"></Redirect>
        }
        if(this.state.carts.length <=0){
            return <h1 className='text-center mt-3'>Your Car is Empety Please Add Product to Your Cart <Link to='/'>Click Here</Link></h1>
        }
        return (
            <div>
                <h1 className="mt-3">Carts</h1>
               <table className="table table-hover text-center">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAMA</th>
                            <th>Deskripsi</th>
                            <th>Harga</th>
                            <th>Qty</th>
                            <th>Gambar</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderCarts()}
                    </tbody>
                </table>
                <button className='btn btn-success' onClick={this.toggleCheckout}>Checkout</button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} id="modal1">
                    <ModalHeader toggle={this.toggleCancel}></ModalHeader>
                    <ModalBody>
                        <Checkout cart={this.state.carts}></Checkout>
                    </ModalBody>
                </Modal>
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

export default connect(mapStateToProps)(Carts)
