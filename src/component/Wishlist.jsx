import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import Swal from 'sweetalert2'

import {Redirect, Link} from 'react-router-dom'

class Wishlist extends Component {
    
    state ={
        wishlist:[],
        modal:false,
        redirect : false,
    }



// get Data
    getData = () =>{
        axios.get('http://localhost:2020/wishlist',{
            params :{
                id_user : this.props.iD
            }
        }).then(res => {
            this.setState({wishlist : res.data})
        })
    }

    componentDidMount = () =>{
        this.getData()
    }

// go to Detail Produk

// render Data
    renderCarts = () =>{
        return this.state.wishlist.map(produk => {
            let {id,nama_produk,deskripsi,gambar,id_produk} = produk
            return <tr>
                <td>{id}</td>
                <td>{nama_produk}</td>
                <td>{deskripsi}</td>
                <td>
                    <img src={gambar} alt="" style={{width: 60}}/>
                </td>
                <td>
                    <button onClick={() => {this.onDeleteClick(produk.id)}} className="btn btn-danger m-1">Delete</button>
                    <Link to={"/detailproducts/"+ id_produk}><button className="btn btn-primary ">Buy</button></Link>
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
            axios.delete('http://localhost:2020/wishlist/' + id).then(res =>{
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
        if(this.state.wishlist.length <=0){
            return <h1 className='text-center mt-3'>Your Wishlist is Empety Please Add Product to Your Wishlist <Link to='/'>Click Here</Link></h1>
        }
        return (
            <div>
                <h1 className="mt-3">Wishlist</h1>
               <table className="table table-hover text-center">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAMA</th>
                            <th>Deskripsi</th>
                            <th>Gambar</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderCarts()}
                    </tbody>
                </table>
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

export default connect(mapStateToProps)(Wishlist)
