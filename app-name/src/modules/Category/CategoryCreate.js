import {Formik, Form, Field, ErrorMessage, useFormik} from 'formik';
import "bootstrap/dist/css/bootstrap.min.css";
import * as Yup from 'yup';
import {redirect, useNavigate, Link} from "react-router-dom";
import {useEffect, useState} from "react";
import _ from "lodash";
import axios from 'axios';


async function saveCategory(request_data) {
    return await axios.post('http://localhost:8080/categories/store', request_data)
        .then(function (data) {
            return data;
        })
        .catch(function (error) {
            return error
        });

}


const CategoryCreate = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    categories.push({_id: 0, category_name: 'Please Select'});
    console.log(categories.length)
    const getCategories = async (page) => {
        const data = await axios.get(`http://localhost:8080/categories/?all=true`)
            .then(function (response) {
                return response
            })
            .catch(function (error) {
                return error
            })
            .finally(function () {
                // always executed
            });

        console.log(data.data);
        if (!_.isUndefined(data.data) && !_.isEmpty(data.data.categories)) {
            const category_data = data.data.categories;
            console.log('category_data')
            setCategories(category_data);
        }
    }

    useEffect(() => {
        getCategories();

    }, []);

    const initialValues = {
        category_name: '',
        category_description: '',
        category_slug: '',
        status: false,
        parent_id:0
    };
    const [errorMessage, setErrorMessage] = useState('');
    const onSubmit = async values => {

        let data = {
            category_name: values.category_name,
            category_description: values.category_description,
            category_slug: values.category_slug,
            status: values.status,
            parent_id:values.parent_category
        }
        try {
            const response = await saveCategory(data);
            console.log(response);
            navigate('/category/list');
            setErrorMessage(response.message);
        } catch (e) {
            console.log('catch');
            console.log(e);
        }
    }

    const validationSchema = Yup.object().shape({
        category_name: Yup.string().required("This field is required"),
        category_slug: Yup.string().required("This field is required"),
    });

    return (
        <>
            <div className="content-wrapper">
                <section className="content">
                    <div className="container-fluid">
                        <div className='row'>
                            <div className="col-12">
                                <div className="card card-primary">
                                    <div className="card-header">
                                        <h3 className="card-title">Create Category</h3>
                                    </div>
                                    <Formik
                                        initialValues={initialValues}
                                        validationSchema={validationSchema}
                                        onSubmit={onSubmit}
                                    >
                                        {({touched, errors}) => (
                                            <Form>
                                                <div className="card-body">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Name</label>
                                                        <Field type="text"
                                                               id="category_name"
                                                               name="category_name"
                                                               className={`form-control mt-1 ${touched.category_name && errors.category_name ? ' is-invalid' : ''}`}
                                                        ></Field>
                                                        <ErrorMessage name="category_name" component='span'
                                                                      className="error"></ErrorMessage>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputPassword1">Slug</label>
                                                        <Field type="text"
                                                               id="category_slug"
                                                               className={`form-control mt-1 ${touched.category_slug && errors.category_slug ? ' is-invalid' : ''}`}
                                                               name="category_slug"
                                                        ></Field>
                                                        <ErrorMessage name="category_slug" component='span'
                                                                      className="error"></ErrorMessage>

                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputPassword1">Parent Category</label>
                                                        <Field name="parent_category" as="select"
                                                               className='form-control'>
                                                            {categories.length > 0 &&
                                                            categories.map((category) => (
                                                                <option key={category._id}
                                                                        value={category._id}>{category.category_name}</option>
                                                            ))}
                                                        </Field>
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputPassword1">Description</label>
                                                        <Field type="text-area" className="form-control mt-1"
                                                               id="category_description"
                                                               name="category_description"
                                                        ></Field>
                                                        <ErrorMessage name="category_description" component='span'
                                                                      className="error"></ErrorMessage>

                                                    </div>

                                                    <div className="form-check">
                                                        <Field type="checkbox" className="form-check-input"
                                                               id="exampleCheck1"
                                                               name="status"
                                                        ></Field>
                                                        <label className="form-check-label" htmlFor="exampleCheck1">Is
                                                            Active</label>


                                                    </div>
                                                </div>

                                                <div className="card-footer">
                                                    <button type="submit" className="btn btn-primary">Submit</button>
                                                </div>
                                            </Form>
                                        )}

                                    </Formik>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </>);
};

export default CategoryCreate;
