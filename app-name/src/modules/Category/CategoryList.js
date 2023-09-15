import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from 'axios';
import _ from "lodash";

function CategoryPagination(props) {
    console.log('---------props.total_pages----------',props.total_pages);
    if(props.total_pages <= 1)
    {
        return
    }
    const elements = [<li key='0' className="page-item"><a className="page-link" href="#" onClick={props.handlePrevPage}>«</a></li>];
    for (let i = 1; i <= props.total_pages; i++) {
        console.log('------------props.currentPage----------',props.currentPage);
        let active_class = (props.currentPage + 1 == i) ? 'page-link active' : 'page-link';
        elements.push(<li key={i} className="page-item"><a className={active_class} href="#"
                                                           onClick={() => props.handlePaginate(i)}>{i}</a>
        </li>);
    }
    elements.push(<li key={props.total_pages + 1} className="page-item"><a className="page-link" href="#"
                                                                           onClick={props.handleNextPage}>»</a></li>);
    return <ul className="pagination pagination-sm float-right">{elements}</ul>;
}

const CategoryList = () => {
    let limit =15;
    const navigate = useNavigate();
    const [categories, setCategories] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const getCategories = async (page) => {
        const data = await axios.get(`http://localhost:8080/categories/?limit=${limit}&skip=${page}`)
            .then(function (response) {
                return response
            })
            .catch(function (error) {
                return error
            })
            .finally(function () {
                // always executed
            });

        if (!_.isUndefined(data.data) && !_.isEmpty(data.data)) {
            const category_data = data.data.categories;
            const totalPages = data.data.totalPages;
            setCategories(category_data);
            setTotalPages(totalPages);
        }
    }
    const handlePaginate = (value) => {
        console.log(value);
        setCurrentPage(value-1);
    }
    const handlePrevPage = () => {
        console.log('----------handlePrevPage--------------',currentPage)
        if (currentPage >= 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    const createCategory = () => {
        navigate('/category/create')
    }
    const editCategory = () => {
        navigate('/category/edit/')
    }
    const deleteCategory = (category_id) => {
        axios.delete(`http://localhost:8080/categories/delete/${category_id}`)
            .then(response => {
                console.log(`Category has been successfully deleted post with ID ${category_id}`);
                navigate('/category/list')

            })
            .catch(error => {
                console.error(error);
            });

    }
    useEffect(() => {
        getCategories(currentPage);
    }, [currentPage]);

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-1">
                            <h1>Category</h1>
                        </div>
                        <div className="col-sm-4">
                            <button type="button" className="btn btn-primary" onClick={createCategory}>Create</button>
                        </div>
                        <div className="col-sm-7">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Category</li>
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
                                    <h3 className="card-title">Category</h3>

                                    <div className="card-tools">
                                        <CategoryPagination total_pages={totalPages}
                                                           currentPage={currentPage}
                                                           handlePrevPage={handlePrevPage}
                                                           handleNextPage={handleNextPage}
                                                           handlePaginate={handlePaginate}></CategoryPagination>
                                    </div>
                                </div>
                                <div className="card-body p-0 product-listing">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Slug</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {categories.length > 0 &&
                                        categories.map((category) => (
                                            <tr key={category._id}>
                                                <td> {category.category_name}</td>
                                                <td> {category.category_slug}</td>
                                                <td> {category.status ? 'Active' : 'Inactive'}</td>
                                                <td>
                                                    <Link to='/category/create' onClick={editCategory}>Edit</Link>
                                                    <Link to='/category/delete' className='ml-2' onClick={()=>deleteCategory(category._id)}>Delete</Link>
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

export default CategoryList;
