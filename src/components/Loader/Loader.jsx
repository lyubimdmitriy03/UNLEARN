import { useRef, useEffect } from "react";
import gsap from "gsap";
import style from "./Loader.module.css";

function Loader({ onFinish, headerRef, pageRef }) {
  const loaderRef = useRef(null);
  const barRef = useRef(null);
  const percentRef = useRef(null);

  useEffect(() => {
    if (!loaderRef.current) return;

    let width = 0;
    let animationStarted = false;

    const interval = setInterval(() => {
      if (width >= 100) {
        clearInterval(interval);

        // Ховаємо прогрес-бар
        gsap.to([percentRef.current, barRef.current], {
          opacity: 0,
          zIndex: -1,
          duration: 0.5,
        });

        // Завершуємо Loader
        onFinish();
        return;
      }

      width++;
      gsap.to(barRef.current, {
        width: width + "%",
        duration: 0.25,
        ease: "expo.out",
      });
      percentRef.current.innerText = `${width}%`;

      // Запускаємо анімації Header і сторінки раніше
      if (width > 99 && !animationStarted) {
        headerRef?.current?.play();
        pageRef?.current?.play();
        animationStarted = true;
      }
    }, 25);

    // Початкова анімація Loader (fade-in)
    gsap.fromTo(
      loaderRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3 },
    );

    return () => clearInterval(interval);
  }, [onFinish, headerRef, pageRef]);

  return (
    <div
      ref={loaderRef}
      className={`${style.loaderWrapper} bg-mainBlack absolute inset-0 z-50 flex items-center justify-center`}
    >
      <div className={style.containerLoader}>
        <div className={style.loader}>
          <div className={style.containerBar}>
            <div ref={barRef} className={style.bar}></div>
            <div ref={percentRef} className={style.percent}>
              0%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
