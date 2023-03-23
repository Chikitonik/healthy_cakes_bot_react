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

  const ProductData = ({ src, alt, title, price, discount }) => {
    return (
      <div key={product.id}>
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
          {product.discount > 0 ? (
            <div
              style={{ display: "flex", justifyContent: "center", gap: "5px" }}
            >
              <Typography
                variant="body1"
                sx={{ textDecorationLine: "line-through" }}
              >
                {product.price}
              </Typography>
              {" $ "}
              {Math.floor(product.price * (100 - product.discount)) / 100}
            </div>
          ) : (
            "$ " + price
          )}
        </Typography>
      </div>
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
      <CardActionArea
      // onClick={onShowDescriptionHandler}
      >
        {product.isShowDescription ? (
          <ProductDescription description={product.description} />
        ) : (
          <ProductData
            src={product.image_source}
            alt={product.title}
            title={product.title}
            price={product.price}
            discount={product.discount}
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
