import React from "react";
import { connect } from "react-redux";
import Axios from "axios";
import { loginHandler, logoutHandler, changeProfileHandler } from "../../redux/actions"
import swal from "sweetalert";
import { Redirect } from "react-router-dom";
import "./EditProfile.css"
const API_URL = `http://localhost:8080/`;
class EditProfile extends React.Component {
    state = {
        editProfileForm: {
            id: this.props.user.id,
            alamat: this.props.user.alamat,
            email: this.props.user.email,
            fullName: this.props.user.fullName,
            noHp: this.props.user.noHp,
            username: this.props.user.username,
        },
        editPassword: {
            id: this.props.user.id,
            password: "",
            newPassword: "",
        },
        kondisiUbahPassword: false,
        kondisiPage: 1,
        showPassword: false,
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
    saveEditHandler = () => {
        // console.log(this.state.editProfileForm)
        Axios.put(`${API_URL}/users/editProfile`, this.state.editProfileForm)
            .then((res) => {
                console.log(res.data)
                swal("Sukses!", "Your Data Has Been Changed", "success");
                this.props.changeProfileHandler(res.data)
            })
            .catch((err) => {
                console.log(err)
                // swal("Gagal", err.response.data.message, "error")
            })
    }

    saveEditPassword = () => {
        if (!this.state.editPassword.newPassword) {
            return swal("Gagal", "Password Baru Belum Diisi", "error")
        }
        console.log(this.state.editPassword)
        Axios.get(`${API_URL}/users/password/${this.state.editPassword.id}/${this.state.editPassword.password}/${this.state.editPassword.newPassword}`)
            .then((res) => {
                console.log(res.data)
                swal("Sukses!", "Your Password Has Been Changed", "success");
                this.props.onLogout();
                this.setState({
                    kondisiUbahPassword: true
                })
            })
            .catch((err) => {
                swal("Gagal!", err.response.data.message, "error");
                // console.log(err.response.data.message)
            })
    }
    // checkBoxHandler = (e, form) => {
    //     const { checked } = e.target;
    //     this.setState({
    //             showPassword: checked
    //     })
    // }
    renderPage = () => {
        if (this.state.kondisiPage == 1) {
            return (
                <div className="App mt-5">
                    <div className="row">
                        <div className="col-6">
                            {/* <h3>Full Name</h3> */}
                            <input value={this.state.editProfileForm.fullName} onChange={(e) => this.inputHandler(e, "fullName", "editProfileForm")} className="form-control mb-3" type="text" placeholder="Full Name" />
                        </div>
                        <div className="col-6">
                            {/* <h3>Username</h3> */}
                            <input value={this.state.editProfileForm.username} onChange={(e) => this.inputHandler(e, "username", "editProfileForm")} className="form-control mb-3" type="text" placeholder="Username" />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-6">
                            {/* <h3>Email</h3> */}
                            <input value={this.state.editProfileForm.email} onChange={(e) => this.inputHandler(e, "email", "editProfileForm")} className="form-control mb-3" type="text" placeholder="Email" />
                        </div>
                        <div className="col-6">
                            {/* <h3>Number Handphone</h3> */}
                            <input value={this.state.editProfileForm.noHp} onChange={(e) => this.inputHandler(e, "noHp", "editProfileForm")} className="form-control mb-3" type="text" placeholder="Phone Number" />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-12">
                            {/* <h3>Alamat</h3> */}
                            <textarea value={this.state.editProfileForm.alamat} onChange={(e) => this.inputHandler(e, "alamat", "editProfileForm")} className="form-control mb-3" type="text" placeholder="Alamat" />
                        </div>
                    </div>
                    <input onClick={this.saveEditHandler} className="btn btn-primary" type="button" value="Save" />
                </div>
            )
        }
        else if (this.state.kondisiPage == 2) {
            return (
                <div className="App mt-5">
                    <input onChange={(e) => this.inputHandler(e, "password", "editPassword")} type="text" type={this.state.showPassword ? "text" : "password"} className="form-control mt-5" placeholder="Old Password" />
                    <input onChange={(e) => this.inputHandler(e, "newPassword", "editPassword")} type="text" type={this.state.showPassword ? "text" : "password"} className="form-control mt-5 mb-5" placeholder="New Password" />
                    <div className="d-flex flex-row">
                        <input type="checkbox" onChange={(e) => this.setState({ showPassword: e.target.checked })} style={{ marginRight: "10px" }} />
                        <p>Show Password</p>
                    </div>
                    <input onClick={this.saveEditPassword} className="btn btn-primary" type="button" value="Save" />
                </div>
            )
        }
    }
    getVerify = () =>{
        Axios.get(`${API_URL}/users/email/verify/${this.props.user.username}`)
        .then((res)=>{
            swal("Sukses",res.data,"success")
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    render() {
        if (this.state.kondisiUbahPassword) {
            return <Redirect to="/" />
        }
        else {

            return (
                <div>
                    <div style={{ height: "300px", marginBottom: "20px" }} className="imgBg1"></div>
                    <hr />
                    <div className="container App" style={{ width: "1000px" }}>
                        <div className="row">
                            <div className="col-4">
                                <div className="container" style={{ height: "400px", border: "1px solid wheat", borderRadius: "12px" }}>
                                    <img style={{ borderRadius: "100px", height: "130px", marginTop: "30px" }} src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" class="img-thumbnail" />
                                    <center>
                                        <div class="d-flex flex-column mt-5" style={{ height: "60px", width: "80%", marginTop: "20px", borderRadius: "8px", border: "1px solid wheat" }}>
                                            <div style={{ borderTopLeftRadius: "8px", borderTopRightRadius: "8px", backgroundColor: "lightblue" }}> <h6>Username</h6></div>
                                            <div><h6 className="mt-1">{this.props.user.username}</h6></div>
                                        </div>
                                        <div>

                                        </div>
                                        <div className="mt-5">
                                            {
                                                (this.props.user.isVerified) ? (
                                                    <h6>
                                                        Account is Verified
                                                    </h6>
                                                ) : (
                                                        <>
                                                        <h6>
                                                            Account isn't Verified
                                                        </h6>
                                                        <input onClick={this.getVerify} className="btn btn-primary" type="button" value="Verify"/>
                                                        </>
                                                    )
                                            }
                                        </div>
                                    </center>
                                </div>
                            </div>
                            <div className="col-8">
                                <div className="d-flex nav nav-tabs" style={{ flex: 2, justifyContent: "space-between" }}>
                                    {
                                        (this.state.kondisiPage == 1) ? (
                                            <>
                                                <p className="hoverP" onClick={() => this.setState({ kondisiPage: 1 })} style={{ flex: 1, textDecoration: "line-through" }}>CHANGE PROFILE</p>
                                                <p className="hoverP" onClick={() => this.setState({ kondisiPage: 2 })} style={{ flex: 1 }}>CHANGE PASSWORD</p>
                                            </>
                                        ) : (
                                                <>
                                                    <p className="hoverP" onClick={() => this.setState({ kondisiPage: 1 })} style={{ flex: 1 }}>CHANGE PROFILE</p>
                                                    <p className="hoverP" onClick={() => this.setState({ kondisiPage: 2 })} style={{ flex: 1, textDecoration: "line-through" }}>CHANGE PASSWORD</p>
                                                </>
                                            )
                                    }
                                </div>
                                {this.renderPage()}
                            </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
