import { Modal, Button } from "antd";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GET_CATEGORIES } from "../actions/types";
import { showError, showSuccess } from "../actions/alerts";
import { addCategory } from "../actions/foods";
import { createNewCategory } from "../actions/categories_actions";
import {formData} from "react"




const AddCategory = () => {

  //create a new formData to be sent
 


  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch()
   const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // // STATES
  const [categoryForm, setCategoryformData] = useState({
    kitchen: auth.kitchenId,
    category_name: "",
 });

 const [photo, setUploadPhoto] = useState({photo: ""}); // initialise photo state
 
 const onFileChange = event => {  
  // Update the state
  const formData = new formData
    formData.append(
  categoryForm,

  );
  setUploadPhoto({ photo: event.target.files[0] });

};
 


  // // MODAL
  const showModal = () => {
    setVisible(true);
 };
   const handleCancel = () => {
   setVisible(false);
 };

  // // EVENTS
   const onChange = (e) =>
   setCategoryformData({ ...categoryForm, [e.target.name]: e.target.value });
  // const setPhoto = (e) => {
  //     setUploadPhoto({ photo: e.target.files[0] });
  //   };
 

  const handleSubmit = (e)=>{
    e.preventDefault()

  }
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setLoading(true)
  //   // const postCategory = async () => {
  //   //   const response = await addCategory(formData, photo)
  //   //   if (response === "error"){
  //   //     setLoading(false)
  //   //     dispatch(showError("Error adding food"));
  //   //     console.log(response)
  //   //   }else{
  //   //     dispatch({type:GET_CATEGORIES, payload:response})

  //   //     console.log(response)
  //   //     setLoading(false);
  //   //     setVisible(false)
       
  //   //     dispatch(showSuccess("New Category Created..."))
    
  //   //   }
  //   //   console.log("internal func",response)
  //   // }
  //   // postCategory();
  //   return createNewCategory(formData, photo)


  // };

  return (
    <>
      <Button onClick={showModal} style={{ margin: "2%" }}>
        Add Category to kitchen
      </Button>
      <Modal
        title="Add Category to Kitchen"
        visible={visible}
        onOk={handleSubmit}
        confirmLoading={loading}
        onCancel={handleCancel}
      >
      
          <div >
            <form onSubmit={handleSubmit}>
              <div >
                <label>New Category:</label>
                <input
                  type="text"
                  placeholder="Enter Category name "
                  name="category_name"
                  value={categoryForm.category_name}
                  onChange={(e) => onChange(e)}
                  required
                /> <br/>

                <label htmlFor="img">Category Image</label>
                <br />
                <input
                  id='img'
                  type="file"
                  name="photo"
                  accept="image/*"
                  placeholder="Upload picture"
                  onChange={(e) => onFileChange(e)}
                  required
                />
              </div>
            </form>
          </div>
 
      </Modal>
    </>
  );
};

export default AddCategory