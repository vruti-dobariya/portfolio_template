import { useGSAP } from "@gsap/react";
import { useProgress } from "@react-three/drei";
import gsap from "gsap";
import loader from '../assets/images/loader.gif';


const Loader = () => {
  const { progress, total } = useProgress();

  useGSAP(() => {
    if (total === 20 && progress === 100) {
      gsap.to(".loader-screen", {
        y: "-100%",
        duration: 1,
        ease: "power2.inOut",
      });
    }
  }, [progress]);

  return (
    <div className="loader-screen bg-black-100 w-screen h-dvh fixed top-0 left-0 z-[100]">
      <div className="flex-center w-full h-full">
        <img src={loader} alt="loader" />
      </div>
      <div className="text-white-50 font-bold text-7xl leading-none gradient-title absolute bottom-10 right-10">
        {Math.floor(progress)}%
      </div>
    </div>
  );
};

export default Loader;
