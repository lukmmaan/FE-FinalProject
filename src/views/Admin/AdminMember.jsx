import React from "react";
import Axios from "axios";
import swal from "sweetalert";
import "./AdminMember.css"
const API_URL = `http://localhost:8080/`;


class AdminMember extends React.Component {
    state = {
        arrUser: [],
        arrAdmin: [],
        kondisiPage: 0,
        editProfileForm: {
            id: 0,
            alamat: "",
            email: "",
            fullName: "fullName",
            noHp: "",
            username: "",
        },
        kondisiEdit: false,
    }

    getMember() {
        Axios.get(`${API_URL}/users/semuaUser`)
            .then((res) => {
                console.log(res.data)
                res.data.map((val) => {
                    if (val.role == "user") {
                        this.setState({
                            arrUser: [...this.state.arrUser, val]
                        })
                    }
                    else {
                        this.setState({
                            arrAdmin: [...this.state.arrAdmin, val]
                        })
                    }
                })
                console.log(this.state.arrUser)
                console.log(this.state.arrAdmin)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    componentDidMount() {
        this.getMember()
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
    renderTabel = () => {
        if (this.state.kondisiPage == 1) {
            return (
                <table className="table table-dark table-hover" style={{ alignContent: "center" }}>
                    <thead>
                        <tr>
                            <td>No.</td>
                            {/* <td>Id</td> */}
                            <td>Username</td>
                            <td>Full Name</td>
                            <td>Email</td>
                            <td>No. Handphone</td>
                            <td>Alamat</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderAdmin()}
                    </tbody>
                </table>
            )
        }
        else if (this.state.kondisiPage == 2) {
            return (
                <table className="table table-dark table-hover">
                    <thead>
                        <tr>
                            <td>No.</td>
                            {/* <td>Id</td> */}
                            <td>Username</td>
                            <td>Full Name</td>
                            <td>Email</td>
                            <td>No. Handphone</td>
                            <td>Alamat</td>
                            <td>Option</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderUser()}
                    </tbody>
                </table>
            )
        }
    }

    editProfileFormHandler = (id,idx) => {
        this.setState({
            kondisiEdit: true,
            editProfileForm: this.state.arrUser[idx]
        })
    }

    renderUser = () => {
        return this.state.arrUser.map((val, idx) => {
            return (
                <tr>
                    <td>{idx + 1}.</td>
                    {/* <td>{val.id}</td> */}
                    <td>{val.username}</td>
                    <td>{val.fullName}</td>
                    <td>{val.email}</td>
                    <td>{val.noHp}</td>
                    <td>{val.alamat}</td>
                    <td>
                        {/* <div className="d-flex flex-row"> */}
                            <input onClick={()=>this.editProfileFormHandler(val.id,idx)} className="btn btn-warning" type="button" value="Edit" />
                        {/* </div> */}
                    </td>
                </tr>
            )
        })
    }
    renderAdmin = () => {
        return this.state.arrAdmin.map((val, idx) => {
            return (
                <tr>
                    <td>{idx + 1}.</td>
                    {/* <td>{val.id}</td> */}
                    <td>{val.username}</td>
                    <td>{val.fullName}</td>
                    <td>{val.email}</td>
                    <td>{val.noHp}</td>
                    <td>{val.alamat}</td>
                </tr>
            )
        })
    }
    saveEditHandler = () => {
        // console.log(this.state.editProfileForm)
        Axios.put(`${API_URL}/users/editProfile`, this.state.editProfileForm)
            .then((res) => {
                console.log(res.data)
                swal("Sukses!", "Your Data Has Been Changed", "success");
                this.setState({
                    arrUser:[],
                    arrAdmin:[],
                    kondisiEdit:false
                })
                this.getMember()
            })
            .catch((err) => {
                console.log(err)
                // swal("Gagal", err.response.data.message, "error")
            })
    }
    renderEdit = () =>{
        return(
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
            <div className="d-flex flex-row" style={{justifyContent:"center"}}>
            <input onClick={this.saveEditHandler} className="btn btn-primary mr-5" type="button" value="Save" />
            <input onClick={()=>this.setState({kondisiEdit:false})} className="btn btn-danger" type="button" value="Cancel" />
            </div>
        </div>
        )
    }
    render() {
        return (
            <div>
                <hr />
                <div className="row App">
                    <h1 onClick={() => this.setState({ kondisiPage: 1,kondisiEdit:false })} className="col-6 teksHover">Admin</h1>
                    <h1 onClick={() => this.setState({ kondisiPage: 2 })} className="col-6 teksHover">User</h1>
                </div>
                <div style={{ width: "1000px", marginLeft: "200px", marginTop: "30px", marginBottom: "30px" }}>
                    {this.renderTabel()}
                </div>
                <div style={{width:"1000px",marginLeft:"200px"}}>
                    {
                        (!this.state.kondisiEdit)?null:(
                            this.renderEdit()
                        )
                    }
                </div>
            </div>
        )

    }
}

export default AdminMember