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
        console.log(tempBlog)
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
                            <div class="socialCard card">
                                <h3>Social Networks</h3>
                                <div class="tags">
                                    <button class="tag fb">
                                        <i class="fab fa-facebook" />
                                        <span>Facebook</span>
                                    </button>
                                    <button class="tag insta">
                                        <i class="fab fa-instagram" />
                                        <span>Instagram</span>
                                    </button>
                                    <button class="tag twitter">
                                        <i class="fab fa-twitter" />
                                        <span>Twitter</span>
                                    </button>
                                    <button class="tag linkedin">
                                        <i class="fab fa-linkedin-in" />
                                        <span>LinkedIn</span>
                                    </button>
                                </div>
                            </div>
                            <div class="categoryCard card">
                                <h3>Category</h3>
                                <Link href={""} class="categoryTag">
                                    <Image src={"/images/blogCatBg.jpg"} alt fill />
                                    <div class="content">
                                        <h2>Technology</h2>
                                    </div>
                                </Link>
                                <Link href={""} class="categoryTag">
                                    <Image src={"/images/blogCatBg.jpg"} alt fill />
                                    <div class="content">
                                        <h2>LifeStyle</h2>
                                    </div>
                                </Link>
                                <Link href={""} class="categoryTag">
                                    <Image src={"/images/blogCatBg.jpg"} alt fill />
                                    <div class="content">
                                        <h2>Cars</h2>
                                    </div>
                                </Link>
                                <Link href={""} class="categoryTag">
                                    <Image src={"/images/blogCatBg.jpg"} alt fill />
                                    <div class="content">
                                        <h2>Life In Dubai</h2>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {blogsData && (
                <section class="relatedBlogs">
                    <div class="customContainer">
                        <div className="headingCont">
                            <SecHeading heading="Related Blogs" />
                        </div>
                        <div class="blogsRow">
                            {blogsData?.slice(0, 3)?.map((blog, index) => (
                                <div class="blogCol" key={index}>
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