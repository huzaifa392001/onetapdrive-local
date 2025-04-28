'use client'
import React, { useEffect, useState } from 'react'
import "./SingleBlogLayout.scss"
import blogsData from "@/DummyData/BlogsData.json"
import { usePathname } from 'next/navigation'
import { formatDate } from '@/Utils/Utils'
import Image from 'next/image'
import Link from 'next/link'
import BlogCardLayout from '../BlogCardLayout/BlogCardLayout'
import SecHeading from '@/Components/SecHeading/SecHeading'

function SingleBlogLayout() {
    const [blog, setBlog] = useState(null);
    const [date, setDate] = useState(null)
    const route = usePathname().split("/").pop();

    useEffect(() => {
        const tempBlog = blogsData.find((blog) => blog.slug === route);
        setBlog(tempBlog);
        setDate(formatDate(tempBlog?.date_posted))
    }, [route]);

    if (!blog) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <section className="blogDetailSec">
                <div className="customContainer">
                    <div className="wrapperRow">
                        <div className="detailWrapper">
                            <div className="tags">
                                <span className="tag">Technology</span>
                            </div>
                            <h1>
                                {blog?.title}
                            </h1>
                            <div className="minDetails">
                                <span>
                                    <i className="fas fa-user" />
                                    By {blog?.author?.name}
                                </span>
                                <span>
                                    <i className="fas fa-clock" />
                                    {date}
                                </span>
                                <span>
                                    <i className="fas fa-thumbs-up" />
                                    10 Likes
                                </span>
                                <span>
                                    <i className="fas fa-comment" />
                                    24 Comments
                                </span>
                            </div>
                            <figure className='imgWrapper'>
                                <Image src={'/images/cars/6.webp'} fill alt={`${blog?.title}`} />
                            </figure>
                            <div className="content">
                                {blog?.content?.map((para, index) => (
                                    <p key={index}>
                                        {para}
                                    </p>
                                ))}
                            </div>
                        </div>
                        <div className="sider">
                            <div className="socialCard card">
                                <h3>Social Networks</h3>
                                <div className="tags">
                                    <button className="tag fb">
                                        <i className="fab fa-facebook" />
                                        <span>Facebook</span>
                                    </button>
                                    <button className="tag insta">
                                        <i className="fab fa-instagram" />
                                        <span>Instagram</span>
                                    </button>
                                    <button className="tag twitter">
                                        <i className="fab fa-twitter" />
                                        <span>Twitter</span>
                                    </button>
                                    <button className="tag linkedin">
                                        <i className="fab fa-linkedin-in" />
                                        <span>LinkedIn</span>
                                    </button>
                                </div>
                            </div>
                            <div className="categoryCard card">
                                <h3>Category</h3>
                                <Link href={""} className="categoryTag">
                                    <Image src={"/images/blogCatBg.jpg"} alt fill />
                                    <div className="content">
                                        <h2>Technology</h2>
                                    </div>
                                </Link>
                                <Link href={""} className="categoryTag">
                                    <Image src={"/images/blogCatBg.jpg"} alt fill />
                                    <div className="content">
                                        <h2>LifeStyle</h2>
                                    </div>
                                </Link>
                                <Link href={""} className="categoryTag">
                                    <Image src={"/images/blogCatBg.jpg"} alt fill />
                                    <div className="content">
                                        <h2>Cars</h2>
                                    </div>
                                </Link>
                                <Link href={""} className="categoryTag">
                                    <Image src={"/images/blogCatBg.jpg"} alt fill />
                                    <div className="content">
                                        <h2>Life In Dubai</h2>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {blogsData && (
                <section className="relatedBlogs">
                    <div className="customContainer">
                        <div className="headingCont">
                            <SecHeading heading="Related Blogs" />
                        </div>
                        <div className="blogsRow">
                            {blogsData?.slice(0, 3)?.map((blog, index) => (
                                <div className="blogCol" key={index}>
                                    <BlogCardLayout item={blog} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}

export default SingleBlogLayout