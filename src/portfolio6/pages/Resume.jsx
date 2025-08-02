import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer.jsx';

const Resume = () => {
  const [educationList, setEducationList] = useState([]);
  const [experienceList, setExperienceList] = useState([]);
  const [skills, setSkills] = useState([]);

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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="bg-white lg:rounded-2xl dark:bg-[#111111] flex flex-col">
      <div data-aos="fade" className="aos-init aos-animate">
        <div className="container sm:px-5 md:px-10 lg:px-20">
          <div className="py-12 px-4">
            <h2 className="after-effect after:left-44 mb-[40px] mt-12 lg:mt-0">Resume</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-6">
              {/* Education */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <i className="fa-solid text-6xl text-[#F95054] fa-graduation-cap"></i>
                  <h4 className="text-5xl dark:text-white font-medium">Education</h4>
                </div>
                {educationList.map((edu, index) => (
                  <div key={index}
                    className="py-4 dark:bg-transparent bg-[#fff4f4] pl-5 pr-3 space-y-2 mb-6 rounded-lg dark:border-[#212425] dark:border-2"
                  >
                    <span className="text-tiny text-gray-lite dark:text-[#b7b7b7]">
                      {formatDate(edu.joiningDate)} - {formatDate(edu.passingDate)}
                    </span>
                    <h3 className="text-xl dark:text-white">{edu.degree}</h3>
                    <p className="dark:text-[#b7b7b7]">{edu.university} - {edu.grade}</p>
                  </div>
                ))}
              </div>

              {/* Experience */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <i className="fa-solid text-6xl text-[#F95054] fa-briefcase"></i>
                  <h4 className="text-5xl dark:text-white font-medium">Experience</h4>
                </div>
                {experienceList.map((exp, index) => (
                  <div key={index}
                    className="py-4 dark:bg-transparent bg-[#eef5fa] pl-5 pr-3 space-y-2 mb-6 rounded-lg dark:border-[#212425] dark:border-2"
                  >
                    <span className="text-tiny text-gray-lite dark:text-[#b7b7b7]">{exp.years} Years</span>
                    <h3 className="text-xl dark:text-white">{exp.position}</h3>
                    <p className="dark:text-[#b7b7b7]">{exp.companyName}</p>
                    <p className="dark:text-[#b7b7b7]">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="container bg-[#f8fbfb] dark:bg-[#0D0D0D] py-12 px-4 sm:px-5 md:px-10 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="col-span-1">
              <h4 className="text-5xl dark:text-white font-medium mb-6">Working Skills</h4>
              {skills.length > 0 ? (
                skills.map((skill) => (
                  <div className="mb-5" key={skill.id}>
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold text-[#526377] dark:text-[#A6A6A6]">{skill.title}</span>
                      <span className="font-semibold text-[#526377] dark:text-[#A6A6A6]">{skill.percentage}%</span>
                    </div>
                    <div className="w-full bg-[#edf2f2] rounded-full h-1 dark:bg-[#1c1c1c]">
                      <div
                        className="h-1 rounded-full"
                        style={{
                          width: `${skill.percentage}%`,
                          backgroundColor: '#FF6464', // Optional: change per skill if needed
                        }}
                      ></div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No skills available.</p>
              )}
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Resume;