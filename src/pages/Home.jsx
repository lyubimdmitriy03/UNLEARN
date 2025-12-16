import { useRef, forwardRef, useImperativeHandle, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";

import ThreeBackground from "../components/Background/Background";
import MainButton from "../components/MainButton/MainButton";
import ScrollDownButton from "../components/ScrollDownButton/ScrollDownButton";

gsap.registerPlugin(CustomEase);

const Home = forwardRef((props, ref) => {
  const containerRef = useRef(null);
  const h1Ref = useRef();
  const mainButtonRef = useRef();
  const buttonSDRef = useRef();
  const backgroundRef = useRef();
  const timelineRef = useRef(null);

  const { isLoaded } = useOutletContext();

  useEffect(() => {
    if (!CustomEase.get("myEase")) {
      CustomEase.create("myEase", ".22, 1, .36, 1");
    }
  }, []);

  useEffect(() => {
    const firstSpan = h1Ref.current.querySelector("span.first");
    const lastSpan = h1Ref.current.querySelector("span.last");

    timelineRef.current = gsap.timeline({
      paused: true,
      defaults: { ease: "myEase", duration: 1.4 },
    });

    timelineRef.current
      .to(backgroundRef.current, { opacity: 1, scale: 1, delay: 0.5 })
      .to(firstSpan, {
        "clip-path": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        opacity: 1,
        y: 0,
        //   delay: 1,
      })
      .to(
        lastSpan,
        {
          "clip-path": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          opacity: 1,
          y: 0,
        },
        "-=1.3",
      )
      .to(buttonSDRef.current, { opacity: 1, scale: 1 }, "-=1.1")
      .to(
        mainButtonRef.current,
        { opacity: 1, y: 0, ease: "power4.inOut", duration: 1.6 },
        "-=1.4",
      );
  }, []);

  useImperativeHandle(ref, () => ({
    play() {
      timelineRef.current?.play();
    },
  }));

  return (
    <div ref={containerRef} className="home-page relative flex h-screen">
      {/* Three.js фон */}
      <div
        ref={backgroundRef}
        className="home-page__background absolute inset-0 z-0 overflow-hidden opacity-0"
      >
        <ThreeBackground />
      </div>

      {/* Контент */}
      <div className="home-page__content relative container mx-auto max-w-[914px] self-end px-5 text-center">
        <MainButton ref={mainButtonRef}>START TODAY!</MainButton>
        <h1
          ref={h1Ref}
          className="mt-[45px] mb-[40px] text-4xl leading-[1.05] tracking-[0.01] lg:text-7xl xl:text-[84px]"
        >
          <span
            style={{ "clip-path": "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }}
            className="first block translate-y-16 opacity-0"
          >
            Building the future of
          </span>
          <span
            style={{ "clip-path": "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }}
            className="last block translate-y-16 opacity-0"
          >
            medicine with AI
          </span>
        </h1>
        <ScrollDownButton ref={buttonSDRef}>
          <svg
            width="15"
            height="14"
            viewBox="0 0 15 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.02228 13.9932C7.2209 13.9927 7.41716 13.9501 7.59814 13.8683C7.77912 13.7864 7.94071 13.6672 8.07228 13.5184L13.8117 6.99731C13.9496 6.82886 14.0167 6.61346 13.9989 6.3965C13.9811 6.17953 13.8797 5.97796 13.7162 5.83426C13.5527 5.69055 13.3398 5.61594 13.1223 5.62615C12.9049 5.63636 12.6999 5.73059 12.5505 5.88898L8.11719 10.9272C8.09759 10.9493 8.07174 10.9649 8.04306 10.972C8.01438 10.9791 7.98423 10.9773 7.9566 10.9669C7.92896 10.9564 7.90515 10.9379 7.8883 10.9136C7.87146 10.8893 7.86239 10.8605 7.86228 10.831L7.86228 0.847813C7.86228 0.625031 7.77378 0.411374 7.61625 0.253843C7.45872 0.0963126 7.24506 0.00781282 7.02228 0.00781281C6.7995 0.0078128 6.58584 0.0963125 6.42831 0.253843C6.27078 0.411374 6.18228 0.625031 6.18228 0.847813L6.18228 10.8292C6.18199 10.8588 6.17279 10.8875 6.15587 10.9117C6.13895 10.9359 6.11511 10.9544 6.08748 10.9648C6.05985 10.9752 6.02972 10.9771 6.00104 10.97C5.97236 10.963 5.94647 10.9475 5.92678 10.9255L1.49344 5.88723C1.42227 5.79912 1.33402 5.72631 1.23399 5.67318C1.13396 5.62005 1.02421 5.5877 0.911358 5.57808C0.798502 5.56845 0.684866 5.58175 0.577282 5.61717C0.469699 5.65259 0.37039 5.70941 0.285327 5.7842C0.200265 5.85898 0.131206 5.9502 0.0823037 6.05237C0.0334022 6.15453 0.00566551 6.26553 0.000764568 6.37869C-0.00413637 6.49185 0.0138986 6.60483 0.0537841 6.71084C0.0936696 6.81685 0.154583 6.9137 0.23286 6.99556L5.97228 13.5178C6.10374 13.6668 6.2653 13.7862 6.44629 13.8681C6.62728 13.9501 6.8236 13.9927 7.02228 13.9932Z"
              fill="white"
            />
          </svg>
        </ScrollDownButton>
      </div>
    </div>
  );
});

Home.displayName = "Home";

// Компонент с ref для Layout
export default function HomeWithLayoutRef() {
  const { pageAnimationRef, isLoaded } = useOutletContext();

  useEffect(() => {
    // Переконуємося, що timeline створено
    if (isLoaded && pageAnimationRef.current) {
      pageAnimationRef.current.play();
    }
  }, [isLoaded, pageAnimationRef]);

  return <Home ref={pageAnimationRef} />;
}
