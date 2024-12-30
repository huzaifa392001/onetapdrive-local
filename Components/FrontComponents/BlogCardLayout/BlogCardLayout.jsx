import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import "./BlogCardLayout.scss"
import { formatDate } from '@/Utils/Utils'

function BlogCardLayout(props) {
    const updatedDate = formatDate(props?.item?.date_posted)
    return (
        <Link className='blogCard' href={""}>
            <figure>
                <Image src={'/images/cars/6.webp'} fill alt={`${props?.item?.title}`} />
            </figure>
            <div class="content">
                <h2>
                    {props?.item?.title}
                </h2>
                <p>
                    {props?.item?.min_content}
                </p>
                <div class="author">
                    <h4>{props?.item?.author?.name}</h4>
                    <h6>
                        {updatedDate}
                    </h6>
                </div>
            </div>
        </Link>
    )
}

export default BlogCardLayout