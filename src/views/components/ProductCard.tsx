import React from "react";
import "./ProductCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-regular-svg-icons";
import { Link,Route } from "react-router-dom";

interface ProductCardData {
  id: number;
  productName: string;
  price: number;
  sold: number;
  image: string;
  stock: number;
}

type ProductCardProps = {
  data: ProductCardData;
  className: string;
};

class ProductCard extends React.Component<ProductCardProps> {

  render() {
    const { id, productName, price, sold, image,stock } = this.props.data;

    return (
      <div className={`product-card d-inline-block ${this.props.className}`}>
        <Link to={`/productdetails/${id}`}>
        <img
          src={image}
          alt={this.props.data.productName}
          style={{ width: "224px", height: "250px", objectFit: "contain" }}
        />
        </Link>
        <div>
          <p className="mt-3">{productName}</p>
          <h5 style={{ fontWeight: "bolder" }}>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(price)}
          </h5>
          <p className="small">Stock : {stock}</p>
        </div>
        <div className="d-flex flex-row align-items-center justify-content-between mt-2">
          <div>
            <div className="d-flex flex-row align-items-center justify-content-between">
              {/* Render stars dynamically */}
          <small className="ml-2">Sold :{sold}</small>
            </div>
          </div>
          <Link to={`/productdetails/${id}`}>
          <input className="btn btn-primary" type="button" value={`View Product`} />
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

export default ProductCard;