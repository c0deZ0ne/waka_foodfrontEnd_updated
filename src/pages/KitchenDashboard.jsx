import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { showSuccess } from "../actions/alerts";
import {
  CLEAR_CATEGORIES,
  LOGOUT_SUCCESS,
  STOP_LOAD,
  START_LOAD,
} from "../actions/types";
import { Link } from "react-router-dom";
import SummaryContent from "../components/SummaryContent";
import { Menu, Avatar, Image } from "antd";
import { MenuUnfoldOutlined } from "@ant-design/icons";

const KitchenDashboard = () => {
  //  Getting states calling states....
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  // Routes
  const [path, setPath] = useState("dashboard");

  // useEffect
  useEffect(() => {
    dispatch({
      type: START_LOAD,
    });
    setTimeout(() => {
      dispatch({
        type: STOP_LOAD,
      });
    }, 1000);
  }, [path]);

  // self count
  const [count, setcount] = useState(1);
  const [count1, setcount1] = useState(15);
  const [count2, setcount2] = useState(9);
  // setInterval(() => {
  //   setcount(count + 1);
  //   setcount1(count1 - 1);
  //   setcount2(count2 + 1);
  // }, 1000);

  //  Logout func
  const logout = () => {
    dispatch({
      type: LOGOUT_SUCCESS,
    });
    // clear foods
    dispatch({
      type: CLEAR_CATEGORIES,
    });
    // throw alert
    dispatch(showSuccess("Goodbye..."));
  };

  // Destructing Menu
  // submenu keys of first level
  const rootSubmenuKeys = ["sub1", "sub2", "sub4"];
  const { SubMenu } = Menu;
  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  // Redirect to dashboard if authenticated
  if (!auth.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <div className="nav-bar">
        <div className="navbar0"></div>
        <div className="navbar1">
          <form action="">
            <input type="text" name="search" placeholder="Search Here.." />
            <button type="submit">
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>
        <div className="navbar2"></div>
        <div className="navbar3">
          <div className="icon" style={{ cursor: "pointer" }}>
            <i id="bell" className="far fa-bell"></i>
            <div className="bell numbers">
              <p>{count}</p>
            </div>
          </div>
          <div className="icon" style={{ cursor: "pointer" }}>
            <i id="chat" className="far fa-comment-alt"></i>
            <div className="chat numbers">
              <p>{count1}</p>
            </div>
          </div>

          <div className="icon" style={{ cursor: "pointer" }}>
            <i id="gift" className="fas fa-gift"></i>
            <div className="gift numbers">
              <p>{count2}</p>
            </div>
          </div>
          <div className="icon" style={{ cursor: "pointer" }}>
            <i id="cog" className="fas fa-cog"></i>
            <div className=" cog numbers">
              <p>!</p>
            </div>
          </div>
          <a
            className="btn btn-danger "
            style={{ flex: 1, marginLeft: "10px" }}
            onClick={() => logout()}
          >
            Logout
          </a>

          {/* Navbar start */}
          <div className="welcome">
            <div className="on">
              <p>
                Hello, <strong> {auth.last_name}</strong>
              </p>
              <div className="box">
                <Avatar
                  src={
                    <Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* navbar end */}
      {/* sidebar start */}
      <div className=" sidebar">
        <div className="sider0">
          <h2>WakaFoods</h2>
          <i className="fas fa-bars"></i>
          <Link to="/"></Link>
        </div>
        <div
          className={`side sider1 ${path == "dashboard" && "active"}`}
          style={{ cursor: "pointer" }}
          onClick={() => setPath("dashboard")}
        >
          <i className="fas fa-tachometer-alt"></i>
          <div className="menu">
            <p>Dashboard</p>
          </div>
        </div>

        <Menu
          mode="inline"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          style={{ width: 273 }}
        >
          <SubMenu
            key="sub1"
            icon={<MenuUnfoldOutlined />}
            title="Kitchen"
            style={{ marginLeft: "5px" }}
          >
            <Menu.Item key="1">
              <div
                className={`side sider1 ${path === "categories" && "active"}`}
                style={{ cursor: "pointer" }}
                onClick={() => setPath("categories")}
              >
                <i className="fas fa-tachometer-alt"></i>
                <div className="menu">
                  <p>Categories</p>
                </div>
              </div>
            </Menu.Item>
            <Menu.Item key="2">
              <div
                className={`side sider1 ${path === "subcategories" && "active"}`}
                style={{ cursor: "pointer" }}
                onClick={() => setPath("subcategories")}
              >
                <i className="fas fa-tachometer-alt"></i>
                <div className="menu">
                  <p>Sub-Categories</p>
                </div>
              </div>
            </Menu.Item>
            <Menu.Item key="3">
              <div
                className={`side sider1 ${path === "steps" && "active"}`}
                style={{ cursor: "pointer" }}
                onClick={() => setPath("steps"),()=>{console.log("dispatch get steps")} }
              >
                <i className="fas fa-tachometer-alt"></i>
                <div className="menu">
                  <p>Steps</p>
                </div>
              </div>
            </Menu.Item>
            <Menu.Item key="4">
              <div
                className={`side sider1 ${path === "foods" && "active"}`}
                style={{ cursor: "pointer" }}
                onClick={() => setPath("foods")}
              >
                <i className="fas fa-tachometer-alt"></i>
                <div className="menu">
                  <p>Foods</p>
                </div>
              </div>
            </Menu.Item>
          </SubMenu>
        </Menu>
        <div
          className="side sider2"
          style={{ cursor: "pointer" }}
          onClick={() => setPath("orders")}
        >
          <i className="far fa-calendar-minus"></i>
          <div className="menu">
            <p>Orders</p>
            <div className="badge primary">
              <p>12</p>
            </div>
          </div>
        </div>
        <div id="sider">
          <div className="side3 side">
            <i className="far fa-list-alt"></i>
            <div className="menu">
              <p>Menus</p>
            </div>
            <i id="drop1" className="fas fa-angle-right"></i>
            <i id="drop2" className="fas fa-angle-down"></i>
          </div>
          <div className="sub-menu" id="menus"></div>
        </div>

        <div id="sider">
          <div className="side3 side">
            <i className="fas fa-users"></i>
            <div className="menu">
              <p>Customer</p>
            </div>
            <i id="drop3" className="fas fa-angle-right"></i>
            <i id="drop4" className="fas fa-angle-down"></i>
          </div>
          <div className="sub-menu" id="customer">
            <li className="">
              <Link to="/">Add </Link>
            </li>
            <li className="">
              <Link to="#">Create Customer</Link>
            </li>
            <li className="">
              <Link to="#">General Customer</Link>
            </li>
          </div>
        </div>
        <div id="sider">
          <div className="side3 side">
            <i className="far fa-compass"></i>
            <div className="menu">
              <p>Location</p>
            </div>
            <i id="drop7" className="fas fa-angle-right"></i>
            <i id="drop8" className="fas fa-angle-down"></i>
          </div>
          <div className="sub-menu" id="location">
            <li>
              <Link to="#">Add New</Link>
            </li>

            <li>
              <Link to="#">Locations</Link>
            </li>
          </div>
        </div>
        <div className="side sider3 ">
          <i className="fas fa-chart-line"></i>
          <div className="menu">
            <li>Analysis </li>
          </div>
          <i id="drop5" className="fas fa-angle-right"></i>
          <i id="drop6" className="fas fa-angle-down"></i>
        </div>
        <div className="footer">
          <p>
            WakaFoods LTD.
            <br />© 2021 allright reserved
          </p>
        </div>
      </div>
      {/* sidebar end */}

      {/* content starts , props is being passed in*/}
      <div id="container">
        <SummaryContent path={path}/>
          
         
        

      </div>
      {/* content end */}
    </Fragment>
  );
};
export default KitchenDashboard;
