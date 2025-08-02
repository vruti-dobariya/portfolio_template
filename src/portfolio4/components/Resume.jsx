import React, { useEffect, useState } from 'react';
import title2 from '../assets/img/title-2.jpg';

const Services = () => {
  const [educationList, setEducationList] = useState([]);
  const [experienceList, setExperienceList] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetch('/admin/qualifications/getByUuid')
      .then((res) => res.json())
      .then((data) => {
        console.log("Education Response:", data);
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
        console.log("Experience Response:", data);
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
        console.log("Skills Response:", data);
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
    <section className="page resume-section bg-white" id="resume">
      <div className="p-0">
        <div className="grid grid-cols-12">
          <div
            className="col-span-12 lg:col-span-3 xl:col-span-4 page-title"
            style={{ backgroundImage: `url(${title2})` }}
          >
            <div className="min-h-full flex items-end">
              <h2>My Resume</h2>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-9 xl:col-span-8">
            <div className="page-scroll">
              <div className="page-content">
                <div className="section-titel">
                  <h6>History</h6>
                  <div className="st-title">
                    <h2>My Resume</h2>
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-7">
                  {/* Experience Section */}
                  <div className="col-span-12 lg:col-span-6">
                    <div className="resume-row">
                      <h2>Experience</h2>
                      <ul>
                        {experienceList.map((exp) => (
                          <li key={exp.id}>
                            <div className="r-name">
                              <i className="ti-briefcase"></i>
                              <span>{exp.companyName}</span>
                              <label>{formatDate(exp.fromDate)} - {formatDate(exp.toDate)}</label>
                              <label>{exp.position} | {exp.years} Years</label>
                            </div>
                            <div className="r-info">
                              <p>{exp.description}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Education Section */}
                  <div className="col-span-12 lg:col-span-6">
                    <div className="resume-row">
                      <h2>Education</h2>
                      <ul>
                        {educationList.map((edu) => (
                          <li key={edu.id}>
                            <div className="r-name">
                              <i className="fas fa-graduation-cap"></i>
                              <span>{edu.university}</span>
                              <label>{formatDate(edu.joiningDate)} - {formatDate(edu.passingDate)}</label>
                              <label>Degree : {edu.degree}</label>
                            </div>
                            <div className="r-info">
                              <p>Grade: {edu.grade}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Skills Section */}
                <div className="skill-row mt-[30px]">
                  <div className="sub-title mb-[30px]">
                    <h2>My Skills</h2>
                  </div>

                  <div className="grid grid-cols-12 gap-7">
                    {/* Design Skills */}
                    <div className="col-span-12 lg:col-span-6">
                      <h3>Skills</h3>
                      <div className="skills">
                        {skills.length > 0 ? (
                          skills.map((skill) => (
                            <div className="progress-lt" key={skill.id}>
                              <h6>{skill.title}</h6>
                              <span>{skill.percentage}%</span>
                              <div className="progress">
                                <div className="progress-bar" style={{ width: `${skill.percentage}%` }}></div>
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
                </div>

              </div> {/* page-content */}
            </div> {/* page-scroll */}
          </div>
        </div> {/* grid */}
      </div>
    </section>
  );
};

export default Services;
