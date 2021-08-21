import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";

const SuperDashboard = () => {
  const auth = useSelector((state) => state.auth);
  // Redirect to dashboard if authenticated
  if (auth.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <h1>Welcome to Super Admin Dashboard</h1>
    </Fragment>
  );
};

export default SuperDashboard;
