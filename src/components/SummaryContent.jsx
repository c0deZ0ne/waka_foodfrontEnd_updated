import React, { Fragment, useState} from "react";
import {  START_LOAD, STOP_LOAD } from "../actions/types";
import Category_list from "../components/Category_list";
import {
  Popconfirm,
  message,
  Collapse,
  Breadcrumb,
  PageHeader,
  Button,
  Descriptions,
  Space,
  Popover,
} from "antd";
import AddCategory from "./AddCategory";
import { useSelector, useDispatch } from "react-redux";
import { deleteCategory } from "../actions/foods";
import FoodPage from "./FoodPage";

export default function SummaryContent(props) {
  // 1. getting states
  const food = useSelector((state) => state.food);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();


    !food.categories.length?dispatch({
    type: START_LOAD,
    
  }) :dispatch({
    type: STOP_LOAD,
  });
 
  //2.  Pop Delete confirmation
  const [deletecat, setCategoryDetail] = useState({
    id: null,
    name_: "",
  });

  function confirm(e) {
    const postDelete = async () => {
      dispatch({
        type: START_LOAD,
      });
      const response = await deleteCategory(deletecat.id);
      if (response === "error") {
        dispatch({
          type: STOP_LOAD,
        });
        message.error("Try again");
      } else {
        dispatch({
          type: STOP_LOAD,
        });
        // window.location.reload();
        message.success("Delete success");
      }
    };
    postDelete();
  }
  
  //3. collapse
  const { Panel } = Collapse;
  function callback(key) {
    // console.log(key);
  }
  const text = `
  This is a property of InMotion ICT Software foundation, 
  copyright infridgement may or may not be reviewed
`;

  // func displaying categories from food state

   

  return (
    <Fragment>
      {/* content start */}
      <div
        className="content_container"
      >
        {/* if dashboard */}
        {props.path === "dashboard" && (
          <div>
            <Breadcrumb>
              <Breadcrumb.Item>
                <a href="">Order Summary</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            </Breadcrumb>
            <hr />
            {/* Header  */}
            <div className="container-fluid site-page-header-ghost-wrapper">
              <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title={`${auth.first_name} ${auth.last_name} Kitchen`}
                subTitle={`${auth.email}`}
                extra={[
                  <Popover content={"Kitchen is active"} trigger="hover">
                    <Button key="3">Active</Button>,
                  </Popover>,
                  <Popover content={"Online"} trigger="hover">
                    <Button key="2">Status</Button>,
                  </Popover>,
                  <Popover
                    content={"Not allowed"}
                    trigger="click"
                  >
                    <Button key="1" type="danger">
                      Deactivate
                    </Button>
                    ,
                  </Popover>,
                ]}
              >
                <Space size={[8, 16]} wrap></Space>
                <Descriptions size="small" column={2}>
                  <Descriptions.Item label="Created">
                    admin@wakafoods.com
                  </Descriptions.Item>
                  <Descriptions.Item label="Association">
                    <a>---</a>
                  </Descriptions.Item>
                  <Descriptions.Item label="Creation Time">
                    -----
                  </Descriptions.Item>
                  <Descriptions.Item label="Effective Time">
                    -----
                  </Descriptions.Item>
                  <Descriptions.Item label="Kitchen Address">
                    ------
                  </Descriptions.Item>
                </Descriptions>
              </PageHeader>
            </div>

            <Collapse defaultActiveKey={["7"]} onChange={callback}>
              <Panel header="Kitchen Delicacies" key="1">
                <p>{text}</p>
              </Panel>
              <Panel header="Most Favourites " key="2">
                <p>{text}</p>
              </Panel>
              <Panel header="Reviews from customers " key="3">
                <p>{text}</p>
              </Panel>
              <Panel header="Kitchen Delicacies" key="4">
                <p>{text}</p>
              </Panel>
              <Panel header="Most Favourites " key="5">
                <p>{text}</p>
              </Panel>
              <Panel header="Reviews from customers " key="7">
                <p>{text}</p>
              </Panel>
            </Collapse>

            <hr />
          </div>
        )}

        {/* if categories */}
        {props.path === "categories" && (
          <div className="row">
            <div className="card">
              <div className="card_title">
                <h3>Categories</h3>
                <AddCategory />
              </div>
              <hr />
              <div style={{ display: "flex" }}>
                <h5 style={{ flex: 1 }}>#</h5>
                <h6 style={{ flex: 3 }}>Categories</h6>
                <h6 style={{ flex: 3 }}>Actions</h6>
              </div>
              <Category_list className ="container"/>
            </div>
          </div>
        )}

        {/* if subcategories */}
        {props.path === "subcategories" && (
          <div className="row">
            <div className="card">
              <div className="card_title">
                <h3>Sub-Categories</h3>
              </div>
              <hr />
            </div>
          </div>
        )}

        {/* if step */}
        {props.path === "steps" && (
          <div className="row">
            <div className="card">
              <div className="card_title">
                <h3>Steps</h3>
              </div>
              <hr />
            </div>
          </div>
        )}
      
        {/* if foods */}
        {props.path === "foods" && (
         <FoodPage/>
        )}
      </div>
      {/* content end */}
    </Fragment>
  );
}
