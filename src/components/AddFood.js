import { Drawer, Button, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ADD_SUCCESS, START_LOAD, STOP_LOAD } from "../actions/types";
import { showError, showSuccess } from "../actions/alerts";
import { addfood } from "../actions/foods";

const AddFood = () => {
  const [loading, setloading] = useState(false);
  // Drawer
  const [drawer, setdrawer] = useState(false);
  const showDrawer = () => {
    setdrawer(true);
  };
  const onClose = () => {
    setdrawer(false);
  };

  // getting states...
  const auth = useSelector((state) => state.auth);
  const foods = useSelector((state) => state.food);
  const dispatch = useDispatch();

  // Add food func
  // STATES
  const [formData, setformData] = useState({
    food: "",
    kitchen: auth.kitchenId,
    category: "",
    subcategory: "",
    step: "",
    description: "",
    price: 0.0,
    availability: true,
  });
  const [uploadPhoto, setUploadPhoto] = useState({ photo: "" });

  // EVENTS 
  const onChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };
  const setPhoto = (e) => {
    setUploadPhoto({ photo: e.target.files });
    console.log(e.target.files);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: START_LOAD });
    const postfood = async () => {
      const response = await addfood(formData, uploadPhoto);
      if (response == "error") {
        dispatch({ type: STOP_LOAD });
        dispatch(showError("Error adding food"));
      } else {
        dispatch({ type: STOP_LOAD });
        setdrawer(false);
        dispatch(showSuccess("Food added...Updating now..."));
        // Reset form
        setformData({
          food: "",
          kitchen: auth.kitchenId,
          category: "",
          subcategory: "",
          step: "",
          description: "",
          price: 0.0,
          availability: true,
        });
        // Reset photo form
        setUploadPhoto({ photo: "" });
      }
    };
    postfood();
  };
  // image upload
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);
  const onImageChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Add food <PlusOutlined />
      </Button>
      <Drawer
        title="Add new food to kitchen"
        width={1100}
        onClose={onClose}
        visible={drawer}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={onSubmit} type="primary" loading={loading}>
              Add Now
            </Button>
          </div>
        }
      >
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="container">
            {/* food and price */}
            <div className="row">
              <div className="col-lg-6">
                <label htmlFor="foodname">Please Enter Food Name</label>
                <br />
                <input
                  type="text"
                  id="foodname"
                  name="food"
                  placeholder="Please enter food"
                  value={formData.food}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
              <div className="col-lg-6">
                <label htmlFor="price">Please enter food price</label>
                <br />
                <input
                  type="number"
                  placeholder="Please enter price"
                  value={formData.price}
                  name="price"
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
            </div>
            {/* category and sub category */}
            <div className="row">
              <div className="col-lg-6">
                <label htmlFor="category">Select category</label>
                <br />
                <select
                  id="category"
                  value={formData.category}
                  name="category"
                  onChange={(e) => onChange(e)}
                  required
                >
                  <option>select</option>
                  <option value="1">WakaNaija</option>
                  <option value="2">WakaChinese</option>
                </select>
              </div>
              <div className="col-lg-6">
                <label htmlFor="subcategory">Select sub category</label>
                <br />
                <select
                  id="subcategory"
                  value={formData.subcategory}
                  name="subcategory"
                  onChange={(e) => onChange(e)}
                  required
                >
                  <option>select</option>
                  <option value="1">Intercontinental</option>
                  <option value="2">Bond Dishes</option>
                </select>
              </div>
            </div>
            {/* food step,  uplaod pic availabilty*/}
            <div className="row">
              <div className="col-lg-4">
                <label htmlFor="step">Please select food step</label>
                <br />
                <select
                  id="step"
                  value={formData.step}
                  name="step"
                  onChange={(e) => onChange(e)}
                  required
                >
                  <option>select</option>
                  <option value="1">Food</option>
                  <option value="2">Drinks</option>
                </select>
              </div>

              {/* ---------Image not working yet------------- */}
              <div className="col-lg-4">
                <ImgCrop rotate>
                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture"
                    onChange={onImageChange}
                    accept="image/*"
                    onPreview={onPreview}
                  >
                    {fileList.length < 5 && "+ Upload Food Photo"}
                  </Upload>
                </ImgCrop>

                {/* /image working// */}
                <label htmlFor="food_img">Food Image</label>
                <br />
                <input
                  type="file"
                  name="photo"
                  id="food_img"
                  placeholder="Upload Food picture"
                  accept="image/*"
                  onChange={(e) => setPhoto(e)}
                  required
                />
              </div>

              <div className="col-lg-4">
                <label htmlFor="food_avail">Food Available?:</label>
                <br />
                <label htmlFor="yes">Yes</label>
                <input
                  id="yes"
                  type="radio"
                  name="availability"
                  value={true}
                  onChange={(e) => onChange(e)}
                />
                <label htmlFor="no">No</label>
                <input
                  id="no"
                  type="radio"
                  name="availability"
                  value={false}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>
            {/* description */}
            <div className="row">
              <label htmlFor="food_desc">Description:</label>
              <textarea
                name="description"
                id="food_desc"
                cols="30"
                rows="3"
                placeholder="Enter a short summary of food, speices, ingrdients.."
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
        </form>
      </Drawer>
    </>
  );
};

export default AddFood;
