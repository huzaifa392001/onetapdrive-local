'use client'
import React, { useState } from "react";
import "./FAQsSection.scss";
import SecHeading from "../SecHeading/SecHeading";

function FAQsSection(props) {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="faqSec">
            <div className="customContainer">
                <div className="headingCont">
                    <SecHeading heading={props?.secHeading} />
                </div>
                {props?.data?.map((faq, index) => (
                    <div
                        className={`faqCard ${activeIndex === index ? "active" : ""}`}
                        key={index}
                    >
                        <button className="headingBtn" onClick={() => toggleFAQ(index)}>
                            <h3>{faq.question}</h3>
                            <i
                                className={`fas fa-chevron-down ${activeIndex === index ? "rotate-180" : ""
                                    }`}
                            />
                        </button>
                        <div className="faqContent">
                            {faq.answer.length > 1 ? (
                                <ul>
                                    {faq.answer.map((ans, i) => (
                                        <li key={i}>
                                            <i className="fas fa-chevron-right" />
                                            {ans}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>{faq.answer[0]}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default FAQsSection;
