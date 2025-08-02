import React, { useEffect, useState } from 'react';

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
    .then((res) => res.json())
    .then((data) => {
      if (data?.status?.success && Array.isArray(data.data)) {
        setSkills(data.data);
      }
    })
    .catch((err) => console.error('Error fetching skills:', err));
}, []);


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <section data-scroll-index="2" id="resume" className="section">
      <div className="container">
        <div className="title">
          <h3>Experience.</h3>
        </div>

        <div className="resume-box">
          {experienceList.map((exp, index) => (
            <div className="resume-row box-border" key={index}>
              <div className="grid grid-cols-12 gap-y-7">
                <div className="col-span-12 md:col-span-4 xl:col-span-3">
                  <div className="rb-left">
                    <h6>{exp.position}</h6>
                    <label>{exp.companyName}</label>
                     <p className="text-tiny text-gray-lite dark:text-[#b7b7b7]">
                      {formatDate(exp.fromDate)} - {formatDate(exp.toDate)}
                    </p>
                    <div className="rb-time">Full Time</div>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-8 xl:col-span-9">
                  <div className="rb-right">
                    <h6>About Company</h6>
                    <p>{exp.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="separated"></div>

        <div className="title">
          <h3>Education & Skills</h3>
        </div>

        <div className="grid grid-cols-12 gap-7">
          <div className="col-span-12 lg:col-span-4">
            <ul className="aducation-box">
              {educationList.map((edu, index) => (
                <li key={index}>
                   <span className="text-tiny text-gray-lite dark:text-[#b7b7b7]">
                    {formatDate(edu.joiningDate)} - {formatDate(edu.passingDate)}
                  </span>
                  <span>{edu.year}</span>
                  <h6>{edu.degree}</h6>
                  <p>{edu.university}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 lg:col-span-8 lg:pl-16">
            {/* Hardcoded Skills (you can also fetch these dynamically if needed) */}
            {skills.length > 0 ? (
                skills.map((skill) => (
                  <div key={skill.id} className="skill-lt">
                    <h6>{skill.title}</h6>
                    <span>{skill.percentage}%</span>
                    <div className="skill-bar">
                      <div className="skill-bar-in" style={{ width: `${skill.percentage}%` }}></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{skill.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400">No skills available.</p>
              )}

          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;