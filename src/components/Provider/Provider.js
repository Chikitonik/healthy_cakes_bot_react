import { createContext, useState, useEffect } from "react";
import useFetchCartRows from "../../hooks/useFetchCartRows";
import useFetchOrdersRows from "../../hooks/useFetchOrdersRows";

export const Context = createContext({});

const Provider = (props) => {
  // cart
  const [fetchedCartRowsCount, fetchedSQLtableData, errMsg] =
    useFetchCartRows();
  const [SQLtableDataCartRows, setSQLtableDataCartRows] =
    useState(fetchedSQLtableData);
  const [cartRowsCount, setCartRowsCount] = useState(fetchedCartRowsCount);

  useEffect(() => {
    if (fetchedCartRowsCount !== undefined) {
      setCartRowsCount(fetchedCartRowsCount);
      setSQLtableDataCartRows(fetchedSQLtableData);
    }
  }, [fetchedCartRowsCount]);
  // orders
  const [fetchedOrdersRowsCount, fetchedSQLtableOrdersData, errOrdersMsg] =
    useFetchOrdersRows();
  const [SQLtableDataOrdersRows, setSQLtableDataOrdersRows] = useState(
    fetchedSQLtableOrdersData
  );
  const [ordersRowsCount, setOrdersRowsCount] = useState(
    fetchedOrdersRowsCount
  );

  useEffect(() => {
    if (fetchedOrdersRowsCount !== undefined) {
      setOrdersRowsCount(fetchedOrdersRowsCount);
      setSQLtableDataOrdersRows(fetchedSQLtableOrdersData);
    }
  }, [fetchedOrdersRowsCount]);

  return (
    <Context.Provider
      value={{
        cartRowsCount,
        SQLtableDataCartRows,
        errMsg,
        setCartRowsCount,
        setSQLtableDataCartRows,
        ordersRowsCount,
        SQLtableDataOrdersRows,
        errOrdersMsg,
        setOrdersRowsCount,
        setSQLtableDataOrdersRows,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
export default Provider;
