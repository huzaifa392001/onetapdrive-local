import React from "react";
import "./page.scss";
import AdminButton from "@/Components/AdminComponents/AdminButton/AdminButton";


function page() {
  return (
    <div className="createWrapper">
      <p className="inputName">Title</p>
      <input type="text" placeholder="Enter Title Here"></input>

      <p className="inputName">Upload Images</p>
      <input type="file"></input>
      <div className="btnWrapper">
        <AdminButton href="./" buttonText={"Add"}/>
        <AdminButton href="./" buttonText={"Cancel"}/>
      </div>
    </div>
  );
}

export default page;
