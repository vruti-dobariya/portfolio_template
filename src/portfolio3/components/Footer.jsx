import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import Designation from './Designation.jsx';

const Footer = () => {
  return (
    <footer class="footer bg-white dark:bg-mode-300 border-t border-gray-100 dark:border-white dark:border-opacity-10 py-4">
        <div class="container">
            <div class="grid grid-cols-12">
                <div class="col-span-12 md:col-span-6 flex pb-3 md:pb-0">
                    <div className="flex justify-center md:justify-start w-full flex-wrap">
                        <Link className="text-gray-700 dark:text-white text-opacity-90 hover:text-theme-500 mr-5 text-[16px]" target="_blank" id="webURL" to="#">
                                <i className="fa fa-globe"></i>
                        </Link>
                        <Link  className="text-gray-700 dark:text-white text-opacity-90 hover:text-theme-500 mr-5 text-[16px]" target="_blank" id="fbUrl" to="#">
                                <i className="fa-brands fa-facebook-f"></i>
                        </Link>
                        <Link className="text-gray-700 dark:text-white text-opacity-90 hover:text-theme-500 mr-5 text-[16px]" target="_blank" id="twitterURL" to="#">
                                <i class="fa-brands fa-twitter"></i>
                        </Link>
                        <Link className="text-gray-700 dark:text-white text-opacity-90 hover:text-theme-500 mr-5 text-[16px]" target="_blank" id="instaURL" to="#">
                                <i className="fa-brands fa-instagram"></i>
                        </Link>
                        <Link className="text-gray-700 dark:text-white text-opacity-90 hover:text-theme-500 mr-5 text-[16px]" target="_blank" id="linkedInURL" to="#">
                                <i className="fa-brands fa-linkedin-in"></i>
                        </Link>
                        <Link className="text-gray-700 dark:text-white text-opacity-90 hover:text-theme-500 mr-5 text-[16px]" target="_blank" id="whatsappURL" to="#">
                                <i className="fa-brands fa-whatsapp"></i>
                        </Link>
                        <Link className="text-gray-700 dark:text-white text-opacity-90 hover:text-theme-500 mr-5 text-[16px]" target="_blank" id="ytURL" to="#">
                                <i className="fa-brands fa-youtube"></i>
                        </Link>
                        <Link className="text-gray-700 dark:text-white text-opacity-90 hover:text-theme-500 mr-5 text-[16px]" target="_blank" id="pintrestURL" to="#">
                                <i class="fa-brands fa-pinterest-p"></i>
                        </Link>
                        <Link className="text-gray-700 dark:text-white text-opacity-90 hover:text-theme-500 mr-5 text-[16px]" target="_blank" id="threadURL" to="#">
                                <i className="fa-brands fa-threads fa-2x"></i>
                        </Link>
                        <Link className="text-gray-700 dark:text-white text-opacity-90 hover:text-theme-500 mr-5 text-[16px]" target="_blank" id="tumblrURL" to="#">
                                <i class="fa-brands fa-tumblr"></i>
                        </Link>
                        <Link className="text-gray-700 dark:text-white text-opacity-90 hover:text-theme-500 mr-5 text-[16px]" target="_blank" id="redditURL" to="#">
                                <i class="fa-brands fa-reddit"></i>
                        </Link>
                        <Link className="text-gray-700 dark:text-white text-opacity-90 hover:text-theme-500 mr-5 text-[16px]" target="_blank" id="redditURL" to="#">
                                <i class="fa-brands fa-discord"></i>
                        </Link>
                    </div>
                </div>
                <div class="col-span-12 md:col-span-6 text-center md:text-right copyright_footer">
                    <p class="m-0 text-gray-700 dark:text-white text-opacity-75"> Developed with by <a href='https://iconictap.com/'>Iconic Tap</a> © 2025</p>
                </div>
            </div>
            <Designation />
        </div>
    </footer>
  )
}

export default Footer
