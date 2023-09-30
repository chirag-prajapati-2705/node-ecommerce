import { BrowserRouter, Route, Link, Routes, Outlet } from "react-router-dom";

function HomePageImage() {
  return (
    <header className="bg-dark py-5">
      <div className="container px-4 px-lg-5 my-5">
        <div className="text-center text-white">
          <h1 className="display-4 fw-bolder">Shop in style</h1>
          <p className="lead fw-normal text-white-50 mb-0">
            With this shop hompeage template
          </p>
        </div>
      </div>
    </header>
  );
}

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container px-4 px-lg-5">
          <Link to="/" className="navbar-brand">
            Start Bootstrap
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
              <li className="nav-item">
                <Link to="/" className="nav-link active">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="about-us/" className="nav-link">
                  About
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  to="about-us/"
                  id="navbarDropdown"
                  className="nav-link dropdown-toggle"
                >
                  Shop
                </Link>

                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="#!">
                      All Products
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#!">
                      Popular Items
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#!">
                      New Arrivals
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <form className="d-flex">
              <button className="btn btn-outline-dark" type="submit">
                <i className="bi-cart-fill me-1"></i>
                Cart
                <span className="badge bg-dark text-white ms-1 rounded-pill">
                  0
                </span>
              </button>
            </form>

            <ul className="navbar-nav ml-2">
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Signup
              </Link>
              {/* <Link to="/cart" className="nav-link">
                Signup
              </Link> */}
            </ul>
          </div>
        </div>
      </nav>

      <HomePageImage></HomePageImage>
    </>
  );
};

export default Header;
