import { useState } from "react";
import iconMore from "./img/showMore.svg";
import instagram from "./img/instagram.svg";
import facebook from "./img/facebook.svg";
import twitter from "./img/twitter.svg";
import linkedIn from "./img/linkedIn.svg";
import youtube from "./img/youtube.svg";
import styles from "./Social.module.css";

const Socials = () => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className={styles.iconsWrapper}>
      <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
        <img className={styles.iconSocial} src={facebook} alt="facebook" />
      </a>
      <a href="https://twitter.com/" target="_blank" rel="noreferrer">
        <img className={styles.iconSocial} src={twitter} alt="twitter" />
      </a>
      {showMore && (
        <>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
            <img className={styles.iconSocial} src={linkedIn} alt="linkedin" />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            <img
              className={styles.iconSocial}
              src={instagram}
              alt="instagram"
            />
          </a>
          <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
            <img className={styles.iconSocial} src={youtube} alt="youtube" />
          </a>
        </>
      )}

      <button
        onClick={toggleShowMore}
        className={showMore ? `${styles.hide}` : styles.displayed}
      >
        <img className={styles.iconSocial} src={iconMore} alt="showmore" />
      </button>
    </div>
  );
};

export default Socials;
