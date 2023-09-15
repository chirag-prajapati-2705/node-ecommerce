import {Formik, Form, Field, ErrorMessage, useFormik} from 'formik';
import "bootstrap/dist/css/bootstrap.min.css";
import * as Yup from 'yup';
import {redirect, useNavigate, Link} from "react-router-dom";
import {useState} from "react";
import _ from "lodash";
import axios from 'axios';


async function saveProduct(request_data) {
    return await axios.post('http://localhost:8080/products/store', request_data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (data) {
            return data;
        })
        .catch(function (error) {
            return error
        });

}

function AuthErrorMessage(props) {
    console.log(props.message);
    let template;
    if (!_.isUndefined(props.message) && !_.isEmpty(props.message)) {
        template = <div className="alert alert-danger" role="alert">
            {props.message}
        </div>
    }
    return (template)
}

const ProductCreate = () => {
    const navigate = useNavigate();
    const initialValues = {
        product_name: '',
        product_description: '',
        product_slug: '',
        status: false,
        price: '',
        quantity: ''
    };
    const [errorMessage, setErrorMessage] = useState('');
    const onSubmit = async values => {

        let data = {
            product_name: values.product_name,
            product_description: values.product_description,
            product_slug: values.product_slug,
            status: values.status,
            price: values.price,
            quantity: values.quantity
        }
        try {
            const response = await saveProduct(data);
            navigate('/product/list');
            setErrorMessage(response.message);
        } catch (e) {
            console.log('catch');
            console.log(e);
        }
    }

    const validationSchema = Yup.object().shape({
        product_name: Yup.string().required("This field is required"),
        product_slug: Yup.string().required("This field is required"),
    });

    return (
        <>
            <div className="content-wrapper">
                <section class="content">
                    <div class="container-fluid">
                        <div className='row'>
                            <div className="col-12">
                                <div className="card card-primary">
                                    <div className="card-header">
                                        <h3 className="card-title">Create Product</h3>
                                    </div>
                                    <Formik
                                        initialValues={initialValues}
                                        validationSchema={validationSchema}
                                        onSubmit={onSubmit}
                                    >
                                        <Form>
                                            <div className="card-body">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Name</label>
                                                    <Field type="text" className="form-control mt-1" id="product_name"
                                                           name="product_name"
                                                    ></Field>
                                                    <ErrorMessage name="product_name" component='span'
                                                                  className="error"></ErrorMessage>

                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputPassword1">Description</label>
                                                    <Field type="text-area" className="form-control mt-1"
                                                           id="product_description"
                                                           name="product_description"
                                                    ></Field>
                                                    <ErrorMessage name="product_description" component='span'
                                                                  className="error"></ErrorMessage>

                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputPassword1">Slug</label>
                                                    <Field type="text" className="form-control mt-1"
                                                           id="product_slug"
                                                           name="product_slug"
                                                    ></Field>
                                                    <ErrorMessage name="product_slug" component='span'
                                                                  className="error"></ErrorMessage>

                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputPassword1">Quantity</label>
                                                    <Field type="number" className="form-control mt-1"
                                                           id="quantity"
                                                           name="quantity"
                                                    ></Field>
                                                    <ErrorMessage name="quantity" component='span'
                                                                  className="error"></ErrorMessage>

                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputPassword1">Price</label>
                                                    <Field type="number" className="form-control mt-1"
                                                           id="price"
                                                           name="price"
                                                    ></Field>
                                                    <ErrorMessage name="price" component='span'
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
                                    </Formik>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </>);
};

export default ProductCreate;
