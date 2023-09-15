import {BrowserRouter, Route, Link, Routes, Outlet} from 'react-router-dom';


import ProductList from "../modules/Product/ProductList";
import Dashboard from "../modules/dashboard/dashboard";
import Contact from "../Pages/Contact";
import ProductCreate from "../modules/Product/ProductCreate";
import Login from "../components/Login";
import Registration from "../components/Auth/Registration";
import NoPage from "../Pages/NoPage";


const Sidebar = (props) => {
    return (
        <>

            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <a href="index3.html" className="brand-link">
                    <img src={process.env.PUBLIC_URL + '/img/AdminLTELogo.png'} alt="AdminLTE Logo"
                         className="brand-image img-circle elevation-3"
                         style={{opacity: .8}}></img>
                    <span className="brand-text font-weight-light">Theme</span>
                </a>

                <div className="sidebar">
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <img src={process.env.PUBLIC_URL + '/img/user2-160x160.jpg'}
                                 className="img-circle elevation-2" alt="User Image"></img>
                        </div>
                        <div className="info">
                            <a className="d-block">{props.user.first_name} {props.user.last_name}</a>
                        </div>
                    </div>

                    <div className="form-inline">
                        <div className="input-group" data-widget="sidebar-search">
                            <input className="form-control form-control-sidebar" type="search" placeholder="Search"
                                   aria-label="Search"></input>
                            <div className="input-group-append">
                                <button className="btn btn-sidebar">
                                    <i className="fas fa-search fa-fw"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                        <nav className="mt-2">
                            <ul className="nav nav-pills nav-sidebar flex-column">
                                <li className="nav-item">
                                    <Link to="/dashboard" className="nav-link">Dashboard</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/contact" className="nav-link">Contact</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/product/list" className="nav-link">Product</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/category/list" className="nav-link">Category</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/menu" className="nav-link">Menu</Link>
                                </li>
                            </ul>
                        </nav>
                        {/*<Routes>*/}

                        {/*    <Route exact path="dashboard" element={<Dashboard/>}/>*/}
                        {/*    <Route exact path="contact" element={<Contact/>}/>*/}
                        {/*    <Route exact path="product/list" element={<ProductList/>}/>*/}
                        {/*    <Route exact path="product/create" element={<ProductCreate/>}/>*/}
                        {/*    <Route exact path="product/create" element={<ProductCreate/>}/>*/}
                        {/*</Routes>*/}





                </div>
            </aside>
        </>

    );
};

export default Sidebar;
