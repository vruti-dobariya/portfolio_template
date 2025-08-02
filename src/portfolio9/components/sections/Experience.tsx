import React, { useEffect, useState } from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';

import 'react-vertical-timeline-component/style.min.css';

import { SectionWrapper } from '../../hoc';
import { Header } from '../atoms/Header';
import { config } from '../../constants/config';

const ExperienceCard = ({ title, companyName, fromDate, toDate, description }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <VerticalTimelineElement
      contentStyle={{ background: '#1d1836', color: '#fff' }}
      contentArrowStyle={{ borderRight: '7px solid  #232631' }}
      date={`${formatDate(fromDate)} - ${formatDate(toDate)}`}
      iconStyle={{ background: '#232631', color: '#fff' }}
      icon={
        <div className="flex h-full w-full items-center justify-center">
          <span className="text-white font-bold text-[16px]">💼</span>
        </div>
      }
    >
      <h3 className="text-[24px] font-bold text-white">{title}</h3>
      <p className="text-secondary text-[16px] font-semibold" style={{ margin: 0 }}>
        {companyName}
      </p>
      <p className="text-white-100 pl-1 text-[14px] mt-2">{description}</p>
    </VerticalTimelineElement>
  );
};

const EducationCard = ({ degree, university, joiningDate, passingDate, description }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <VerticalTimelineElement
      contentStyle={{ background: '#0f1c2f', color: '#fff' }}
      contentArrowStyle={{ borderRight: '7px solid  #1c2a38' }}
      date={`${formatDate(joiningDate)} - ${formatDate(passingDate)}`}
      iconStyle={{ background: '#1c2a38', color: '#fff' }}
      icon={
        <div className="flex h-full w-full items-center justify-center">
          <span className="text-white font-bold text-[16px]">🎓</span>
        </div>
      }
    >
      <h3 className="text-[22px] font-bold text-white">{degree}</h3>
      <p className="text-secondary text-[16px] font-semibold" style={{ margin: 0 }}>
        {university}
      </p>
      <p className="text-white-100 pl-1 text-[14px] mt-2">{description}</p>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  const [experienceList, setExperienceList] = useState([]);
  const [educationList, setEducationList] = useState([]);

  useEffect(() => {
    // fetch experience
    fetch('/admin/experience/getByUuid')
      .then((res) => res.json())
      .then((data) => {
        if (data?.status?.success && Array.isArray(data.data)) {
          setExperienceList(data.data);
        }
      })
      .catch((err) => console.error('Error fetching experience:', err));

    // fetch education
    fetch('/admin/qualifications/getByUuid')
      .then((res) => res.json())
      .then((data) => {
        if (data?.status?.success && Array.isArray(data.data)) {
          setEducationList(data.data);
        }
      })
      .catch((err) => console.error('Error fetching education:', err));
  }, []);

  return (
    <>
      <Header useMotion={true} {...config.sections.experience} />

      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {/* Education Timeline */}
          {educationList.map((edu, index) => (
            <EducationCard key={`edu-${index}`} {...edu} />
          ))}

          {/* Experience Timeline */}
          {experienceList.map((exp, index) => (
            <ExperienceCard
              key={`exp-${index}`}
              title={exp.position}
              companyName={exp.companyName}
              fromDate={exp.fromDate}
              toDate={exp.toDate}
              description={exp.description}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, 'work');
