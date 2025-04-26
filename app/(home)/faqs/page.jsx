import React from 'react'
import FAQsSection from '@/Components/FAQsSection/FAQsSection'
import faqData from "@/DummyData/Faq.json";
function page() {
  return (
    <FAQsSection data={faqData} secHeading={"Frequently Asked Questions"} />
  )
}

export default page