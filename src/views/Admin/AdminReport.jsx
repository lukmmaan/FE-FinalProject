import React from 'react'
import Axios from "axios"
import { connect } from "react-redux"
import swal from "sweetalert";
import "./AdminPayment.css"
import { Bar } from "react-chartjs-2"
import "./AdminReport.css"
const API_URL = `http://localhost:8080/`;

class AdminReport extends React.Component {

    state = {
        objek: {
            labels: [],
            datasets: [
                {
                    data: []
                }
            ]
        },
        objek2: {
            labels: [],
            datasets: [
                {
                    data: []
                }
            ]
        },
        arrCategories: [],
        categoryNameFilter: "",
        minPrice: 0,
        maxPrice: 999999999,
        minPricePaket: 0,
        maxPricePaket: 999999999,
        categoryNamePaket: "",
        searchProductAll: "",
        kondisiPage: 0,
        urutan:"asc",
        urutanPaket:"asc"
    }

    getCategories = () => {
        Axios.get(`${API_URL}/categories`)
            .then((res) => {
                this.setState({
                    arrCategories: res.data
                })
                console.log(this.state.arrCategories)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    renderOptionCategory = () => {
        return this.state.arrCategories.map((val) => {
            return <option value={val.categoryName}>{val.categoryName}</option>
        })
    }

    getPaket = () => {
        this.setState({
            objek2: {
                labels: [],
                datasets: [
                    {
                        data: []
                    }
                ]
            },
        })
        Axios.get(`${API_URL}/paket/filter/${this.state.minPricePaket}/${this.state.maxPricePaket}/?namaPaket=${this.state.categoryNamePaket}&urutan=${this.state.urutanPaket}`)
            .then((res) => {
                res.data.map((val, idx) => {
                    this.setState({
                        objek2: {
                            labels: [...this.state.objek2.labels, val.namaPaket],
                            datasets: [
                                {
                                    label: 'Sold',
                                    backgroundColor: `rgba(75,192,192,1)`,
                                    borderColor: 'rgba(255, 99, 132,1)',
                                    borderWidth: 5,
                                    data: [...this.state.objek2.datasets[0].data, val.soldPaket]
                                }
                            ]
                        }
                    })
                })
                console.log(res.data)
                // console.log(this.state.objek)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    getProducts = () => {
        this.setState({
            objek: {
                labels: [],
                datasets: [
                    {
                        data: []
                    }
                ]
            },
        })
        console.log(this.state.urutan)
        if (this.state.categoryNameFilter == "All") {
            Axios.get(`${API_URL}/products/charts/${this.state.minPrice}/${this.state.maxPrice}/?productName=${this.state.searchProductAll}&urutan=${this.state.urutan}`)
                .then((res) => {
                    res.data.map((val, idx) => {
                        this.setState({
                            objek: {
                                labels: [...this.state.objek.labels, val.productName],
                                datasets: [
                                    {
                                        label: 'Sold',
                                        backgroundColor: `rgba(75,192,192,1)`,
                                        borderColor: 'rgba(255, 99, 132,1)',
                                        borderWidth: 5,
                                        data: [...this.state.objek.datasets[0].data, val.sold]
                                    }
                                ]
                            }
                        })
                    })
                    // console.log(this.state.objek)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else {
            Axios.get(`${API_URL}/products/charts/category/${this.state.minPrice}/${this.state.maxPrice}/?productName=${this.state.searchProductAll}&categoryName=${this.state.categoryNameFilter}&urutan=${this.state.urutan}`)
                .then((res) => {
                    res.data.map((val) => {
                        this.setState({
                            objek: {
                                labels: [...this.state.objek.labels, val.productName],
                                datasets: [
                                    {
                                        label: 'Sold',
                                        backgroundColor: `rgba(75,192,192,1)`,
                                        borderColor: 'rgba(255, 99, 132,1)',
                                        borderWidth: 5,
                                        data: [...this.state.objek.datasets[0].data, val.sold]
                                    }
                                ]
                            }
                        })
                    })
                    console.log(res.data)
                    // console.log(this.state.objek)
                })
                .catch((err) => {
                    console.log(err.response.data)
                })
        }
    }
    componentDidMount() {
        this.getProducts()
        this.getCategories()
        this.getPaket()
    }

    renderChart = () => {
        return (
            <Bar
                data={this.state.objek}
                options={{
                    title: {
                        display: true,
                        text: 'Terjual',
                        fontSize: 20,
                    },
                    legend: {
                        display: true,
                        position: 'right'
                    },
                    // animation: {
                    //     duration: false
                    // }
                }}
            />
        )
    }
    renderChartPaket = () => {
        return (
            <Bar
                data={this.state.objek2}
                options={{
                    title: {
                        display: true,
                        text: 'Terjual',
                        fontSize: 20,
                    },
                    legend: {
                        display: true,
                        position: 'right'
                    },
                    // animation: {
                    //     duration: false
                    // }
                }}
            />
        )
    }

    renderFilter = () => {
        return (
            <div>
                <h1>Filter By  :</h1>
                <select value={this.state.categoryNameFilter} onClick={() => this.getProducts()} className="form-control w-40" onChange={(e) => this.setState({ categoryNameFilter: e.target.value })} name="category" id="category">
                    <option disabled selected value="">Select</option>
                    <option value="All">All</option>
                    {this.renderOptionCategory()}
                </select>
                <div className="row ml-1" style={{ marginTop: "75px" }}>
                    <input maxlength="9" onKeyUp={() => this.getProducts()} onChange={(e) => this.setState({ minPrice: +e.target.value })} type="text" className="col-4 form-control mr-3" placeholder="Min Price" /> -
                    <input maxlength="9" onKeyUp={() => this.getProducts()} onChange={(e) => this.setState({ maxPrice: 1 * e.target.value })} type="text" className="col-4 form-control ml-3" placeholder="Max Price" />
                </div>
                <input onKeyUp={() => this.getProducts()} onChange={(e) => this.setState({ searchProductAll: e.target.value })} type="text" className="form-control" style={{ marginTop: "75px" }} placeholder="Product Name" />
                <select onClick={() => this.getProducts()} onChange={(e) => this.setState({ urutan: e.target.value })}  style={{marginTop:"75px"}} className="form-control" name="Urutan">
                    <option value="asc">1-10</option>
                    <option value="desc">10-1</option>
                </select>

            </div>
        )
    }
    renderFilterPaket = () => {
        return (
            <div>
                <h1>Filter By  :</h1>
                <div className="row ml-1" style={{ marginTop: "75px" }}>
                    <input maxlength="9" onKeyUp={() => this.getPaket()} onChange={(e) => this.setState({ minPricePaket: +e.target.value })} type="text" className="col-4 form-control mr-3" placeholder="Min Price" /> -
                    <input maxlength="9" onKeyUp={() => this.getPaket()} onChange={(e) => this.setState({ maxPricePaket: 1 * e.target.value })} type="text" className="col-4 form-control ml-3" placeholder="Max Price" />
                </div>
                <input onKeyUp={() => this.getPaket()} onChange={(e) => this.setState({ categoryNamePaket: e.target.value })} type="text" className="form-control" style={{ marginTop: "75px" }} placeholder="Paket Name" />
                <select onClick={() => this.getPaket()} onChange={(e) => this.setState({ urutanPaket: e.target.value })}  style={{marginTop:"75px"}} className="form-control" name="Urutan">
                    <option value="asc">1-10</option>
                    <option value="desc">10-1</option>
                </select>

            </div>
        )
    }

    kondisiPageHandler = () => {
        if (this.state.kondisiPage == 1) {
            return (
                <div className="row ml-3 mr-3 mt-5">
                    {/* <hr /> */}
                    <div className="col-3" style={{ borderRight: "1px solid gray" }}>
                        {this.renderFilter()}
                    </div>
                    <div className="col-9">
                        {this.renderChart()}
                    </div>
                </div>
            )
        }
        else if (this.state.kondisiPage == 2) {
            return (
                <div className="row  ml-3 mr-3 mt-5" style={{ justifyContent: "center" }}>
                    <div className="col-3" style={{ borderRight: "1px solid gray" }}>
                        {this.renderFilterPaket()}
                    </div>
                    <div className="col-9">
                        {this.renderChartPaket()}
                    </div>
                    {/* <h1>hallo</h1> */}
                </div>
            )
        }
    }
    render() {
        return (
            <div>
                {/* <hr /> */}
                <div className="d-flex bgImage8" style={{ color: "grey", height: "400px", justifyContent: "space-around" }}>
                    <div onClick={() => this.setState({ kondisiPage: 1})} className="textHover" style={{ marginTop: "190px" }}><h1>PRODUCT</h1></div>
                    <div onClick={() => this.setState({ kondisiPage: 2})} className="textHover" style={{ marginTop: "190px" }}><h1>PAKET</h1></div>
                </div>
                {this.kondisiPageHandler()}
            </div>
        )
    }
}

export default AdminReport