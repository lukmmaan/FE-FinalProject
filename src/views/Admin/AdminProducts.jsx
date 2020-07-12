import React from "react"
import Axios from "axios";
import swal from "sweetalert";
const API_URL = `http://localhost:8080/`;
class AdminProducts extends React.Component {
    state = {
        category: {
            categoryName: "",
        },
        paket: {
            namaPaket: "",
            imagePaket:"",
        },
        addProducts: {
            productName: "",
            price: 0,
            image: "",
            description: "",
            stock: 0,
            size: "",
        },
        getProductsName: [],
        getCategoryName: [],
        productTampung: "",
        categoryTampung: "",
        paketTampung: "",
        productPaketTampung: "",
        oldCategoryName: "",
        NewCategoryName: "",
        kondisiEditCategory: 0,
        kondisiEditProduct: 0,
        kondisiEditPaket: 0,
        oldProductName: "",
        oldPaketName: "",
        newProduct: {
            productName: "",
            price: 0,
            image: "",
            description: "",
            stock: 0,
            size: "",
        },
        getPaket: [],
        arr: [],
        editPaket: {
            namaPaket: "",
            imagePaket: ""
        }
    }

    inputHandler = (e, field, form) => {
        const { value } = e.target;
        this.setState({
            [form]: {
                ...this.state[form],
                [field]: value,
            },
        });
    }

