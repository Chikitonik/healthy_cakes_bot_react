import { useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { useTelegram } from "./hooks/useTelegram";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

function App() {
  const { onToggleButton, tg } = useTelegram();
  useEffect(() => {
    tg.ready();
  }, []);

  //   return (
  //       {/* <Header />
  //       <Routes>
  //         <Route index element={<ProductList />} />
  //         <Route path={"form"} element={<Form />} />
  //       </Routes> */}
  //   {/* <SignUp /><SignIn /> */}
  //   )
  // }
  return (
    <>
      {/* // <BrowserRouter> */}
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Layout />} /> */}
        {/* public routes */}
        <Route path="login" element={<SignIn />} />
        <Route path="register" element={<SignUp />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="store" element={<Store />} />
        <Route path="cart" element={<Cart />} />
        <Route path="settings" element={<Settings />} />
        <Route path="orders" element={<Orders />} />
        <Route path="baker" element={<Baker />} />
        {/* we want to protect these routes */}
        <Route
          element={<RequireAuth allowedRoles={[ROLES.CUSTOMER, ROLES.ADMIN]} />}
        >
          <Route path="/" element={<Store />} />
        </Route>

        {/* <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}> */}
        {/* <Route path="editor" element={<Editor />} /> */}
        {/* </Route> */}

        <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        <Route
          element={<RequireAuth allowedRoles={[ROLES.CUSTOMER, ROLES.ADMIN]} />}
        >
          <Route path="about" element={<About />} />
        </Route>
        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Routes>
      {/* // </BrowserRouter> */}
    </>
  );
}

export default App;
