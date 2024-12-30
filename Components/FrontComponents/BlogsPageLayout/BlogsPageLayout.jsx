'use client'
import React, { memo, useEffect, useState } from 'react'
import "./BlogsPageLayout.scss"
import blogsData from "@/DummyData/BlogsData.json"
import BlogCardLayout from '../BlogCardLayout/BlogCardLayout'
import SecHeading from '@/Components/SecHeading/SecHeading'

function BlogsPageLayout() {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;
  const pageNumbers = [];

  // Calculate the index of the last blog on the current page
  const indexOfLastBlog = currentPage * blogsPerPage;
  // Calculate the index of the first blog on the current page
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  // Get the current blogs for the page
  const currentBlogs = blogsData.slice(indexOfFirstBlog, indexOfLastBlog);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle previous page
  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle next page
  const nextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Generate page numbers for pagination
  for (let i = 1; i <= Math.ceil(blogsData.length / blogsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <section className="blogsSec">
      <div className="customContainer">
        <div className="headingCont">
          <SecHeading heading="Blogs" />
        </div>
        <div className="blogsRow">
          {currentBlogs.map((item, index) => (
            <div className="blogCol" key={index}>
              <BlogCardLayout item={item} />
            </div>
          ))}
        </div>
        <div className="pagination">
          {/* Left Button */}
          <button onClick={previousPage} disabled={currentPage === 1}>
            <i className="fas fa-chevron-left" />
          </button>

          {/* Page Numbers */}
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`pageButton ${number === currentPage ? 'active' : ''}`}
            >
              {number}
            </button>
          ))}

          {/* Right Button */}
          <button onClick={nextPage} disabled={currentPage === pageNumbers.length}>
            <i className="fas fa-chevron-right" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default BlogsPageLayout
