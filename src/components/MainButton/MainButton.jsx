import { forwardRef } from "react";
import { Link } from "react-router-dom";
import styles from "./MainButton.module.css";

const MainButton = forwardRef(({ children }, ref) => {
  return (
    <Link ref={ref} to={"/"} className={styles["main-button"]}>
      <div className={styles["main-button__background"]}></div>
      <span className={styles["main-button__text"]}>{children}</span>
    </Link>
  );
});

MainButton.displayName = "MainButton";

export default MainButton;
