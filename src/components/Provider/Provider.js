import { createContext, useState, useEffect } from "react";
import useFetchCartRows from "../../hooks/useFetchCartRows";

export const Context = createContext({});

const Provider = (props) => {
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

  return (
    <Context.Provider
      value={{
        cartRowsCount,
        SQLtableDataCartRows,
        errMsg,
        setCartRowsCount,
        setSQLtableDataCartRows,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
export default Provider;
