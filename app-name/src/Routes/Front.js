import FrontProductList from "../modules/Frontend/ProdutList";
import ProductDetail from "../modules/Frontend/ProductDetail";
import CustomerLogin from "../modules/Frontend/CustomerLogin";
import Header from "../modules/Frontend/Header";
import Footer from "../modules/Frontend/Footer";
import AboutUs from "../Pages/About";
import CustomerSignup from "../modules/Frontend/CustomerRegister";
import CartPage from "../modules/Frontend/Cart";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useParams,
  useNavigate,
} from "react-router-dom";

const FrontEndRoutes = () => {
  console.log("Hello");
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<FrontProductList />} />
        <Route path="/product-list" element={<FrontProductList />} />
        <Route path="/product/:product_slug" element={<ProductDetail />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/cart" element={<CartPage />} />
        <Route exact={true} path="/login" element={<CustomerLogin />} />

        <Route
          exact={true}
          path="/customer-signup"
          element={<CustomerSignup />}
        />
      </Routes>
      <Footer />
    </>
  );
};

export default FrontEndRoutes;
