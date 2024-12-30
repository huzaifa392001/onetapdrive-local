import Image from 'next/image'
import React from 'react'
import "./about-us.scss"
import SecHeading from '@/Components/SecHeading/SecHeading'
import ContentSec from '@/Components/FrontComponents/ContentSec/ContentSec'
import Link from 'next/link'

function page() {
    const apartData = [
        {
            title: "Exclusive Range of Cars",
            description: "Whether you're looking for an affordable car or dreaming of a luxury or sports model, we have an option for every preference.",
            image: "/images/apart1.webp",
        },
        {
            title: "Direct Booking",
            description: "Enjoy the convenience of booking directly with our trusted partners, guaranteeing the best prices available.",
            image: "/images/apart2.webp",
        },
        {
            title: "No Hidden Costs",
            description: "Forget about extra charges, fees, or commissions. What you see is exactly what you pay.",
            image: "/images/apart3.webp",
        }
    ];

    const images = new Array(12).fill(""); // Array with 12 empty elements (you can replace "" with actual image sources if available)

    return (
        <>
            <section className='mainSec'>
                <figure>
                    <Image quality={100} loading='eager' src={'/images/hero_bg.jpg'} alt='Home Banner' width={1922} height={762} />
                </figure>
                <div className="content">
                    <h1>
                        Welcome to
                        <span>
                            OneTapDrive
                        </span>
                    </h1>
                    <p>
                        {"where we make renting cars easy. We are UAE’s leading car rental portal. We connect you to our extensive network of rental partners that offer the best deals and cars to fit your every need."}
                    </p>
                </div>
            </section>
            <ContentSec
                heading={"About Us"}
                description={[
                    "Step into the world of OneTapDrive, where your journey starts with just a tap. As a leading marketplace, we build connections between clients and reliable car rental agencies offering an easy way to find the right car for any occasion with no hassle.",
                    "Ranging from luxurious to economy, we present a wide range of cars. Our platform also provides personalized choices depending on individual needs on a daily, weekly, or monthly basis. We ensure working directly with trustworthy rental providers delivering the greatest offers and the lowest pricing.",
                    "Whether it be car-with-driver or driver-on-hire services, we guarantee convenience with offerings like 24/7 chauffeur assistance and airport transfers across Dubai, Abu Dhabi, Sharjah and other cities of UAE. The professional drivers are ready to take you where you need to go, allowing you to travel freely at your own pace.",
                    "Only for you, OneTapDrive makes renting a car easier and more affordable by giving access to a large network of agencies. When it comes to car rentals, flexibility and customer satisfaction are our top priorities, making every experience stress-free."
                ]}
                imgPath={"/images/building.webp"}
                contentSize={'col7'}
                imgSize={'col5'}
            />
            <section className="apartSec">
                <div className="customContainer">
                    <SecHeading className={"center"} heading={"What Makes Us Unique"} />
                    <div className="apartRow">
                        {apartData.map((item, index) => (
                            <div key={index} className="apartBox">
                                <figure>
                                    {item.image && <Image src={item.image} alt={item.title} width={90} height={90} />}
                                </figure>
                                <div className="content">
                                    <h4>{item.title}</h4>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <ContentSec
                heading={"Our Purpose"}
                heading2={"Our Goal"}
                description={[
                    "To provide the easiest way to rent a car, bringing you the best local rental options wherever you are in the world."
                ]}
                description2={[
                    "Our goal is to become the top car rental platform globally, improving your experience every step of the way with fresh ideas and constant upgrades."
                ]}
                videoPath="/video/our_purpose.mp4"
                contentSize={'col5'}
                imgSize={'col7'}
                rowClass={"invertCol"}
            />
            <ContentSec
                secHeading="Feel the OneTapDrive Difference"
                secHeadingClass="center"
                heading={"For Clients"}
                description={[
                    "Cars can be compared using multiple filters such as brand, model, location, and price, making it simple to find the perfect match for any need.",
                    "A wide variety of automobiles including chauffeur-driven cars can be explored with ease, all from trusted partners in one convenient place.",
                    "Direct contact with rental partners is made easy via phone, email, or WhatsApp for quick and efficient communication.",
                    "Pricing is clear and straightforward, ensuring the ideal rental is secured without concerns about hidden charges or unnecessary extras."
                ]}
                btn={{
                    text: "Start Renting",
                    link: ""
                }}
                secondContent={{
                    heading: "For Vendors",
                    subHeading: "Car Rental Providers",
                    listItems: [
                        {
                            image: "/images/growth.webp",
                            text: "Update and manage your fleet details in real-time with ease."
                        },
                        {
                            image: "/images/booking.webp",
                            text: "Partnering with OneTapDrive helps expand your business and enhance your visibility in the market."
                        },
                        {
                            image: "/images/growth.webp",
                            text: "Receive authentic inquiries and bookings directly without any commission fees."
                        },
                        {
                            image: "/images/dashboard.webp",
                            text: "Access your personalized dashboard to gain valuable insights and track your business growth."
                        },
                    ],
                    btn: {
                        text: "Add Your Car",
                        link: ""
                    }
                }}
                secondContentSize={"col5"}
                contentSize={"col7"}
                sectionClass={"topAligned"}
            />
            <section className="howToSec">
                <div className="customContainer">
                    <div className="howToRow">
                        <div className="content">
                            <SecHeading heading="How to Rent a car" />
                            <ul>
                                <li>
                                    Start by browsing the offers on <Link href={"https://www.onetapdrive.com"} >onetapdrive.com</Link>.
                                </li>
                                <li>
                                    Sign up and use our mobile app for a smoother experience.
                                </li>
                                <li>
                                    Select your preferred car from a large network of rental companies.
                                </li>
                                <li>
                                    Use the filters to narrow down your search based on your requirements.
                                </li>
                                <li>
                                    Reach out to the listed suppliers to inquire about your desired dates.
                                </li>
                                <li>
                                    You can contact them directly via Phone or WhatsApp.
                                </li>
                                <li>
                                    Payment for the rental fee and deposit can be made by Card or Cash at the time of delivery.
                                </li>
                                <li>
                                    If you encounter issues such as unresponsiveness or an unavailable car, please share your feedback with us.
                                </li>
                                <li>
                                    Complete your booking with your desired.
                                </li>
                                <li>
                                    Hit the road and enjoy your journey!
                                </li>
                            </ul>
                        </div>
                        <div className="content">
                            <SecHeading heading="Important Tips" />
                            <ul>
                                <li>
                                    {"Always make sure you’re dealing with the same company listed on OneTapDrive."}
                                </li>
                                <li>
                                    {"Before taking delivery of the car, carefully inspect it for any dents or scratches."}
                                </li>
                                <li>
                                    {"Keep a copy of the car rental agreement for your records."}
                                </li>
                                <li>
                                    {"Record a video and send it to the service provider in advance."}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <section className="gallerySec">
                <div className="imagesGrid">
                    {images.map((_, index) => (
                        <figure key={index}>
                            <Image src={`/images/cars/${index + 1}.webp`} alt={`gallery image ${index + 1}`} fill />
                        </figure>
                    ))}
                </div>
            </section>
        </>
    )
}

export default page
