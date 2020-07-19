import React from "react"
import Axios from "axios";
import "./PaketDetails.css"
import swal from "sweetalert";
import { connect } from "react-redux"
import { qtyCart } from "../../../redux/actions/"
import "./PaketDetails.css"
const API_URL = `http://localhost:8080/`;

class PaketDetails extends React.Component {

    state = {
        arrPaket: {
            namaPaket:"",
            products: []
        }
    }
    getPaketDetail = () => {
        Axios.get(`${API_URL}/paket/details/${this.props.match.params.id}`)
            .then((res) => {
                console.log(res.data)
                this.setState({
                    arrPaket: res.data
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    componentDidMount() {
        this.getPaketDetail()
    }

    renderProducts = () => {
        return this.state.arrPaket.products.map((val, idx) => {
            return (
                <tr className="buttonCustom1 App fontCustom" style={{fontSize:"15px",color:"black"}}>
                    <td className="tdCustom">{val.productName}</td>
                    <td className="tdCustom"><img src={val.image} width="40px" /></td>
                </tr>
            )
        })
    }
    addToCartHandler = () => {
        if (this.props.user.id < 1) {
            swal("Gagal", "Login Terlebih Dahulu untuk menambah ke keranjang", "error")
        }
        // else if (!this.props.user.isVerified) {
        //     console.log(this.props.user)
        //     swal("Gagal",`Verify Akun terlebih dahulu untuk memasukkan ke keranjang`,"error")
        // }
        else if (this.state.arrPaket.stockPaket == 0) {
            swal("Gagal", "Paket Ini Habis", "error")
        }
        else if (this.props.user.role == "admin") {
            swal("Gagal", "Admin Ga boleh Belanja", "error")
        }
        else {
            Axios.put(`${API_URL}/carts/update/0/${this.props.match.params.id}/${this.props.user.id}`)
                .then((resEdit) => {
                    // swal("Sukses", resEdit, "success")
                    console.log(resEdit)
                    this.getPaketDetail()
                })
                .catch((err) => {
                    console.log(err)
                })
            Axios.get(`${API_URL}/carts/paket/${this.props.user.id}/${this.props.match.params.id}`)
                .then((res) => {
                    console.log(res.data)
                    if (res.data.length == 0) {
                        Axios.post(`${API_URL}/carts/${this.props.user.id}/0/${this.props.match.params.id}`,
                            { quantity: 1 })
                            .then((res) => {
                                swal("Berhasil", "Anda Berhasil membeli Paket ini untuk pertama kali", "success")
                                this.props.qtyCart(this.props.user.id)
                                console.log(res.data)
                            })
                            .catch((err) => {
                                console.log(err.response)
                            })
                    }
                    else {
                        // console.log("masuk")
                        Axios.put(`${API_URL}/carts/${res.data[0].id}`)
                            .then((resEdit) => {
                                console.log(resEdit.data)
                                swal("Berhasil", `Anda Berhasil membeli Paket ini sebanyak ${res.data[0].quantity + 1}`, "success")
                                this.props.qtyCart(this.props.user.id)
                            })
                            .catch((err) => {
                                console.log(err.response)
                            })
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
    render() {
        return (
            <div style={{ backgroundColor: "pink", height: "700px" }}>
                <hr/>
                <div className="row container1" style={{ width: "900px", marginLeft: "17%",marginTop:"100px"}}>
                    <div className="col-7 d-flex flex-column">
                        <div style={{ marginLeft: "90px", marginTop: "30px" }}>
                            <img style={{width:"200px",width:"300px" }} src={this.state.arrPaket.imagePaket} />
                        </div>
                        <div style={{ borderTop: "1px solid black", marginTop: "40px", fontSize: "18px" }}>
                            <table className="borderCstm table" style={{ textAlign: "right" }}>
                                <tbody>
                                    {this.renderProducts()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-5 d-flex flex-column" style={{ marginTop: "30px", paddingLeft: "20px" }} >
                        <div>
                            <h1 style={{ marginBottom: "60px" }} className="mt-5 fontCustom">
                                {this.state.arrPaket.namaPaket.toUpperCase()}
                            </h1>
                        </div>
                        <div style={{ borderRadius: "16px" }}>
                            <div className="borderCstm">
                                <h3>Price : Rp.{this.state.arrPaket.hargaPaket}</h3>
                                <h3>Stock : {this.state.arrPaket.stockPaket} Pcs</h3>
                                <h3>Sold : {this.state.arrPaket.soldPaket} Pcs</h3>
                            </div>
                        </div>
                        <div className="mt-5">
                            <input onClick={this.addToCartHandler} className="buttonCustom1 ml-5" type="button" value="Add to Cart" />
                        </div>
                    </div>

                </div>
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
export default connect(mapStateToProps, mapDispatchtoProps)(PaketDetails)