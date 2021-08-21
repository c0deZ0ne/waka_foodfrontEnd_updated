import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../actions/auth";
import { connect } from "react-redux";
 import { START_LOAD } from "../actions/types";

const Login = ({ login }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: START_LOAD,
    });
    login(email, password);
  };
  // Redirect to dashboard if authenticated
  if (auth.isAuthenticated) {
    return <Redirect to="/kitchenDashboard" />;
  }
  return (
    <Fragment>
      <div className="heading">
        <h3 className="heading">WakaFoods</h3>
      </div>
      <div className="Form-body">
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="input-container">
            <label style={{color:"white"}}>Email</label>
            <br />
            <input
              className="main-input"
              type="email"
              placeholder="Enter your Email"
              name="email"
              value={email}
              required
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className="input-container">
            <label style={{color:"white"}}>Password</label>
            <br />
            <input
              className="main-input"
              type="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              required
              onChange={(e) => onChange(e)}
            />
          </div>
          <button type="submit"  className="Form-btn"> Login</button>
        </form>
      </div>
    </Fragment>
  );
};

export default connect(null, { login })(Login);
