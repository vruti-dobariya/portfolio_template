import React, { useState, useEffect } from 'react';
import Designation from './Designation.jsx';
import defaultBanner from '../assets/img/user_placeholder.jpg';

const About = () => {
  const [educationList, setEducationList] = useState([]);
  const [experienceList, setExperienceList] = useState([]);  
  const [bannerImg, setBannerImg] = useState(defaultBanner);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetch('/admin/getImages')
      .then(res => res.json())
      .then(data => {
        if (data?.status?.success) {
          const path = data.data?.profilePhotoPath;
          if (path) {
            setBannerImg(path);
          }
        }
      })
      .catch(() => {
        setBannerImg(defaultBanner); 
      });
  }, []);

  useEffect(() => {
    fetch('/admin/skill/getByUuid')
      .then((res) => res.json())
      .then((data) => {
        if (data?.status?.success && Array.isArray(data.data)) {
          setSkills(data.data);
        }
      })
      .catch((err) => console.error('Error fetching skills:', err));
  }, []);

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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  return (
      <div className="w-full about_section">
        <div className="mx-auto w-full relative py-80 text-center xs:px-25 xs:pt-16 xs:pb-14 xs:bg-black-3 xs:border-b xs:border-black-4 xs:fixed xs:left-0 xs:right-0 xs:top-0 xs:z-20">
          <h2 className="text-fs-56 font-black font-Poppins uppercase dark:text-white text-black-6 m-0 xs:text-fs-26  xs:leading-lh-1.2 text-center">
            about <span className="text-accent">me</span>
          </h2>
          <span className="text-fs-110 absolute left-0 right-0 top-1/2 tracking-10 leading-lh-0.7 font-extrabold text-light-grey-2 dark:text-muted  -translate-y-1/2 uppercase xs:hidden">
            resume
          </span>
        </div>

        <div className="xl:max-w-1140 custom-md-3:max-w-[calc(100%-195px)] lg:max-w-960 md:max-w-720 sm:max-w-540 xs:max-w-full mx-auto">
          <div className="flex flex-row down-lg:flex-col">
            <div class="xl:basis-1/2 lg:basis-5/12 down-lg:basis-full down-lg:mt-50">
                <img
                  className="block xs:hidden rounded-full border-4 border-solid border-grey dark:border-black-3 w-[300px] h-[300px] mb-25 mx-auto"
                  src={bannerImg}
                  alt=""
                />
              </div>
            <div className="xl:basis-1/2 lg:basis-7/12 down-lg:basis-full">
              <h3 className="uppercase text-fs-26 xs:text-fs-21 pb-22 dark:text-white text-black-6 font-semibold">
                personal infos
              </h3>

              <img
                className="hidden xs:block rounded-full border-4 border-solid border-grey dark:border-black-3 w-230 h-230 mb-25 mx-auto"
                src={bannerImg}
                alt=""
              />

              <div className="flex justify-between xs:justify-start font-Open-sans capitalize">
                <div className="basis-1/2 [&>div]:pb-20 [&>div:last-child]:pb-0 text-fs-15 xs:text-fs-14">
                  <div>
                    <span className="opacity-80">first name : </span>
                    <span className="xs:block custom-md-2:block font-semibold firstName">steve</span>
                  </div>
                  <div>
                    <span className="opacity-80">last name : </span>
                    <span className="xs:block custom-md-2:block font-semibold lastName">milner</span>
                  </div>
                  <div>
                    <span className="opacity-80">DOB : </span>
                    <span className="xs:block custom-md-2:block font-semibold dateOfBirth">27 years</span>
                  </div>
                </div>

                <div className="basis-1/2 [&>div]:pb-20 [&>div:last-child]:pb-0 text-fs-15 xs:text-fs-14">
                  <div>
                    <span className="opacity-80">phone : </span>
                    <span className="xs:block custom-md-2:block font-semibold primaryContact">+216 21 184 010</span>
                  </div>
                  <div>
                    <span className="opacity-80">email : </span>
                    <span className="xs:block custom-md-2:block font-semibold primaryMail">you@mail.com</span>
                  </div>
                  <div>
                    <span className="opacity-80">address : </span>
                    <span className="xs:block custom-md-2:block font-semibold address">tunis</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <hr class="border-t border-solid border-t-grey dark:border-t-black-3 mx-auto max-w-40prcent mt-70 mb-55" />
            <h3 class="uppercase text-fs-26 xs:text-fs-21 pb-48 dark:text-white text-black-6 font-semibold text-center">
                my skills
            </h3>
            <div class="flex w-full flex-wrap justify-center">
              <div className="flex w-full flex-wrap justify-center">
                {skills.map((skill, index) => (
                  <div className="w-1/4 mb-48 down-sm:w-1/2 xs:mb-16" key={index}>
                    <div className={`c100 p${skill.percentage} !float-none !mx-auto bg-black-3`}>
                      <span>{skill.percentage}%</span>
                      <div className="slice">
                        <div className="bar"></div>
                        <div className="fill"></div>
                      </div>
                    </div>
                    <h6 className="uppercase font-Open-sans !text-center mt-24 xs:mt-8">{skill.title}</h6>
                  </div>
                ))}
              </div>
            </div>
            <hr class="border-t border-solid border-t-grey dark:border-t-black-3 mx-auto max-w-40prcent mt-35 mb-55" />
            <h3 class="uppercase text-fs-26 xs:text-fs-21 pb-48 dark:text-white text-black-6 font-semibold text-center">
                experience & education
            </h3>                  
            <div class="flex down-sm:flex-col from-sm:mb-40">
                <div className="w-1/2 down-sm:w-full">
                  <ul>
                    {experienceList.map((item, index) => (
                      <li key={index} className="relative pr-20 pl-60 mb-50 after:absolute after:top-0 after:left-20 after:bg-black-4 after:w-1 after:h-full">
                        <div className="bg-accent w-40 h-40 absolute left-0 leading-lh-40 text-center z-10 rounded-full dark:text-white text-black-6">
                          <i className="fa fa-briefcase"></i>
                        </div>
                        <span className="dark:text-white bg-light-grey text-fs-12 py-1 px-10 inline-block mb-12 rounded-20 font-semibold dark:bg-black-3 opacity-80 font-Open-sans uppercase">
                          {formatDate(item.fromDate)} - {formatDate(item.ToDate)}
                        </span>
                        <h5 className="uppercase text-fs-18 mt-7 mb-10">
                          {item.position}
                          <span className="opacity-80 font-semibold text-fs-15 relative pl-26 font-Open-sans before:absolute before:w-10 before:h-2 before:bg-white before:left-7 before:top-9 before:opacity-80">
                            {item.companyName}
                          </span>
                        </h5>
                        <p className="font-Open-sans text-fs-14">
                          {item.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="w-1/2 down-sm:w-full">
                  <ul>
                    {educationList.map((item, index) => (
                      <li key={index} className="relative pr-20 pl-60 mb-50 after:absolute after:top-0 after:left-20 after:bg-black-4 after:w-1 after:h-full">
                        <div className="bg-accent w-40 h-40 absolute left-0 leading-lh-40 text-center z-10 rounded-full dark:text-white text-black-6">
                          <i className="fa fa-graduation-cap"></i>
                        </div>
                        <span className="dark:text-white bg-light-grey text-fs-12 py-1 px-10 inline-block mb-12 rounded-20 font-semibold dark:bg-black-3 opacity-80 font-Open-sans uppercase">
                          {formatDate(item.joiningDate)} - {formatDate(item.passingDate)}
                        </span>
                        <h5 className="uppercase text-fs-18 mt-7 mb-10">
                          {item.degree}
                          <span className="opacity-80 font-semibold text-fs-15 relative pl-26 font-Open-sans before:absolute before:w-10 before:h-2 before:bg-white before:left-7 before:top-9 before:opacity-80">
                            {item.university}
                          </span>
                        </h5>
                        <p className="font-Open-sans text-fs-14">
                          Grade: {item.grade}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

            </div>
        </div>
        <Designation />
      </div>
  );
};

export default About;