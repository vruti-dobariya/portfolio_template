import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import defaultblog from '../assets/images/blog_images/1.jpg';
import aboutlogo from '../assets/images/about/about.jpg';

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
      <div className="bg-white lg:rounded-2xl dark:bg-[#111111]">
        <div className="container px-4 sm:px-5 md:px-10 lg:px-[60px]">
          <div className="py-12">
            <h2 className="after-effect after:left-32 mt-12 lg:mt-0">Blogs</h2>
            <div className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-[30px] grid gap-x-10 gap-y-7 mb-6">
              {blogs.map((blog, index) => (
                <div
                  key={blog.uuid}
                  className="p-5 rounded-lg mb-2 h-full bg-[#fcf4ff] dark:bg-transparent dark:border-[#212425] dark:border-2"
                >
                  <div className="overflow-hidden rounded-lg">
                    <img
                      className="rounded-lg w-full cursor-pointer transition duration-200 ease-in-out transform hover:scale-110"
                      src={blog.blogIconPath || defaultblog}
                      alt="blog image"
                      onClick={() => handleOpenModal(blog)}
                    />
                  </div>
                  <div className="flex mt-4 text-tiny text-gray-lite dark:text-[#A6A6A6]">
                    <span>{blog.date}</span>
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

      {openModal && selectedBlog && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-50 cursor-pointer"
            onClick={() => setOpenModal(false)}
          ></div>

          {/* Modal */}
          <div className="md:p-8 p-4 bg-white dark:bg-[#111111] rounded-lg max-w-3xl w-full max-h-full relative z-50 overflow-y-auto">
            <img
              className="w-full md:h-[450px] object-cover rounded-xl mt-6"
              src={selectedBlog.blogIconPath || defaultblog}
              alt="blog full"
            />
            <div className="flex mt-4 text-tiny text-black dark:text-white">
              <span>{selectedBlog.date}</span>
            </div>
            <h2 className="dark:text-white sm:text-3xl mt-2 font-medium">
              {selectedBlog.name}
            </h2>
            <p className="dark:text-white font-normal text-[15px] sm:text-sm my-4">
              {selectedBlog.description}
            </p>

            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => setOpenModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Blog;
