import React from 'react'
import phon from '../assets/images/contact/phone-call.png';
import email from '../assets/images/contact/email.png';
import map from '../assets/images/contact/map.png';
import Designation from '../components/Designation.jsx';
import Footer from '../components/Footer.jsx';

export default function Contact() {
  return (
   <>
    <div class="bg-white lg:rounded-2xl dark:bg-[#111111]">
        <div data-aos="fade" class="aos-init aos-animate">
            <div class="container px-4 sm:px-5 md:px-10 lg:px-20">
                <div class="py-12">
                    <h2 class="after-effect after:left-40 mb-[40px] mt-12 lg:mt-0">Contact</h2>
                    
                    <div class="lg:flex gap-x-20">
                        <div class="w-full lg:w-[40%] xl:w-[30%] space-y-6">
                            <div
                                class="flex flex-wrap bg-[#fcf4ff] dark:bg-transparent p-[30px] dark:border-[#212425] dark:border-2 gap-2 rounded-xl">
                                <span class="w-8 mt-2">
                                    <img src={phon} alt="icon"
                                        class="text-4xl dark:text-white" />
                                </span>
                                <div class="space-y-2">
                                    <p class="text-xl font-semibold dark:text-white"> Phone : </p>
                                    <p class="text-gray-lite text-lg dark:text-[#A6A6A6] primaryContact" id='primaryContact'> +452 666 386 </p>
                                    <p class="text-gray-lite text-lg dark:text-[#A6A6A6] secondaryContact" id='secondaryContact'> +452 666 386 </p>
                                </div>
                            </div>

                            <div
                                class="flex flex-wrap dark:bg-transparent bg-[#eefbff] p-[30px] dark:border-[#212425] dark:border-2 gap-2 rounded-xl">
                                <span class="w-8 mt-2">
                                    <img src={email} alt="icon"
                                        class="text-4xl dark:text-white" />
                                </span>
                                <div class="space-y-2">
                                    <p class="text-xl font-semibold dark:text-white"> Email : </p>
                                    <p class="text-gray-lite text-lg dark:text-[#A6A6A6] primaryMail" id='primaryMail'> support@gmail.com
                                    </p>
                                    <p class="text-gray-lite text-lg dark:text-[#A6A6A6] secondaryMail" secondaryMail> example@gmail.com
                                    </p>
                                </div>
                            </div>

                            <div
                                class="flex flex-wrap dark:bg-transparent bg-[#f2f4ff] p-[30px] dark:border-[#212425] dark:border-2 gap-2 rounded-xl">
                                <span class="w-8 mt-2">
                                    <img src={map} alt="icon"
                                        class="text-4xl dark:text-white" />
                                </span>
                                <div class="space-y-2">
                                    <p class="text-xl font-semibold dark:text-white"> Address : </p>
                                    <p class="text-gray-lite text-lg dark:text-[#A6A6A6] address" id='address'> Maount View, Oval
                                    </p>
                                    {/* <p class="text-gray-lite text-lg dark:text-[#A6A6A6]"> Road, New York,
                                        USA </p> */}
                                </div>
                            </div>
                        </div>

                        <Designation />

                        <div class="w-full mt-8 lg:mt-0 lg:w-[60%] xl:w-[70%]">
                            <div data-aos="fade"
                                class="dark:border-[#212425] dark:border-2 mb-16 md:p-[48px] p-4 bg-color-810 rounded-xl dark:bg-[#111111] mb-[30px] md:mb-[60px] aos-init aos-animate">
                                <h3 class="text-4xl">
                                    <span class="text-gray-lite dark:text-[#A6A6A6]">I'm always open to
                                        discussing product</span>
                                    <br />
                                    <span class="font-semibold dark:text-white">design work or
                                        partnerships.</span>
                                </h3>

                                <form id="myForm" action="https://formspree.io/f/xoqrgaab" method="POST">
                                    <div class="relative z-0 w-full mt-10 mb-8 group">
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder=" "
                                        required
                                        class="peer block w-full appearance-none border-b border-black border-[#B5B5B5] bg-transparent py-2.5 px-0 text-sm text-gray-lite dark:border-[#333333] dark:text-white focus:border-[#FF6464] focus:outline-none focus:ring-0"
                                    />
                                    <label
                                        for="name"
                                        class="absolute top-3 z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#FF6464] peer-focus:dark:text-[#FF6464]"
                                    >
                                        Name *
                                    </label>
                                    </div>

                                    <div class="relative z-0 w-full mb-8 group">
                                    <input
                                        type="email"
                                        id="user_email"
                                        name="user_email"
                                        placeholder=" "
                                        required
                                        class="peer block w-full appearance-none  border-b border-black border-[#B5B5B5] bg-transparent py-2.5 px-0 text-sm text-gray-lite dark:border-[#333333] dark:text-white focus:border-[#5185D4] focus:outline-none focus:ring-0"
                                    />
                                    <label
                                        for="user_email"
                                        class="absolute top-3 z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#5185D4] peer-focus:dark:text-[#FF6464]"
                                    >
                                        Email *
                                    </label>
                                    </div>

                                    <div class="relative z-0 w-full mb-8 group">
                                    <input
                                        type="text"
                                        id="message"
                                        name="message"
                                        placeholder=" "
                                        required
                                        class="peer block w-full appearance-none  border-b border-black border-[#B5B5B5] bg-transparent py-2.5 px-0 text-sm text-gray-lite dark:border-[#333333] dark:text-white focus:border-[#CA56F2] focus:outline-none focus:ring-0"
                                    />
                                    <label
                                        for="message"
                                        class="absolute top-3 z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#CA56F2] peer-focus:dark:text-[#FF6464]"
                                    >
                                        Message *
                                    </label>
                                    </div>

                                    <div
                                        class="transition-all duration-300 ease-in-out inline-block hover:bg-gradient-to-r from-[#FA5252] to-[#DD2476] rounded-lg mt-3">
                                        <input type="submit"
                                            class="transition ease-in duration-200 font-semibold cursor-pointer border-color-910 hover:border-transparent px-6 py-2 rounded-lg border-[2px] hover:text-white dark:text-white"
                                            value="Submit" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
   </>
  )
}
