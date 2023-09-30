import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Yup from "yup";
import { redirect, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import _ from "lodash";
import axios from "axios";

async function customerLogin(credentials) {
  return await axios
    .post("http://localhost:8080/customer-login", credentials)
    .then(function (data) {
      return data;
    })
    .catch(function (error) {
      return error;
    });
}

function CustomerLogin() {
  const navigate = useNavigate();
  const initialValues = { email: "", password: "" };
  const [errorMessage, setErrorMessage] = useState("");
  const onSubmit = async (values) => {
    let email = values.email;
    let password = values.password;
    try {
      const response = await customerLogin({ email, password });
      console.log(response.data.token);
      let token =
        !_.isUndefined(response.data.token) && !_.isEmpty(response.data.token)
          ? response.data.token
          : null;
      if (token) {
        window.localStorage.setItem("customer-token", token);
        window.localStorage.setItem("customer-loggedIn", true);
        navigate(-1);
      }
      setErrorMessage(response.message);
    } catch (e) {
      console.log("catch");
      console.log(e);
    }
  };

  const validate = (values) => {
    let errors = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Required";
    }

    if (!values.password) {
      errors.password = "Cannot be blank";
    } else if (values.password.length < 8) {
      errors.password = "Password must be more than 8 characters";
    }
    console.log(errors);

    return errors;
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(4, "Password is too short - should be 6 chars minimum"),
  });
  return (
    <>
      <div className="Auth-form">
        {/*<errorMessages message={errorMessage}></errorMessages>*/}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Login In</h3>
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
                <ErrorMessage name="password" className="error"></ErrorMessage>
              </div>

              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary btn-block">
                  Login
                </button>
              </div>
            </div>
            <div className="sign-up">
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
            <div className="sign-up">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
}

export default CustomerLogin;
