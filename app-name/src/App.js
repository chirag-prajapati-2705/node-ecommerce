import logo from "./logo.svg";
import "./App.css";
import MainComponent from "./components/MainComponent";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useParams,
  useNavigate,
} from "react-router-dom";

import Contact from "./Pages/Contact";
import NoPage from "./Pages/NoPage";
import Login from "./components/Login";
import Registration from "./components/Auth/Registration";
import Footer from "./Pages/Footer";
import Dashboard from "./modules/dashboard/dashboard";
import Sidebar from "./Layout/Sidebar";
import Header from "./Layout/Header";
import ProductList from "./modules/Product/ProductList";
import ProductCreate from "./modules/Product/ProductCreate";
import CategoryList from "./modules/Category/CategoryList";
import CategoryCreate from "./modules/Category/CategoryCreate";
import "./style.css";
import { useEffect, useState } from "react";
import axios from "axios";

import Front from "./Routes/Front";
import Admin from "./Routes/Admin";
import Navigation from "./Pages/Navigation";

function AppLogo() {
  return <img src={logo} className="App-logo" alt="logo" />;
}

function getToken() {
  const tokenString = window.localStorage.getItem("token");
  return tokenString;
}

function App() {
  const token = getToken();

  return (
    <div className="App">
      <div className="wrapper">
        <BrowserRouter>
          <Routes>
            <Route path="/admin/*" element={<Admin />} />
            <Route path="/*" element={<Front />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
