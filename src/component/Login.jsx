import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sendData } from '../actions/index'
import {Redirect} from 'react-router-dom'


class Login extends Component {

    onSignInClick = () =>{
        let _username = this.username.value
        let _password = this.password.value
        this.props.sendData(_username, _password)
       
    }

    render() {
        if(this.props.userName){
            return (<Redirect to ='/' /> )
        }
        return (
            <div className="card mx-auto mt-5 col-5">
                <div className='card-body'>
                    <div className='border-bottom border-secondary card-title'>
                    <h1>Login</h1>
                    </div>
                    <form className="form-group" onSubmit={event => {event.preventDefault()}}>
                        <div className="card-title">
                            <h4>Username</h4>
                        </div>
                        <input className="form-control" ref={input => {this.username = input}}type="text" name="username" id=""/>
                        <div className="card-title">
                            <h4>Password</h4>
                        </div>
                        <input className="form-control" ref={input => {this.password = input }}type="password" name="password" id=""/>
                    <button className ="btn btn-primary btn-block mt-4" onClick={this.onSignInClick}>Login</button>
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
export default connect(mapStateToProps, {sendData})(Login)

// connect (ambil data, kirim data)