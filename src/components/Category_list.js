import React ,{useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import Categorycomponent from './Categorycomponent';
import { fetchAllCategories } from '.././actions/categories_actions';
import { DeleteOutlined } from "@ant-design/icons";
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





const Category_list = () =>{
  const categories = useSelector((state) => state.food.categories);
  const {kitchenId}= useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
   dispatch( fetchAllCategories(kitchenId))
  }, [categories])
return(
  categories.map((cat)=><
     Categorycomponent
      Breadcrumb={Breadcrumb} 
      message={message}  
      Popconfirm ={Popconfirm} 
      name={cat.name} 
      src={cat.category_photo} 
      id ={cat.id}  key={cat.id}
      DeleteOutlined={DeleteOutlined } onClick={()=>{console.log("delete")}}
      />)
)
  

}

export default Category_list
