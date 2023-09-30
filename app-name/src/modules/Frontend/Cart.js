import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";

function getToken() {
  const tokenString = window.localStorage.getItem("customer-token");
  return tokenString;
}

const CartPage = (props) => {
  const navigate = useNavigate();

  const token = getToken();
  const [carts, setCarts] = useState({});
  const [cartItems, setcartItems] = useState({});

  const getCart = async (page) => {
    const cartData = await axios
      .get(`http://localhost:8080/cart`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error.response.data);
        return error;
      })
      .finally(function () {
        // always executed
      });

    if (!_.isUndefined(cartData.data.carts)) {
      setCarts(cartData.data.carts);
      setcartItems(cartData.data.carts[0].items);
    }
  };

  const productDetail = (product_slug) => {
    navigate("/product/" + product_slug);
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <div className="container">
      <h2>Cart Page</h2>
      <div className="row">
        <div className="col-xl-8">
          {carts.length > 0 &&
            cartItems.map((item) => (
              <div className="card border shadow-none" key={carts._id}>
                <div className="card-body">
                  <div className="d-flex align-items-start border-bottom pb-3">
                    <div className="me-4">
                      <img
                        src="https://www.bootdey.com/image/380x380/008B8B/000000"
                        alt=""
                        className="avatar-lg rounded"
                      />
                    </div>
                    <div className="flex-grow-1 align-self-center overflow-hidden">
                      <div>
                        <h5 className="text-truncate font-size-18">
                          <a
                            href={item.product_slug}
                            className="text-dark"
                            onClick={() => productDetail(item.product_slug)}
                          >
                            {item.product_name}
                          </a>
                        </h5>
                        <p className="text-muted mb-0">
                          <i className="bx bxs-star text-warning"></i>
                          <i className="bx bxs-star text-warning"></i>
                          <i className="bx bxs-star text-warning"></i>
                          <i className="bx bxs-star text-warning"></i>
                          <i className="bx bxs-star-half text-warning"></i>
                        </p>
                        <p className="mb-0 mt-1">
                          Sku : <span className="fw-medium">Gray</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex-shrink-0 ms-2">
                      <ul className="list-inline mb-0 font-size-16">
                        <li className="list-inline-item">
                          <a href="#" className="text-muted px-1">
                            <i className="mdi mdi-trash-can-outline"></i>
                          </a>
                        </li>
                        <li className="list-inline-item">
                          <a href="#" className="text-muted px-1">
                            <i className="mdi mdi-heart-outline"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="mt-3">
                          <p className="text-muted mb-2">Price</p>
                          <h5 className="mb-0 mt-2">${item.price}</h5>
                        </div>
                      </div>
                      <div className="col-md-5">
                        <div className="mt-3">
                          <p className="text-muted mb-2">Quantity</p>
                          <div className="d-inline-flex">
                            <select className="form-select form-select-sm w-xl">
                              <option value="1">1</option>
                              <option value="2" selected="">
                                2
                              </option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="mt-3">
                          <p className="text-muted mb-2">Total</p>
                          <h5>${item.total_price}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          <div className="row my-4">
            <div className="col-sm-6">
              <a href="/" className="btn btn-link text-muted">
                <i className="mdi mdi-arrow-left me-1"></i> Continue Shopping
              </a>
            </div>
            <div className="col-sm-6">
              <div className="text-sm-end mt-2 mt-sm-0">
                <a href="ecommerce-checkout.html" className="btn btn-success">
                  <i className="mdi mdi-cart-outline me-1"></i> Checkout
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4">
          <div className="mt-5 mt-lg-0">
            <div className="card border shadow-none">
              <div className="card-header bg-transparent border-bottom py-3 px-4">
                <h5 className="font-size-16 mb-0">
                  Order Summary <span className="float-end">#MN0124</span>
                </h5>
              </div>
              <div className="card-body p-4 pt-2">
                <div className="table-responsive">
                  <table className="table mb-0">
                    <tbody>
                      <tr>
                        <td>Sub Total :</td>
                        <td className="text-end">$ 780</td>
                      </tr>
                      <tr>
                        <td>Discount : </td>
                        <td className="text-end">- $ 78</td>
                      </tr>
                      <tr>
                        <td>Shipping Charge :</td>
                        <td className="text-end">$ 25</td>
                      </tr>
                      <tr>
                        <td>Estimated Tax : </td>
                        <td className="text-end">$ 18.20</td>
                      </tr>
                      <tr className="bg-light">
                        <th>Total :</th>
                        <td className="text-end">
                          <span className="fw-bold">$ 745.2</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
