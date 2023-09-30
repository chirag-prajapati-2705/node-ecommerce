import NoPage from "../Pages/NoPage";
import Login from "../components/Login";
import Registration from "../components/Auth/Registration";
import Footer from "../Pages/Footer";
import Dashboard from "../modules/dashboard/dashboard";
import Sidebar from "../Layout/Sidebar";
import Header from "../Layout/Header";
import ProductList from "../modules/Product/ProductList";
import ProductCreate from "../modules/Product/ProductCreate";
import CategoryList from "../modules/Category/CategoryList";
import CategoryCreate from "../modules/Category/CategoryCreate";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useParams,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function getToken() {
  const tokenString = window.localStorage.getItem("token");
  return tokenString;
}

const AdminRoutes = () => {
  const token = getToken();
  const [loggedIn, setloggedIn] = useState(false);
  const [user, setUser] = useState({});
  console.log(token);
  const getUsers = async () => {
    const response = await axios
      .get("http://localhost:8080/auth/profile/", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
      });

    if (typeof response != "undefined") {
      setUser(response.data.user);
    } else {
      setloggedIn(false);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  console.log(loggedIn);

  return (
    <>
      <Header />
      <Sidebar></Sidebar>
      <Routes>
        <Route exact={true} path="admin/" element={<Login />} />
        <Route exact={true} path="admin/login" element={<Login />} />
        <Route exact={true} path="amin/signup" element={<Registration />} />
      </Routes>
    </>
  );
};

export default AdminRoutes;
