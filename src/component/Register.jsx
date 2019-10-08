import React, { Component } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'


 class Register extends Component {

    onSubmitClick = () =>{
        //  ambil data dari text box
        let _username = this.username.value
        let _email = this.email.value
        let _password = this.sandi.value
        //cek username  
       
        axios.get('http://localhost:2020/users',)
        .then(res => {
           let sameUserName = res.data.filter(data => {
               return data.username === _username
           })

           if (sameUserName.length > 0) {
               Swal.fire(
                   'Sorry',
                   'Username Telah Di Gunakan',
                   'error'
               )
           } else {
               let sameEmail = res.data.filter(data => {
                   return data.email === _email
               })
               if (sameEmail.length > 0) {
                   Swal.fire(
                       'Sorry',
                       'Email Telah Di Gunakan',
                       'error'
                   )

               } else {
                   axios.post(
                       'http://localhost:2020/users', {
                           username: _username,
                           email: _email,
                           password: _password
                       }
                   ).then(res => {
                       Swal.fire(
                           'Success!',
                           'User has Added',
                           'success'
                       )
                       this.username.value = ''
                       this.email.value = ''
                       this.sandi.value = ''
                   })
               }
           }


           })
         
    }

    render() {
        if(this.props.userName){
            return (<Redirect to ='/'> </Redirect>)
        }
        return (
            <div className=" col-5 mx-auto mt-5 card">
                <div className='card-body'>
                    <div className='border-bottom border-secondary card-tittle'>
                        <h1>Register</h1>
                    </div>
                    <form className="form-group" onSubmit={event => event.preventDefault()}>
                        <div className='card-title'>
                            <h4>Username</h4>
                        </div>
                        <input className="form-control" type="text" name="username" id="" ref={(input) => {this.username =  input}} />
                        <div className='card-title'>
                            <h4>Email</h4>
                        </div>
                        <input className="form-control" type='email'ref={(input) => {this.email =  input}} />
                        <div className='card-title'>
                            <h4>Password</h4>
                        </div>
                        <input className="form-control" type="password" name="password" id=""ref={(input) => {this.sandi =  input}} />
                    <button onClick={this.onSubmitClick} className="btn btn-outline-danger btn-block mt-4" >Register</button>
                    </form>
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
export default connect(mapStateToProps,null)(Register)

// Untuk memberukan referensu ke suatu inputan, kita harus menggunakan atribut 'ref'
    // akan meneruma function, function yang di terima menerima 1 inputan 
    // nama inputa itu bebas, namun biasanya akan di beri nama input

