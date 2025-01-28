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
                        <SecHeading heading={"Profile"} />
                    </div>
                    <div className="profileForm">
                        <div className="profilePicContainer">
                            <div className="inputCont">
                                <label htmlFor="">Profile Picture</label>
                                <div className="profilePic">
                                    <Image src={""} width={250} height={250} alt='' />
                                    <input type="file" name="" id="" />
                                </div>
                            </div>
                            <div className="btnCont">
                                <button className="themeBtn secondary">Change Picture</button>
                                <button className="themeBtn delete">Delete Picture</button>
                            </div>
                        </div>
                        <div className="formGrid">
                            <div className="inputCont">
                                <label htmlFor="">Profile Name</label>
                                <input type="text" name="" id="" />
                            </div>
                            <div className="inputCont">
                                <label htmlFor="">UserName</label>
                                <div className="inputWrap">
                                    <input type="text" name="" id="" />
                                    <i className="fas fa-at"></i>
                                </div>
                            </div>
                            <div className="inputCont">
                                <label htmlFor="">Status</label>
                                <select name="" id="">
                                    <option value="" disabled selected>Select an Option</option>
                                    <option value="">Available</option>
                                    <option value="">Not Available</option>
                                </select>
                            </div>
                            <div className="inputCont">
                                <label htmlFor="">About</label>
                                <textarea name="" id="" cols="30" rows="10"></textarea>
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