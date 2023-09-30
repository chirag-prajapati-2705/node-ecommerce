import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Yup from "yup";
import { redirect, useNavigate } from "react-router-dom";
import { useState } from "react";

async function signup(credentials) {
  return fetch("http://localhost:8080/customers/store", {
    method: "POST",
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

function AuthErrorMessage(props) {
  let template;
  if (props.message != "") {
    template = (
      <div className="alert alert-danger" role="alert">
        {props.message}
      </div>
    );
  }
  return template;
}

function CustomerSignup() {
  const navigate = useNavigate();
  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  };
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (values) => {
    let first_name = values.first_name;
    let last_name = values.last_name;
    let email = values.email;
    let password = values.password;
    try {
      const response = await signup({ email, password, first_name, last_name });
      if (response.user) {
        navigate("/login");
      }
      setErrorMessage(response.message);
    } catch (e) {
      console.log("catch");
      console.log(e);
    }
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("This Field is required"),
    last_name: Yup.string().required("This Field is required"),
    email: Yup.string().email().required("This Field is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password is too short - should be 6 chars minimum"),
    confirm_password: Yup.string()
      .required("Password is required")
      .min(8, "Password is too short - should be 6 chars minimum"),
  });

  return (
    <>
      <div className="Auth-form">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign Up</h3>
              <div className="form-group mt-3">
                <label htmlFor="first_name">First Name</label>
                <Field
                  type="text"
                  className="form-control mt-1"
                  id="first_name"
                  name="first_name"
                ></Field>
                <ErrorMessage
                  name="first_name"
                  component="span"
                  className="error"
                ></ErrorMessage>
              </div>
              <div className="form-group mt-3">
                <label htmlFor="last_name">Last name</label>
                <Field
                  type="text"
                  className="form-control mt-1"
                  id="last_name"
                  name="last_name"
                ></Field>
                <ErrorMessage
                  name="last_name"
                  component="span"
                  className="error"
                ></ErrorMessage>
              </div>
              <div className="form-group mt-3">
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  className="form-control mt-1"
                  id="email"
                  name="email"
                ></Field>
                <ErrorMessage
                  name="email"
                  component="span"
                  className="error"
                ></ErrorMessage>
              </div>
              <div className="form-group mt-3">
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  className="form-control mt-1"
                  name="password"
                  id="password"
                ></Field>
                <ErrorMessage
                  name="password"
                  component="span"
                  className="error"
                ></ErrorMessage>
              </div>
              <div className="form-group mt-3">
                <label htmlFor="confirm_password">Confirm Password</label>
                <Field
                  type="password"
                  className="form-control mt-1"
                  name="confirm_password"
                  id="confirm_password"
                ></Field>
                <ErrorMessage
                  name="confirm_password"
                  component="span"
                  className="error"
                ></ErrorMessage>
              </div>

              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary btn-block">
                  Sign up
                </button>
              </div>
            </div>
          </Form>
        </Formik>
        <AuthErrorMessage message={errorMessage}></AuthErrorMessage>
      </div>
    </>
  );
}

export default CustomerSignup;
