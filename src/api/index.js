import axios from 'axios';


const url = process.env.REACT_APP_API_URL;

export const fetch_All_Categories = (kitchenId) => axios.get(`${url}/admin/category_action/${kitchenId}`);
export const create_New_Category = (newCategoryData,photo) => axios.post(`${url}/admin/addcategory`, newCategoryData,photo);


// export const updateCategory = (id, updatedCategory) => axios.patch(`${url}/${id}`, updatedCategory);
// export const deleteCategory = (id) => axios.delete(`${url}/${id}`);