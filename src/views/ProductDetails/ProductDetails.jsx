import React from "react"
import Axios from "axios";
import "./ProductDetails.css"
import { connect } from "react-redux"
import swal from "sweetalert";
import { qtyCart } from "../../redux/actions/"
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

        if (this.props.user.id == 0) {
            swal("Gagal", "Login Terlebih Dahulu untuk menambah ke keranjang", "error")
        }
        // else if (!this.props.user.isVerified) {
        //     console.log(this.props.user)
        //     swal("Gagal",`Verify Akun terlebih dahulu untuk memasukkan ke keranjang`,"error")
        // }
        else if (this.state.arrProduct.stock <= 0) {
            swal("Gagal", "Product Ini Habis", "success")
        }
        else if (this.props.user.role == "admin") {
            swal("Gagal", "Admin Ga boleh Belanja", "error")
        }
        else {
            console.log(this.props.user)
            Axios.get(`${API_URL}/carts/product/${this.props.user.id}/${this.props.match.params.id}`)
                .then((res) => {
                    // console.log(res.data)
                    if (res.data.length == 0) {
                        Axios.post(`${API_URL}/carts/${this.props.user.id}/${this.props.match.params.id}/0`,
                            { quantity: 1 })
                            .then((res) => {
                                swal("Berhasil", "Anda Berhasil membeli item ini untuk pertama kali", "success")
                                // console.log(res.data)
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
                <div className="d-flex" style={{ flex: 1, justifyContent: "center" }}>
                    <div className="row bgKucing" style={{ width: "750px", margin: "40px" }}>
                        <div className="col-5">
                            <div className="App" style={{ marginTop: "100px", marginLeft: "100px" }}>
                                <img src={this.state.arrProduct.image} width="200px" />
                            </div>
                        </div>
                        <div className="col-7 d-flex flex-column" style={{ paddingLeft: "40px",height:"460px" }} >
                            <div>
                                <h5 className="App mt-5">
                                    {this.state.arrProduct.productName}
                                </h5>
                            </div>
                            <div>
                                <h6 style={{ textAlign: "justify", marginRight: "70px" }} className="mt-2">{this.state.arrProduct.description},Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero sequi, optio necessitatibus quos incidunt, consectetur reprehenderit, vel quasi dicta omnis enim ad. Unde ea culpa eius maiores laudantium vel hic!</h6>
                            </div>
                            <div>
                                <h6 className="mt-2" style={{ color: "red" }}>Price : Rp.{this.state.arrProduct.price}</h6>
                            </div>
                            <div>
                                <p className="mt-1">Size : {this.state.arrProduct.size}</p>
                            </div>
                            <div>
                                <p>Stock : {this.state.arrProduct.stock}</p>
                            </div>
                            <div>
                                <p>Sold : {this.state.arrProduct.sold}</p>
                            </div>
                            <div>
                                <center>
                                    <input onClick={this.addToCartHandler} className="btn btn-primary" type="button" value="Add to Cart" />
                                </center>
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
export default connect(mapStateToProps, mapDispatchtoProps)(ProductDetails)