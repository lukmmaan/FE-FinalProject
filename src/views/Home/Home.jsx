import React from "react"
import "./Home.css"
import { Carousel, CarouselControl, CarouselItem } from "reactstrap";
import Axios from "axios";
import { Link } from "react-router-dom";
const API_URL = `http://localhost:8080/`
class Home extends React.Component {
    state = {
        activeIndex: 0,
        animating: false,
        dummy: []
    }
    nextHandler = () => {
        if (this.state.animating) return;
        let nextIndex =
            this.state.activeIndex === this.state.dummy.length - 1
                ? 0
                : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    };

    getProduct = () => {
        Axios.get(`${API_URL}/products/home`)
            .then((res) => {
                this.setState({
                    dummy: res.data
                })
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    componentDidMount() {
        this.getProduct()
    }
    prevHandler = () => {
        if (this.state.animating) return;
        let prevIndex =
            this.state.activeIndex === 0
                ? this.state.dummy.length - 1
                : this.state.activeIndex - 1;
        this.setState({ activeIndex: prevIndex });
    };
    renderCarouselItems = () => {
        return this.state.dummy.map(({ image, productName, description, id, sold }, idx) => {
            return (
                <CarouselItem
                    onExiting={() => this.setState({ animating: true })}
                    onExited={() => this.setState({ animating: false })}
                    key={id.toString()}
                >
                    <div className="carousel-item-home">
                        <div className="container position-relative">
                            <div className="row" style={{ paddingTop: "80px" }}>
                                <div className="col-6 text-white position-relative">
                                    <h1 style={{ color: "gold" }}>Best {idx + 1}</h1>
                                    <h2 style={{ color: "white" }}>{productName}</h2>
                                    <h5>Sold : {sold} pcs</h5>
                                    <p style={{ color: "white" }} className="mt-4">{description}, Lorem ipsum dolor sit amet consectetur adipisicing elit. Error nihil est autem amet modi, excepturi voluptate id! Similique ab, maxime, iure vel quod voluptatem dicta officiis voluptatum eveniet ipsa nobis.</p>
                                    <Link to={`/productdetails/${id}`}>
                                    <center>
                                        <input type="button" value="Buy" className="btn btnKostum" style={{ backgroundColor: "white" }} />
                                    </center>
                                    </Link>
                                </div>
                                <div className="col-6 d-flex flex-row justify-content-center">
                                    <img src={image} alt="" style={{ backgroundColor: "none", backgroundBlendMode: "multiply", height: "320px" }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </CarouselItem>
            );
        });
    };
    render() {
        return (
            <div>
                {/* <div style={{ height: "400px" }} className="bgImage3"></div> */}
                <hr/>
                <div style={{ height: "400px" }}>
                    <Carousel
                        className="carousel-item-home-bg "
                        next={this.nextHandler}
                        previous={this.prevHandler}
                        activeIndex={this.state.activeIndex}
                    >
                        {this.renderCarouselItems()}
                        <CarouselControl
                            directionText="Previous"
                            direction="prev"
                            onClickHandler={this.prevHandler}
                        />
                        <CarouselControl
                            directionText="Next"
                            direction="next"
                            onClickHandler={this.nextHandler}
                        />
                    </Carousel>
                </div>
                <hr className="mt-5" />
                <div style={{ marginTop: "30px", height: "1000px" }} className="d-flex flex-column">
                    <div style={{ height: "500px" }} className="row">
                        <div className="col-6">
                            <div className="d-flex flex-column text-center p-3">
                                <div className="imgCustom"><img src="https://images.squarespace-cdn.com/content/v1/5b4544e485ede17941bc95fc/1574791186686-02LSQSKKEKI275UC9O1I/ke17ZwdGBToddI8pDm48kPqQfq0L3n3wpHIsRapTfg8UqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKczo5Zn4xktlpMsMj-QlHXeMfNK6GwvtVkYEWiR8XAPyD3GfLCe_DXOSC_YcAacWL_/Ebony_Roberts_with_baby_carrier.jpg" height="350px" width="550px" /></div>
                                <h4 className="mt-3">Life Styles</h4>
                                <h6>Shop Now </h6>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="d-flex flex-column text-center p-3">
                                <div className="imgCustom"><img src="https://campusrec.fsu.edu/wp-content/uploads/2019/11/Harnois_041918_1182-backpacking-tips-for-women-hero-lg.jpg" height="350px" width="550px" /></div>
                                <h4 className="mt-3">Hiking Packs</h4>
                                <h6>Shop Now </h6>
                            </div>
                        </div>
                    </div>
                    <div style={{ height: "300px" }} className="row">
                        <div className="col-6">
                            <div className="d-flex flex-column text-center p-3">
                                <div className="imgCustom"><img src="https://southernapproach.co.nz/wp-content/uploads/C2C-running-banner-Korupt-Vision.jpg" height="350px" width="550px" /></div>
                                <h4 className="mt-3">Trail Running Vest</h4>
                                <h6>Shop Now </h6>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="d-flex flex-column text-center p-3">
                                <div className="imgCustom"><img src="https://2ganwc3heo6y2kcytm13s0hf-wpengine.netdna-ssl.com/wp-content/uploads/2017/08/Copy-of-SP__5987.jpg" height="350px" width="550px" /></div>
                                <h4 className="mt-3">Mountain Biking Packs</h4>
                                <h6>Shop Now </h6>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Home