import React from "react";
import Button from "../Button/Button";
import "./ProductItem.css";

const ProductItem = ({ product, className, onAdd }) => {
  const onAddHandler = () => {
    onAdd(product);
  };

  // <div class="cafe-item-photo">
  //           <picture class="cafe-item-lottie js-item-lottie">
  //       <source type="application/x-tgsticker" srcset="/img/cafe/Tako.tgs">

  //     <canvas width="74" height="74"></canvas></picture>
  //   </div>

  return (
    <div className={"product " + className}>
      <div
        className={"img"}
        // style={{ backgroundImage: `url(${product.src})` }}
      >
        <source type="application/x-tgsticker" srcset={product.src}></source>
      </div>
      <div className={"title"}>{product.title}</div>
      <div className={"description"}>{product.description}</div>
      <div className={"price"}>
        <span>
          Cost: <b>{product.price}</b>
        </span>
      </div>
      <Button className={"add-btn"} onClick={onAddHandler}>
        Add to cart
      </Button>
    </div>
  );
};

export default ProductItem;
