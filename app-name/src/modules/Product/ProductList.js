import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from 'axios';

function ProductPagination(props) {
    console.log(props.currentPage)
    const elements = [<li key='0' className="page-item"><a className="page-link" href="#"
                                                           onClick={props.handlePrevPage}>«</a></li>];
    for (let i = 1; i <= props.total_pages; i++) {
        let active_class = (props.currentPage == i) ? 'page-link active' : 'page-link';
        elements.push(<li key={i} className="page-item"><a className={active_class} href="#"
                                                           onClick={props.handlePaginate}>{i}</a>
        </li>);
    }
    elements.push(<li key={props.total_pages + 1} className="page-item"><a className="page-link" href="#"
                                                                           onClick={props.handleNextPage}>»</a></li>);
    return <ul className="pagination pagination-sm float-right">{elements}</ul>;
}

const ProductList = () => {
    const navigate = useNavigate();

    const [products, setProducts] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const getProducts = async (page) => {
        const data = await axios.get(`http://localhost:8080/products/?page=${page}&pageSize=2`)
            .then(function (response) {
                return response
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
        const product_data = data.data.products;
        const totalPages = data.data.totalPages;
        setProducts(product_data);
        setTotalPages(totalPages);
    }
    const handlePaginate = (event) => {
        console.log(event.target.value);
        console.log(currentPage);
        setCurrentPage(currentPage + 1);
    }
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    const createproduct = () => {
        navigate('/product/create')
    }

    useEffect(() => {
        console.log('useEffect');
        getProducts(currentPage);
    }, [currentPage]);

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-1">
                            <h1>Product</h1>
                        </div>
                        <div className="col-sm-4">
                            <button type="button" className="btn btn-primary" onClick={createproduct}>Create</button>
                        </div>
                        <div className="col-sm-7">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
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
                                        <ProductPagination total_pages={totalPages}
                                                           currentPage={currentPage}
                                                           handlePrevPage={handlePrevPage}
                                                           handleNextPage={handleNextPage}
                                                           handlePaginate={handlePaginate}></ProductPagination>
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
                                                <td> {product.status ? 'Active' : 'Inactive'}</td>
                                                <td>
                                                    <Link to='/product/create'>Edit</Link>
                                                    <Link to='/product/delete' className='ml-2'>Delete</Link>
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
        </div>);
};

export default ProductList;
