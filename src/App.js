import { useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { useTelegram } from "./hooks/useTelegram";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ProductList from "./components/ProductList/ProductList";
import Form from "./components/Form/Form";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import About from "./pages/About";
import Admin from "./pages/Admin";
import Store from "./pages/Store";
import LinkPage from "./pages/LinkPage";
import Missing from "./pages/LinkPage";
import Cart from "./pages/Cart";
import Layout from "./components/Layout/Layout";
import RequireAuth from "./components/Auth/RequierAuth";
import Unauthorized from "./components/Auth/Unauthorized";
import { ROLES } from "./data/roles";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Settings from "./pages/Settings";
import Orders from "./pages/Orders";
import Baker from "./pages/Baker";
import Courier from "./pages/Courier";
import CourierTelegramBot from "./pages/CourierTelegramBot";
import BakerTelegramBot from "./pages/BakerTelegramBot";

function App() {
  const { onToggleButton, tg } = useTelegram();
  useEffect(() => {
    tg.ready();
  }, []);

  const location = useLocation();

  // https://www.yourwebsite.com/?source=telegram
  return (
    <>
      {location.search.includes("source=telegram_courier") ? (
        <>
          <Routes>
            <Route index element={<CourierTelegramBot />} />
            {/* <Route path={"form"} element={<Form />} /> */}
          </Routes>
        </>
      ) : location.search.includes("source=telegram_baker") ? (
        <>
          <Routes>
            <Route index element={<BakerTelegramBot />} />
            {/* <Route path={"form"} element={<Form />} /> */}
          </Routes>
        </>
      ) : location.search.includes("source=telegram") ? (
        <>
          <Routes>
            <Route index element={<ProductList />} />
            {/* <Route path={"form"} element={<Form />} /> */}
          </Routes>
        </>
      ) : (
        <>
          {/* // <BrowserRouter> */}
          <Navbar />
          <Routes>
            {/* <Route path="/" element={<Layout />} /> */}
            {/* public routes */}
            <Route path="login" element={<SignIn />} />
            <Route path="register" element={<SignUp />} />
            {/* <Route path="linkpage" element={<LinkPage />} /> */}
            {/* <Route path="unauthorized" element={<Unauthorized />} /> */}
            {/* <Route path="baker" element={<Baker />} /> */}
            {/* <Route path="courier" element={<Courier />} /> */}
            {/* we want to protect these routes */}
            <Route
              element={
                <RequireAuth allowedRoles={[ROLES.CUSTOMER, ROLES.ADMIN]} />
              }
            >
              <Route path="/" element={<Store />} />
            </Route>

            <Route
              element={
                <RequireAuth
                  allowedRoles={[
                    ROLES.ADMIN,
                    ROLES.CUSTOMER,
                    ROLES.BAKER,
                    ROLES.COURIER,
                  ]}
                />
              }
            >
              <Route path="store" element={<Store />} />
              <Route path="cart" element={<Cart />} />
              <Route path="orders" element={<Orders />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
              <Route path="admin" element={<Admin />} />
            </Route>

            <Route
              element={
                <RequireAuth allowedRoles={[ROLES.CUSTOMER, ROLES.ADMIN]} />
              }
            >
              {/* <Route path="about" element={<About />} /> */}
            </Route>

            <Route
              element={
                <RequireAuth allowedRoles={[ROLES.BAKER, ROLES.ADMIN]} />
              }
            >
              <Route path="baker" element={<Baker />} />
            </Route>

            <Route
              element={
                <RequireAuth allowedRoles={[ROLES.COURIER, ROLES.ADMIN]} />
              }
            >
              <Route path="courier" element={<Courier />} />
            </Route>

            {/* catch all */}
            <Route path="*" element={<Missing />} />
          </Routes>
          {/* // </BrowserRouter> */}
        </>
      )}
    </>
  );
}

export default App;
