const Home = () => {
  return <h1>Home</h1>;
  {
    /* <BrowserRouter>
          {token && (
            <>
              {/* <Header />
              <Sidebar user={user}></Sidebar> */
  }
  {
    /* </>
          )}

          <Routes>
            <Route path="/product-list" element={<FrontProductList />} />
            <Route path="/product/:product_slug" element={<ProductDetail />} />
            <Route exact={true} path="/login" element={<CustomerLogin />} />
            {token && (
              <>
                <Route exact={true} path="admin/" element={<Dashboard />} />
                <Route
                  exact={true}
                  path="admin/contact"
                  element={<Contact />}
                />
                <Route
                  exact={true}
                  path="admin/product/list"
                  element={<ProductList />}
                />
                <Route
                  exact={true}
                  path="admin/product/create"
                  element={<ProductCreate />}
                />
                <Route
                  exact={true}
                  path="admin/category/create"
                  element={<CategoryCreate />}
                />
                <Route
                  exact={true}
                  path="admin/category/list"
                  element={<CategoryList />}
                />
              </>
            )}
            {!token && (
              <>
                <Route exact={true} path="/admin/" element={<Login />} />
                <Route exact={true} path="admin/login" element={<Login />} />
                <Route
                  exact={true}
                  path="forgot-password"
                  element={<ForgotPassword />}
                />
                <Route
                  exact={true}
                  path="amin/signup"
                  element={<Registration />}
                />
              </>
            )}
            <Route path="*" element={<NoPage />} />
          </Routes>
          <Outlet />
          {token && (
            <>
              <Footer></Footer>
            </>
          )}
        </BrowserRouter> */
  }
};

export default Home;
