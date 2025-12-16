import { forwardRef } from "react";
import style from "./ScrollDownButton.module.css";

// function ScrollDownButton() {
//   return <button className={style["scroll-down"]}></button>;
// }

const ScrollDownButton = forwardRef(({ children }, ref) => {
  return (
    <button ref={ref} className={style["scroll-down"]}>
      {children}
    </button>
  );
});

ScrollDownButton.displayName = "ScrollDownButton";

export default ScrollDownButton;
