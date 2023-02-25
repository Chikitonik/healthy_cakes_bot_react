import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import urls from "../../data/urls";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const ProductItemWeb = (props) => {
  const { product } = props;
  const { auth } = useAuth();

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
      sx={{ maxWidth: 250, minWidth: 250, borderRadius: 3, m: 2, mt: 13 }}
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
          // height: 80,
          // backgroundColor: "#9c27b0",
          mt: 5,
          // background: "linear-gradient(-45deg, #9c27b0 8%, #6338c0 83%)",
          // color: "#fff",
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
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <CardActions>
          <IconButton aria-label="add to cart" onClick={handleAddToCart}>
            <AddCircleOutlineOutlinedIcon color="success" />
          </IconButton>
          <ShoppingCartOutlinedIcon />
          <IconButton
            aria-label="remove from cart"
            onClick={handleRemoveFromCart}
          >
            <RemoveCircleOutlineOutlinedIcon color="disabled" />
          </IconButton>
        </CardActions>
        <IconButton aria-label="settings">
          <MoreVertIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
