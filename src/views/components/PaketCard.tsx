import React from "react";
import "./PaketCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-regular-svg-icons";
import { Link, Route } from "react-router-dom";

interface ProductCardData {
  id: number;
  namaPaket: string;
  hargaPaket: number;
  stockPaket: number;
  soldPaket: number;
  imagePaket: string;
}

type ProductCardProps = {
  data: ProductCardData;
  className: string;
};

class PaketCard extends React.Component<ProductCardProps> {

  render() {
    const { id, namaPaket, hargaPaket, stockPaket, soldPaket, imagePaket } = this.props.data;

    return (
      <div className={`product-card d-inline-block ${this.props.className}`} style={{ width: "300px" }}>
        <Link to={`/paketDetails/${id}`}>
          <div className="App">
            <img
              src={imagePaket}
              style={{ width: "224px", height: "250px", objectFit: "contain" }}
            />
          </div>
        </Link>
        <p className="App mt-3">{namaPaket}</p>
        <div>
          <h5 style={{ fontWeight: "bolder" }}>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(hargaPaket)}
          </h5>
          <p className="small"> Stock: {stockPaket}</p>
        </div>
        <div className="d-flex flex-row align-items-center justify-content-between mt-2">
          <div>
            <div className="d-flex flex-row align-items-center justify-content-between">
              {/* Render stars dynamically */}
              <small className="ml-2">soldPaket :{soldPaket}</small>
            </div>
          </div>
          <Link to={`/paketDetails/${id}`}>
            <input className="btn btn-primary" type="button" style={{ width: "120px" }} value={`View Product`} />
          </Link>
          {/* <ButtonUI
            type="outlined"
            style={{ fontSize: "12px", padding: "4px 8px" }}
          >
            {" "}
            <FontAwesomeIcon icon={faHeart} /> Add to wishlist
          </ButtonUI> */}
        </div>
      </div>
    );
  }
}

export default PaketCard;