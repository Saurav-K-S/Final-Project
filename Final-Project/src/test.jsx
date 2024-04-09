import React,{useEffect} from "react";
// import { gsap } from "gsap";

export default function Message(){

    // useEffect(() => {
    //     gsap.set(".ball", { x: random, y: random,scale:1 })
    //     let targets = gsap.utils.toArray(".ball");
    //     var wrap = document.getElementById("wrap")
    //     wrap.addEventListener("mousemove", (e) => {
    //       gsap.to(targets, {
    //         duration: 0.5,
    //         x: e.clientX,
    //         y: e.clientY,
    //         ease: "power1.out",
    //       });
    //     });
    //     wrap.addEventListener("mouseenter", (e) => {
    //         gsap.to(targets, {
    //           duration: 0.5,
    //           scale:1,
    //           ease: "power1.out",
    //         });
    //       });
          
    //   }, 
    // []
    // );
    
    return <center >
    {/* <div className="ball bg-hover-element w-20 h-20 fixed top-0 left-0 overflow-hidden" ></div> */}
    <div id="wrap" className="mt-10 w-[162px] h-[52px] border-[0.5px] border-black rounded-[18px] flex items-center justify-center font-IBM-Plex-Mono text-[24px]">
    <button
    onClick={() => {
        alert('clicked');
    }}
    >
Register
</button>
</div>
    </center>;
}

