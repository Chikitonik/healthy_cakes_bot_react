import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import urls from "../../data/urls";
import { Context } from "../Provider/Provider";
import { useState, useContext, useEffect } from "react";
import Badge from "@mui/material/Badge";
import { Link } from "react-router-dom";

// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
//   marginLeft: "auto",
//   transition: theme.transitions.create("transform", {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

export const ProductItemWeb = (props) => {
  const { product } = props;
  const { auth } = useAuth();

  const [expanded, setExpanded] = useState(false);

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };

  const { SQLtableDataCartRows, cartRowsCount, setCartRowsCount } =
    useContext(Context);

  const inCartCount = SQLtableDataCartRows?.filter(
    (value) => value.cake_id === product.id
  ).length;
  const [inCartCountState, setInCartCountState] = useState(inCartCount || 0);

  useEffect(() => {
    if (inCartCount != undefined || inCartCount != 0) {
      // console.log("inCartCount :>> ", inCartCount);
      setInCartCountState(inCartCount);
    }
  }, [inCartCount]);
  const handleAddToCart = async () => {
    const priceWithDiscount =
      Math.floor(product.price * (100 - product.discount)) / 100;
    // )
    try {
      const response = await axios.put(
        `${urls.CARTS_URL}put/${auth.user}/${product.id}/${priceWithDiscount}/add`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      // fetchSQLtableData();
      // handleCloseModalNewRow();
    } catch (err) {
      console.log("err :>> ", err);
      setPopoverContent(err.response.data.error);
      setPopoverShow(true);
      if (!err?.response) {
        setErrMsg("No Server Response");
      }
    }

    setCartRowsCount(parseInt(cartRowsCount) + 1);
    setInCartCountState(inCartCountState + 1);
  };

  const handleRemoveFromCart = async () => {
    const priceWithDiscount =
      Math.floor(product.price * (100 - product.discount)) / 100;
    // )
    try {
      const response = await axios.put(
        `${urls.CARTS_URL}put/${auth.user}/${product.id}/${priceWithDiscount}/del`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setCartRowsCount(parseInt(cartRowsCount) - 1);
      setInCartCountState(inCartCountState - 1);

      // fetchSQLtableData();
      // handleCloseModalNewRow();
    } catch (err) {
      console.log("err :>> ", err);
      setPopoverContent(err.response.data.error);
      setPopoverShow(true);
      if (!err?.response) {
        setErrMsg("No Server Response");
      }
    }
  };
  return (
    <Card
      key={product.id}
      elevation={15}
      sx={{
        maxWidth: 250,
        minWidth: 250,
        borderRadius: 3,
        m: 2,
        mt: 13,
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.image_source}
        alt={product.title}
        sx={{
          position: "absolute",
          width: "200px",
          ml: 3,
          mt: -10,
          // border: "solid 1px",
          // background: "grey",
        }}
      />
      <CardContent
        sx={{
          // height: 200,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          // backgroundColor: "blue",
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            sx={{
              position: "absolute",
              // color: "#fff",
              backgroundColor: "white",
              ml: -3,
              mt: 5,
              padding: "0 10px 0 10px",
              borderRadius: 1,
              border: "1px solid",
              borderColor: "#EFEFEF",
              fontWeight: "bold",
            }}
          >
            {/* $ {product.price} */}
            {product.discount > 0 ? (
              <>
                <Typography sx={{ textDecorationLine: "line-through" }}>
                  ${product.price}
                </Typography>
                $ {Math.floor(product.price * (100 - product.discount)) / 100}
              </>
            ) : (
              `$ ${product.price}`
            )}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography
            sx={{
              position: "absolute",
              color: "#fff",
              backgroundColor: "#00B57F",
              ml: -2,
              mt: -10,
              padding: "0 10px 0 10px",
              borderRadius: 1,
              fontWeight: "bold",
            }}
          >
            {product.is_new && "NEW"}
          </Typography>
          <Typography
            sx={{
              position: "absolute",
              color: "#fff",
              backgroundColor: "#72C879",
              ml: -2,
              mt: -6,
              padding: "0 10px 0 10px",
              borderRadius: 1,
              fontWeight: "bold",
            }}
          >
            {product.discount > 0 && `-${product.discount} %`}
          </Typography>
        </CardContent>
      </CardContent>
      <CardHeader
        sx={{
          mt: 5,
          mx: "auto",
        }}
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={product.title}
        // subheader="September 14, 2016"
      />

      <CardActions>
        {/* <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton> */}
        <CardActions sx={{ mx: "auto" }}>
          <IconButton aria-label="add to cart" onClick={handleAddToCart}>
            <AddCircleOutlineOutlinedIcon color="success" fontSize="large" />
          </IconButton>

          <IconButton size="large" color="inherit">
            <Badge badgeContent={inCartCountState} color="error">
              <Link to="/cart">
                <ShoppingCartOutlinedIcon fontSize="large" />
              </Link>
            </Badge>
          </IconButton>

          <IconButton
            aria-label="remove from cart"
            onClick={handleRemoveFromCart}
            disabled={true && !inCartCountState > 0}
          >
            <RemoveCircleOutlineOutlinedIcon
              fontSize="large"
              // color="disabled"
            />
          </IconButton>
        </CardActions>
        {/* <IconButton aria-label="settings">
          <MoreVertIcon />
        </IconButton> */}
      </CardActions>
    </Card>
  );
};
