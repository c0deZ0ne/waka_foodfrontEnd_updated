import axios from "axios";

export async function getCategories(kitchenId) {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
  };

  const url = `${process.env.REACT_APP_API_URL}/admin/category_action/${kitchenId}`;
  try {
    const res = await axios.get(url, config);
    return res.data;
  } catch (err) {
    const res = "error";
    return res;
  }
}

export async function addCategory(
  form,
  uploadPhoto
) {
  console.log(form.kitchen);
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  };

  const url = `${process.env.REACT_APP_API_URL}/admin/addcategory`;
  let formData = new FormData();
  formData.append('name', form.category_name)
  formData.append('kitchen', form.kitchen)
  formData.append('category_photo', uploadPhoto.photo[0])
  try {
    const res = await axios.post(url, formData, config,);
    return res.data;
  } catch (err) {
    console.log(err);
    const res = "error";
    //force a reload  in the category page
    return res;
    
  }
}





export async function deleteCategory(id) {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
  };

  const url = `${process.env.REACT_APP_API_URL}/admin/category_action/${id}`;
  try {
    const res = await axios.delete(url, config);
    return res.data;
  } catch (err) {
    const res = "error";
    return res;
  }
}

export async function addfood(
  form,
  uploadPhoto
) {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  };

  const url = `${process.env.REACT_APP_API_URL}/admin/addfood`;
  let formData = new FormData();
  formData.append('food', form.food)
  formData.append('kitchen', form.kitchen)
  formData.append('category', form.category)
  formData.append('subcategory', form.subcategory)
  formData.append('step', form.step)
  formData.append('description', form.description)
  formData.append('price', form.price)
  formData.append('availability', form.availability)
  formData.append('photo', uploadPhoto.photo[0])
  try {
    const res = await axios.post(url, formData, config,);
    return res.data;
  } catch (err) {
    console.log(err);
    const res = "error";
    return res;
  }
}



export const fetchFoods = async(id) =>{
  const config = {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    };
  
    const url = `${process.env.REACT_APP_API_URL}/admin/allfoods/${id}`;
    try {
      const res = await axios.get(url, config);
      return res.data
    } catch (err) {
      console.log(err);
      // alert("Error retrieving foodss")
    }
}