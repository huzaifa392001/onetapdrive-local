import React from 'react';
import Link from 'next/link';
import "./AdminButton.scss";

function AdminButton({href, buttonText}) {
  return (
    <div className="adminBtn"> 
      <Link href={href} className="createBtn">{buttonText}</Link>
    </div>
  )
}

export default AdminButton