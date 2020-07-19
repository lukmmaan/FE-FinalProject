import React from "react"
import Axios from "axios";
import "./ProductDetails.css"
import { connect } from "react-redux"
import swal from "sweetalert";
import { qtyCart } from "../../redux/actions/"
const API_URL = `http://localhost:8080/`;
class ProductDetails extends React.Component {

    state = {
        arrProduct: {
            productName:"",
        },
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
        else if (this.state.arrProduct.stock == 0) {
            swal("Gagal", "Product Ini Habis", "error")
        }
        else if (this.props.user.role == "admin") {
            swal("Gagal", "Admin Ga boleh Belanja", "error")
        }
        else {
            // console.log(this.props.user)
            Axios.put(`${API_URL}/carts/update/${this.props.match.params.id}/0/${this.props.user.id}`)
                .then((resEdit) => {
                    // swal("Sukses", resEdit, "success")
                    console.log(resEdit)
                    this.getProductDetail()
                })
                .catch((err) => {
                    console.log(err)
                })
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
                                swal("Berhasil", `Anda Berhasil memasukan Item ini ke keranjang sebanyak ${res.data[0].quantity + 1}`, "success")
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
            <div style={{backgroundColor:"pink",height:"670px"}}>
                <hr />
                {/* <center> */}
                {/* <div style={{width:"700px"}}> */}
                <div className="row container1" style={{width:"900px", marginLeft:"17%",marginTop:"100px",height:"500px"}}>
                    <div className="col-5">
                        <div style={{ marginTop: "60px" }}>
                            <img src={this.state.arrProduct.image} style={{height:"300px",width:"310px",marginLeft:"20px"}}/>
                        </div>
                    </div>
                    <div className="col-7 d-flex flex-column fontCustom" style={{ paddingLeft: "40px", height: "460px" }} >
                        <div>
                            <h1 className="mt-5">
                                {this.state.arrProduct.productName.toUpperCase()}
                            </h1>
                            <h2 className="mt-2" style={{color:"pink"}}>Price : Rp.{this.state.arrProduct.price}</h2>
                            <p style={{ textAlign: "justify" }} className="mt-2 mr-4 fontCustom">{this.state.arrProduct.description},Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero sequi, optio necessitatibus quos incidunt, consectetur reprehenderit, vel quasi dicta omnis enim ad. Unde ea culpa eius maiores laudantium vel hic!</p>
                            <p className="mt-2 fontCustom">Size : {this.state.arrProduct.size}</p>
                            <p className="mt-2 fontCustom">Stock : {this.state.arrProduct.stock}</p>
                            <p className="mt-2 fontCustom">Sold : {this.state.arrProduct.sold}</p>
                        </div>
                            {/* <center> */}
                        <div>
                                <input onClick={this.addToCartHandler} type="button" className="buttonCustom1" value="Add to Cart" />
                        </div>
                            {/* </center> */}
                    </div>
                </div>
                {/* </div> */}
                {/* </center> */}
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