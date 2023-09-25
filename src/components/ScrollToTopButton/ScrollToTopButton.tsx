import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { throttle } from "lodash";
import arrowUp from "./img/up-arrow_icon.svg";
import styles from "./ScrollToTopButton.module.css";

const MIN_HEIGHT = -300;

const ScrollToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const handleClick = () =>
    document.body.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    const handleScroll = throttle(() => {
      setVisible(document.body.getBoundingClientRect().top <= MIN_HEIGHT);
    }, 300);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      className={clsx(styles.button, { [styles.visible]: visible })}
      onClick={handleClick}
    >
      <img src={arrowUp} alt="to top" />{" "}
    </button>
  );
};

export default ScrollToTopButton;
