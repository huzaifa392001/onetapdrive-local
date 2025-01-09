import CustomInput from '@/components/CustomInput/CustomInput'
import SecHeading from '@/components/SecHeading/SecHeading'
import React from 'react'
import "./ContactPageLayout.scss"
import CarsSection from '../CarsSection/CarsSection'
import productsData from "@/DummyData/Products.json"

function ContactPageLayout() {
    return (
        <>
            <section className="contactSec">
                <div className="customContainer">
                    <div className="contactRow">
                        <div className="content">
                            <SecHeading heading="Contact us | Drive With A Click" description="Do you need guidance on renting a car or are interested in becoming a partner?" />
                            <form className="contactForm">
                                <div className="contactFormRow">
                                    <div className="inputWrapper">
                                        <h6>Name</h6>
                                        <CustomInput
                                            placeholder={"Name"}
                                        />
                                    </div>
                                    <div className="inputWrapper">
                                        <h6>Contact No.</h6>
                                        <CustomInput
                                            inputType="tel"
                                            placeholder={"Contact No."}
                                        />
                                    </div>
                                    <div className="inputWrapper">
                                        <h6>Email Address</h6>
                                        <CustomInput
                                            inputType="email"
                                            placeholder={"Email"}
                                        />
                                    </div>
                                    <div className="inputWrapper">
                                        <h6>Subject</h6>
                                        <CustomInput
                                            placeholder={"Subject"}
                                        />
                                    </div>
                                    <div className="inputWrapper">
                                        <h6>Query</h6>
                                        <CustomInput
                                            rows={7}
                                            textArea
                                            placeholder={"Query"}
                                        />
                                    </div>
                                </div>
                                <button className="themeBtn small">Submit</button>
                            </form>
                        </div>
                        <figure>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14450.498274067922!2d55.205055!3d25.114567!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6beabf615ab5%3A0x3d0dcf9b883dad4b!2sDusseldorf%20Business%20Point!5e0!3m2!1sen!2sus!4v1735042327336!5m2!1sen!2sus" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </figure>
                    </div>
                </div>
            </section>
            <CarsSection
                secHeading={"Dubai Car Rental"}
                data={productsData}
            />
        </>
    )
}

export default ContactPageLayout