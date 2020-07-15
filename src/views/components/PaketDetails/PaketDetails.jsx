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
                <tr>
                    <td className="tdCustom">{val.productName}</td>
                    <td className="tdCustom"><img src={val.image} width="40px"/></td>
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
        else if (this.state.arrPaket.stockPaket <= 0) {
            swal("Gagal", "Paket Ini Habis", "success")
        }
        else if (this.props.user.role == "admin") {
            swal("Gagal", "Admin Ga boleh Belanja", "error")
        }
        else {
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
            <div>
                <hr/>
            <div className="d-flex" style={{flex:1, justifyContent:"center"}}>
                {/* <hr /> */}
                <div className="row imgCustom bgKucing" style={{ margin: "40px", width: "730px", borderRadius: "16px" }}>
                    <div className="col-7 d-flex flex-column">
                        <div style={{ marginLeft:"130px",marginTop: "30px" }}>
                            <img src={this.state.arrPaket.imagePaket} width="200px" />
                        </div>
                        <div style={{ borderTop:"1px solid black", marginTop: "40px",fontSize:"18px" }}>
                            <table className="borderCstm table" style={{textAlign:"right"}}>
                                <tbody>
                                    {this.renderProducts()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-5 d-flex flex-column" style={{ borderLeft:"1px solid black",marginTop: "30px", paddingLeft: "20px" }} >
                        <div>
                            <h5 style={{marginBottom:"60px"}} className="mt-5 ">
                                {this.state.arrPaket.namaPaket}
                            </h5>
                        </div>
                        <div style={{borderRadius: "16px" }}>
                            <div>
                                <h6>Price : Rp.{this.state.arrPaket.hargaPaket}</h6>
                                <h6>Stock : {this.state.arrPaket.stockPaket} Pcs</h6>
                                <h6>Sold : {this.state.arrPaket.soldPaket} Pcs</h6>
                            </div>
                        </div>
                        <div className="mt-4">
                            <input onClick={this.addToCartHandler} className="btn btn-primary" type="button" value="Add to Cart" />
                        </div>
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