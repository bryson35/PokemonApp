import React, { useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Cookies from "js-cookie";

const AuthApi = React.createContext();
const TokenApi = React.createContext();

function App(props) {
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState("");

  const Auth = React.useContext(AuthApi);
  const readCookie = () => {
    let token = Cookies.get("token");
    if (token) {
      setAuth(true);
      setToken(token);
    }
  };
  React.useEffect(() => {
    readCookie();
  }, []);

  return (
    <AuthApi.Provider value={{ auth, setAuth }}>
      <TokenApi.Provider value={{ token, setToken }}>
        <Router>
          <div className="App">
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
              <div className="container">
                <Link className="navbar-brand" to={"/sign-in"}>
                  Pokemon App
                </Link>
                <div
                  className="collapse navbar-collapse"
                  id="navbarTogglerDemo02"
                >
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link className="nav-link" to={"/sign-in"}>
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/sign-up"}>
                        Sign up
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>

            <div className="auth-wrapper">
              <div className="auth-inner">
                <Routes>
                  <Route exact path="/" element={<Login auth={AuthApi} />} />
                  <Route
                    path="/sign-in"
                    auth={Auth}
                    element={<Login auth={AuthApi} />}
                  />
                  <Route path="/sign-up" auth={Auth} element={<SignUp />} />
                </Routes>
              </div>
            </div>
          </div>
        </Router>
      </TokenApi.Provider>
    </AuthApi.Provider>
  );
}

export default App;
