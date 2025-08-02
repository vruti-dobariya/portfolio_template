import React, { useEffect, useState } from 'react';
import placeholderBg from '../assets/images/placeholder_bg.jpg';
import defaultBanner from '../assets/images/user_placeholder.jpg';
import Designation from './Designation';
import { generateVCard } from '../utils/generateVCard';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Info = () => {
  const [educationList, setEducationList] = useState([]);
  const [experienceList, setExperienceList] = useState([]);
  const [products, setProducts] = useState([]);
  const [bannerImg, setBannerImg] = useState(defaultBanner);
  const [userData, setUserData] = useState(null);
  const [skills, setSkills] = useState([]);

  // Fetch education data
  useEffect(() => {
    fetch('/admin/qualifications/getByUuid')
      .then((res) => res.json())
      .then((data) => {
        if (data?.status?.success && Array.isArray(data.data)) {
          setEducationList(data.data);
        }
      })
      .catch((err) => console.error('Error fetching education:', err));
  }, []);

  // Fetch experience data
  useEffect(() => {
    fetch('/admin/experience/getByUuid')
      .then((res) => res.json())
      .then((data) => {
        if (data?.status?.success && Array.isArray(data.data)) {
          setExperienceList(data.data);
        }
      })
      .catch((err) => console.error('Error fetching experience:', err));
  }, []);

  // Fetch product/portfolio data
  useEffect(() => {
    fetch('/otherServices/product')
      .then((res) => res.json())
      .then((data) => {
        if (data?.status?.success && Array.isArray(data.data?.productDetailDTOList)) {
          setProducts(data.data.productDetailDTOList);
        }
      })
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

  useEffect(() => {
    fetch('/admin/skill/getByUuid')
      .then(res => res.json())
      .then(data => {
        if (data?.status?.success && Array.isArray(data.data)) {
          setSkills(data.data);
        }
      })
      .catch(err => console.error('Error fetching skills:', err));
  }, []);

  // Fetch user details + profile image
  useEffect(() => {
    fetch('/admin/getImages')
      .then(res => res.json())
      .then(data => {
        if (data?.status?.success && data.data?.profilePhotoPath) {
          setBannerImg(data.data.profilePhotoPath);
        }
      })
      .catch(() => setBannerImg(defaultBanner));

    fetch('/admin/getBasicDetails')
      .then(res => res.json())
      .then(data => {
        if (data?.data) {
          setUserData(data.data);
        }
      });
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleDownloadVCF = () => {
    generateVCard();
  };

  return (
    <>
      {/* Hidden data for vCard */}
      <div style={{ display: 'none' }}>
        <span id="firstname">{userData?.firstName}</span>
        <span id="lastname">{userData?.lastName}</span>
        <span id="jobTitle">{userData?.jobTitle}</span>
        <span id="primaryMail">{userData?.primaryMail}</span>
        <span id="secondaryMail">{userData?.secondaryMail}</span>
        <span id="primaryContact">{userData?.primaryContact}</span>
        <span id="secondaryContact_contact">{userData?.secondaryContact}</span>
        <span id="cardName">{userData?.cardName || 'My Company'}</span>
        <span id="address">{userData?.address}</span>
        <span id="dob">{userData?.dateOfBirth}</span>
        <img id="profilePhotoPath" src={bannerImg} alt="profile" width="200" />
        <img id="companyLogoPath" src="/logo192.png" alt="logo" width="200" />
      </div>

      <div className="w-full lg:w-1/2">
        <div className='p-8 lg:p-16 space-y-10'>

          {/* About */}
          <section>
            <h2 className="text-3xl font-semibold text-gray-700 mb-2">About</h2>
            <p className="text-gray-600 leading-relaxed description mb-4">
              Jordan is an accomplished Art Director and Graphic Designer with a keen eye for visual storytelling and a passion for creating impactful, innovative designs.
            </p>
            <p className="font-bold text-lg text-gray-800">Location</p>
            <p className="text-gray-600 address">New York City</p>
            <p className="font-bold text-lg text-gray-800 mt-4">Contact</p>
            <p className="text-gray-600 primaryContact">hello@jordanreese.com</p>
          </section>

          {/* Experience */}
          <section>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Experience</h2>
            {experienceList.map((exp) => (
              <div key={exp.id} className='mb-6 last:mb-0'>
                <h3 className="font-bold text-lg text-gray-800">{exp.companyName}</h3>
                <p className="text-sm italic text-gray-600">{exp.position} | {formatDate(exp.fromDate)} - {formatDate(exp.toDate)}</p>
                <p className="mt-2 text-gray-600">{exp.description}</p>
              </div>
            ))}
          </section>

          {/* Portfolio */}
          <section>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Portfolio</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {products.length > 0 ? (
                products.map((product) => (
                  <div key={product.id} className="space-y-1">
                    <a href={product.url} className='relative overflow-hidden pt-[70%] block'>
                      <img
                        src={product.productPath || placeholderBg}
                        className="rounded absolute h-full w-full inset-0 object-cover mb-2"
                        alt={product.name}
                      />
                    </a>
                    <p className="text-sm font-semibold text-gray-800">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No products available.</p>
              )}
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Education</h2>
            {educationList.map((edu) => (
              <div key={edu.id} className='mb-4 last:mb-4'>
                <p className="font-medium text-gray-800">{edu.degree}</p>
                <p className="text-sm text-gray-600">
                  {edu.university} · {formatDate(edu.joiningDate)} - {formatDate(edu.passingDate)}
                </p>
              </div>
            ))}
          </section>

          {/* Skills */}
         <section>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Skills</h2>
            {skills.length > 0 ? (
              <ul className="list-disc pl-6 text-gray-600 space-y-1 text-sm">
                {skills.map(skill => (
                  <li key={skill.id}>
                    <strong>{skill.title}:</strong> {skill.description}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No skills available.</p>
            )}
          </section>

          {/* Download vCard */}
          <div>
            <button
              onClick={handleDownloadVCF}
              className="flex items-center gap-2 bg-[#214734] text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-green-800 transition"
            >
               <i className="fas fa-download" />
              Save Contact
            </button>
          </div>

        </div>

        <Designation />
      </div>
    </>
  );
};

export default Info;