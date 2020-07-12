import React from "react"
import { UncontrolledCarousel } from "reactstrap"
import Sepeda from "../components/image/sepeda.jpg"
import Hiking from "../components/image/hiking.jpg"
import Aksesoris from "../components/image/aksesoris.jpg"
import "./Home.css"
const item = [
    {
        src: Sepeda,
        altText: 'Slide 1',
        caption: 'SHOP MOUNTAIN BIKING',
        header: 'Dreaming Of Long Days In the Saddle',
        key: '1'
    },
    {
        src: Hiking,
        altText: 'Slide 2',
        caption: 'SHOP HIKING EQUIPMENT',
        header: 'Hiking With Your Friends',
        key: '2'
    },
    {
        src: Aksesoris,
        altText: 'Slide 3',
        caption: '',
        header: 'RIGHT HERE',
        key: '3'
    }
];
class Home extends React.Component {

    render() {
        return (
            <div>
                <div style={{ height: "400px" }} className="bgImage3">

                </div>
                <h1 className='judul'>DISCOVER</h1>
                <div style={{ marginTop: "30px",height:"1000px" }} className="d-flex flex-column">
                    <div style={{ height: "500px" }} className="row">
                        <div className="col-6">
                            <div className="d-flex flex-column text-center p-3">
                                <div className="imgCustom"><img src="https://images.squarespace-cdn.com/content/v1/5b4544e485ede17941bc95fc/1574791186686-02LSQSKKEKI275UC9O1I/ke17ZwdGBToddI8pDm48kPqQfq0L3n3wpHIsRapTfg8UqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKczo5Zn4xktlpMsMj-QlHXeMfNK6GwvtVkYEWiR8XAPyD3GfLCe_DXOSC_YcAacWL_/Ebony_Roberts_with_baby_carrier.jpg" height="350px" width="550px"  /></div>
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