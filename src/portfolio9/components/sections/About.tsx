import { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { SectionWrapper } from "../../hoc";
import { fadeIn } from "../../utils/motion";
import { config } from "../../constants/config";
import { Header } from "../atoms/Header";
import noImage from "../../assets/web.png";
import defaultBanner from '../../assets/user_placeholder.jpg';
import downloadIcon from '../../assets/dowanload.png';
import { generateVCard } from '../../utils/generateVCard';

interface IService {
  title: string;
  icon: string;
}

const stripHtml = (html: string) => {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

const ServiceCard: React.FC<{ index: number; title: string; icon: string }> = ({
  index,
  title,
  icon,
}) => (
  <Tilt glareEnable tiltEnable tiltMaxAngleX={30} tiltMaxAngleY={30} glareColor="#aaa6c3">
    <div className="max-w-[250px] w-full xs:w-[250px]">
      <motion.div
        variants={fadeIn("right", "spring", index * 0.5, 0.75)}
        className="green-pink-gradient shadow-card w-full rounded-[20px] p-[1px]"
      >
        <div className="bg-tertiary flex min-h-[280px] flex-col items-center justify-evenly rounded-[20px] px-12 py-5">
          <img
            src={icon && icon.trim() !== "" ? icon : noImage}
            alt={title}
            className="h-16 w-16 object-contain"
          />
          <h3 className="text-center text-[20px] font-bold text-white">{title}</h3>
        </div>
      </motion.div>
    </div>
  </Tilt>
);

const About = () => {
  const [userData, setUserData] = useState<any>(null);
  const [services, setServices] = useState<IService[]>([]);
  const [loading, setLoading] = useState(true);
  const [bannerImg, setBannerImg] = useState(defaultBanner);

  useEffect(() => {
    fetch('admin/getImages')
      .then(res => res.json())
      .then(data => {
        if (data?.status?.success) {
          const path = data.data?.profilePhotoPath;
          if (path) setBannerImg(path);
        }
      })
      .catch(() => setBannerImg(defaultBanner));

    fetch('admin/getBasicDetails')
      .then(res => res.json())
      .then(data => {
        if (data?.data) setUserData(data.data);
      });
  }, []);

  useEffect(() => {
    fetch("/otherServices")
      .then((res) => res.json())
      .then((data) => {
        if (data?.status?.success && data?.data?.serviceDTOList) {
          const mappedServices = data.data.serviceDTOList.map((service: any) => ({
            title: service.name,
            icon: service.serviceIconPath || "",
          }));
          setServices(mappedServices);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  const handleDownloadVCF = () => {
    generateVCard();
  };

  return (
    <>
      {userData && (
        <div style={{ display: 'none' }}>
          <span id="firstname">{userData.firstName}</span>
          <span id="lastname">{userData.lastName}</span>
          <span id="jobTitle">{userData.jobTitle}</span>
          <span id="primaryMail">{userData.primaryMail}</span>
          <span id="secondaryMail">{userData.secondaryMail}</span>
          <span id="primaryContact">{userData.primaryContact}</span>
          <span id="secondaryContact_contact">{userData.secondaryContact}</span>
          <span id="cardName">{userData.cardName || 'My Company'}</span>
          <span id="address">{userData.address}</span>
          <span id="dob">{userData.dateOfBirth}</span>
          <img id="profilePhotoPath" src={bannerImg} alt="profile" width="200" />
          <img id="companyLogoPath" src="/logo192.png" alt="logo" width="200" />

          {/* Social URLs */}
          <a id="fbUrl" href={userData.facebook}></a>
          <a id="webURL" href={userData.website}></a>
          <a id="linkedInURL" href={userData.linkedin}></a>
          <a id="instaURL" href={userData.instagram}></a>
          <a id="ytURL" href={userData.youtube}></a>
          <a id="whatsappURL" href={userData.whatsapp}></a>
          <a id="twitterURL" href={userData.twitter}></a>
          <a id="pintrestURL" href={userData.pinterest}></a>
          <a id="threadURL" href={userData.thread}></a>
          <a id="tumblrURL" href={userData.tumblr}></a>
          <a id="redditURL" href={userData.reddit}></a>
        </div>
      )}

      <Header useMotion={true} {...config.sections.about} />

      <p className="mt-4 text-white text-[16px] leading-[28px]">
        {userData?.description ? stripHtml(userData.description) : "Description"}
      </p>

      <button className="dowanload-btn mt-6 flex items-center gap-2" onClick={handleDownloadVCF}>
        <img src={downloadIcon} alt="Download Icon" className="w-5 h-5" />
        Save Contact
      </button>

      <div className="mt-20 flex flex-wrap gap-10 max-sm:justify-center">
        {!loading &&
          services.map((service, index) => (
            <ServiceCard
              key={service.title + index}
              index={index}
              title={service.title}
              icon={service.icon}
            />
          ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");