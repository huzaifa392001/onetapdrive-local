import React from "react";
import SecHeading from "../SecHeading/SecHeading";
import "./FAQsSection.scss";

function FAQsSection(props) {
    return (
        <section className="faqSec">
            <div className="customContainer">
                <div className="headingCont">
                    <SecHeading heading={props?.secHeading} />
                </div>
                <div className="faqMain">
                    {props?.data?.map((faq, index) => (
                        <div className="faq" key={index}>
                            <div className="faqIcon">
                                <i className="far fa-car" />
                            </div>
                            <div className="faqContent">
                                <div className="question">
                                    <h3>{faq.question}</h3>
                                </div>
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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FAQsSection;
