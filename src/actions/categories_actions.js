import * as api from "../api/index"
import { FETCH_ALL_CATEGORIES , CREATE_NEW_CATEGORY} from "../constants/actionTypes";

//contain all logic to and actions 
//get kitchen id
export const fetchAllCategories = (kitchenId) => async (dispatch) => {
  try {
    const { data } = await api.fetch_All_Categories(kitchenId);
    dispatch({ type:FETCH_ALL_CATEGORIES, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};


export const createNewCategory = (categoryData,photo) => async (dispatch) => {
  try {
    console.log(categoryData,photo)
    const { data } = await api.create_New_Category(categoryData,photo);
    dispatch({ type: CREATE_NEW_CATEGORY, payload: data });
    console.log(data)
  } catch (error) {
    console.log(error.message);
  }
};









// export async function getCategories(kitchenId) {
//     const config = {
//       headers: {
//         Accept: "application/json",
//         "Content-type": "application/json",
//       },
//     };
  
//     const url = `${process.env.REACT_APP_API_URL}/admin/category_action/${kitchenId}`;
//     try {
//       const res = await axios.get(url, config);
//       return res.data;
//     } catch (err) {
//       const res = "error";
//       return res;
//     }
//   }
  
// // action to Add categories

//   export async function addCategory(
//     form,
//     uploadPhoto
//   ) {
//     console.log(form.kitchen);
//     const config = {
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "multipart/form-data",
//       },
//     };
  
//     const url = `${process.env.REACT_APP_API_URL}/admin/addcategory`;
//     let formData = new FormData();
//     formData.append('name', form.category_name)
//     formData.append('kitchen', form.kitchen)
//     formData.append('category_photo', uploadPhoto.photo[0])
//     try {
//       const res = await axios.post(url, formData, config,);
//       return res.data;
//     } catch (err) {
//       console.log(err);
//       const res = "error";
//       //force a reload  in the category page
//       return res;
      
//     }
//   }