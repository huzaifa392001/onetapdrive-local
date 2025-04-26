import SecHeading from '@/Components/SecHeading/SecHeading'
import Image from 'next/image'
import React from 'react'
import "../Settings.scss"

function page() {
    return (
        <div className="settingsSection">
            <div className="settingWrapper">
                <div className="vendorProfileSection">
                    <div className="headingCont">
                        <SecHeading heading={"Company Details"} />
                    </div>
                    <div className="profileForm">
                        <div className="formGrid">
                            <div className="inputCont">
                                <label htmlFor="">Company Name</label>
                                <input type="text" name="" id="" />
                            </div>
                            <div className="inputCont">
                                <label htmlFor="">Company Email</label>
                                <input type="text" name="" id="" />
                            </div>
                            <div className="inputCont">
                                <label htmlFor="">Company Phone Number</label>
                                <input type="text" name="" id="" />
                            </div>
                            <div className="inputCont">
                                <label htmlFor="">Fleet Size</label>
                                <select name="" id="">
                                    <option value="">Select From Below</option>
                                </select>
                            </div>
                            <div className="inputCont">
                                <label htmlFor="">Country</label>
                                <select name="" id="">
                                    <option value="">Select From Below</option>
                                </select>
                            </div>
                            <div className="inputCont">
                                <label htmlFor="">City</label>
                                <select name="" id="">
                                    <option value="">Select From Below</option>
                                </select>
                            </div>
                            <div className="btnCont">
                                <button className="themeBtn large">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page