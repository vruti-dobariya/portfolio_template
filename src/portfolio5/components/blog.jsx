import React, { useState, useEffect } from 'react';
import fallbackImage from '../assets/img/blog/blog-post-1.jpg';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

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

  return (
    <div className="w-full relative">
      {/* Section Title */}
      <div className="mx-auto w-full relative py-80 text-center xs:px-25 xs:pt-16 xs:pb-14 xs:bg-black-3 xs:border-b xs:border-black-4 xs:fixed xs:left-0 xs:right-0 xs:top-0 xs:z-20">
          <h2 className="text-fs-56 font-black font-Poppins uppercase dark:text-white text-black-6 m-0 xs:text-fs-26  xs:leading-lh-1.2 text-center">
            my <span className="text-accent">blog</span>
          </h2>
          <span className="text-fs-110 absolute left-0 right-0 top-1/2 tracking-10 leading-lh-0.7 font-extrabold text-light-grey-2 dark:text-muted  -translate-y-1/2 uppercase xs:hidden">
            posts
          </span>
      </div>

      <div className="xl:max-w-1140 lg:max-w-960 md:max-w-720 sm:max-w-540 xs:max-w-full mx-auto">
        {/* Blog Posts */}
        <div className="flex flex-wrap down-sm:flex-col pt-20">
          {blogs.length > 0 ? (
            blogs.map((post, index) => (
              <div key={index} className="w-1/3 down-xl:w-1/2 down-sm:w-full px-16 xs:px-0 mb-30">
                <div className="h-full dark:bg-black-3 bg-light-grey-3 rounded-5">
                  <div className="rounded-t-5 cursor-pointer post-thumb">
                    <div
                      onClick={() => setSelectedPost(post)}
                      className="rounded-t-5 relative overflow-hidden block group outline-0 transition-all duration-300 relative overflow-hidden pt-[60%]"
                    >
                      <img
                        className="rounded-t-5 transition-all duration-300 group-hover:scale-125 absolute h-full w-full inset-0 object-cover"
                        src={post.blogIconPath || fallbackImage}
                        alt={post.name}
                      />
                    </div>
                  </div>
                  <div className="dark:bg-black-3 bg-light-grey-3 pt-20 px-25 pb-25 rounded-b-5">
                    <p className='text-xs mb-2'>{post.date}</p>
                    <p className="leading-lh-26 text-fs-20 font-semibold text-accent-hover transition duration-300">
                      {post.name}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white">Loading blogs...</p>
          )}
        </div>
      </div>

      {/* Modal Popup */}
      {selectedPost && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 cursor-pointer"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="bg-white rounded-lg max-w-lg w-full p-6 relative text-black cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-2 right-3 text-xl font-bold text-gray-700 hover:text-red-500"
            >
              &times;
            </button>
            <img
              src={selectedPost.blogIconPath || fallbackImage}
              alt={selectedPost.name}
              className="rounded-md w-full h-64 object-cover block mb-3"
            />
            <p className="text-xs text-gray-500 mb-2">{selectedPost.date}</p>
            <h3 className="text-xl font-bold mb-2">{selectedPost.name}</h3>
            <p className="text-gray-700">{selectedPost.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
