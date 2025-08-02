import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Sidebar from '../components/Sidebar.jsx';
import Deskmenu from '../components/deskmenu.jsx';
import Footer from '../components/Footer.jsx';

import aboutlogo from '../assets/images/about/about.jpg';
import defaultblog from '../assets/images/blog_images/1.jpg';

const Blog = () => {
  const [openModal, setOpenModal] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    fetch('/blog')
      .then((res) => res.json())
      .then((data) => {
        if (data?.status?.success && Array.isArray(data.data?.blogDTOList)) {
          setBlogs(data.data.blogDTOList);
        }
      })
      .catch((err) => console.error('Error fetching blogs:', err));
  }, []);

  const handleOpenModal = (blog) => {
    setSelectedBlog(blog);
    setOpenModal(true);
  };

  return (
    <>
      <div className="container grid grid-cols-12 md:gap-10 justify-between lg:mt-[220px]">
        <Sidebar />
        <div className="col-span-12 lg:col-span-8">
          <Deskmenu />
          <div className="bg-white lg:rounded-2xl dark:bg-[#111111]">
            <div className="container px-4 sm:px-5 md:px-10 lg:px-[60px]">
              <div className="py-12">
                <h2 className="after-effect after:left-32 lg:mt-0">Blogs</h2>
                <div className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 mt-[30px] grid gap-x-10 gap-y-7 mb-6">
                  {blogs.map((blog, index) => (
                    <div
                      key={index}
                      className="p-5 rounded-lg mb-2 h-full bg-[#fcf4ff] dark:bg-transparent dark:border-[#212425] dark:border-2"
                    >
                      <div className="overflow-hidden rounded-lg">
                        <img
                          className="rounded-lg w-full h-48 object-cover cursor-pointer transition duration-200 ease-in-out transform hover:scale-110"
                          src={blog.blogIconPath || defaultblog}
                          alt="blog"
                          onClick={() => handleOpenModal(blog)}
                        />
                      </div>
                      <div className="flex mt-4 text-tiny text-gray-lite dark:text-[#A6A6A6]">
                        <span>17 April</span>
                        <span className="dot-icon">Inspiration</span>
                      </div>
                      <h3
                        className="text-lg font-medium dark:text-white duration-300 transition cursor-pointer mt-3 pr-4 hover:text-[#FA5252] dark:hover:text-[#FA5252]"
                        onClick={() => handleOpenModal(blog)}
                      >
                        {blog.name}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>

        {/* MODAL */}
        {openModal && selectedBlog && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black opacity-50 cursor-pointer"
              onClick={() => setOpenModal(false)}
            ></div>

            {/* Modal Content */}
            <div className="md:p-8 p-4 bg-white dark:bg-[#111111] rounded-lg max-w-3xl w-full max-h-full relative z-50 overflow-y-scroll max-h-[80vh]">
              <img
                className="w-full md:h-[450px] object-cover rounded-xl mt-6"
                src={selectedBlog.blogIconPath || defaultblog}
                alt="blog"
              />
              <div className="flex mt-4 text-tiny text-black dark:text-white">
                <span>17 April</span>
                <span className="dot-icon">Inspiration</span>
              </div>
              <h2 className="dark:text-white sm:text-3xl mt-2 font-medium">
                {selectedBlog.name}
              </h2>
              <p className="dark:text-white font-normal text-[15px] sm:text-sm my-4">
                {selectedBlog.description}
              </p>

              {/* <div className="rounded-lg mt-6 bg-gradient-to-r from-[#FA5252] to-[#DD2476] p-[1px]">
                <div className="dark:bg-[#232220] bg-[#ffffff] flex p-4 rounded-lg">
                  <img
                    className="md:w-[125px] rounded-xl"
                    src={aboutlogo}
                    alt="author"
                  />
                  <div className="pl-5">
                    <div className="flex justify-between items-center">
                      <h3 className="dark:text-white text-[22px] font-medium">Rafia Ana</h3>
                      <span className="dark:text-[#dedede] text-tiny">15 min ago</span>
                    </div>
                    <p className="dark:text-white md:pr-16">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi nam ad...
                    </p>
                    <button className="dark:text-[#dedede] text-tiny hover:text-[#FA5252] dark:hover:text-[#FA5252]">
                      Reply
                    </button>
                  </div>
                </div>
              </div> */}

              <button
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => setOpenModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Blog;
