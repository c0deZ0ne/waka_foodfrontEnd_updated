import React from "react";
import EditCategory from "./EditCategory";
const Categorycomponent = ({ name, id, src , Popconfirm,DeleteOutlined }) => {
  return (
    <div key={id} className = "container flex" style = {{margin:"20px",left:"",background:"whitesmoke", display:"flex", top:"0vh",position:"relative",width:"70vw"}}>
      <img style={{ width: "80px", height: "80px"}} src={src} alt="" />
      <h5 className =" " style={{position:"relative" ,top:"20px" ,left:"20px"}}>{name}</h5>
      <Popconfirm 
        title={`Are you sure you want to remove and all it's foods?`}
        okText="Yes"
        cancelText="No">

         <DeleteOutlined style={{color: "red", position:"relative", left:"25vw" ,padding:"20px", marginRight:"80px" }}/>
        </Popconfirm>

      <EditCategory style={{color: "red", position:"relative", left:"25vw" ,padding:"20px" }} />
    </div>
  );
};

export default Categorycomponent;
