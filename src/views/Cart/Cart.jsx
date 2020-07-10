import React from "react"
import swal from "sweetalert";
import { connect } from "react-redux"
import { qtyCart } from "../../redux/actions"
import Axios from "axios";
const API_URL = `http://localhost:8080/`;



class Cart extends React.Component {
    state = {
        arrCart: []
    }
    getCart = () => {
        Axios.get(`${API_URL}/carts/totalCart/${this.props.match.params.id}`)
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
                        <td><input onClick={() => this.deleteCart(val.id)} className="btn- btndanger" type="button" value="Delete" /></td>
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
                        <td><input onClick={() => this.deleteCart(val.id)} className="btn- btndanger" type="button" value="Delete" /></td>
                    </tr>
                )
            }
        })
    }

    render() {
        return (
            <div>
                <hr />
                {/* <h1>Hellow {this.props.match.params.id}</h1> */}
                {
                    (this.state.arrCart.length == 0) ? (
                        <div className="App mt-5 mb-5">
                            <h1>Cart Anda Kosong, Mari Belanja</h1>
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
                            </div>
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