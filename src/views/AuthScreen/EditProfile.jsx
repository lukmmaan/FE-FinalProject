import React from "react";
import { connect } from "react-redux";
import Axios from "axios";
import {loginHandler,logoutHandler, changeProfileHandler} from "../../redux/actions"
import swal from "sweetalert";
import { Redirect } from "react-router-dom";
const API_URL = `http://localhost:8080/`;
class EditProfile extends React.Component{
    state={
        editProfileForm:{
            id: this.props.user.id,
            alamat: this.props.user.alamat,
            email: this.props.user.email,
            fullName: this.props.user.fullName,
            noHp: this.props.user.noHp,
            username: this.props.user.username,
        },
        editPassword:{
            id: this.props.user.id, 
            password:"",
            newPassword:"",
        },
        kondisiUbahPassword: false
    }
    inputHandler = (e, field, form) => {
        const { value } = e.target;
        this.setState({
            [form]: {
                ...this.state[form],
                [field]: value,
            },
        });
    }
    saveEditHandler = () =>{
        // console.log(this.state.editProfileForm)
        Axios.put(`${API_URL}/users/editProfile`,this.state.editProfileForm)
        .then((res)=>{
            console.log(res.data)
            swal("Sukses!", "Your Data Has Been Changed", "success");
            // this.props.changeProfileHandler(this.state.editProfileForm)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

        
    saveEditPassword = () =>{
        console.log(this.state.editPassword)
        Axios.get(`${API_URL}/users/password/${this.state.editPassword.id}/${this.state.editPassword.password}/${this.state.editPassword.newPassword}`)
        .then((res)=>{
            console.log(res.data)
            swal("Sukses!", "Your Password Has Been Changed", "success");
            this.props.onLogout();
            this.setState({
                kondisiUbahPassword: true
            })
        })
        .catch((err)=>{
            swal("Gagal!", "Your Password Not Match", "error");
            console.log(err)
        })
    }
    render(){
        if (this.state.kondisiUbahPassword) {
            return <Redirect to="/"/>
        }
        else{
            return(
                <div>
                    <hr/>
                    <div className="container" style={{border:"1px solid red", height:"570px"}}>
                        <div className="App">
                            <h3>Edit Your Profile Here . . . !</h3>
                        </div>
                        <div className="App">
                        <input value={this.state.editProfileForm.fullName} onChange={(e) => this.inputHandler(e, "fullName", "editProfileForm")}  className="form-control mb-3" type="text" placeholder="Full Name" />
                        <input value={this.state.editProfileForm.username} onChange={(e) => this.inputHandler(e, "username", "editProfileForm")}  className="form-control mb-3" type="text" placeholder="Username" />
                        <input value={this.state.editProfileForm.email} onChange={(e) => this.inputHandler(e, "email", "editProfileForm")}  className="form-control mb-3" type="text" placeholder="Email" />   
                        <input value={this.state.editProfileForm.noHp} onChange={(e) => this.inputHandler(e, "noHp", "editProfileForm")}  className="form-control mb-3" type="text" placeholder="Phone Number" />
                        <input value={this.state.editProfileForm.alamat} onChange={(e) => this.inputHandler(e, "alamat", "editProfileForm")}  className="form-control mb-3" type="text" placeholder="Alamat" />
                        <input onClick={this.saveEditHandler} className="btn btn-primary" type="button" value="Save"/>
                        </div>
                        <div className="App">
                        <h3>Edit Your Password Here . . . !</h3>
                        <input onChange={(e) => this.inputHandler(e, "password", "editPassword")} type="text" className="form-control mb-3" placeholder="Old Password"/>
                        <input onChange={(e) => this.inputHandler(e, "newPassword", "editPassword")} type="text" className="form-control mb-3" placeholder="New Password"/>
                        <input onClick={this.saveEditPassword}  className="btn btn-primary" type="button" value="Save"/>
                        </div>
                    </div>
                </div>
            )     
        }
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};
const mapDispatchToProps = {
    onLogin: loginHandler,
    onLogout: logoutHandler,
    changeProfileHandler,
};
export default connect (mapStateToProps,mapDispatchToProps)(EditProfile)
