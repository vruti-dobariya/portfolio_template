import React, { useEffect, useState } from 'react';
import blog from '../asset/images/blog.jpg';
import ScrollTop from '../components/ScrollTop';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function Blog() {
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
  };

  const handleCloseModal = () => {
    setSelectedBlog(null);
  };

  return (
    <>
      <main className="main__content_wrapper inner__page--content">
        <div className="page__heading">
          <h1 className="page__heading--title">BLOG</h1>
          <h2 className="page__heading--subtitle">BLOG</h2>
        </div>

        <div className="blog__section section--padding">
          <div className="container">
            <div className="blog__section--inner">
              <div className="row mb--n30 justify-content-center">
                {blogs.map((item, index) => (
                  <div key={index} className="col-lg-4 col-md-6 col-sm-6 mb-30">
                    <article className="blog__card" onClick={() => handleOpenModal(item)} data-bs-toggle="modal" data-bs-target="#blogModal" style={{ cursor: 'pointer' }}>
                      <div className="blog__card--thumbnail">
                        <img
                          src={item.blogIconPath || blog}
                          alt={item.name || 'Blog image'}
                        />
                      </div>
                      <div className="blog__card--content">
                        <span className="blog__card--tag">{item.date}</span>
                        <h3 className="blog__card--title mb-12 line-clamp">{item.name}</h3>
                        <p className="blog__card--desc line-clamp">
                          {item.description}
                        </p>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      <div className="modal fade" id="blogModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{selectedBlog?.name}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
            </div>
            <div className="modal-body">
              <img
                src={selectedBlog?.blogIconPath || blog}
                alt={selectedBlog?.name}
                className="img-fluid mb-3 rounded"
              />
              <p className="text-muted">{selectedBlog?.date}</p>
              <p>{selectedBlog?.description}</p>
            </div>
          </div>
        </div>
      </div>

      <ScrollTop />
    </>
  );
}

export default Blog;
