import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";
function getToken() {
  const tokenString = window.localStorage.getItem("customer-token");
  return tokenString;
}

const ProductDetail = (props) => {
  const navigate = useNavigate();
  const token = getToken();

  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState({});
  const { product_slug } = useParams();
  const getProduct = async (page) => {
    const data = await axios
      .post(`http://localhost:8080/products/get-by-slug/`, {
        params: { slug: product_slug },
      })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error;
      })
      .finally(function () {
        // always executed
      });

    if (!_.isUndefined(data.data) && !_.isEmpty(data.data)) {
      const product_data = data.data.product;
      setProduct(product_data);
      console.log(product_data.quantity);
      setQuantity(product_data.quantity);
    }
  };
  const addToCart = async (product) => {
    const data = await axios

      .post(
        `http://localhost:8080/cart/add-cart/`,
        {
          quantity: quantity,
          product_id: product._id,
        },
        { headers: { Authorization: "Bearer " + token } }
      )
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error;
      })
      .finally(function () {
        // always executed
      });

    console.log(data);

    if (!_.isUndefined(data.response) && !_.isUndefined(data.response.data) && data.response.data == "Unauthorized"
    ) {
      navigate("/login");
    }
  };

  const handleChange = (event) => {
    setQuantity(event.target.value);
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    // <div className="content-wrapper">
    //   <section className="content-header">
    //     <div className="container-fluid">
    //       <div className="row mb-2">
    //         <div className="col-sm-6">
    //           <h1>E-commerce</h1>
    //         </div>
    //         <div className="col-sm-6">
    //           <ol className="breadcrumb float-sm-right">
    //             <li className="breadcrumb-item">
    //               <a href="#">Home</a>
    //             </li>
    //             <li className="breadcrumb-item active">E-commerce</li>
    //           </ol>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    //   <section className="content">
    //     <div className="card card-solid">
    //       <div className="card-body">
    //         <div className="row">
    //           <div className="col-12 col-sm-6"></div>
    //           <div className="col-12 col-sm-6">
    //             <h3 className="my-3">{product.product_name} </h3>

    //             <div className="bg-gray py-2 px-3 mt-4">
    //               <h2 className="mb-0">${product.price} </h2>
    //               <h4 className="mt-0">
    //                 <small>Ex Tax: ${product.price} </small>
    //               </h4>
    //             </div>
    //             <p></p>
    //             <p></p>
    //             <p></p>
    //             <p>
    //               <input
    //                 type="number"
    //                 name="quantity"
    //                 defaultValue={product.quantity}
    //                 onChange={handleChange}
    //               />
    //             </p>

    //             <div className="mt-4">
    //               <div
    //                 className="btn btn-primary btn-lg btn-flat"
    //                 onClick={() => addToCart(product)}
    //               >
    //                 <i className="fas fa-cart-plus fa-lg mr-2"></i>
    //                 Add to Cart
    //               </div>
    //               <div className="btn btn-default btn-lg btn-flat">
    //                 <i className="fas fa-heart fa-lg mr-2"></i>
    //                 Add to Wishlist
    //               </div>
    //             </div>
    //             <div className="mt-4 product-share">
    //               <a href="#" className="text-gray">
    //                 <i className="fab fa-facebook-square fa-2x"></i>
    //               </a>
    //               <a href="#" className="text-gray">
    //                 <i className="fab fa-twitter-square fa-2x"></i>
    //               </a>
    //               <a href="#" className="text-gray">
    //                 <i className="fas fa-envelope-square fa-2x"></i>
    //               </a>
    //               <a href="#" className="text-gray">
    //                 <i className="fas fa-rss-square fa-2x"></i>
    //               </a>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    // </div>
    <section className="py-5">
      <div className="container px-4 px-lg-5 my-5">
        <div className="row gx-4 gx-lg-5 align-items-center">
          <div className="col-md-6">
            <img
              className="card-img-top mb-5 mb-md-0"
              src="https://dummyimage.com/600x700/dee2e6/6c757d.jpg"
              alt="..."
            />
          </div>
          <div className="col-md-6">
            <div className="small mb-1">SKU: {product.sku}</div>
            <h1 className="display-5 fw-bolder">{product.poduct_name}</h1>
            <div className="fs-5 mb-5">
              <span className="text-decoration-line-through">
                ${product.price}
              </span>
              {/* <span>$40.00</span> */}
            </div>
            <p className="lead">{product.product_description}</p>
            <div className="d-flex">
              <input
                className="form-control text-center me-3 qty-box"
                id="inputQuantity"
                type="num"
                style={{ maxWidth: "50px" }}
                defaultValue={product.quantity}
                onChange={handleChange}
              ></input>
              <button
                className="btn btn-outline-dark flex-shrink-0"
                type="button"
                onClick={() => addToCart(product)}
              >
                <i className="bi-cart-fill me-1"></i>
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
