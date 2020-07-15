import React from "react";
import Axios from "axios";
import swal from "sweetalert";
import "./Products.css"
import ProductCard from "../components/ProductCard"
import { connect } from "react-redux"
import PaketCard from "../components/PaketCard";
const API_URL = `http://localhost:8080/`;
class Products extends React.Component {
    kondisiHalaman = 0
    state = {
        arrProducts: [],
        kondisiPage: 0,
        arrCategories: [],
        minPrice: 0,
        maxPrice: 999999999,
        searchProductAll: "",
        categoryNameFilter: "All",
        arrBaru: [],
        orderBy: "productName",
        urutan: "asc",
        banyakProduct: 0,
        arrPakets: []
    }
    getPaket = () => {
        Axios.get(`${API_URL}/paket`)
            .then((res) => {
                console.log(res.data)
                this.setState({
                    arrPakets: res.data
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    getProducts = () => {
        Axios.get(`${API_URL}/products`)
            .then((res) => {
                // console.log(res.data)
                this.setState({
                    arrProducts: res.data
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    getCountProduct = () => {
        console.log(this.state.categoryNameFilter)
        if (this.state.categoryNameFilter == "All") {
            Axios.get(`${API_URL}/products/count/all/${this.state.minPrice}/${this.state.maxPrice}/?productName=${this.state.searchProductAll}`)
                .then((res) => {
                    this.setState({
                        banyakProduct: res.data
                    })
                    // console.log(this.state.banyakProduct)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else {
            Axios.get(`${API_URL}/products/count/${this.state.minPrice}/${this.state.maxPrice}/?productName=${this.state.searchProductAll}&categoryName=${this.state.categoryNameFilter}`)
                .then((res) => {
                    this.setState({
                        banyakProduct: res.data
                    })
                    console.log(res.data)
                    // console.log(this.state.banyakProduct)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
    getProductsByPrice = (val) => {
        this.getCountProduct()
        if (val == "All") {
            Axios.get(`${API_URL}/products/${this.state.minPrice}/${this.state.maxPrice}/${this.state.orderBy}/${this.state.urutan}/${this.kondisiHalaman}/?productName=${this.state.searchProductAll}`)
                .then((res) => {
                    console.log(res.data)
                    this.setState({
                        arrBaru: res.data
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else {
            Axios.get(`${API_URL}/products/${this.state.minPrice}/category/${this.state.maxPrice}/${this.state.orderBy}/${this.state.urutan}/${this.kondisiHalaman}/?productName=${this.state.searchProductAll}&categoryName=${val}`)
                .then((res) => {
                    // console.log(res.data)
                    this.setState({
                        arrBaru: res.data
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        this.kondisiHalaman = 0
    }
    getCategories = () => {
        Axios.get(`${API_URL}/categories`)
            .then((res) => {
                this.setState({
                    arrCategories: res.data
                })
                // console.log(this.state.arrCategories)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    componentDidMount() {
        // this.getProducts()
        this.getProductsByPrice(this.state.categoryNameFilter)
        this.getCategories()
        this.getCountProduct()
        this.getPaket()
    }

    renderProductCard = () => {
        return this.state.arrBaru.map((val) => {
            // const {productName}= val
            // if (productName.toLowerCase().includes(this.props.cari.searchValue.toLowerCase()))
            return (
                // <ProductCard key={`ProductData-${val.id}`} data={val} className="m-2" />
                <ProductCard data={val} className="m-2 col-3" />
            );
        })
    }
    renderOptionCategory = () => {
        return this.state.arrCategories.map((val) => {
            return <option value={val.categoryName}>{val.categoryName}</option>
        })
    }
    renderPaket = () => {
        return this.state.arrPakets.map((val) => {
            return <PaketCard data={val} className="m-2 col-3"></PaketCard>
        })
    }
    renderTombolPage() {
        // console.log(this.state.banyakProduct)
        let arr = []
        let k = 0
        for (let i = 0; i < this.state.banyakProduct; i++) {
            if (i % 2 == 0) {
                arr.push(<input className="btn btn-warning ml-4" onClick={() => this.onClickHalaman(i)} type="button" value={k + 1} />)
                k = k + 1
            }
        }
        console.log(arr)
        return arr
    }
    onClickHalaman = (i) => {

        // this.setState({
        //     kondisiHalaman:i
        // })
        // console.log(this.state.kondisiHalaman + ""+ i)
        this.kondisiHalaman = i
        // console.log(this.kondisiHalaman)
        this.getProductsByPrice(this.state.categoryNameFilter)
        this.kondisiHalaman = i
    }
    kondisiPageHandler = () => {
        if (this.state.kondisiPage == 1) {
            return (
                <>
                    <center className="mt-5">
                        <h1>ALL PRODUCTS</h1>
                        <div className="d-flex flex-row w-100">
                            <input maxlength="9" onKeyUp={() => this.getProductsByPrice(this.state.categoryNameFilter)} onChange={(e) => this.setState({ minPrice: +e.target.value })} className="form-control ml-4 mr-4" type="text" placeholder="Min Price" />
                            <input maxlength="9" onKeyUp={() => this.getProductsByPrice(this.state.categoryNameFilter)} onChange={(e) => this.setState({ maxPrice: 1 * e.target.value })} className="form-control mr-4" type="text" placeholder="Max Price" />
                            <input onKeyUp={() => this.getProductsByPrice(this.state.categoryNameFilter)} className="form-control mr-4" onChange={(e) => this.setState({ searchProductAll: e.target.value })} type="text" placeholder="Product Name" />
                            <select onClick={() => this.getProductsByPrice(this.state.categoryNameFilter)} className="form-control w-40" onChange={(e) => this.setState({ categoryNameFilter: e.target.value })} name="category" id="category" style={{ marginRight: "30px", width: "500px" }}>
                                <option value="All">All</option>
                                {this.renderOptionCategory()}
                            </select>
                            {/* <input className="btn btn-primary" onClick={()=>this.getProductsByPrice(this.state.categoryNameFilter)} type="button" value="Search"/> */}
                        </div>
                        <div className="d-flex flex row mt-5" style={{ width: "450px" }}>
                            <h6>Sort By: </h6>
                            <select onClick={() => this.getProductsByPrice(this.state.categoryNameFilter)} onChange={(e) => this.setState({ orderBy: e.target.value })} style={{ width: "200px" }} className="form-control ml-4" name="Sort">
                                <option value="productName">Product Name</option>
                                <option value="price">Price</option>
                                {
                                    (this.props.user.role == "admin") ? (<option value="sold">Sold</option>) : null
                                }
                            </select> <h3 className="ml-3"> -</h3>
                            <select onClick={() => this.getProductsByPrice(this.state.categoryNameFilter)} onChange={(e) => this.setState({ urutan: e.target.value })} className="form-control ml-4" style={{ width: "100px" }} name="urutan">
                                <option value="asc">A-Z</option>
                                <option value="desc">Z-A</option>
                            </select>
                        </div>
                    </center>
                    <br />
                    <center>
                        <div >
                            <div style={{ justifyContent: "center" }} className="row">
                                {this.renderProductCard()}
                            </div>
                            <div className="mt-5 mb-5">
                                {this.renderTombolPage()}
                            </div>
                        </div>
                    </center>
                </>
            )
        }
        else if (this.state.kondisiPage == 4) {
            return (
                <div className="mb-5 mt-5">
                    <h1 className="App">ALL PACKAGES</h1>
                    <div className="row" style={{ justifyContent: "center" }}>
                        {this.renderPaket()}
                    </div>
                </div>
            )
        }
    }

    renderPage = () => {
        if (this.state.kondisiPage == 1) {
            return (
                <>
                    <div className="textAja col-6" style={{marginTop:"200px", textDecoration: "line-through" }} onClick={() => this.setState({ kondisiPage: 1 })}>
                        <h2>All Products</h2>
                    </div>
                    <div className="col-6 textAja" style={{marginTop:"200px"}} onClick={() => this.setState({ kondisiPage: 4 })}>
                        <h2>Packages</h2>
                    </div>
                </>
            )
        }
        else if (this.state.kondisiPage == 4) {
            return (
                <>
                    <div className="textAja col-6" style={{marginTop:"200px"}} onClick={() => this.setState({ kondisiPage: 1 })}>
                        <h2>All Products</h2>
                    </div>
                    <div className="col-6 textAja" style={{ textDecoration: "line-through",marginTop:"200px" }} onClick={() => this.setState({ kondisiPage: 4 })}>
                        <h2>Packages</h2>
                    </div>
                </>
            )
        }
        else {
            return (
                <>
                    <div className="textAja col-6" style={{marginTop:"200px"}} onClick={() => this.setState({ kondisiPage: 1 })}>
                        <h2>All Products</h2>
                    </div>
                    <div className="col-6 textAja" style={{marginTop:"200px"}} onClick={() => this.setState({ kondisiPage: 4 })}>
                        <h2>Packages</h2>
                    </div>
                </>
            )

        }
    }
    render() {
        return (
            <div>
                {/* <hr /> */}
                <div className="bgImage" style={{ height: "400px" }}>
                    <div className="App row" style={{ justifyContent: "center" }}>
                        {this.renderPage()}
                    </div>
                </div>
                {this.kondisiPageHandler()}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};
export default connect(mapStateToProps)(Products) 