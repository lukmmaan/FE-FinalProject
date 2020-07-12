import React from "react"
import Axios from "axios"
import { connect } from "react-redux"
import swal from "sweetalert";
import "./StatusBelanja.css"
const API_URL = `http://localhost:8080/`;

class StatusBelanja extends React.Component {
    state = {
        arrTransaksiUser: [],
        kondisi: false,
        selectedFile: null,
    }

    getTransactions = () => {
        Axios.get(`${API_URL}/transactions/user/${this.props.user.id}`)
            .then((res) => {
                this.setState({
                    arrTransaksiUser: res.data
                })
                console.log(this.state.arrTransaksiUser)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    componentDidMount() {
        this.getTransactions()
    }

    fileChangeHandler = (e) => {
        this.setState({
            selectedFile: e.target.files[0]
        });
    }

    uploadBuktiTrf = (transactionsId) =>{
        if (this.state.selectedFile == null) {
            swal("Failed","Anda Belum Memilih File","error")
        }
        else{
            let formData = new FormData();
            formData.append(
                "file",
                this.state.selectedFile,
                this.state.selectedFile.name
            )
            
            Axios.put(`${API_URL}/transactions/upload/${transactionsId}`,formData)
            .then((res) => {
                console.log(res.data);
                swal("Sukses","Sukses Upload Bukti Transfer","success")
                this.getTransactions()
            })
            .catch((err) => {
                console.log(err);
            })
        }

    }
    renderTransactions = () => {
        return (
            <table className="table table-dark table-hover">
                <thead style={{ backgroundColor: "black" }}>
                    <tr>
                        <td>No.</td>
                        <td>Jasa Pengiriman</td>
                        <td>Status</td>
                        <td>Status Pengiriman</td>
                        <td>Tanggal Beli</td>
                        <td>Tanggal Acc</td>
                        <td>Total Price</td>
                        <td>TransacTions Details</td>
                        <td>Bukti Transfer</td>
                    </tr>
                </thead>
                <tbody>
                    {this.state.arrTransaksiUser.map((val, idx) => {
                        return (
                            <tr>
                                <td>{idx + 1}.</td>
                                <td>{val.jasaPengiriman}</td>
                                <td>{val.status}</td>
                                <td>{val.statusPengiriman}</td>
                                <td>{val.tanggalBeli}</td>
                                <td>{val.tanggalAcc}</td>
                                <td>{val.totalPrice}</td>
                                <td>
                                    <table className="table" style={{ color: "grey", width: "100%" }}>
                                        <thead>
                                            <tr>
                                                <td>Nama</td>
                                                <td>Jenis</td>
                                                <td>Quantity</td>
                                                <td>Price</td>
                                                <td>Total Price</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {val.transactionsDetails.map((value) => {
                                                if (value.paket) {
                                                    return (
                                                        <tr>
                                                            <td>{value.paket.namaPaket}</td>
                                                            <td>Paket</td>
                                                            <td>{value.quantity}</td>
                                                            <td>{value.price}</td>
                                                            <td>{value.totalPriceProduct}</td>
                                                        </tr>
                                                    )
                                                }
                                                else {
                                                    return (
                                                        <tr>
                                                            <td>{value.product.productName}</td>
                                                            <td>Product</td>
                                                            <td>{value.quantity}</td>
                                                            <td>{value.price}</td>
                                                            <td>{value.totalPriceProduct}</td>
                                                        </tr>
                                                    )
                                                }
                                            })}
                                        </tbody>
                                    </table>
                                </td>
                                <td>
                                    {
                                        (val.buktiTrf) ? (
                                            <img src={val.buktiTrf} width="50px" />
                                        ) : (
                                                <div className="d-flex flex-column">
                                                    <input onChange={(e)=>this.fileChangeHandler(e)} className="form-control-file" type="file" />
                                                    <input onClick={()=>this.uploadBuktiTrf(val.id)} className="btn btn-primary" style={{ width: "50%", marginTop: "20px" }} type="button" value="Save" />
                                                </div>
                                            )
                                    }
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }

    render() {
        if (this.props.user.role == "user") {
            return (
                <div className="App">
                    <div>
                        <div className="bgImage2" style={{ height: "400px" }}>
                            <div >
                                <h2 onClick={()=>this.setState({kondisi:true})} style={{ paddingTop: "200px", color: "White" }}>STATUS TRANSACTIONS</h2>
                            </div>
                        </div>
                        {
                            (this.state.kondisi)?(
                                this.renderTransactions()
                            ):null
                        }
                    </div>
                </div>
            )
        }
        else{
            return(
                <div style={{height:"500px"}} className="App">
                    <hr/>
                    <div >
                        <img style={{height:"400px"}} src="https://cdn.dribbble.com/users/2095973/screenshots/5871491/404.gif" alt=""/>
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
export default connect(mapStateToProps)(StatusBelanja)