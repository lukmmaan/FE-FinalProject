import React from "react"
import swal from "sweetalert";
import { connect } from "react-redux"
import { qtyCart } from "../../redux/actions"
import Axios from "axios";
import "./Cart.css"
const API_URL = `http://localhost:8080/`;


class Cart extends React.Component {
    state = {
        arrCart: [],
        paketPengiriman: "Paket Pengiriman",
        hargaPengiriman: 0,
        hargaTotal: 0,
        arrBaru: []
    }
    getCart = () => {
        Axios.get(`${API_URL}/carts/totalCart/${this.props.user.id}`)
            .then((res) => {
                this.setState({
                    arrCart: res.data
                })
                console.log(this.state.arrCart)
            })
            .catch((err) => {
                console.log(err.response)
            })
    }

    componentDidMount() {
        this.getCart()
        // this.pilihanPengiriman()
    }
    inputHandler = (e) => {
        switch (e.target.value) {
            case "JNE EXPRESS":
                return this.setState({ paketPengiriman: e.target.value, hargaPengiriman: 50000, hargaTotal: this.renderTotalPrice() + 50000 })
            case "JTR TRUCK":
                return this.setState({ paketPengiriman: e.target.value, hargaPengiriman: 30000, hargaTotal: this.renderTotalPrice() + 30000 })
            case "GRAB SEND":
                return this.setState({ paketPengiriman: e.target.value, hargaPengiriman: 90000, hargaTotal: this.renderTotalPrice() + 90000 })
        }
    }
    deleteCart = (id) => {
        Axios.delete(`${API_URL}/carts/${id}`)
            .then((res) => {
                swal("Sukses", "Cart Telah Terhapus", "success")
                this.getCart()
                this.props.qtyCart(this.props.user.id)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    renderTotalPrice = () => {
        let totalPrice = 0
        this.state.arrCart.map((val) => {
            if (val.paket) {
                totalPrice += val.paket.hargaPaket * val.quantity
            }
            else {
                totalPrice += val.product.price * val.quantity
            }
        })
        return totalPrice
    }
    renderCart = () => {
        return this.state.arrCart.map((val, idx) => {
            if (val.paket == null) {
                return (
                    <tr>
                        <td>{idx + 1}</td>
                        <td>{val.product.productName}</td>
                        <td><img width="100px" src={val.product.image} alt="" /></td>
                        <td>{val.quantity}</td>
                        <td>{val.product.price * val.quantity}</td>
                        <td>Product</td>
                        <td><input onClick={() => this.deleteCart(val.id)} className="btn btn-danger" type="button" value="Delete" /></td>
                    </tr>
                )
            }
            else {
                return (
                    <tr>
                        <td>{idx + 1}</td>
                        <td>{val.paket.namaPaket}</td>
                        <td><img width="100px" src={val.paket.imagePaket} alt="" /></td>
                        <td>{val.quantity}</td>
                        <td>{val.paket.hargaPaket * val.quantity}</td>
                        <td>Paket</td>
                        <td><input onClick={() => this.deleteCart(val.id)} className="btn btn-danger" type="button" value="Delete" /></td>
                    </tr>
                )
            }
        })
    }

    transaction = () => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var today = new Date()
        var date = today.getDate() + '-' + monthNames[(today.getMonth())] + '-' + today.getFullYear()
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        var dateTime = date + ' ' + time
        if (!this.state.hargaTotal) {
            swal("Gagal", "Pilih kurir pengiriman terlebih dahulu", "error")
        }
        else {
            // swal("Sukses", `Harga Total adalah: ${this.state.hargaTotal}`, "success")
            Axios.get(`${API_URL}/carts/totalCart/${this.props.user.id}`)
                .then((res) => {
                    this.setState({
                        arrBaru: this.state.arrCart
                    })
                    console.log(res.data)
                    Axios.put(`${API_URL}/carts/update/${this.props.user.id}`)
                        .then((resEdit) => {
                            // swal("Sukses", resEdit, "success")
                            console.log(resEdit)
                            res.data.map((val) => {
                                Axios.delete(`${API_URL}/carts/${val.id}`)
                                    .then((res) => {
                                        console.log(res.data)
                                        swal("Sukses", "Sukses Pembelian", "success")
                                        this.getCart()
                                        this.props.qtyCart(this.props.user.id)
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                    })
                            })
                        })
                        .catch((err)=>{
                            console.log(err)
                        })
                    Axios.post(`${API_URL}/transactions/addToTransactions/${this.props.user.id}`, {
                        totalPrice: +this.state.hargaTotal,
                        status: "pending",
                        buktiTrf: "",
                        tanggalBeli: dateTime,
                        tanggalAcc: "",
                        jasaPengiriman: this.state.paketPengiriman,
                        statusPengiriman: ""
                    })
                        .then((resTransactions) => {
                            // console.log(resTransactions.data)
                            this.state.arrBaru.map(val => {
                                if (val.product) {
                                    Axios.post(`${API_URL}/transactionsDetails/${resTransactions.data.id}/${val.product.id}/0`, {
                                        price: val.product.price,
                                        quantity: val.quantity,
                                        totalPriceProduct: val.product.price * val.quantity
                                    })
                                        .then((res) => {
                                            console.log(res)
                                        })
                                        .catch((err) => {
                                            console.log(err)
                                        })
                                }
                                else if (val.paket) {
                                    Axios.post(`${API_URL}/transactionsDetails/${resTransactions.data.id}/0/${val.paket.id}`, {
                                        price: val.paket.hargaPaket,
                                        quantity: val.quantity,
                                        totalPriceProduct: val.paket.hargaPaket * val.quantity
                                    })
                                        .then((res) => {
                                            console.log(res)
                                        })
                                        .catch((err) => {
                                            console.log(err)
                                        })
                                }
                            })
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
    transactionDetail = () => {

    }
    render() {
        return (
            <div>
                <div style={{ height: "400px" }} className="bgImage4">

                </div>
                {
                    (this.props.user.role == "admin") ? (
                        <div className="App mt-5 mb-5">
                            <h1>Admin Ga Boleh Belanja</h1>
                        </div>
                    ) : (
                            <>
                                {
                                    (this.state.arrCart.length == 0) ? (
                                        <div className="App mt-5 mb-5">
                                            <h1 style={{color:"grey"}}>CART ANDA KOSONG, MARI BELANJA ! ! !</h1>
                                        </div>
                                    ) : (
                                            <div className="App mt-5 mb-5">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <td>No.</td>
                                                            <td>Item</td>
                                                            <td>Image</td>
                                                            <td>Quantity</td>
                                                            <td>Price</td>
                                                            <td>Keterangan</td>
                                                            <td>Button</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.renderCart()}
                                                    </tbody>
                                                </table>
                                                <div className="container mt-5" style={{ border: "1px solid wheat", borderRadius: "16px" }}>
                                                    <div className="row">
                                                        <div className="col-4" style={{ borderRight: "1px solid wheat", height: "250px" }}>
                                                            <h2 className="mt-3">Opsi Pengiriman</h2>
                                                            <select onChange={(e) => this.inputHandler(e)} className="form-control mt-4">
                                                                <option selected disabled>SELECT FIRST</option>
                                                                <option value="JNE EXPRESS">JNE EXPRESS</option>
                                                                <option value="JTR TRUCK">JTR TRUCK</option>
                                                                <option value="GRAB SEND">GRAB SEND</option>
                                                            </select>
                                                            <h4 className="mt-5">{this.state.paketPengiriman} : Rp. {this.state.hargaPengiriman}</h4>
                                                        </div>
                                                        <div className="col-6 App" style={{ height: "250px", borderRight: "1px solid wheat" }}>
                                                            <h2 className="mt-3 mb-5">TOTAL PEMBAYARAN ANDA</h2>
                                                            <h5>Harga Produk yang dibeli : {this.renderTotalPrice()}</h5>
                                                            {
                                                                (!this.state.hargaTotal) ? null : (
                                                                    <h1 className="mt-5">Harga Total : {this.state.hargaTotal}</h1>
                                                                )
                                                            }
                                                        </div>
                                                        <div className="col-2">
                                                            <input onClick={this.transaction} style={{ marginTop: "125px", width: "120px" }} className="btn btn-primary" type="button" value="Buy" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                }
                            </>
                        )
                }

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};
const mapDispatchtoProps = {
    qtyCart
}
export default connect(mapStateToProps, mapDispatchtoProps)(Cart)