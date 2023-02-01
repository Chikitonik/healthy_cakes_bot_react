import useFetchSQLtableData from "../hooks/useFetchSQLtableData";
import { ProductItemWeb } from "../components/ProductItem/ProductItemWeb";

export const Store = () => {
  const SQLtable = "cakes";
  const [SQLtableData, errMsg] = useFetchSQLtableData(SQLtable);
  console.log("SQLtableData :>> ", SQLtableData);
  {
    if (SQLtableData) {
      return (
        <div>
          {SQLtableData.map((item) => (
            <ProductItemWeb
              product={item}
              //   onAdd={onAdd}
              //   onShowDescription={onShowDescription}
              //   className={"item"}
            />
          ))}
        </div>
      );
    } else {
      return <div>{errMsg}</div>;
    }
  }
};

export default Store;
