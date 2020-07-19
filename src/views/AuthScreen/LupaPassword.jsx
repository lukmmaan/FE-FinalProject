import React from "react"
import Axios from "axios"
import { Redirect } from "react-router-dom";
import swal from "sweetalert";
import "./LupaPassword.css"
const API_URL = `http://localhost:8080/`;
class LupaPassword extends React.Component {
    state = {
        lupaForm: {
            username: this.props.match.params.username,
            password: "",
            kondisiSudahGanti: false,
            verify: this.props.match.params.verify
        },
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
    gantiPasswordHandler = () => {
        // alert(this.state.lupaForm.username + this.state.lupaForm.password)
        Axios.put(`${API_URL}/users/editLupaPassword`, this.state.lupaForm)
            .then((res) => {
                console.log(res.data)
                swal("Sukses!", "Password Sudah Diganti", "success")
                this.setState({
                    kondisiSudahGanti: true
                })
                // <Redirect to="/" />
            })
            .catch((err) => {
                console.log(err)
            })
    }
    render() {
        if (this.state.kondisiSudahGanti) {
            return <Redirect to="/" />
        } else {
            return (
                <div className="imgBG15 d-flex" style={{ justifyContent: "center", height: "700px" }}>
                    <div className="divCustom d-flex flex-column" style={{ alignContent: "center", width: "400px", height: "350px", marginTop: "175px", borderRadius: "16px", opacity: 0.5 }}>
                        <center>
                            <h3 style={{ marginTop: "30px" }}>{this.props.match.params.username} </h3>
                            <input style={{ width: "80%", marginTop: "100px" }} onChange={(e) => this.inputHandler(e, "password", "lupaForm")} value={this.state.lupaForm.password} className="form-control mb-3" type="text" type={this.state.showPassword ? "text" : "password"} placeholder="New Password" />
                            <div>
                            <input type="checkbox" onChange={(e) => this.setState({showPassword:e.target.checked})} />
                             <span>&nbsp;Show Password</span>   
                            </div>
                            <input style={{ width: "50%", marginTop: "30px" }} onClick={this.gantiPasswordHandler} className="btn btn-primary" type="button" value="Recovered Password" />
                        </center>
                    </div>
                </div>
            )
        }
    }
}

export default LupaPassword