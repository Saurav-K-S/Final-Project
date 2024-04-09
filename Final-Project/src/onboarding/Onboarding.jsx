import Circle from "./components/Circle";
import { useEffect, useRef, useState } from "react";
import "./components/style.css";
import { useNavigate } from "react-router";
import gsap from "gsap";

export default function Onboarding() {
  const navigate = useNavigate();
  const [deg, setDeg] = useState(0);
  const [elementIndex, setElementIndex] = useState(0);
  const changeDeg = (deg) => setDeg(deg);
  const renderSVGElement = [
    <svg
      width="147"
      height="128"
      viewBox="0 0 47 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="13.912"
        cy="13.7306"
        r="13.25"
        transform="rotate(0.335371 13.912 13.7306)"
        stroke="black"
        stroke-width="0.5"
      />
      <circle
        cx="32.912"
        cy="13.8415"
        r="13.25"
        transform="rotate(0.335371 32.912 13.8415)"
        stroke="black"
        stroke-width="0.5"
      />
    </svg>,
    <svg
      width="129"
      height="142"
      viewBox="0 0 29 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.572756 2.07706L5.36793 30.1752C5.43674 31.1867 6.99687 33.0469 12.6869 32.3962C18.3769 31.7454 18.2619 26.744 17.4931 24.3246L13.754 0.850769"
        stroke="black"
        stroke-width="0.8"
      />
      <path
        d="M1.76353 41.3786C2.32178 39.0886 5.37785 34.1955 13.1361 32.9427C20.8943 31.6899 26.4267 35.746 28.2232 37.9307"
        stroke="black"
        stroke-width="0.8"
      />
      <path
        d="M8.0016 28.9249C7.20538 28.8473 6.66637 25.4455 6.49639 23.7544L13.7545 21.448C14.0904 23.1554 14.7427 26.7691 14.665 27.5653C14.568 28.5606 8.99688 29.022 8.0016 28.9249Z"
        stroke="black"
        stroke-width="0.8"
      />
    </svg>,
    <svg
      width="134"
      height="161"
      viewBox="0 0 34 61"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="9.98543"
        y="45.7316"
        width="20.0197"
        height="13.8962"
        rx="3.6"
        transform="rotate(2.73627 9.98543 45.7316)"
        stroke="black"
        stroke-width="0.8"
      />
      <path
        d="M21.0699 42.1832C20.7603 40.6345 20.954 39.0446 21.0378 37.4698C21.1061 36.189 21.2714 35.0242 21.6844 33.8118C22.224 32.2278 22.6412 30.5814 23.2495 29.0276C24.2833 26.387 25.8045 24.24 27.3893 21.964C27.9603 21.1439 28.8895 20.2506 29.2401 19.278"
        stroke="black"
        stroke-width="0.8"
        stroke-linecap="round"
      />
      <path
        d="M17.4124 35.8776C17.6872 30.127 16.2261 24.2466 14.7944 18.6806C14.3609 16.9952 13.9876 15.1411 13.1301 13.5974C12.9034 13.1892 12.5815 12.7248 12.4067 12.3428"
        stroke="black"
        stroke-width="0.8"
        stroke-linecap="round"
      />
      <path
        d="M13.4495 41.8191C13.2071 40.9324 12.8445 40.1076 12.6087 39.1976C11.8637 36.322 11.2591 33.4284 10.2307 30.6493C9.63588 29.0418 8.85189 27.3321 7.98418 25.8807C7.7608 25.5071 7.26339 24.5492 6.92822 24.3423"
        stroke="black"
        stroke-width="0.8"
        stroke-linecap="round"
      />
      <path
        d="M1.82137 15.515C1.92851 16.5741 2.12655 19.043 1.13145 20.0495C0.287312 20.9033 3.52804 20.6451 3.8981 21.5871C4.32009 22.6613 3.59373 18.0591 4.79103 17.765C4.14473 18.0855 3.60553 17.7024 2.93566 16.9736C2.26008 16.2386 1.97325 15.6394 1.82137 15.515Z"
        stroke="black"
        stroke-width="0.8"
      />
      <path
        d="M12.0139 1.74776C11.6131 3.21435 10.5902 6.59245 8.32589 7.12708C6.40509 7.58061 12.1122 9.78137 12.2276 11.301C12.3591 13.0337 13.6527 6.45697 15.8709 7.01062C14.5842 6.92284 13.8699 6.0005 13.122 4.52457C12.3677 3.03602 12.206 2.02907 12.0139 1.74776Z"
        stroke="black"
        stroke-width="0.8"
      />
      <path
        d="M33.4954 11.8958C32.733 12.5584 30.9219 14.0479 29.4735 13.5083C28.2448 13.0505 30.587 16.3714 30.0903 17.2537C29.5239 18.2598 32.6642 15.1025 33.6858 16.2265C33.0072 15.7035 32.9526 14.9303 33.0836 13.8389C33.2158 12.7382 33.4978 12.1221 33.4954 11.8958Z"
        stroke="black"
        stroke-width="0.8"
      />
    </svg>,
    <svg
      width="134"
      height="141"
      viewBox="0 0 34 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1.14369"
        y="0.26003"
        width="32.5"
        height="39.5"
        rx="6.75"
        transform="rotate(1.07787 1.14369 0.26003)"
        stroke="black"
        stroke-width="0.5"
      />
      <path
        d="M12.2132 15.9075C13.0949 13.22 11.7524 9.90205 10.971 8.57901C10.952 7.72938 11.0649 5.75214 11.6678 4.64018C12.4215 3.25022 16.6783 5.01887 16.7351 7.56775C16.792 10.1166 28.0593 9.57121 24.3212 13.4798C20.5831 17.3883 18.7879 16.0552 18.4963 20.5735C18.2047 25.0917 24.753 19.6493 26.7792 22.5466C28.8054 25.4439 25.9952 26.9778 23.185 28.5117C20.3748 30.0456 22.5753 31.9582 19.5909 34.4768C16.6065 36.9953 12.2056 33.1701 13.2206 30.3031C14.2356 27.4361 8.64561 27.4627 7.60408 24.7396C6.56256 22.0165 11.1111 19.2669 12.2132 15.9075Z"
        stroke="black"
        stroke-width="0.5"
      />
      <path
        d="M16.62 15.8797C17.5017 13.1922 16.1592 9.87422 15.3777 8.55118C15.3588 7.70155 15.4716 5.72431 16.0746 4.61235C16.8282 3.22239 21.0851 4.99104 21.1419 7.53991C21.1987 10.0888 32.466 9.54338 28.7279 13.4519C24.9898 17.3605 23.1946 16.0273 22.903 20.5456C22.6114 25.0639 29.1597 19.6215 31.1859 22.5188C33.2122 25.4161 30.402 26.95 27.5918 28.4839C24.7816 30.0177 26.982 31.9303 23.9976 34.4489C21.0132 36.9675 16.6123 33.1423 17.6273 30.2753C18.6423 27.4083 13.0523 27.4348 12.0108 24.7117C10.9693 21.9887 15.5179 19.239 16.62 15.8797Z"
        stroke="black"
        stroke-width="0.5"
      />
    </svg>,
  ];
  const renderElement = [
    <div>
      <div className=" mt-5 font-IBM-Plex-Mono font-semibold -ml-28 mb-10 leading-none tracking-widest">
        Connect with
        your <span className="font-DM-Serif-Display italic">past</span>
      </div>
    </div>,
    <div>
      <div className="-ml-32  font-IBM-Plex-Mono font-semibold leading-none tracking-widest">
        Get in touch with your <span className="font-DM-Serif-Display italic">roots</span>
      </div>
    </div>,
    <div>
      <div className="mr-20 mt-7 font-IBM-Plex-Mono font-semibold -ml-28 mb-10 leading-none tracking-wide">
        Get family event{" "}<span className="font-DM-Serif-Display italic">reminders</span>
      </div>
    </div>,
    <div>
      <div className="mr-20 mb-12 font-IBM-Plex-Mono font-semibold -ml-32 mt-5 leading-none tracking-wide">
        Discover your family’s <span className="font-DM-Serif-Display italic">story</span>
      </div>
    </div>,
  ];

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);

  function handleAnimation(deg) {
    
    switch (deg) {
      case 343:
        setElementIndex(0);
        gsap.to(".select",{ x:-10,y:8, ease: "ease.inOut(1,0.3)",duration:2 });
        gsap.to(".main", {
          x: "random(90, 150)", //chooses a random number between -20 and 20 for each target, rounding to the closest 5!
          y: "random(190, 250)",
      
          rotation: "random(-15,15)",
          ease: "ease.inOut(1,0.3)",
          duration: 1.5,
        });
        gsap.to(".mainSVG", {
          x: "random(90, 150)", //chooses a random number between -20 and 20 for each target, rounding to the closest 5!
          y: "random(190, 250)",
      
          rotation: "random(-15,15)",
          ease: "ease.inOut(1,0.3)",
          duration: 1.5,
        });
        break;
      case 351:
        setElementIndex(1);
        gsap.to(".select", {x: 7,y:6, ease: "ease.inOut(1,0.3)" ,duration:2});

        gsap.to(".main", {
          x: "random(90, 150)", //chooses a random number between -20 and 20 for each target, rounding to the closest 5!
          y: "random(190, 250)",
      
          rotation: "random(-15,15)",
          ease: "ease.inOut(1,0.3)",
          duration: 1.5,
        });
        gsap.to(".mainSVG", {
          x: "random(90, 150)", //chooses a random number between -20 and 20 for each target, rounding to the closest 5!
          y: "random(190, 250)",
      
          rotation: "random(-15,15)",
          ease: "ease.inOut(1,0.3)",
          duration: 1.5,
        });
        break;
      case 360:
        setElementIndex(2);
        gsap.to(".select", {x: 9,y:-3, ease: "ease.inOut(1,0.3)" ,duration:2});

        gsap.to(".main", {
          x: "random(90, 150)", //chooses a random number between -20 and 20 for each target, rounding to the closest 5!
          y: "random(190, 250)",
      
          rotation: "random(-15,15)",
          ease: "ease.inOut(1,0.3)",
          duration: 1.5,
        });
        gsap.to(".mainSVG", {
          x: "random(90, 150)", //chooses a random number between -20 and 20 for each target, rounding to the closest 5!
          y: "random(190, 250)",
      
          rotation: "random(-15,15)",
          ease: "ease.inOut(1,0.3)",
          duration: 1.5,
        });
        break;
      case 370:
        setElementIndex(3);
        gsap.to(".select", {x: 10,y:0, ease: "ease.inOut(1,0.3)" ,duration:2});

        gsap.to(".main", {
          x: "random(90, 150)", //chooses a random number between -20 and 20 for each target, rounding to the closest 5!
          y: "random(190, 250)",
      
          rotation: "random(-15,15)",
          ease: "ease.inOut(1,0.3)",
          duration: 1.5,
        });
        gsap.to(".mainSVG", {
          x: "random(90, 150)", //chooses a random number between -20 and 20 for each target, rounding to the closest 5!
          y: "random(190, 250)",
      
          rotation: "random(-15,15)",
          ease: "ease.inOut(1,0.3)",
          duration: 1.5,
        });
        break;

      default:
        break;
    }
    console.log("Degree:", deg);
  }

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        const { id } = entry.target.dataset;
        if (entry.isIntersecting) {
          changeDeg(Number(id));
          handleAnimation(Number(id));
        }
      });
    };
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      threshold: 0.7,
    });

    const refs = [ref1, ref2, ref3, ref4];
    refs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      refs.forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  return (
    <div className="pages snap snap-mandatory  snap-y scrollbar-none">
      <Circle deg={deg} changeDeg={changeDeg} />
      <div className="select fixed bottom-[9%] right-[44.3%] w-[8%] h-[17%] border-[0.2px] bg-hover-element bg-contain -z-1 rounded-3xl border-black border-dashed "></div>
      <div className="fixed w-full top-3 left-0 flex justify-between items-center px-9 font-IBM-Plex-Mono">
        <div className="h-max w-[7%] flex flex-col justify-evenly items-center border-[0.2px] text-[15px]  rounded-3xl border-black p-3">
          <svg
            width="48"
            height="61"
            viewBox="0 0 48 61"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="11.2219" cy="30.9724" r="11.2219" fill="#FFDC5F" />
            <circle
              cx="11.8206"
              cy="30.0749"
              r="11.1219"
              fill="#FFDC5F"
              stroke="black"
              stroke-width="0.2"
            />
            <path
              d="M17.1806 55.8106L22.4974 29.3533C22.6404 28.6418 23.2654 28.1299 23.9911 28.1299C24.7382 28.1299 25.375 28.6715 25.495 29.4088L29.8078 55.9199C30.1047 57.745 28.6958 59.4016 26.8467 59.4016H20.1218C18.2276 59.4016 16.8074 57.6677 17.1806 55.8106Z"
              stroke="black"
              stroke-width="0.2"
            />
            <circle cx="35.4612" cy="28.5784" r="11.2219" fill="#FFDC5F" />
            <circle
              cx="36.0598"
              cy="27.6809"
              r="11.1219"
              fill="#FFDC5F"
              stroke="black"
              stroke-width="0.2"
            />
            <path
              d="M18.0781 56.4092L23.3949 29.9519C23.5379 29.2404 24.1629 28.7285 24.8886 28.7285C25.6356 28.7285 26.2725 29.2701 26.3924 30.0075L30.7052 56.5186C31.0021 58.3437 29.5933 60.0003 27.7442 60.0003H21.0193C19.125 60.0003 17.7049 58.2663 18.0781 56.4092Z"
              stroke="black"
              stroke-width="0.2"
            />
            <circle cx="24.9875" cy="12.1199" r="11.2219" fill="#FFDC5F" />
            <circle
              cx="25.5857"
              cy="11.2219"
              r="11.1219"
              fill="#FFDC5F"
              stroke="black"
              stroke-width="0.2"
            />
          </svg>
          AncesTree
        </div>
        <div className="flex justify-around w-[25%]">
          <div
            className="clickable border-[0.2px]  rounded-3xl border-black p-3 hover:bg-[#FFDC5F] duration-500"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Register
          </div>
          <div
            className="clickable border-[0.2px]  rounded-3xl border-black p-3 hover:bg-[#FFDC5F] duration-500 "
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </div>
        </div>
      </div>
      <div
        className="page snap-center  whitespace-nowrap"
        id="profile"
        data-id="343"
        ref={ref1}
      >
        <div className="outlined-text text-[180px] text-[#373737] font-IBM-Plex-Mono font-semibold -ml-28 mb-10 leading-none tracking-widest">
          Connect with
          <br />
          your <span className="font-DM-Serif-Display italic">past</span>
        </div>
      </div>
      <div className="page snap-center" id="about" data-id="351" ref={ref2}>
        <div className="outlined-text  text-[180px] text-[#373737] font-IBM-Plex-Mono font-semibold -ml-28 mb-10 leading-none tracking-normal">
          Get in touch
          <br />
          with your <span className="font-DM-Serif-Display italic">roots</span>
        </div>
      </div>
      <div className="page snap-center" id="contact" data-id="360" ref={ref3}>
        <div className="outlined-text  text-[180px] text-[#373737] font-IBM-Plex-Mono font-semibold -ml-28 mb-10 leading-none tracking-wide">
          Get family <br /> event{" "}
          <span className="font-DM-Serif-Display italic">reminders</span>
        </div>
      </div>
      <div
        className="outlined-text  page snap-center"
        id="help"
        data-id="370"
        ref={ref4}
      >
        <div className="text-[180px] text-[#373737] font-IBM-Plex-Mono font-semibold -ml-32 mt-5 leading-none tracking-wide">
          Discover your
          <br />
          family’s <span className="font-DM-Serif-Display italic">story</span>
        </div>
      </div>

      <div className="main fixed top-[5%] left-[2%] w-[45%] h-[25%]">
        <div className="absolute w-[100%] h-[100%] z-50 bg-[#FFDC5F] border-[1px] flex justify-center pl-[30%] items-center  border-black rounded-[73px] text-[60px]">
          {renderElement[elementIndex]}
        </div>
        <div className="absolute w-[100%] h-[100%] z-40 bg-[#FFDC5F] border-[1px] border-black rounded-[73px] mt-[10px] -ml-[7px]"></div>
        <div className="absolute w-[100%] h-[100%] z-30 bg-[#FFDC5F] border-[1px] border-black rounded-[73px] mt-[20px] -ml-[14px]"></div>
        <div className="absolute w-[100%] h-[100%] z-20 bg-[#FFDC5F] border-[1px] border-black rounded-[73px] mt-[30px] -ml-[21px]"></div>
        <div className="absolute w-[100%] h-[100%] z-10 bg-[#FFDC5F] border-[1px] border-black rounded-[73px] mt-[40px] -ml-[28px]"></div>
        <div className="absolute w-[100%] h-[100%] z-0 bg-[#FFDC5F] border-[1px] border-black rounded-[73px] mt-[50px] -ml-[35px]"></div>
      </div>
      <div className="mainSVG  fixed top-[10%] right-[15%] w-[18%] h-[25%]">
        <div className="absolute w-[100%] h-[100%] z-50 bg-[#FFDC5F] border-[1px] flex justify-center items-center  border-black rounded-[73px] text-[60px]">
          {renderSVGElement[elementIndex]}
        </div>
        <div className="absolute w-[100%] h-[100%] z-40 bg-[#FFDC5F] border-[1px] border-black rounded-[73px] mt-[10px] ml-[7px]"></div>
        <div className="absolute w-[100%] h-[100%] z-30 bg-[#FFDC5F] border-[1px] border-black rounded-[73px] mt-[20px] ml-[14px]"></div>
        <div className="absolute w-[100%] h-[100%] z-20 bg-[#FFDC5F] border-[1px] border-black rounded-[73px] mt-[30px] ml-[21px]"></div>
        <div className="absolute w-[100%] h-[100%] z-10 bg-[#FFDC5F] border-[1px] border-black rounded-[73px] mt-[40px] ml-[28px]"></div>
        <div className="absolute w-[100%] h-[100%] z-0 bg-[#FFDC5F] border-[1px] border-black rounded-[73px] mt-[50px] ml-[35px]"></div>
      </div>
    </div>
  );
}
