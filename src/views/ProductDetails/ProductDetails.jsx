import React from "react"
import Axios from "axios";
import "./ProductDetails.css"
import { connect } from "react-redux"
import swal from "sweetalert";
import {qtyCart} from "../../redux/actions/"
const API_URL = `http://localhost:8080/`;
class ProductDetails extends React.Component {

    state = {
        arrProduct: {},
        cart: {
            quantity: 0
        }
    }
    getProductDetail = () => {
        Axios.get(`${API_URL}/products/${this.props.match.params.id}`)
            .then((res) => {
                console.log(res.data)
                this.setState({
                    arrProduct: res.data
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    componentDidMount() {
        this.getProductDetail()
    }

    addToCartHandler = () => {
        if (this.props.user.id < 1) {
            swal("Gagal", "Login Terlebih Dahulu untuk menambah ke keranjang", "error")
        }
        else if (this.state.arrProduct.stock <=0) {
            swal("Gagal","Product Ini Habis","success")
        }
        else if(this.props.user.role =="admin"){
            swal("Gagal", "Admin Ga boleh Belanja","error")
        }
        else {
            Axios.get(`${API_URL}/carts/product/${this.props.user.id}/${this.props.match.params.id}`)
                .then((res) => {
                    console.log(res.data)
                    if (res.data.length == 0) {
                        Axios.post(`${API_URL}/carts/${this.props.user.id}/${this.props.match.params.id}/0`,
                            { quantity: 1 })
                            .then((res) => {
                                swal("Berhasil", "Anda Berhasil membeli item ini untuk pertama kali", "success")
                                console.log(res.data)
                                this.props.qtyCart(this.props.user.id)
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    }
                    else {
                        // console.log("masuk")
                        Axios.put(`${API_URL}/carts/${res.data[0].id}`)
                            .then((resEdit) => {
                                console.log(resEdit.data)
                                swal("Berhasil", `Anda Berhasil membeli Item ini sebanyak ${res.data[0].quantity + 1}`, "success")
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
                <hr />
                <div className="row imgCustom" style={{ height: "500px", margin: "40px", border: "1px solid grey", borderRadius: "16px" }}>
                    <div className="col-6">
                        <div className="App" style={{ margin: "60px", height: "350px" }}>
                            <img src={this.state.arrProduct.image} height="90%%" />
                        </div>
                    </div>
                    <div className="col-6 d-flex flex-column" style={{ paddingLeft: "40px" }} >
                        <div>
                            <h1 className="App mt-5">
                                {this.state.arrProduct.productName}
                            </h1>
                        </div>
                        <div>
                            <h5 className="mt-5 mb-5">{this.state.arrProduct.description}</h5>
                        </div>
                        <div>
                            <h2 className="mt-5">Price : Rp.{this.state.arrProduct.price}</h2>
                        </div>
                        <div>
                            <h5 className="mt-2">Size : {this.state.arrProduct.size}</h5>
                        </div>
                        <div>
                            <h5>Stock : {this.state.arrProduct.stock}</h5>
                        </div>
                        <div>
                            <h5>Sold : {this.state.arrProduct.sold}</h5>
                        </div>
                        <div>
                            <input onClick={this.addToCartHandler} className="btn btn-primary" type="button" value="Add to Cart" />
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
export default connect(mapStateToProps,mapDispatchtoProps)(ProductDetails)