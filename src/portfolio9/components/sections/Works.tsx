import React, { useEffect, useState } from 'react';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';

import { github } from '../../assets';
import noImage from '../../assets/blog.jpg';
import { SectionWrapper } from '../../hoc';
import { fadeIn } from '../../utils/motion';
import { config } from '../../constants/config';
import { Header } from '../atoms/Header';

const ProjectCard = ({ index, name, description, image, sourceCodeLink, tags = [] }) => (
  <motion.div variants={fadeIn('up', 'spring', index * 0.5, 0.75)}>
    <Tilt glareEnable tiltMaxAngleX={30} tiltMaxAngleY={30} glareColor="#aaa6c3">
      <div className="bg-tertiary w-full sm:w-[300px] rounded-2xl p-5">
        <div className="relative h-[230px] w-full">
          <img
            src={image || noImage}
            alt={name}
            className="h-full w-full rounded-2xl object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = noImage;
            }}
          />
          {sourceCodeLink && (
            <div className="absolute inset-0 m-3 flex justify-end">
              <div
                onClick={() => window.open(sourceCodeLink, '_blank')}
                className="black-gradient flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
              >
                <img src={github} alt="github" className="h-1/2 w-1/2 object-contain" />
              </div>
            </div>
          )}
        </div>
        <div className="mt-5">
          <h3 className="text-[20px] font-bold text-white">{name}</h3>
          <p className="mt-2 text-[14px] text-secondary">{description}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <p key={i} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>
      </div>
    </Tilt>
  </motion.div>
);

const Works = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/otherServices/product')
      .then((res) => res.json())
      .then((data) => {
        if (
          data?.status?.success &&
          Array.isArray(data.data?.productDetailDTOList)
        ) {
          setProducts(data.data.productDetailDTOList);
        }
      })
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

  return (
    <>
      <Header useMotion={true} {...config.sections.works} />

      <motion.p
        variants={fadeIn('', '', 0.1, 1)}
        className="text-secondary mt-3 max-w-3xl text-[17px] leading-[30px]"
      >
        {config.sections.works.content}
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-7">
        {products.map((item, index) => (
          <ProjectCard
            key={`product-${index}`}
            index={index}
            name={item.name}
            description={item.description}
            image={item.productPath || noImage}
            sourceCodeLink={item.url}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, '');
