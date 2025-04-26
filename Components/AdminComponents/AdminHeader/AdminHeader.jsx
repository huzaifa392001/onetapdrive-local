import React from 'react';
import "./AdminHeader.scss";
import Image from 'next/image';
import { useMutation } from "@tanstack/react-query";
import { adminLogout } from '@/Services/AuthService/AuthService';
import { toast } from 'react-toastify';

function AdminHeader() {
  const logoutMutation = useMutation({
    mutationFn: adminLogout,
    onSuccess: () => {
      toast.success("Logout Successfully");
    },
    onError: (error) => {
      toast.error(`Logout failed: ${error.message}`);
    }
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="adminHeader">
      <figure className="logoCont">
        <Image src={'/images/logo.webp'} width={250} height={50} alt="OneTap Logo" />
      </figure>
      <button className="themeBtn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default AdminHeader;