import React from 'react'
import "./AdminHeader.scss"
import { AdminServices } from '@/Services/AdminServices/AdminServices'
import Image from 'next/image'

function AdminHeader() {
    const handleLogout = () => {
        AdminServices.logout()
    }
    return (
        <div className="adminHeader">
            <figure className="logoCont">
                <Image src={'/images/logo.webp'} width={250} height={50} alt="OneTap Logo" />
            </figure>
            <button onClick={handleLogout} className="themeBtn">
                Logout
            </button>
        </div>
    )
}

export default AdminHeader