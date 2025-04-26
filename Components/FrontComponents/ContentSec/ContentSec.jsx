import SecHeading from '@/Components/SecHeading/SecHeading'
import Image from 'next/image'
import React from 'react'
import "./ContentSec.scss"
import Link from 'next/link'

function ContentSec(props) {
    return (
        <section className={`contentSec ${props?.sectionClass}`}>
            <div className="largeContainer">
                {props?.secHeading && <SecHeading className={`mainSecHeading ${props?.secHeadingClass}`} heading={props?.secHeading} />}
                <div className={`contentRow ${props?.rowClass}`}>
                    <div className={`contentCol ${props?.contentSize}`}>
                        <div className="content">
                            {props?.heading && <SecHeading className={props?.topHeadingClass} heading={props?.heading} />}
                            {props?.subHeading && <h6>{props?.subHeading}</h6>}
                            {props?.description?.map((item, index) => (
                                <p key={index}>
                                    {item}
                                </p>
                            ))}
                            {props?.heading2 && <SecHeading className={props?.bottomHeadingClass} heading={props?.heading2} />}
                            {props?.description2?.map((item, index) => (
                                <p key={index}>
                                    {item}
                                </p>
                            ))}
                            {props?.btn && <Link className='themeBtn small' href={props?.link || ""} >{props?.btn?.text}</Link>}
                        </div>
                    </div>
                    {!props?.secondContent && (
                        <div className={`contentCol ${props?.imgSize}`}>
                            <figure className={`${props?.videoPath && "videoCont"}`}>
                                {props?.imgPath && <Image src={props?.imgPath} fill alt={`${props?.heading}'s Image`} />}
                                {props?.videoPath && (
                                    <video controls muted>
                                        <source src={props?.videoPath} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                )}
                            </figure>
                        </div>
                    )}
                    {props?.secondContent && (
                        <div className={`contentCol ${props?.secondContentSize}`}>
                            <div className="content">
                                {props?.secondContent?.heading && <SecHeading heading={props?.secondContent?.heading} />}
                                {props?.secondContent?.description?.map((item, index) => (
                                    <p key={index}>
                                        {item}
                                    </p>
                                ))}
                                {props?.secondContent?.subHeading && <h6>{props?.secondContent?.subHeading}</h6>}
                                {props?.secondContent?.listItems?.map((item, index) => (
                                    <ul key={index}>
                                        <li>
                                            {item?.image && <Image src={item?.image} alt={item?.text} width={50} height={50} />}
                                            <p>{item?.text}</p>
                                        </li>
                                    </ul>
                                ))}
                                {props?.secondContent?.heading2 && <SecHeading heading={props?.secondContent?.heading2} />}
                                {props?.secondContent?.description2?.map((item, index) => (
                                    <p key={index}>
                                        {item}
                                    </p>
                                ))}
                                {props?.secondContent?.btn && <Link className='themeBtn small' href={props?.secondContent?.link || ""} >{props?.secondContent?.btn?.text}</Link>}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default ContentSec
