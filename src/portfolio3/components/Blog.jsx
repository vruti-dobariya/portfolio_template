import React, { useEffect, useState } from 'react';
import defaultBlogImage from '../assets/img/blog-1.jpg';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null); // for popup

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

  const closePopup = () => {
    setSelectedBlog(null);
  };

  return (
    <section data-scroll-index="4" id="blog" className="section">
      <div className="container">
        <div className="title">
          <h3>Latest Blog.</h3>
        </div>
        <div className="grid grid-cols-12 gap-7">
          {blogs.map((item) => (
            <div key={item.id} className="col-span-12 md:col-span-6">
              <div
                className="blog-grid cursor-pointer"
                onClick={() => setSelectedBlog(item)}
              >
                <div className="blog-img relative overflow-hidden pt-[60%]">
                  <img
                    className='absolute h-full w-full inset-0 object-cover'
                    src={item.blogIconPath || defaultBlogImage}
                    alt={item.name}
                  />
                </div>
                <div className="blog-info">
                  <div className="meta">{item.date}</div>
                  <h6>{item.name}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* === Popup Modal === */}
        {selectedBlog && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 cursor-pointer "
          onClick={closePopup}
        >
          <div
            className="bg-white rounded-xl p-6 max-w-xl relative shadow-lg blog_modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-3 text-3xl font-bold "
              onClick={closePopup}
            >
              &times;
            </button>
            <img
              className="mb-4 w-full rounded"
              src={selectedBlog.blogIconPath || defaultBlogImage}
              alt={selectedBlog.name}
            />
            <h4 className="text-xl font-semibold mb-2">{selectedBlog.name}</h4>
            <p className="text-gray-700 modal_dis">{selectedBlog.description}</p>
          </div>
        </div>
      )}

      </div>
    </section>
  );
};

export default Blog;
