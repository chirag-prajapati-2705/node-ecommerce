import { redirect, useNavigate, Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div classNameName="login-page">
      <div classNameName="login-box">
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <h2>Forgot Password</h2>
          </div>
          <div className="card-body">
            <p className="login-box-msg">
              You forgot your password? Here you can easily retrieve a new
              password.
            </p>
            <form action="recover-password.html" method="post">
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                ></input>
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope"></span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <button type="submit" className="btn btn-primary btn-block">
                    Request new password
                  </button>
                </div>
              </div>
            </form>
            <p className="mt-3 mb-1">
              <a href="login.html"></a>
              <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
