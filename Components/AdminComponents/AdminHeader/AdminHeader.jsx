import React from 'react'
import "./AdminHeader.scss"
import Image from 'next/image'

function AdminHeader() {

  return (
    <div className="adminHeader">
      <figure className="logoCont">
        <Image src={'/images/logo.webp'} width={250} height={50} alt="OneTap Logo" />
      </figure>
      <button className="themeBtn">
        Logout
      </button>
    </div>
  )
}

export default AdminHeader