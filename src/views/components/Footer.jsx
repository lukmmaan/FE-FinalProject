import React from "react"
import "./Footer.css"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
class Footer extends React.Component {
    state = {
    }
    render() {
        return (
            <div>
                <hr />
                <div style={{ height: "100px", marginLeft: "200px" }}>
                    <div className="row mt-4">
                        <div className="col-4 text-left">
                            <h5 className="teks">STAY CONNECTED</h5>
                            <div>
                                <img src="https://i.pinimg.com/originals/08/a2/98/08a298044d89bc03fe0b7a16dd0a0588.jpg" width="150" />
                            </div>
                        </div>
                        <div className="col-4 text-left">
                            <h5 className="teks">COMPANY</h5>
                            <p>About Us</p>
                            <p>History</p>
                            <p>Sustainability</p>
                        </div>
                        <div className="col-4 text-left">
                            {
                                (!this.props.user.id) ? (
                                    <>

                                        <h5 className="teks">SIGN UP</h5>
                                        <p>Stay up to date on our latest news and  <br />  promotions and receive exclusive deals</p>
                                        <div className="d-flex flex-row">
                                            <Link to="/Auth" style={{ padding: "0px" }}>
                                                <h5 className="teks" style={{ color: "black" }}>Click Here !</h5>
                                            </Link>
                                        </div>
                                    </>
                                ) : (
                                        <div>
                                            <h5 className="teks">Hello,</h5>
                                            <p className="teks">{this.props.user.fullName}</p>
                                        </div>
                                    )
                            }
                        </div>
                    </div>
                </div>
                <div style={{ height: "300px", borderBottom: "black" }} className="d-flex">
                    <img src="https://i.pinimg.com/originals/27/17/9c/27179c9c094e4b3674243eca10b7a493.jpg" width="100%" />
                </div>
                <div style={{ height: "100px", backgroundColor: "black", borderTop: "black" }} className="text-center">
                    <img src="https://seeklogo.com/images/J/jne-express-new-2016-logo-375E58A33D-seeklogo.com.png" className="mr-4" width="60px" />
                    <img src="https://www.jne.co.id/contents/logo-detail-34.png" className="mr-4" width="60px" />
                    <img src="https://assets.grab.com/wp-content/uploads/sites/4/2020/04/01111035/Grab_Final_Master_Logo_2019_RGB_green.png" width="60px" /><br />
                    <span style={{ color: "white" }}>All images & content ©2004-2020 Osprey Packs, Inc.</span>
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
export default connect(mapStateToProps)(Footer)