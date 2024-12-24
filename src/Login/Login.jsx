import React, { useState, useContext } from "react";
import UserAPI from "../API/UserAPI";
import { AuthContext } from "../Context/AuthContext";
import "./Login.css";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error, dispatch } = useContext(AuthContext);
  const history = useHistory();

  const handleSubmit = async () => {
    try {
      // Gửi yêu cầu login với email và password
      const response = await UserAPI.postLogin({ email, password });

      if (response.token) {
        // Lưu token vào cookie
        Cookies.set("tokena", response.token, {
          path: "/",
          secure: true,
          sameSite: "None",
          expires: 7,
        });

        // Dispatch action với token
        dispatch({ type: "LOGIN_SUCCESS", payload: response.token });

        // Redirect to the home page ("/") using history.push
        history.push("/");
      } else {
        alert("Email or password is incorrect!");
      }
    } catch (error) {
      console.log("Invalid email or password");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-breadcrumb">
        <div className="row">
          <div className="login">
            <div className="heading">
              <h2>Sign in</h2>
              <form action="#">
                <div className="input-group input-group-lg">
                  <span className="input-group-addon">
                    <i className="fa fa-envelope"></i>
                  </span>
                  <input
                    type="email" // Email input field
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="input-group input-group-lg">
                  <span className="input-group-addon">
                    <i className="fa fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button type="button" className="float" onClick={handleSubmit}>
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
