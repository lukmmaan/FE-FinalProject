import React from "react";
import Axios from "axios";
import swal from "sweetalert";
import { loginHandler } from "../../redux/actions"
import { connect } from "react-redux"
import Cookies from "universal-cookie";
import { Redirect, Route, Link } from "react-router-dom";
const API_URL = `http://localhost:8080/`;
class AuthScreen extends React.Component {
    state = {
        activePage: "register",
        registerForm: {
            alamat: "",
            email: "",
            fullName: "",
            noHp: "",
            password: "",
            username: "",
            showPassword: false,
        },
        loginForm: {
            username: "",
            password: "",
            showPassword: false,
        },
        kondisiLupaPassword: false,
        usernameLupaPassword: "",
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

    checkBoxHandler = (e, form) => {
        const { checked } = e.target;
        this.setState({
            [form]: {
                ...this.state[form],
                showPassword: checked,
            }
        })
    }

    registerHandler = () => {
        const { email, fullName, noHP, password, showPassword, username, alamat } = this.state.registerForm
        // console.log(this.state.registerForm)
        Axios.post(`${API_URL}/users`, this.state.registerForm)
            .then((res) => {
                console.log(res.data)
                swal("Sukses!", "Your Account Must Be Verified on Your Email!", "success");
            })
            .catch((err) => {
                // console.log(err.response.data.message)
                swal("Failed", err.response.data.message,"error")
            })
    }

    loginHandler = () => {
        console.log(this.state.loginForm);
        this.props.onLogin(this.state.loginForm);
        // Axios.post(`${API_URL}/users/login`,this.state.loginForm)
        // .then((res)=>{
        //     console.log(res.data)
        //     swal("Sukses!", `Welcome ${res.data.username}`, "success");
        // })
        // .catch((err)=>{
        //     console.log(err)
        //     alert("error")
        // })
    }
    lupaPasswordHandler = () => {
        // swal("Sukses!", `${this.state.usernameLupaPassword}`, "success");
        Axios.get(`${API_URL}/users/forgetPass/${this.state.usernameLupaPassword}`)
        .then((res)=>{
            console.log(res.data)
            swal("Sukses!", `Check Your Email To Change the password`, "success");
        })
        .catch((err)=>{
            // console.log(err.response.data)
            swal("Failed",err.response.data.message,"error")
        })
    }
    renderAuthScreen = () => {
        const { activePage, registerForm, loginForm } = this.state
        const { email, fullName, password, username, noHP, alamat } = registerForm
        if (activePage == "register") {
            return (
                <div>
                    <div className="row">
                        <h3 style={{ textDecoration: "line-through", color: "grey" }} onClick={() => this.setState({ activePage: "register" })} className="App col-4">Register</h3>
                        <h3 className="col-4 App" style={{ color: "grey" }}>|</h3>
                        <h3 onClick={() => this.setState({ activePage: "Login" })} className="App col-4">Login</h3>
                    </div>
                    <hr />
                    <input onChange={(e) => this.inputHandler(e, "fullName", "registerForm")} value={fullName} className="form-control mb-3" type="text" placeholder="Full Name" />
                    <input onChange={(e) => this.inputHandler(e, "username", "registerForm")} value={username} className="form-control mb-3" type="text" placeholder="Username" />
                    <input onChange={(e) => this.inputHandler(e, "email", "registerForm")} value={email} className="form-control mb-3" type="text" placeholder="Email" />
                    <input onChange={(e) => this.inputHandler(e, "password", "registerForm")} value={password} className="form-control mb-3" type="text" type={this.state.registerForm.showPassword ? "text" : "password"} placeholder="Password" />
                    <input onChange={(e) => this.inputHandler(e, "noHp", "registerForm")} value={noHP} className="form-control mb-3" type="text" placeholder="Phone Number" />
                    <input onChange={(e) => this.inputHandler(e, "alamat", "registerForm")} value={alamat} className="form-control mb-3" type="text" placeholder="Alamat" />
                    <div className="d-flex flex-row">
                    <input type="checkbox" onChange={(e) => this.checkBoxHandler(e, "registerForm")} style={{ marginRight: "10px" }} />
                    <p>Show Password</p>
                    </div>
                    <input onClick={this.registerHandler} className="btn btn-primary" type="button" value="Register" />
                </div>
            )
        }
        else {
            return (
                <div>
                    <div className="row">
                        <h3 onClick={() => this.setState({ activePage: "register" })} className="App col-4">Register</h3>
                        <h3 className="col-4 App" style={{ color: "grey" }}>|</h3>
                        <h3 style={{ textDecoration: "line-through", color: "grey" }} onClick={() => this.setState({ activePage: "Login" })} className="App col-4">Login</h3>
                    </div>
                    <hr />
                    <input onChange={(e) => this.inputHandler(e, "username", "loginForm")} value={loginForm.username} className="form-control mb-3" type="text" placeholder="Username" />
                    <input onChange={(e) => this.inputHandler(e, "password", "loginForm")} value={loginForm.password} className="form-control mb-3" type="text" type={this.state.loginForm.showPassword ? "text" : "password"} placeholder="Password" />
                    <div className="d-flex flex-row">
                    <input type="checkbox" onChange={(e) => this.checkBoxHandler(e, "loginForm")} style={{ marginRight: "10px" }} />
                    <p>Show Password</p>
                    </div>
                    <div className="d-flex flex-row">
                    <input onClick={this.loginHandler} className="btn btn-primary" type="button" value="Login" />
                    <input style={{ marginLeft: "30px" }} onClick={() => { this.setState({ kondisiLupaPassword: true }) }} className="btn btn-danger" type="button" value="Lupa Password" />
                    </div>
                    {
                        (!this.state.kondisiLupaPassword) ? null : (
                            <div>
                                <input onChange={
                                    (e) => this.setState({ usernameLupaPassword: e.target.value })
                                } value={this.state.usernameLupaPassword} className="form-control mb-3" type="text" placeholder="Username" />
                                <input onClick={this.lupaPasswordHandler} className="btn btn-warning" type="button" value="Recovered Password" />
                            </div>
                        )
                    }
                </div>
            )
        }
    }
    componentDidUpdate() {
        if (this.props.user.id) {
            const cookie = new Cookies();
            cookie.set("authData", JSON.stringify(this.props.user), { path: "/" });
        }
    }
    render() {
        if (this.props.user.id) {
            return <Redirect to="/" />
        }
        else {
            return (
                <div>
                    <hr />
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <div className="ml-5 p-4"
                            style={{ height: "520px", width: "400px", }}
                        >
                            {this.renderAuthScreen()}
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
    onLogin: loginHandler
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);

