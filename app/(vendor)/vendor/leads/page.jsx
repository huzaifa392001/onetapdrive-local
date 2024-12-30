import React from 'react'
import LeadsManagementLayout from '@/Components/VendorComponents/LeadsManagementLayout/LeadsManagementLayout'
import LeadsData from "@/DummyData/VendorLeads.json"
function page() {
  return (
    <LeadsManagementLayout data={LeadsData} />
  )
}

export default page