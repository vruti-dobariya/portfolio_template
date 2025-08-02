import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { styles } from "../../constants/styles";
import { fadeIn } from "../../utils/motion";
import { Header } from "../atoms/Header";
import { config } from "../../constants/config";
import noImage from '../../assets/user_placeholder.jpg';

const FeedbackCard = ({ index, testimonial, name, designation, company, image }) => (
  <motion.div
    variants={fadeIn("", "spring", index * 0.5, 0.75)}
    className="bg-black-200 xs:w-[320px] w-full rounded-3xl p-10"
  >
    <p className="text-[48px] font-black text-white">"</p>

    <div className="mt-1">
      <p className="text-[18px] tracking-wider text-white">{testimonial}</p>

      <div className="mt-7 flex items-center justify-between gap-1">
        <div className="flex flex-1 flex-col">
          <p className="text-[16px] font-medium text-white">
            <span className="blue-text-gradient">@</span> {name}
          </p>
          <p className="text-secondary mt-1 text-[12px]">
            {designation} of {company}
          </p>
        </div>

        <img
          src={image || noImage}
          alt={`feedback_by-${name}`}
          className="h-10 w-10 rounded-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = noImage;
          }}
        />
      </div>
    </div>
  </motion.div>
);

const Feedbacks = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch('/otherServices/testimonial')
      .then((res) => res.json())
      .then((data) => {
        if (data?.status?.success && data?.data?.testimonialDetailDTOList) {
          const transformed = data.data.testimonialDetailDTOList.map((item) => ({
            name: item.name || 'Anonymous',
            testimonial: item.description || '',
            designation: item.designation || 'Customer',
            company: item.company || 'Anonymous',
            image: item.testimonialPath || noImage,
          }));
          setTestimonials(transformed);
        }
      })
      .catch((err) => console.error('Error fetching testimonials:', err));
  }, []);

  return (
    <div className="bg-black-100 mt-12 rounded-[20px]">
      <div className={`${styles.padding} bg-tertiary min-h-[300px] rounded-2xl`}>
        <Header useMotion={true} {...config.sections.feedbacks} />
      </div>
      <div className={`${styles.paddingX} -mt-20 flex flex-wrap gap-7 pb-14 max-sm:justify-center`}>
        {testimonials.map((testimonial, index) => (
          <FeedbackCard key={testimonial.name + index} index={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

export default Feedbacks;
