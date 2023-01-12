import React from "react";
import Button from "../Button/Button";
import "./ProductItem.css";
// import { Card, CardContent, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const ProductItem = ({ product, className, onAdd }) => {
  const onAddHandler = () => {
    onAdd(product);
  };

  return (
    <div>
      <Card
        width="150px"
        style={{
          margin: "10px",
        }}
      >
        <CardMedia
          component="img"
          height="150"
          width="150"
          image={product.src}
          alt={product.title}
        />
        <CardContent style={{ padding: "0" }}>
          <Typography variant="h6" component="div" align="center">
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            {product.description}
          </Typography>
          <Typography variant="h6" component="div" align="center">
            {product.price + ",00 $"}
          </Typography>
        </CardContent>
        <CardActions>
          {/* <Button size="small">Info</Button> */}
          <Button
            className={`add-btn ${product.isAdded && "added"}`}
            onClick={onAddHandler}
          >
            {product.isAdded ? "REMOVE" : "ADD TO CART"}
          </Button>
        </CardActions>
      </Card>
    </div>

    // <div className={"product " + className}>
    //   <div
    //     className={"img"}
    //     style={{ backgroundImage: `url(${product.src})` }}
    //   ></div>
    //   <div className={"title"}>{product.title}</div>
    //   <div className={"description"}>{product.description}</div>
    //   <div className={"price"}>
    //     <span>
    //       Cost: <b>{product.price}</b>
    //     </span>
    //   </div>
    //   <Button
    //     className={`add-btn ${product.isAdded && "added"}`}
    //     onClick={onAddHandler}
    //   >
    //     {product.isAdded ? "REMOVE" : "ADD TO CART"}
    //   </Button>
    // </div>
  );
};

export default ProductItem;
