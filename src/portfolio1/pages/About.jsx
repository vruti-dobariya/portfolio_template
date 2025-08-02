import React, { useEffect, useState } from 'react';
import about from '../asset/images/other/about.png';
import ScrollTop from '../components/ScrollTop.jsx';
import Designation from '../components/Designation.jsx';

function About() {
  const [educationList, setEducationList] = useState([]);
  const [experienceList, setExperienceList] = useState([]);
  const [skills, setSkills] = useState([]);

  // Fetch Education Data
  useEffect(() => {
    fetch('admin/qualifications/getByUuid')
      .then((res) => res.json())
      .then((data) => {
        console.log("Education Response:", data);
        if (data?.status?.success && Array.isArray(data.data)) {
          setEducationList(data.data);  // Set education data
        }
      })
      .catch((err) => console.error('Error fetching education:', err));
  }, []);

  // Fetch Experience Data
  useEffect(() => {
    fetch('admin/experience/getByUuid')
      .then((res) => res.json())
      .then((data) => {
        console.log("Experience Response:", data);
        if (data?.status?.success && Array.isArray(data.data)) {
          setExperienceList(data.data);  // Set experience data
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

  // Function to format date to 'Month, Year' format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <>
      <main className="main__content_wrapper inner__page--content">
        <div className="page__heading">
            <h1 className="page__heading--title">ABOUT ME</h1>
            <h2 className="page__heading--subtitle">ABOUT <span>ME</span></h2> 
        </div>
        
        <section className="about__section border__bottom section--padding">
            <div className="container">
                <div className="about__section--inner d-flex">
                    <div className="about__content">
                        <div className="section__heading mb-30">
                            <span className="section__heading--subtitle text__secondary">ABOUT ME</span>
                            <h2 className="section__heading--title">I can design world for leading ui/ux</h2> 
                        </div>
                        <div className="about__info">
                            <h3 className="about__info--title text__secondary mb-20">PERSONAL INFOS:</h3>
                            <ul class="about__info--wrapper d-flex">
                                <li class="about__info--items">First Name: <span id="firstName" className='firstName'></span></li>
                                <li class="about__info--items">Last Name: <span id="lastName" className='lastName'>Faron</span></li>
                                <li class="about__info--items">Phone: <span id="primaryContact" className='primaryContact'>+28921184010</span></li>
                                {/* <li class="about__info--items">Age: 24 Years</li>  */}
                                <li class="about__info--items">Date of Birth: <span id="dateOfBirth" className='dateOfBirth'>24 Years</span></li>
                                <li class="about__info--items">Email: <span id="primaryMail" className='primaryMail'>you@mail.com</span></li>
                                <li class="about__info--items">Address: <span id="address" className='address'>Dubai</span></li>
                            </ul>
                            <Designation />
                        </div>
                    </div>
                    <div className="about__thumbnail">
                        <div className="about__thumbnail--media position__relative">
                            <img className="position__relative" src={about} alt="img" />
                        </div>
                        <div className="about__experience text-center">
                            <h4 className="about__experience--title title-stroke">27+</h4>
                            <span className="about__experience--subtitle">Experience Working</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
                    
        <section className="skills__section section--padding ">
            <div className="container">
                <div className="section__heading--topbar d-flex align-items-center justify-content-between mb-50">
                    <div className="section__heading max-width-580">
                        <span className="section__heading--subtitle text__secondary">SKILLs</span>
                        <h2 className="section__heading--title">Skill of Best Masters Software Skills.</h2> 
                    </div>
                    <div className="section__heading--right max-width-450">
                        <p className="section__heading--desc">Promote your blog posts, case udie, and product ouncems
                            with the the branded videoscustomers coming back for
                            services Makes best effort.</p>
                    </div>
                </div>
                <div className="skills__section--inner d-flex justify-content-between">
                    <div className="skills__step">
                      {skills.map((skill) => (
                        <div className="skills__items" key={skill.id}>
                          <div className="skills__text">
                            <span className="skills__name">{skill.skill}</span>
                            <span className="skills__count">{skill.percentage}%</span>
                          </div>
                          <div
                            className="skills__field"
                            
                          >
                            <span style={{ width: `${skill.percentage}%` }}></span>
                          </div>
                        </div>
                      ))}
                    </div>
                </div>
            </div>
        </section>

        <section className="resume__section section--padding">
          <div className="container">
            <div className="section__heading--topbar d-flex align-items-center justify-content-between mb-50">
              <div className="section__heading max-width-580">
                <span className="section__heading--subtitle text__secondary">EXPERIENCE AND EDUCATION</span>
                <h2 className="section__heading--title">Resume of Experience and Education</h2>
              </div>
            </div>
            <div className="resume__section--inner d-flex">
              {/* Education Section */}
              <div className="resume__step">
                <div className="border__position--style"> </div>
                {educationList.map((edu) => (
                  <div className="resume__items" key={edu.id}>
                    <div className="border__round"></div>
                    <div className="resume__items--inner d-flex">
                      <span className="resume__icons">
                        <svg width="25" height="40" fill="currentColor" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                          <path d="M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 8V96H64C28.7 96 0 124.7 0 160v96H192 320 512V160c0-35.3-28.7-64-64-64H384V56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zM512 288H320v32c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V288H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V288z"></path>
                        </svg>
                      </span>
                      <div className="resume__content">
                        <div className="resume__content--top d-flex align-items-center mb-10">
                          <h3 className="resume__content--title">{edu.degree}</h3>
                          <span className="resume__content--subtitle">{edu.university}</span>
                        </div>
                        <p className="resume__content--desc mb-20">{edu.description ? edu.description : 'No description available'}</p>
                        <span className="resume__date">{`${formatDate(edu.joiningDate)} - ${formatDate(edu.passingDate)}`}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Experience Section */}
              <div className="resume__step">
                <div className="border__position--style"> </div>
                {experienceList.map((exp) => (
                  <div className="resume__items" key={exp.id}>
                    <div className="border__round"></div>
                    <div className="resume__items--inner d-flex">
                      <span className="resume__icons">
                        <svg width="25" height="40" fill="currentColor" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                          <path d="M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 8V96H64C28.7 96 0 124.7 0 160v96H192 320 512V160c0-35.3-28.7-64-64-64H384V56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zM512 288H320v32c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V288H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V288z"></path>
                        </svg>
                      </span>
                      <div className="resume__content">
                        <div className="resume__content--top d-flex align-items-center mb-10">
                          <h3 className="resume__content--title">{exp.position}</h3>
                          <span className="resume__content--subtitle">{exp.companyName}</span>
                        </div>
                        <p className="resume__content--desc mb-20">{exp.description}</p>
                        <span className="resume__date">{`${formatDate(exp.fromDate)} - ${formatDate(exp.toDate)}`}</span>
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

export default About;