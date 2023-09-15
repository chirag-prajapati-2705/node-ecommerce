import logo from "./logo.svg";
import "./App.css";
import MainComponent from "./components/MainComponent";
import {BrowserRouter, Routes, Route, Outlet, useParams} from "react-router-dom";
import Home from './Pages/Home'
import Contact from './Pages/Contact'
import NoPage from './Pages/NoPage'
import Layout from './Pages/Layout'
import Login from './components/Login'
import Registration from './components/Auth/Registration'
import Footer from './Pages/Footer'
import Dashboard from "./modules/dashboard/dashboard";
import Sidebar from "./Layout/Sidebar";
import Header from "./Layout/Header";
import ProductList from "./modules/Product/ProductList";
import ProductCreate from "./modules/Product/ProductCreate";
import CategoryList from "./modules/Category/CategoryList";
import CategoryCreate from "./modules/Category/CategoryCreate";
import './style.css'
import {useEffect, useState} from "react";
import axios from "axios";

function AppLogo() {
    return <img src={logo} className="App-logo" alt="logo"/>;
}

function getToken() {
    const tokenString = window.localStorage.getItem('token');
    return tokenString
}

function App() {
    const token = getToken();
    const [user, setUser] = useState({});
    useEffect(() => {
        const getUsers = async () => {
            const response =  await axios.get('http://localhost:8080/auth/profile/',{ headers: {'Authorization': 'Bearer '+token}})
                .then((response) => {
                    return response;

                })
                .catch((error) => {
                    console.log(error);
                });
            setUser(response.data.user);
        };

        getUsers();

    }, []);




    return (
        <div className="App">
            <div className="wrapper">
                <BrowserRouter>
                    {token && (
                        <>
                            <Header/>
                            <Sidebar user={user}></Sidebar>
                        </>
                    )}

                    <Routes>
                        {/*<Route path="/" element={<Sidebar />}>*/}
                        {token && (
                            <>
                                <Route exact={true} path="/" element={<Dashboard/>}/>
                                <Route exact={true} path="contact" element={<Contact/>}/>
                                <Route exact={true} path="product/list" element={<ProductList/>}/>
                                <Route exact={true} path="product/create" element={<ProductCreate/>}/>
                                <Route exact={true} path="category/create" element={<CategoryCreate/>}/>
                                <Route exact={true} path="category/list" element={<CategoryList/>}/>
                            </>
                        )} {!token && (
                        <>
                            <Route exact={true} path="/" element={<Login/>}/>
                            <Route exact={true} path="login" element={<Login/>}/>
                            <Route exact={true} path="signup" element={<Registration/>}/>
                        </>
                    )}
                        <Route path="*" element={<NoPage/>}/>
                        {/*</Route>*/}
                    </Routes>
                    <Outlet/>
                    {token && (
                        <>
                            <Footer></Footer>

                        </>
                    )}

                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
