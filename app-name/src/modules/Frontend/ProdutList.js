import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState({});
  const getProducts = async () => {
    const data = await axios
      .get(`http://localhost:8080/products/?all=true`)
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
      const product_data = data.data.products;
      setProducts(product_data);
    }
  };
  const productDetail = (product_slug) => {
    navigate("/product/" + product_slug);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className="py-5">
      <div className="container px-4 px-lg-5 mt-5">
        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
          {products.length > 0 &&
            products.map((product) => (
              <div className="col mb-5" key={product._id}>
                <div className="card h-100">
                  <a
                    href={product.product_slug}
                    onClick={() => productDetail(product.product_slug)}
                  >
                    <img
                      className="card-img-top"
                      src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
                      alt="..."
                    />
                  </a>
                  <div className="card-body p-4">
                    <div className="text-center">
                      <h5 className="fw-bolder">{product.product_name}</h5>
                      <p>{product.product_description}</p>
                      <p>${product.price}</p>
                    </div>
                  </div>

                  <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div className="text-center">
                      <a className="btn btn-outline-dark mt-auto" href="#">
                        Add to cart
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