    getCategories = () => {
        Axios.get(`${API_URL}/categories`)
            .then((res) => {
                this.setState({
                    getCategoryName: res.data
                })
                // console.log(this.state.getCategoryName)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    getProducts = () => {
        Axios.get(`${API_URL}/products`)
            .then((res) => {
                this.setState({
                    getProductsName: res.data
                })
                // console.log(this.state.getProductsName)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    getPakets = () => {
        Axios.get(`${API_URL}/paket`)
            .then((res) => {
                this.setState({
                    getPaket: res.data
                })
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    addProductsHandler = () => {
        // console.log(this.state.addProducts)
        Axios.post(`${API_URL}/products`, this.state.addProducts)
            .then((res) => {
                console.log(res.data)
                swal("Berhasil", "Berhasil Menambah Product", "success")
                this.getProducts()
            })
            .catch((err) => {
                console.log(err)
                swal("Failed", err.response.data.message, "error")
            })
    }

    addPaketHandler = () => {
        console.log(this.state.paket.namaPaket + this.state.paket.imagePaket)
        Axios.post(`${API_URL}/paket`, this.state.paket)
            .then((res) => {
                console.log(res.data)
                swal("Berhasil", "Berhasil Menambah Paket", "success")
                this.getPakets()
            })
            .catch((err) => {
                console.log(err)
                swal("Failed", err.response.data.message, "error")
            })
    }

    addCategoryHandler = () => {
        console.log(this.state.category.categoryName)
        Axios.post(`${API_URL}/categories`, this.state.category)
            .then((res) => {
                console.log(res.data)
                swal("Berhasil", "Berhasil Menambah Category", "success")
                this.getCategories()
            })
            .catch((err) => {
                swal("Failed", err.response.data.message, "error")
                console.log(err.response.data.message)
            })
    }
    checkBoxHandler = (e, form, val) => {
        const { checked } = e.target;
        this.setState({
            [form]: {
                ...this.state[form],
                showPassword: checked,
                checked: [...this.state.selected.checked, val]
            }
        })
        console.log(this.state.selected.checked)
    }
    renderInputProducts = () => {
        return (
            <tr>
                <td><input onChange={(e) => this.inputHandler(e, "productName", "addProducts")} className="form-control" type="text" placeholder="Product Name" /></td>
                <td><input onChange={(e) => this.inputHandler(e, "price", "addProducts")} className="form-control" type="text" placeholder="Price" /></td>
                <td><input onChange={(e) => this.inputHandler(e, "size", "addProducts")} className="form-control" type="text" placeholder="Size" /></td>
                <td><input onChange={(e) => this.inputHandler(e, "stock", "addProducts")} className="form-control" type="text" placeholder="Stock" /></td>
                <td><input onChange={(e) => this.inputHandler(e, "description", "addProducts")} className="form-control" type="text" placeholder="Description" /></td>
                <td><input onChange={(e) => this.inputHandler(e, "image", "addProducts")} className="form-control" type="text" placeholder="Image" /></td>
                <td>
                    <input onClick={this.addProductsHandler} className="btn btn-primary" type="button" value="Save" />
                </td>
            </tr>
        )
    }
    renderProducts = () => {
        return this.state.getProductsName.map((val) => {
            return (
                <option value={val.productName}>{val.productName}</option>
            )
        })
    }
    saveAddCategoriesToProducts = () => {
        console.log(this.state.categoryTampung + " " + this.state.productTampung)
        Axios.post(`${API_URL}/products/${this.state.productTampung}/category/${this.state.categoryTampung}`)
            .then((res) => {
                console.log(res.data)
                swal("Berhasil", "Berhasil Menambah Kategori Kedalam Product", "success")
                this.getProducts()
            })
            .catch((err) => {
                swal("Error",err.response.data.message,"error")
                console.log(err)
            })
    }


    saveAddProductToPaket = () => {
        console.log(this.state.paketTampung + " " + this.state.productPaketTampung)
        Axios.get(`${API_URL}/products/${this.state.productPaketTampung}/paket/${this.state.paketTampung}`)
            .then((res) => {
                swal("Berhasil", "Berhasil Menambah Product ke Paket", "success")
                console.log(res.data)
                this.getPakets()
            })
            .catch((err) => {
                swal("Error", err.response.data.message, "error")
            })
    }
    renderCategories = () => {
        return this.state.getCategoryName.map((val) => {
            return (
                <option value={val.categoryName}>{val.categoryName}</option>
            )
        })
    }
    renderPakets = () => {
        return this.state.getPaket.map((val) => {
            return (
                <option value={val.namaPaket}>{val.namaPaket}</option>
            )
        })
    }
    deleteProductInPaket = (val, value) => {
        Axios.delete(`${API_URL}/paket/${value}/${val}`)
            .then((res) => {
                console.log(res.data)
                swal("Sukses", "Data Product Sudah Dihapus", "success")
                this.getPakets()
            })
            .catch((err) => {
                console.log(err)
            })
        this.getProducts()
        this.getPakets()

    }
    renderPaketEdit = () => {
        return this.state.getPaket.map((val, idx) => {
            return (
                <tr>
                    <td>{idx + 1}</td>
                    <td>{val.namaPaket}</td>
                    <td>
                        <div className="d-flex" style={{ justifyContent: "center" }}>
                            <table style={{ border: "1px pink solid", width: "500px" }}>
                                <thead>
                                    <tr>
                                        <td>Nama Produk</td>
                                        <td>Stock</td>
                                        <td>Price</td>
                                        <td>Button</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {val.products.map((value) => {
                                        return (
                                            <tr>
                                                <td>{value.productName}</td>
                                                <td>{value.stock}</td>
                                                <td>{value.price}</td>
                                                <td><input onClick={() => this.deleteProductInPaket(val.id, value.id)} className="btn btn-danger" type="button" value="Delete" /></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </td>
                    <td>{val.stockPaket}</td>
                    <td>{val.hargaPaket}</td>
                    <td>
                        <div>
                            <input onClick={() => this.editPaketHandler(val.id, idx,val)} className="btn btn-warning mr-3" type="button" value="Edit" />
                            <input onClick={() => this.deletePaketHandler(val.id)} className="btn btn-danger" type="button" value="Delete" />
                        </div>
                    </td>
                </tr>
            )
        })
    }
    penampung = (e, form) => {
        this.setState({
            [form]: e
        })
    }
    componentDidMount() {
        this.getCategories()
        this.getProducts()
        this.getPakets()
    }
    renderEditCategories = () => {
        return this.state.getCategoryName.map((val, idx) => {
            return (
                <tr>
                    <td>{idx + 1}.</td>
                    <td style={{ textAlign: "center", justifyContent: "center" }}>{val.categoryName}</td>
                    <td>
                        <input onClick={() => this.editCategoriesHandler(idx, val.id)} className="btn btn-warning" type="button" value="Edit" />
                        <input onClick={() => this.deleteCategoriesHandler(val.id)} className="ml-3 btn btn-danger" type="button" value="Delete" />
                    </td>
                </tr>
            )
        })
    }
    deleteCategoriesHandler = (id) => {
        // console.log(id)
        Axios.delete(`${API_URL}/categories/${id}`)
            .then((res) => {
                console.log(res.data)
                swal("Sukses", "Category Telah Dihapus", "success")
                this.getCategories()
                this.getProducts()
            })
            .then((err) => {
                console.log(err)
            })
    }
    deletePaketHandler = (val) => {
        Axios.delete(`${API_URL}/paket/deletepaket/${val}`)
            .then((res) => {
                swal("Success", "Your Paket Has Been deleted", "success")
                this.getPakets()
            })
            .catch((err) => {
                console.log(err)
            })
    }
    deleteProductHandler = (id) => {
        // console.log(id)
        Axios.delete(`${API_URL}/products/${id}`)
            .then((res) => {
                console.log(res.data)
                swal("Sukses", "Product Telah Dihapus", "success")
                this.getProducts()
                this.getPakets()
            })
            .catch((err) => {
                console.log(err)
            })
    }
    editCategoriesHandler = (idx, id) => {
        this.setState({
            kondisiEditCategory: id,
            oldCategoryName: this.state.getCategoryName[idx].categoryName
        })
        console.log(id)
        console.log(this.state.oldCategoryName)
    }
    editProductsHandler = (id, idx,val) => {
        console.log(id)
        this.setState({
            kondisiEditProduct: id,
            oldProductName: this.state.getProductsName[idx].productName,
            newProduct:val
        })
        console.log(this.state.oldProductName)
    }
    editPaketHandler = (id, idx,val) => {
        console.log(id)
        this.setState({
            kondisiEditPaket: id,
            oldPaketName: this.state.getPaket[idx].namaPaket,
            editPaket:val
        })
        console.log(this.state.oldPaketName)
    }
    saveEditPaket = () => {
        // console.log(this.state.editPaket.imagePaket+ this.state.editPaket.namaPaket)
        Axios.put(`${API_URL}/paket/${this.state.kondisiEditPaket}`, this.state.editPaket)
            .then((res) => {
                console.log(res.data)
                swal("Success", "Paket Telah Diubah", "success")
                this.getPakets()
                this.setState({
                    kondisiEditPaket: 0
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    saveEditCategory = () => {
        // console.log(this.state.NewCategoryName)
        Axios.put(`${API_URL}/categories/${this.state.oldCategoryName}/${this.state.NewCategoryName}`)
            .then((res) => {
                console.log(res.data)
                swal("Sukses", "Category Sudah Terganti", "success")
                this.setState({
                    kondisiEditCategory: 0
                })
                this.getCategories()
                this.getProducts()
            })
            .catch((err) => {
                console.log(err)
            })
    }
    saveEditProduct = () => {
        console.log(this.state.kondisiEditProduct)
        console.log(this.state.newProduct)

        Axios.put(`${API_URL}/products/${this.state.kondisiEditProduct}`, this.state.newProduct)
            .then((res) => {
                console.log(res.data)
                swal("Sukses", "Product Berhasil Diubah", "success")
                this.getProducts();
                this.setState({
                    kondisiEditProduct: 0
                })
                this.getPakets()
            })
            .catch((err) => {
                console.log(err)
            })
    }
    deleteCategorySuatuProduct = (productId, categoryId) => {
        // console.log(productId,categoryId)
        Axios.delete(`${API_URL}/products/${productId}/category/${categoryId}`)
            .then((res) => {
                console.log(res.data)
                swal(`Sukses`, "Berhasil dihapus Kategori", "success")
                this.getProducts()
                // this.getCategories()
            })
            .catch((err) => {
                console.log(err)
            })
    }
    renderEditProducts = () => {
        return this.state.getProductsName.map((val, idx) => {
            return (
                <tr>
                    <td>{idx + 1}.</td>
                    <td>{val.productName}</td>
                    <td>{val.price}</td>
                    <td>{val.size}</td>
                    <td>{val.stock}</td>
                    <td>{val.description}</td>
                    <td> <img src={val.image} width="50" /></td>
                    <td>{val.categories.map((value, index) => {
                        return (
                            <table style={{ width: "100%" }}>
                                <tr className="table-primary">
                                    <td style={{ width: "50%" }}>{index + 1}.</td>
                                    <td style={{ width: "50%" }}>{value.categoryName}</td>
                                    <td><input onClick={() => this.deleteCategorySuatuProduct(val.id, value.id)} className="btn btn-danger" type="button" value="Delete" /></td>
                                </tr>
                            </table>
                            // <ul style={{ listStyleType: "none", textAlign: "left" }}>
                            //     <li>{index + 1}. {value.categoryName} <input className="btn btn-danger" type="button" value="Delete"/></li>
                            // </ul>
                        )
                    })}</td>
                    <td>
                        <input onClick={() => this.editProductsHandler(val.id, idx, val)} className="btn btn-warning mr-4" type="button" value="Edit" />
                        <input onClick={() => this.deleteProductHandler(val.id)} className="btn btn-danger" type="button" value="Delete" />
                    </td>
                </tr>
            )
        })
    }
    render() {
        return (
            <div className="App">
                <hr />
                <h2>Add Products</h2>
                <table className="table mt-5">
                    <thead>
                        <tr>
                            <td>Product Name</td>
                            <td>Price</td>
                            <td>Size</td>
                            <td>Stock</td>
                            <td>Description</td>
                            <td>Image</td>
                            <td>Save</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderInputProducts()}
                    </tbody>
                </table>
                <hr />
                <div className="row">
                    <div className="col-6" style={{ borderRight: "1px solid grey" }}>
                        <h2>Add Categories</h2>
                        <div className="d-flex flex-row" style={{ justifyContent: "center" }}>
                            <input
                                style={{ width: "400px", marginRight: "50px", height: "40px" }}
                                onChange={
                                    (e) => this.setState({ category: { categoryName: e.target.value } })
                                } className="form-control mb-3" type="text" placeholder="Category Name" />
                            <input style={{ height: "40px" }} onClick={this.addCategoryHandler} className="btn btn-primary" type="button" value="Save" />
                        </div>
                    </div>
                    <div className="col-6">
                        <h2>Add Categories to Product</h2>
                        <div className=" d-flex flex-row" style={{ justifyContent: "center" }}>
                            <select className="form-control" onChange={(e) => this.penampung(e.target.value, "productTampung")} name="products" id="products" style={{ marginRight: "30px", width: "200px" }}>
                                <option value=""></option>
                                {this.renderProducts()}
                            </select>
                            <select className="form-control" onChange={(e) => this.penampung(e.target.value, "categoryTampung")} style={{ marginRight: "30px", width: "200px" }} name="products" id="products">
                                <option value=""></option>
                                {this.renderCategories()}
                            </select>
                            <input className="btn btn-primary" onClick={this.saveAddCategoriesToProducts} type="button" value="Save" />
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-6" style={{ borderRight: "1px solid grey" }}>
                        <h2>Add New Paket</h2>
                        <div className="d-flex flex-row" style={{ justifyContent: "center" }}>
                            <input
                                style={{ width: "200px", marginRight: "50px", height: "40px" }}
                                onChange={(e) => this.inputHandler(e, "namaPaket", "paket")}
                                className="form-control mb-3" type="text" placeholder="Paket Name" />
                            <input
                                style={{ width: "200px", marginRight: "50px", height: "40px" }}
                                onChange={(e) => this.inputHandler(e, "imagePaket", "paket")}
                                className="form-control mb-3" type="text" placeholder="Image Link" />
                            <input style={{ height: "40px" }} onClick={this.addPaketHandler} className="btn btn-primary" type="button" value="Save" />
                        </div>
                    </div>
                    <div className="col-6">
                        <h2>Add Product To Paket</h2>
                        <div className=" d-flex flex-row" style={{ justifyContent: "center" }}>
                            <select className="form-control" onChange={(e) => this.penampung(e.target.value, "paketTampung")} style={{ marginRight: "30px", width: "200px" }} name="products" id="products">
                                <option value=""></option>
                                {this.renderPakets()}
                            </select>
                            <select className="form-control" onChange={(e) => this.penampung(e.target.value, "productPaketTampung")} style={{ marginRight: "30px", width: "200px" }} name="products" id="products">
                                <option value=""></option>
                                {this.renderProducts()}
                            </select>
                            <input className="btn btn-primary" onClick={this.saveAddProductToPaket} type="button" value="Save" />
                        </div>
                    </div>
                </div>
                <div>
                    <hr />
                    <h2>Edit Products</h2>
                    <table className="table mt-5">
                        <thead>
                            <tr>
                                <td>No.</td>
                                <td>Product</td>
                                <td>Price</td>
                                <td>Size</td>
                                <td>Stock</td>
                                <td>Description</td>
                                <td>Image</td>
                                <td>Categories</td>
                                <td>Button</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderEditProducts()}
                        </tbody>
                    </table>
                </div>
                {
                    (!this.state.kondisiEditProduct) ? null : (
                        <div className="App">
                            <h2>Edit Product {this.state.oldProductName} Form</h2>
                            <table className="table mt-5">
                                <tr>
                                    <td><input value={this.state.newProduct.productName} onChange={(e) => this.inputHandler(e, "productName", "newProduct")} className="form-control" type="text" placeholder="Product Name" /></td>
                                    <td><input value={this.state.newProduct.price} onChange={(e) => this.inputHandler(e, "price", "newProduct")} className="form-control" type="text" placeholder="Price" /></td>
                                </tr>
                                <tr>
                                    <td><input value={this.state.newProduct.size} onChange={(e) => this.inputHandler(e, "size", "newProduct")} className="form-control" type="text" placeholder="Size" /></td>
                                    <td><input value={this.state.newProduct.description} onChange={(e) => this.inputHandler(e, "description", "newProduct")} className="form-control" type="text" placeholder="Description" /></td>
                                </tr>
                                <tr>
                                    <td><input value={this.state.newProduct.stock} onChange={(e) => this.inputHandler(e, "stock", "newProduct")} className="form-control" type="text" placeholder="Stock" /></td>
                                    <td><input value={this.state.newProduct.image} onChange={(e) => this.inputHandler(e, "image", "newProduct")} className="form-control" type="text" placeholder="Image" /></td>
                                </tr>
                            </table>
                            <input onClick={this.saveEditProduct} className="form-control" className="btn btn-primary" type="button" value="Save" />
                            <input onClick={() => this.setState({ kondisiEditProduct: 0 })} type="button" value="Cancel" className="ml-3 btn btn-danger" />
                        </div>
                    )
                }
                <div>
                    <hr />
                    <h2>Edit Categories</h2>
                    <div style={{ display: "flex", justifyContent: 'center' }}>
                        <table className="table">
                            <thead>
                                <tr>
                                    <td>No.</td>
                                    <td>CategoryName</td>
                                    <td>Button</td>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderEditCategories()}
                            </tbody>
                        </table>
                    </div>
                    {
                        (!this.state.kondisiEditCategory) ? null : (
                            <div>
                                <h2>Edit Category {this.state.oldCategoryName} Form</h2>
                                <div className="d-flex flex-row" style={{ justifyContent: "center" }}>
                                    <input placeholder="Edit Here" onChange={(e) => this.penampung(e.target.value, "NewCategoryName")} style={{ width: "400px" }} className="form-control" type="text" />
                                    <input onClick={this.saveEditCategory} className="ml-3 btn btn-success" type="button" value="Save" />
                                    <input onClick={() => this.setState({ kondisiEditCategory: 0 })} type="button" value="Cancel" className="ml-3 btn btn-danger" />
                                </div>
                            </div>
                        )
                    }
                </div>
                <div>
                    <hr />
                    <h2>Edit Paket</h2>
                    <div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <td>No.</td>
                                    <td>Nama Paket</td>
                                    <td>Isi Paket</td>
                                    <td>Stock Paket</td>
                                    <td>Harga Paket</td>
                                    <td>Button</td>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderPaketEdit()}
                            </tbody>
                        </table>
                    </div>
                </div>
                {
                    (this.state.kondisiEditPaket == 0) ? null : (
                        <div>
                            <div className="d-flex flex-column container" >
                                <h4 style={{ marginRight: "15px" }}>Edit {this.state.oldPaketName} :</h4>
                                <input value={this.state.editPaket.namaPaket} onChange={(e) => this.inputHandler(e, "namaPaket", "editPaket")} placeholder="Nama Paket" className="form-control mt-3" type="text" />
                                <input value={this.state.editPaket.imagePaket} onChange={(e) => this.inputHandler(e, "imagePaket", "editPaket")} placeholder="Image Paket" className="form-control mt-3" type="text" />
                                <center>
                                    <input onClick={this.saveEditPaket} className="btn btn-warning mt-3 mr-3" style={{ width: "60px" }} type="button" value="Save" />
                                    <input onClick={() => this.setState({ kondisiEditPaket: 0 })} type="button" value="Cancel" className="btn btn-danger mt-3" style={{ width: "70px" }} />
                                </center>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}


export default AdminProducts