import React from 'react'
import { Link } from 'react-router-dom';
import avatar from '../assets/images/about/avatar.jpg';
import dowanload from '../assets/images/icons/dowanload.png';
import Designation from '../components/Designation.jsx';
import Sidebar from '../components/Sidebar.jsx';
import Deskmenu from '../components/deskmenu.jsx';

const Home = () => {
  return (
    <div className="flex flex-col items-center h-[100vh] md:h-[90vh] lg:h-[80vh] xl:h-[71vh] justify-center aos-init aos-animate"
        data-aos="fade">
        <img className="rounded-full w-[200px] h-[200px] 2xl:w-[280px] 2xl:h-[280px]"
            src={avatar} alt="about avatar" />
        <h3 className="mt-6 mb-1 text-5xl font-semibold dark:text-white">
            <span className="firstName" id='firstName'></span> <span className='lastName'></span> 
        </h3>
        <p className="mb-4 text-[#7B7B7B] jobTitle" id='jobTitle'>Ui/Ux Designer</p>
        
        <div className="flex gap-3">
            <Link target="_blank" id="webURL" to="#">
                <span className="socialbtn text-[#1773EA]">
                    <i className="fa fa-globe"></i>
                </span>
            </Link>
            <Link  target="_blank" id="fbUrl" to="#">
                <span className="socialbtn text-[#1C9CEA]">
                      <i className="fa-brands fa-facebook-f"></i>
                </span>
            </Link>
            <Link target="_blank" id="twitterURL" to="#">
                <span className="socialbtn text-[#e14a84]">
                     <i class="fa-brands fa-twitter"></i>
                </span>
            </Link>
            <Link target="_blank" id="instaURL" to="#">
                <span className="socialbtn text-[#0072b1]">
                      <i className="fa-brands fa-instagram"></i>
                </span>
            </Link>
            <Link target="_blank" id="linkedInURL" to="#">
                <span className="socialbtn text-[#0072b1]">
                    <i className="fa-brands fa-linkedin-in"></i>
                </span>
            </Link>
            <Link target="_blank" id="whatsappURL" to="#">
                <span className="socialbtn text-[#0072b1]">
                      <i className="fa-brands fa-whatsapp"></i>
                </span>
            </Link>
            <Link target="_blank" id="ytURL" to="#">
                <span className="socialbtn text-[#0072b1]">
                      <i className="fa-brands fa-youtube"></i>
                </span>
            </Link>
            <Link target="_blank" id="pintrestURL" to="#">
                <span className="socialbtn text-[#0072b1]">
                    <i class="fa-brands fa-pinterest-p"></i>
                </span>
            </Link>
            <Link target="_blank" id="threadURL" to="#">
                <span className="socialbtn text-[#0072b1]">
                      <i className="fa-brands fa-threads fa-2x"></i>
                </span>
            </Link>
            <Link target="_blank" id="tumblrURL" to="#">
                <span className="socialbtn text-[#0072b1]">
                    <i class="fa-brands fa-tumblr"></i>
                </span>
            </Link>
            <Link target="_blank" id="redditURL" to="#">
                <span className="socialbtn text-[#0072b1]">
                    <i class="fa-brands fa-reddit"></i>
                </span>
            </Link>
            <Link target="_blank" id="discordURL" to="#">
                <span className="socialbtn text-[#0072b1]">
                    <i class="fa-brands fa-discord"></i>
                </span>
            </Link>
        </div>

        <Designation />

        <button className="dowanload-btn">
            <img src={dowanload} alt="icon" className="mr-2" />Save Contact
        </button>
    </div>
  )
}

export default Home
