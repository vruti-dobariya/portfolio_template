import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import Deskmenu from '../components/deskmenu.jsx';
import Footer from '../components/Footer.jsx';

const Resume = () => {
  const [educationList, setEducationList] = useState([]);
  const [experienceList, setExperienceList] = useState([]);
  const [skills, setSkills] = useState([]);

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

  // Fetch Education
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

  // Fetch Experience
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
    <div className="container grid grid-cols-12 md:gap-10 justify-between lg:mt-[220px]">
      <Sidebar />
      <div className="col-span-12 lg:col-span-8">
        <Deskmenu />
        <div>
          <div className="bg-white lg:rounded-2xl dark:bg-[#111111]">
            <div className="container sm:px-5 md:px-10 lg:px-14">
              <div className="py-12 px-4 md:px-0">
                <h2 className="after-effect after:left-44">Resume</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 mt-[30px]">
                  
                  {/* Education */}
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <i className="fa-solid text-6xl text-[#F95054] fa-graduation-cap"></i>
                      <h4 className="text-5xl dark:text-white font-medium">Education</h4>
                    </div>
                    {educationList.map((edu, idx) => (
                      <div
                        key={idx}
                        className={`py-4 pl-5 pr-3 space-y-2 mb-6 rounded-lg dark:border-[#212425] dark:border-2 ${
                          idx % 2 === 0 ? 'bg-[#fff4f4]' : 'bg-[#fff1fb]'
                        } dark:bg-transparent`}
                      >
                        <span className="text-tiny text-gray-lite dark:text-[#b7b7b7]">
                          {formatDate(edu.joiningDate)} - {formatDate(edu.passingDate)}
                        </span>
                        <span className="text-tiny text-gray-lite dark:text-[#b7b7b7]">{edu.year}</span>
                        <h3 className="text-xl dark:text-white">{edu.degree}</h3>
                        <p className="dark:text-[#b7b7b7]">{edu.university} - Grade: {edu.grade}</p>
                      </div>
                    ))}
                  </div>

                  {/* Experience */}
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <i className="fa-solid text-6xl text-[#F95054] fa-briefcase"></i>
                      <h4 className="text-5xl dark:text-white font-medium">Experience</h4>
                    </div>
                    {experienceList.map((exp, idx) => (
                      <div
                        key={idx}
                        className={`py-4 pl-5 pr-3 space-y-2 mb-6 rounded-lg dark:border-[#212425] dark:border-2 ${
                          idx % 2 === 0 ? 'bg-[#eef5fa]' : 'bg-[#f2f4ff]'
                        } dark:bg-transparent`}
                      >
                        <span className="text-tiny text-gray-lite dark:text-[#b7b7b7]">{formatDate(exp.fromDate)} - {formatDate(exp.toDate)}</span>
                        <h3 className="text-xl dark:text-white">{exp.position}</h3>
                        <p className="dark:text-[#b7b7b7]">{exp.companyName}</p>
                        <p className="dark:text-[#b7b7b7] text-sm">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="container bg-color-810 dark:bg-[#0D0D0D] py-12 px-3.5 sm:px-5 md:px-10 lg:px-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Working Skills */}
                <div>
                  <h4 className="text-5xl dark:text-white font-medium mb-6">Working Skills</h4>
                 {skills.length > 0 ? (
                    skills.map((skill) => (
                      <div key={skill.id} className="mb-5">
                        <div className="flex justify-between mb-1">
                          <span className="font-semibold text-[#526377] dark:text-[#A6A6A6]">{skill.title}</span>
                          <span className="font-semibold text-[#526377] dark:text-[#A6A6A6]">{skill.percentage}%</span>
                        </div>
                        <div className="w-full bg-[#edf2f2] rounded-full h-1 dark:bg-[#1c1c1c]">
                          <div
                            className="h-1 rounded-full"
                            style={{ width: `${skill.percentage}%`, backgroundColor: '#FF6464' }}
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

            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
