import {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Link, NavLink } from "react-router-dom";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { CustomEase } from "gsap/CustomEase";
import style from "./Header.module.css";

gsap.registerPlugin(ScrambleTextPlugin, CustomEase);

const Header = forwardRef((props, ref) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef();
  const timelineRef = useRef(null);

  useImperativeHandle(ref, () => ({
    play() {
      timelineRef.current?.play();
    },
  }));

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.classList.toggle("no-scroll", !menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.classList.remove("no-scroll");
    document.body.classList.remove("open");
  };

  useEffect(() => {
    // Scramble Text hover effect
    const scrambleElements = document.querySelectorAll(".scramble-text");
    scrambleElements.forEach((el) => {
      const originalText = el.textContent;
      el.addEventListener("mouseenter", () => {
        gsap.to(el, {
          duration: 0.8,
          scrambleText: {
            text: originalText,
            chars:
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
            speed: 1.2,
            revealDelay: 0.1,
            delimiter: " ",
            tweenLength: false,
          },
          ease: "sine.in",
        });
      });
    });

    // Create main timeline, paused until Layout calls play()
    timelineRef.current = gsap.timeline({
      paused: true,
      defaults: {
        ease: CustomEase.create("myEase", ".22, 1, .36, 1"),
        duration: 0.7,
      },
    });

    // Logo paths animation
    timelineRef.current.to("[class^='logo-image']", {
      opacity: 1,
      stagger: 0.1,
      delay: 1,
    });

    // Letters animation
    timelineRef.current.to(".logo-letter", {
      "clip-path": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      opacity: 1,
      stagger: 0.15,
    });

    // Group UN animation
    timelineRef.current.to(".logo-letter-group-un", {
      "clip-path": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      opacity: 1,
      y: 0,
      ease: "power4.inOut",
      duration: 1,
    });

    // Group UN paths fill
    timelineRef.current.to(".logo-letter-group-un-path", {
      fill: "#ffffff",
      stagger: 0.05,
      duration: 1.2,
    });

    // Navigation items animation
    timelineRef.current.to(
      ".navigation__item",
      {
        "clip-path": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        opacity: 1,
        y: 0,
        stagger: 0.15,
      },
      "-=2.5",
    );

    // Menu lines animation
    timelineRef.current.to(
      ".icon-menu__line",
      {
        "clip-path": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        opacity: 1,
        scale: 1,
        stagger: 0.15,
      },
      "-=2.0",
    );
  }, []);

  useEffect(() => {
    const activeLink = document.querySelector(".navigation__item .active");
    if (activeLink) {
      activeLink.classList.add("active-after-animation");
    }
  }, []);

  const navItems = [
    //  "Home",
    "Solutions",
    "Technology",
    "About",
    "Careers",
    "Resources",
    "Contact",
  ];

  return (
    <header
      ref={headerRef}
      className={`header ${isMobile ? "mobile" : ""} ${menuOpen ? "open" : ""} fixed inset-x-0 top-0 z-90`}
    >
      <div className="header__container mx-auto max-w-[1280px] md:mt-8 lg:mt-12.5">
        <div className="header__body container mx-auto flex items-center justify-between px-5 py-5">
          {/* Logo */}
          <Link to={"/"} onClick={closeMenu} className="z-10">
            <span className={`${style.header__logo} header__logo-animation`}>
              <svg
                width="157"
                height="22"
                viewBox="0 0 157 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_2323_2)">
                  <g clipPath="url(#clip1_2323_2)" className="logo-image">
                    <path
                      className="logo-image_1"
                      d="M5.83365 20.7146H12.1389L12.1317 20.7195C11.9581 21.1515 11.7762 21.5776 11.5859 22C13.264 21.9198 14.8439 21.4663 16.2442 20.7195L16.2263 20.7146H16.2538C16.9348 20.3507 17.5728 19.9175 18.1593 19.4243H3.92821C4.51469 19.9175 5.15262 20.3507 5.83365 20.7146Z"
                      fill="white"
                    />
                    <path
                      className="logo-image_2"
                      d="M1.67087 16.8295H13.4208L13.404 16.8343C13.2927 17.2675 13.1718 17.6972 13.0437 18.1246H19.4675C19.8145 17.72 20.1293 17.2879 20.413 16.8343L20.3963 16.8295H20.4153C20.6751 16.4165 20.9062 15.9857 21.1097 15.5392H0.976669C1.18015 15.9857 1.41114 16.4165 1.67087 16.8295Z"
                      fill="white"
                    />
                    <path
                      className="logo-image_3"
                      d="M0.169936 12.9444H14.1377V12.9492C14.0838 13.3813 14.0192 13.8122 13.9486 14.2395H21.6014C21.7308 13.8194 21.8361 13.3885 21.9151 12.9492L21.8744 12.9444H21.9151C21.9904 12.5219 22.0407 12.091 22.0658 11.6542H0.0203171C0.0454465 12.091 0.0957236 12.5219 0.17113 12.9444H0.169936Z"
                      fill="white"
                    />
                    <path
                      className="logo-image_4"
                      d="M0 9.06051H14.3938L14.3783 9.06531C14.3783 9.49739 14.3663 9.92707 14.3496 10.3556H22.0863V9.06531L22.0456 9.06051H22.0863V7.77026H0V9.06051Z"
                      fill="white"
                    />
                    <path
                      className="logo-image_5"
                      d="M22.0863 5.17538V3.88513H0V5.17538H14.2047L14.1377 5.18018C14.1916 5.60747 14.2346 6.03715 14.2705 6.47043H22.0863V5.18018L22.0456 5.17538H22.0863Z"
                      fill="white"
                    />
                    <path
                      className="logo-image_6"
                      d="M22.0575 1.29144H22.0863V0H0V1.29144H13.4806L13.4052 1.29504C13.5153 1.72234 13.6135 2.15202 13.7056 2.58649H22.0863V1.29504L22.0575 1.29144Z"
                      fill="white"
                    />
                  </g>

                  <g
                    className={`${style.logo_letter_group_un} logo-letter-group-un`}
                  >
                    <g className={style["logo-letter"]}>
                      <path
                        className={`${style.logo_letter_group_un_path} logo-letter-group-un-path`}
                        d="M48.9684 9.52849C48.9529 8.00725 48.9288 6.68109 48.8906 5.5596C49.416 6.51471 50.2023 7.83489 51.2616 9.52849H54.1007L49.4459 2.22984H46.4788V9.52849H48.9684Z"
                        fill="white"
                      />
                      <path
                        className={`${style.logo_letter_group_un_path} logo-letter-group-un-path`}
                        d="M58.0145 9.52849H60.4945V2.22984H58.0109V7.44112C58.0109 8.16524 58.0109 8.86064 58.0145 9.52849Z"
                        fill="white"
                      />
                      <path
                        className={`${style.logo_letter_group_un_path} logo-letter-group-un-path`}
                        d="M46.4789 12.1102V19.4089H48.9876V14.1976C48.9876 13.4734 48.9876 12.778 48.984 12.1102H46.4789Z"
                        fill="white"
                      />
                      <path
                        className={`${style.logo_letter_group_un_path} logo-letter-group-un-path`}
                        d="M58.0301 12.1102C58.0456 13.635 58.0697 14.9684 58.1079 16.103C57.4425 14.9169 56.643 13.5823 55.7297 12.1102H52.8955L57.5275 19.4089H60.4945V12.1102H58.0301Z"
                        fill="white"
                      />
                    </g>
                    <g className={style["logo-letter"]}>
                      <path
                        className={`${style.logo_letter_group_un_path} logo-letter-group-un-path`}
                        d="M43.726 2.22984H41.1443V9.52849H43.726V2.22984Z"
                        fill="white"
                      />
                      <path
                        className={`${style.logo_letter_group_un_path} logo-letter-group-un-path`}
                        d="M32.4118 2.22984H29.8301V9.52849H32.4118V2.22984Z"
                        fill="white"
                      />
                      <path
                        className={`${style.logo_letter_group_un_path} logo-letter-group-un-path`}
                        d="M41.1443 12.1102V13.015C41.1443 16.006 39.5765 17.5022 36.7781 17.5022C33.9796 17.5022 32.4118 16.0073 32.4118 13.015V12.1102H29.8301V12.9911C29.8301 17.3334 32.4118 19.7704 36.7781 19.7704C41.1443 19.7704 43.726 17.3334 43.726 12.9911V12.1102H41.1443Z"
                        fill="white"
                      />
                    </g>
                  </g>

                  <g className="logo-letter-group">
                    <path
                      className={`${style.logo_letter} logo-letter`}
                      d="M66.0912 17.0916H74.5113V19.4076H63.5095V2.22984H66.0912V17.0916Z"
                      fill="white"
                    />
                    <path
                      className={`${style.logo_letter} logo-letter`}
                      d="M88.6982 4.54584H79.0238V9.39444H87.7813V11.6626H79.0238V17.0905H88.6251V19.4064H76.4421V2.22984H88.6982V4.54584Z"
                      fill="white"
                    />
                    <path
                      className={`${style.logo_letter} logo-letter`}
                      d="M103.824 19.4076L102.136 14.9444H94.4157L92.7507 19.4076H90.0733L96.7806 2.22984H99.7479L106.551 19.4076H103.824ZM95.2356 12.7003H101.291L100.929 11.7595C100.012 9.46745 99.1194 7.10358 98.2517 4.7146C97.6485 6.3304 96.7796 8.67152 95.5982 11.7595L95.2367 12.7003H95.2356Z"
                      fill="white"
                    />
                    <path
                      className={`${style.logo_letter} logo-letter`}
                      d="M118.686 19.4076L114.006 12.6763H110.508V19.4076H107.926V2.22984H115.285C117.142 2.22984 118.565 2.71219 119.603 3.67689C120.641 4.64158 121.147 5.89592 121.147 7.41597C121.147 10.0216 119.579 11.9761 116.853 12.4824L121.677 19.4064H118.686V19.4076ZM110.508 4.45128V10.5064H115.213C117.336 10.5064 118.518 9.29989 118.518 7.46625C118.518 5.63261 117.335 4.45008 115.213 4.45008H110.508V4.45128Z"
                      fill="white"
                    />
                    <path
                      className={`${style.logo_letter} logo-letter`}
                      d="M134.996 2.22984H137.481V19.4076H134.514L129.231 11.0845C127.663 8.62365 126.553 6.79 125.877 5.5596C125.949 7.70682 125.974 10.6021 125.974 14.1964V19.4076H123.465V2.22984H126.433L131.741 10.553C133.068 12.6524 134.202 14.51 135.094 16.1018C135.023 13.9307 134.998 11.0354 134.998 7.44112V2.22984H134.996Z"
                      fill="white"
                    />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_2323_2">
                    <rect width="137.481" height="22" fill="white" />
                  </clipPath>
                  <clipPath id="clip1_2323_2">
                    <rect width="22.0863" height="22" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </span>
          </Link>

          {/* Navigation */}
          <nav
            className={`${style.header__navigation} ${menuOpen ? style.open : ""} flex h-full w-full items-center justify-center bg-amber-600 md:justify-end md:bg-transparent`}
          >
            <ul className="navigation relative flex flex-col items-center gap-y-7 text-2xl sm:gap-8 md:flex-row md:gap-10 md:text-sm xl:gap-12.5">
              {navItems.map((item) => (
                <li
                  key={item}
                  className="tranlate-y-1 navigation__item opacity-0"
                  style={{
                    "clip-path": "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                  }}
                >
                  <NavLink
                    onClick={closeMenu}
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className={({ isActive }) =>
                      `${style.navigation__link} ${isActive ? "navigation__link-active" : ""}`
                    }
                  >
                    <span className="m-w-full opacity-0">{item}</span>
                    <span
                      data-text={item}
                      className={`${style.scramble_text} scramble-text`}
                    >
                      {item}
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Menu Button */}
          <button
            type="button"
            className={`${style["icon-menu"]} ${menuOpen ? style.open : ""}`}
            onClick={toggleMenu}
          >
            <span
              className="icon-menu__line scale-0 opacity-0"
              style={{ "clip-path": "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }}
            ></span>
            <span
              className="icon-menu__line scale-0 opacity-0"
              style={{ "clip-path": "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }}
            ></span>
            <span
              className="icon-menu__line scale-0 opacity-0"
              style={{ "clip-path": "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }}
            ></span>
          </button>
        </div>
      </div>
    </header>
  );
});

Header.displayName = "Header";
export default Header;
