import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import KitchenDashboard from "./pages/KitchenDashboard";
import SuperDashboard from "./pages/SuperDashboard";
import Login from "./pages/Login";
import { Provider } from "react-redux";
import Layout from "./hocs/Layout";
import React from "react";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";


// import all css
import "./css/main.css";
import "antd/dist/antd.css";
import './Styles/Main.css';


function App() {
  return (
    <Provider store={store}>
      {/* persist store on refresh */}
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Layout>
            <Switch>
              <Route exact path="/" component={Login} />
              {/* All kitchen admin */}
              <Route
                exact
                path="/kitchenDashboard"
                component={KitchenDashboard}
              />
              {/* super admin */}
              <Route exact path="/super" component={SuperDashboard} />
            </Switch>
          </Layout>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
