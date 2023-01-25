import React from "react";
import "./ProductItem.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

const ProductItem = ({ product, className, onAdd, onShowDescription }) => {
  const onAddHandler = () => {
    onAdd(product);
  };

  const onShowDescriptionHandler = () => {
    onShowDescription(product);
  };

  const ProductData = ({ src, alt, title, price }) => {
    return (
      <>
        <CardMedia
          component="img"
          height="150"
          width="150"
          image={src}
          alt={alt}
        />
        <Typography
          className={"title"}
          variant="h6"
          component="div"
          align="center"
        >
          {title}
        </Typography>
        <Typography
          className={"price"}
          variant="h6"
          component="div"
          align="center"
        >
          {"$ " + price}
        </Typography>
      </>
    );
  };

  const ProductDescription = ({ description }) => {
    return (
      <Typography
        className={"description"}
        variant="body1"
        component="div"
        align="center"
      >
        {description}
      </Typography>
    );
  };

  return (
    <Card className={"product " + className}>
      <CardActionArea onClick={onShowDescriptionHandler}>
        {product.isShowDescription ? (
          <ProductDescription description={product.description} />
        ) : (
          <ProductData
            src={product.src}
            alt={product.title}
            title={product.title}
            price={product.price}
          />
        )}
      </CardActionArea>
      <CardActions className={"card-actions"} style={{ padding: "0" }}>
        {!product.isShowDescription && (
          <Button
            className={`add-btn ${product.isAdded && "added"}`}
            onClick={onAddHandler}
          >
            {product.isAdded ? "REMOVE" : "ADD TO CART"}
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default ProductItem;
