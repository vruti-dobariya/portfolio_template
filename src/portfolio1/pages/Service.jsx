import React, { useEffect, useState } from 'react';
import ScrollTop from '../components/ScrollTop.jsx';

const Service = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/otherServices')
        .then((res) => res.json())
        .then((data) => {
            console.log('API Response:', data);
            if (data?.status?.success && data?.data?.serviceDTOList) {
            setServices(data.data.serviceDTOList);
            } else {
            console.error('Unexpected data format', data);
            }
            setLoading(false);
        })
        .catch((err) => {
            console.error('Fetch error:', err);
            setLoading(false);
        });
    }, []);
    const colors = ['color1', 'color2', 'color3', 'color4', 'color5', 'color6'];

 return (
    <>
      <main className="main__content_wrapper inner__page--content">
        <div className="page__heading">
          <h1 className="page__heading--title">MY SERVICES</h1>
          <h2 className="page__heading--subtitle">MY <span>SERVICES</span></h2> 
        </div>
        <section className="services__section section--padding">
          <div className="container">
            <div className="services__section--inner">
              <div className="row mb--n30">
                {services.map((service, index) => (
                  <div className="col-lg-4 col-md-6 col-sm-6 mb-30" key={service.id}>
                    <div className="services__card">
                      <span className={`services__card--icon ${colors[index % colors.length]} mb-25`}>
                        {/* Replace this SVG with actual icons if available */}
                        <svg width="40" height="40" viewBox="0 0 24 24" stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="10" strokeWidth="2" />
                        </svg>
                      </span>
                      <div className="services__card--content">
                        <h3 className="services__card--title mb-15">{service.name}</h3>
                        <p className="services__card--desc mb-20">{service.description}</p>
                        {service.serviceUrl ? (
                          <a className={`services__card--link ${colors[index % colors.length]}`} href={service.serviceUrl} target="_blank" rel="noopener noreferrer">Read More</a>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <ScrollTop />
    </>
  );
}

export default Service;