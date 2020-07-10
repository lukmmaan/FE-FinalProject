import React from "react"
import Axios from "axios"
import { Redirect } from "react-router-dom";
import swal from "sweetalert";
const API_URL = `http://localhost:8080/`;
class LupaPassword extends React.Component {
    state = {
        lupaForm: {
            username: this.props.match.params.username,
            password: "",
            kondisiSudahGanti: false,
            verify: this.props.match.params.verify
        }
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
    gantiPasswordHandler = () =>{
        // alert(this.state.lupaForm.username + this.state.lupaForm.password)
        Axios.put(`${API_URL}/users/editLupaPassword`,this.state.lupaForm)
        .then((res)=>{
            console.log(res.data)
            swal("Sukses!","Password Sudah Diganti", "success")
            this.setState({
                kondisiSudahGanti: true
            })
            // <Redirect to="/" />
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    render() {
        if (this.state.kondisiSudahGanti) {
            return <Redirect to="/" />
        } else {     
            return (
                <div>
                    <hr />
            <h3 style={{ textAlign: "center" }}>{this.props.match.params.username} {this.state.lupaForm.verify}</h3>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <div className="ml-5 p-4"
                            style={{ height: "250px", width: "400px", textAlign: "center" }}
                        >
                            <input onChange={(e) => this.inputHandler(e, "password", "lupaForm")} value={this.state.lupaForm.password} className="form-control mb-3" type="text" placeholder="Password Baru" />
                            <input onClick={this.gantiPasswordHandler} className="btn btn-primary" type="button" value="Recovered Password" />
                        </div>  
                    </div>
                </div>
            )
        }
    }
}

export default LupaPassword