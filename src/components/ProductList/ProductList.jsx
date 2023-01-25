import React, { useState } from "react";
import "./ProductList.css";
import ProductItem from "../ProductItem/ProductItem";
import { useTelegram } from "../../hooks/useTelegram";
import { useCallback, useEffect } from "react";

import products_data from "../../data/products_data";
// Function to calculate the total price of added items
const getTotalPrice = (items = []) => {
  return items.reduce((acc, item) => {
    return (acc += item.price);
  }, 0);
};

const ProductList = () => {
  // State to keep track of added items
  const [addedItems, setAddedItems] = useState([]);
  // Destructuring telegram object and queryId from custom hook
  const { tg, queryId, user } = useTelegram();
  // Use callback hook to send data to the server
  const onSendData = useCallback(() => {
    // Prepare data to be sent
    const data = {
      products: addedItems,
      totalPrice: Math.round(getTotalPrice(addedItems) * 100) / 100,
      queryId,
      user: user,
    };
    // Send data to the server
    fetch("http://localhost:8000/web-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }, [addedItems]);
  // Use effect hook to handle main button click event
  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);
    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData]);
  // Function to add/remove items
  const onAdd = (product) => {
    // Check if the product is already added
    const alreadyAdded = addedItems.find((item) => item.id === product.id);
    // find item in products_data
    const itemToUpdateInData = products_data.find(
      (item) => item.id === product.id
    );
    let newItems = [];
    // If already added, remove it from the added items
    if (alreadyAdded) {
      newItems = addedItems.filter((item) => item.id !== product.id);
      // update state in products_data
      itemToUpdateInData.isAdded = false;
      // Else add the product to the added items
    } else {
      newItems = [...addedItems, product];
      // update state in products_data
      itemToUpdateInData.isAdded = true;
    }
    // Update the state
    setAddedItems(newItems);
    // Show/hide the main button and update its text
    if (newItems.length === 0) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `BUY $ ${Math.round(getTotalPrice(newItems) * 100) / 100}`,
      });
    }
  };
  const onShowDescription = (product) => {
    const itemToUpdateInData = products_data.find(
      (item) => item.id === product.id
    );
    itemToUpdateInData.isShowDescription
      ? (itemToUpdateInData.isShowDescription = false)
      : (itemToUpdateInData.isShowDescription = true);
    // Update the state
    let someMyListToUpdateTheState = [];
    setAddedItems(someMyListToUpdateTheState);
  };
  // Render the list of products
  return (
    <div className={"list"}>
      {products_data.map((item) => (
        <ProductItem
          product={item}
          onAdd={onAdd}
          onShowDescription={onShowDescription}
          className={"item"}
        />
      ))}
    </div>
  );
};

export default ProductList;
