import logo from "./logo.svg";
import "./App.css";
import MainComponent from "./components/MainComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home'
import Contact from './Pages/Contact'
import NoPage from './Pages/NoPage'
import  Layout from './Pages/Layout'
import Login from './components/Login'
import Registration from './components/Auth/Registration'
import Footer from './Pages/Footer'




function AppLogo() {
  return <img src={logo} className="App-logo" alt="logo" />;
}

function App() {
  return (
    <div className="App">
      <header className="App-header mt-5">
        {/*<AppLogo></AppLogo>*/}
        {/*<MainComponent></MainComponent>*/}
        {/*<Login></Login>*/}
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route path="/"  element={<Login />} />
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<NoPage />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Registration />} />
            </Route>
          </Routes>
        </BrowserRouter>

        {/*<a*/}
        {/*  className="App-link"*/}
        {/*  href="https://reactjs.org"*/}
        {/*  target="_blank"*/}
        {/*  rel="noopener noreferrer"*/}
        {/*>*/}
        {/*  Learn React*/}
        {/*</a>*/}
      </header>
      <Footer></Footer>

    </div>
  );
}

export default App;
