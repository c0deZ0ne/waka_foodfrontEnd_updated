import { Modal, Button } from "antd";
import {   EditOutlined, } from "@ant-design/icons";
import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { showError, showSuccess } from "../actions/alerts";
import axios from "axios";


const EditCategory = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setformData] = useState({
    kitchen: auth.kitchenId,
    name: "",
    category_photo: null,
  });
  const inputRef = useRef()

  // func to submit form 
  const EditCategory = (kitchen, name, category_photo) => async(dispatch) => {
    console.log("logging data");
    const config = {
      headers: {
        Accept: "application/json",
        "Content-type": "multi/form-data",
      },
    };
    const body = JSON.stringify({kitchen, name, category_photo});

    const url = `${process.env.REACT_APP_API_URL}/admin/addcategory`;

    console.log(body);
    console.log(url);

    try {
      const res = await axios.post(
        url,
        body,
        config
      );
      if (res.data.error) {
        dispatch(showError(res.data.error))
      } else {
        dispatch(showSuccess(res.data.success))
      }
    }catch{
      dispatch(showError("Unable to create category"))
    }
  
  }

  const showModal = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false);
  };

  const onChange = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("food is being submitted.... ");
    // func
    console.log(name, kitchen);
    // addCategory2(kitchen, name, category_photo);
    console.log("logging data");
    const config = {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    };
    const body = JSON.stringify({kitchen, name, category_photo});

    const url = `${process.env.REACT_APP_API_URL}/admin/addcategory`;

    console.log(body);
    console.log(url);

    try {
      const res = axios.post(
        url,
        body,
        config
      );
      if (res.data.error) {
        dispatch(showError(res.data.error))
      } else {
        dispatch(showSuccess(res.data.success))
      }
    }catch{
      dispatch(showError("Unable to create category"))
    }
  };

  // Destructuring Form
  const { kitchen, name, category_photo } = formData;
  
  return (
    <>
   <EditOutlined onClick={showModal}  style={{ flex: 1, marginLeft: "1px", marginTop:'20px',  }} />
      <Modal
        title="Edit Category"
        visible={visible}
        onOk={handleSubmit}
        loading={loading}
        onCancel={handleCancel}
      >
        <div className={"container form-control"}>
          <div className="Form-body">
            <form onSubmit={handleSubmit}>
              <div className="input-container">
                <label>Edit Category:</label>
              

                <input
                  className="main-input"
                  type="text"
                  placeholder="Enter Category"
                  name="name"
                  value={name}
                  onChange={(e) => onChange(e)}
                  required
                />

                <input type="file" 
                className="main-input" 
                value={category_photo}
                name='category_photo'
                accept="image/*" 
                onChange={(e) => onChange(e)}
       
           />

              </div>

            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditCategory;
