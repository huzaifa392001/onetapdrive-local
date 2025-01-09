import React from 'react'
import "./EditForm.scss";
import AdminButton from '@/components/AdminComponents/AdminButton/AdminButton';
import CustomInput from '@/components/CustomInput/CustomInput';

function page() {
  return (
    <>
      <div class="headingCont">

      </div>
      <div className="createWrapper">
        <div class="inputCont">
          <p className="inputName">Title</p>
          <input type="text" placeholder="Enter Title Here" />
        </div>
        <div class="inputCont">
          <p className="inputName">Upload Image</p>
          <input type="file" />
        </div>


        <div className="btnWrapper">
          <AdminButton href="../" buttonText={"Add"} />
          <AdminButton href="../" buttonText={"Cancel"} />
        </div>
      </div>
    </>
  )
}

export default page