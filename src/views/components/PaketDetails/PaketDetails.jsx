import React from "react"
import Axios from "axios";
import "./PaketDetails.css"
import swal from "sweetalert";
import { connect } from "react-redux"
import {qtyCart} from "../../../redux/actions/"
const API_URL = `http://localhost:8080/`;

class PaketDetails extends React.Component {

    state = {
        arrPaket: {
            products:[]
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
                    <td>{val.productName}</td>
                    <td><img src={val.image} width="80px" alt=""/></td>
                </tr>
            )
        })
    }
    addToCartHandler = () =>{
        if (this.props.user.id <1) {
            swal("Gagal","Login Terlebih Dahulu untuk menambah ke keranjang","error")
        }
        else{
            Axios.get(`${API_URL}/carts/paket/${this.props.user.id}/${this.props.match.params.id}`)
            .then((res)=>{
                console.log(res.data)
                if (res.data.length==0) {
                    Axios.post(`${API_URL}/carts/${this.props.user.id}/0/${this.props.match.params.id}`,
                    {quantity:1})
                    .then((res)=>{
                        swal("Berhasil","Anda Berhasil membeli Paket ini untuk pertama kali","success")
                        this.props.qtyCart(this.props.user.id)
                        console.log(res.data)
                    })
                    .catch((err)=>{
                        console.log(err.response)
                    })
                }
                else{
                    // console.log("masuk")
                    Axios.put(`${API_URL}/carts/${res.data[0].id}`)
                    .then((resEdit)=>{
                        console.log(resEdit.data)
                        swal("Berhasil",`Anda Berhasil membeli Paket ini sebanyak ${res.data[0].quantity+1}`,"success")
                        this.props.qtyCart(this.props.user.id)
                    })
                    .catch((err)=>{
                        console.log(err.response)
                    })
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }
    render() {
        return (
            <div>
                <hr />
                <div className="row imgCustom" style={{margin: "40px", border: "1px solid grey", borderRadius: "16px" }}>
                    <div className="col-6 d-flex flex-column">
                        <div className="App" style={{marginTop:"30px"}}>
                            <img src={this.state.arrPaket.imagePaket} width="50%"/>
                        </div>
                        <div style={{height:"50%",marginTop:"40px"}}>
                            <table className="table App">
                                <tbody>
                                    {this.renderProducts()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-6 d-flex flex-column" style={{ paddingLeft: "40px" }} >
                        <div>
                            <h1 className="App mt-5 mb-5">
                                {this.state.arrPaket.namaPaket}
                            </h1>
                        </div>
                        <div style={{padding:"40px",marginRight:"100px", borderRadius:"16px"}}>
                        <div>
                            <h2>Price : Rp.{this.state.arrPaket.hargaPaket}</h2>
                        </div>
                        <div>
                            <h5>Stock : {this.state.arrPaket.stockPaket} Pcs</h5>
                        </div>
                        <div>
                            <h5>Sold : {this.state.arrPaket.soldPaket} Pcs</h5>
                        </div>
                        </div>
                        <div className="mt-5 mb-5 App">
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
export default connect(mapStateToProps,mapDispatchtoProps)(PaketDetails)