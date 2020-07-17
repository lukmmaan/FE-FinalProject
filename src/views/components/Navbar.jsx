import React from "react";
import "./Navbar.css"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"
import { faUser } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { logoutHandler } from "../../redux/actions"
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"
class Navbar extends React.Component {
    state = {
        dropdownOpen: false,
        stateLogout:0,
        date: new Date(),
    }
    toggleDropdown = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        })
    }
    logoutBtnHandler = () => {
        this.props.onLogout()
        console.log(this.props.user.username)
    }
    componentDidMount(){
        this.timer = setInterval(() => {
            this.setState({ date: new Date()})
        }, 1000);
    }
    // lifesMustGoOn = () =>{
    //     this.set
    // }
    render() {
        return (
            <>
                <div className="navbarTeks d-flex justify-content-end">
                    {
                        (!this.props.user.username) ? (<Link className="teksHitam" to="/Auth"><a>Login</a></Link>) :
                            <div className="d-flex flex-row" style={{ padding: "20px" }}>
                                <div className="mr-3">

                                    <Dropdown
                                        toggle={this.toggleDropdown}
                                        isOpen={this.state.dropdownOpen}
                                    >
                                        <DropdownToggle tag="div" className="d-flex">
                                            <FontAwesomeIcon icon={faUser} style={{ fontSize: 24 }} />
                                            <p className="teksHitam">{this.props.user.username}</p>
                                        </DropdownToggle>
                                        <DropdownMenu className="mt-2">
                                            {
                                                this.props.user.role == "admin" ? (
                                                    <>
                                                        <Link to="/adminproducts">
                                                            <DropdownItem>
                                                                Products
                                                            </DropdownItem>
                                                        </Link>
                                                        <Link to="/adminPayment">
                                                            <DropdownItem>Payments</DropdownItem>
                                                        </Link>
                                                        <Link to="/adminreport">
                                                            <DropdownItem>Report</DropdownItem>
                                                        </Link>
                                                    </>
                                                ) :
                                                    (
                                                        <>
                                                            <Link to="/editProfile">
                                                                <DropdownItem>Edit Profile</DropdownItem>
                                                            </Link>
                                                            <Link to="/statusbelanja">
                                                                <DropdownItem>Shop Status</DropdownItem>
                                                            </Link>
                                                        </>
                                                    )
                                            }
                                            <DropdownItem>
                                                <img
                                                    class="float-left"
                                                    style={{ width: "40px", height: "30px" }}
                                                    src="https://image.flaticon.com/icons/svg/1828/1828479.svg"
                                                    alt=""
                                                    onClick={this.logoutBtnHandler} />
                                                <span onClick={this.logoutBtnHandler}>Logout</span>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                                {
                                    (this.props.user.role == "user") ? (
                                        <div >
                                            <Link to={`/carts/${this.props.user.id}`} className="d-flex flex-row" style={{ padding: "0px", color: "gold" }}>
                                                <FontAwesomeIcon
                                                    className="mr-2"
                                                    icon={faShoppingCart}
                                                    style={{ fontSize: 24 }}

                                                />
                                                <p style={{ fontSize: 16, margin: "0px" }}>{this.props.user.itemCart}</p>
                                            </Link>
                                        </div>
                                    ) : null
                                }
                            </div>

                        // (<a className="teksHitam" href="#">{this.props.user.username}</a>)
                    }
                    <a className="teksHitam" href="#">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Flag_of_Indonesia.svg/1200px-Flag_of_Indonesia.svg.png" width="28" />
                    </a>
                    <a className="teksHitam" href="#">Find a Store</a>
                </div>
                <div style={{ margin: "40px", height: "100px", alignItems: "center" }} className="d-flex justify-content-between">
                    <Link to="/">
                        <div className="box">
                            <img src="https://i.pinimg.com/originals/f3/3f/ca/f33fca9d6f0c686d68a0e17e36a92d7c.jpg" style={{ maxWidth: "100%", maxHeight: "100%" }} />
                        </div>
                    </Link>
                    <div className="mt-3">
                        <ul className="d-flex menu-list">
                            <li className="menu-list-item">
                                <Link to="/products">
                                    <a className="teksHitam" href="#">Products</a>
                                </Link>
                            </li>
                            {/* <li className="menu-list-item">Behind The Packs</li> */}
                            {/* <li className="menu-list-item">Stories</li> */}
                            {/* <li className="menu-list-item">{this.state.date.toLocaleDateString()}</li> */}
                            <li className="menu-list-item">{this.state.date.toLocaleString()}</li>
                        </ul>
                    </div>
                    <div>
                        <h4></h4>
                    </div>
                </div>
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};
const mapDispatchtoProps = {
    onLogout: logoutHandler,
}
export default connect(mapStateToProps, mapDispatchtoProps)(Navbar)