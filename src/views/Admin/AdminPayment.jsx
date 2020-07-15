import React from "react"
import Axios from "axios"
import { connect } from "react-redux"
import swal from "sweetalert";
import "./AdminPayment.css"
const API_URL = `http://localhost:8080/`;

class AdminPayment extends React.Component {
    state = {
        arrPending: [],
        arrAccepted: [],
        arrOthers: [],
        kondisiPage: 0
    }

    getTransactions = () => {
        Axios.get(`${API_URL}/transactions`)
            .then((res) => {
                console.log(res.data)
                res.data.map((val) => {
                    if (val.status == "pending") {
                        this.setState({
                            arrPending: [...this.state.arrPending, val]
                        })
                    }
                    else if (val.status == "accepted") {
                        this.setState({
                            arrAccepted: [...this.state.arrAccepted, val]
                        })
                    }
                    else {
                        this.setState({
                            arrOthers: [...this.state.arrOthers, val]
                        })
                    }
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    componentDidMount() {
        this.getTransactions()
    }

    acceptTransactions = (transactionsId) =>{
        Axios.put(`${API_URL}/transactions/accept/${transactionsId}`)
        .then((res)=>{
            console.log(res.data)
            this.setState({
                arrPending:[]
            })
            this.getTransactions()
            swal("Sukses","Transaksi telah disetujui","success")
        })
        .catch((err)=>{
            console.log(err.response.data)
        })
    }

    rejectTransactions = (transactionsId) => {
        Axios.put(`${API_URL}/transactions/reject/${transactionsId}`)
            .then((res) => {
                console.log(res.data)
                this.setState({
                    arrPending: [],
                    arrAccepted:[],
                    arrOthers:[]
                })
                this.getTransactions()
                swal("Sukses", "Transaksi yang anda pilih telah di reject", "info")
            })
            .catch((err) => {
                console.log(err)
            })
    }
    renderPending = () => {
        return (
            <table className="table table-dark table-hover">
                <thead style={{ backgroundColor: "black" }}>
                    <tr>
                        <td>No.</td>
                        <td>Username</td>
                        <td>Jasa Pengiriman</td>
                        <td>Status</td>
                        <td>Tanggal Beli</td>
                        <td>Total Price</td>
                        <td>transactions Details</td>
                        <td>Bukti Transfer</td>
                        <td>Option</td>
                    </tr>
                </thead>
                <tbody>
                    {this.state.arrPending.map((val, idx) => {
                        return (
                            <tr>
                                <td>{idx + 1}.</td>
                                <td>{val.user.username}</td>
                                <td>{val.jasaPengiriman}</td>
                                <td>{val.status}</td>
                                <td>{val.tanggalBeli}</td>
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
                                <td><img width="50px" src={val.buktiTrf} alt="" /></td>
                                {
                                    (val.buktiTrf) ? (
                                        <td>
                                            <div className="d-flex flex-row">
                                                <input onClick={() => this.acceptTransactions(val.id)} className="btn btn-primary" type="button" value="Accept" />
                                                <input onClick={() => this.rejectTransactions(val.id)} className="btn btn-danger ml-3" type="button" value="Reject" />
                                            </div>
                                        </td>
                                    ) : <td>Bukti Transfer Belum Ada</td>
                                }
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }

    renderRejected = () => {
        return (
            <table className="table table-dark table-hover">
                <thead style={{ backgroundColor: "black" }}>
                    <tr>
                        <td>No.</td>
                        <td>Username</td>
                        <td>Jasa Pengiriman</td>
                        <td>Status</td>
                        <td>Tanggal Beli</td>
                        <td>Total Price</td>
                        <td>transactions Details</td>
                    </tr>
                </thead>
                <tbody>
                    {this.state.arrOthers.map((val, idx) => {
                        return (
                            <tr>
                                <td>{idx + 1}.</td>
                                <td>{val.user.username}</td>
                                <td>{val.jasaPengiriman}</td>
                                <td>{val.status}</td>
                                <td>{val.tanggalBeli}</td>
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
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }

    renderAccepted = () => {
        return (
            <table className="table table-dark table-hover">
                <thead style={{ backgroundColor: "black" }}>
                    <tr>
                        <td>No.</td>
                        <td>Username</td>
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
                    {this.state.arrAccepted.map((val, idx) => {
                        return (
                            <tr>
                                <td>{idx + 1}.</td>
                                <td>{val.user.username}</td>
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
                                    <img src={val.buktiTrf} width="50px" />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }

    renderData = () => {
        if (this.state.kondisiPage == 1) {
            if (this.state.arrPending.length !== 0) {
                return (
                    <div className="App">
                        {this.renderPending()}
                    </div>
                )
            }
            else {
                return <> <h1 className="App">EMPTY</h1></>
                // {swal("Empty","Transaksi Pending Kosong","error")}
            }
        }
        else if (this.state.kondisiPage == 2) {
            if (this.state.arrAccepted.length !== 0) {
                return (
                    <div className="App">
                        {this.renderAccepted()}
                    </div>
                )
            }
            else {
                return <> <h1 className="App">EMPTY</h1></>
                // {swal("Empty","Transaksi Accepted Kosong","error")}
            }
        }
        else if (this.state.kondisiPage == 3) {
            if (this.state.arrOthers.length !== 0) {
                return (
                    <div className="App">
                        {this.renderRejected()}
                    </div>
                )
            }
            else {
                return <> <h1 className="App">EMPTY</h1></>
                // {swal("Empty","Transaksi Rejected Kosong","error")}
            }
        }
    }

    render() {
        return (
            <div>
                <div className="d-flex bgImage6 " style={{ color: "grey", height: "400px", justifyContent: "space-around" }}>
                    <div onClick={() => this.setState({ kondisiPage: 1 })} className="textHover" style={{ marginTop: "130px" }}><h1>PENDING</h1></div>
                    <div onClick={() => this.setState({ kondisiPage: 2 })} className="textHover" style={{ marginTop: "130px" }}><h1>ACCEPTED</h1></div>
                    <div onClick={() => this.setState({ kondisiPage: 3 })} className="textHover" style={{ marginTop: "130px" }}><h1>REJECTED</h1></div>
                </div>
                {this.renderData()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};
export default connect()(AdminPayment)