import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";

function ProductPagination(props) {
  const elements = [
    <li key="0" className="page-item">
      <a className="page-link" href="#" onClick={props.handlePrevPage}>
        «
      </a>
    </li>,
  ];
  console.log(props.total_pages);
  if (props.total_pages <= 1) {
    return;
  }
  console.log("yesss");
  for (let i = 1; i <= props.total_pages; i++) {
    let active_class =
      props.currentPage == i ? "page-link active" : "page-link";
    elements.push(
      <li key={i} className="page-item">
        <a
          className={active_class}
          href="#"
          onClick={() => props.handlePaginate(i)}
        >
          {i}
        </a>
      </li>
    );
  }
  elements.push(
    <li key={props.total_pages + 1} className="page-item">
      <a className="page-link" href="#" onClick={props.handleNextPage}>
        »
      </a>
    </li>
  );
  return <ul className="pagination pagination-sm float-right">{elements}</ul>;
}

const ProductList = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const getProducts = async (page) => {
    const data = await axios
      .get(`http://localhost:8080/products/?page=${page}&pageSize=1`)
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
      const totalPages = data.data.totalPages;
      setProducts(product_data);
      setTotalPages(totalPages);
    }
  };
  const handlePaginate = (value) => {
    console.log(value);
    setCurrentPage(value);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const createproduct = () => {
    navigate("/product/create");
  };
  const deleteProduct = (product_id) => {
    axios
      .delete(`http://localhost:8080/products/delete/${product_id}`)
      .then((response) => {
        console.log(response.data);
        navigate("/product/list");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getProducts(currentPage);
  }, [currentPage]);

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-2">
              <h1>Product</h1>
            </div>
            <div className="col-sm-4">
              <button
                type="button"
                className="btn btn-primary"
                onClick={createproduct}
              >
                Create
              </button>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active">Product</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Product</h3>

                  <div className="card-tools">
                    <ProductPagination
                      total_pages={totalPages}
                      currentPage={currentPage}
                      handlePrevPage={handlePrevPage}
                      handleNextPage={handleNextPage}
                      handlePaginate={handlePaginate}
                    ></ProductPagination>
                  </div>
                </div>
                <div className="card-body p-0 product-listing">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.length > 0 &&
                        products.map((product) => (
                          <tr key={product._id}>
                            <td> {product.product_name}</td>
                            <td> {product.product_slug}</td>
                            <td> {product.quantity}</td>
                            <td> ${product.price}</td>
                            <td> {product.status ? "Active" : "Inactive"}</td>
                            <td>
                              <Link to="/product/create">Edit</Link>
                              <Link
                                to="/product/delete"
                                className="ml-2"
                                onClick={() => deleteProduct(product._id)}
                              >
                                Delete
                              </Link>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductList;
