import styles from "./Footer.module.css";
import Typography from "../Typography/Typography";
import { useLayoutEffect } from "react";
import { usePersistedState } from "../../hooks/usePersistedState";

const Footer: React.FC = () => {
  const [themeName, setThemeName] = usePersistedState<"dark" | "light">({
    key: "theme",
    initialValue: "light",
  });

  const changeTheme = () => {
    setThemeName(themeName === "light" ? "dark" : "light");
  };

  useLayoutEffect(() => {
    document.body.dataset.theme = themeName;
  }, [themeName]);

  return (
    <div className={styles.footerWrapper}>
      <Typography
        variant="b2"
        color="secondary"
        font="helios"
        children={"©2022 Bookstore"}
      />
      <Typography
        variant="b2"
        color="secondary"
        font="helios"
        children={"All rights reserved"}
      />
      <div className={styles.theme}>
        <label htmlFor="theme">
          <Typography
            variant="b2"
            color="secondary"
            font="helios"
            children={themeName}
          />
        </label>
        <input type="checkbox" name="theme" id="theme" onChange={changeTheme} />
      </div>
    </div>
  );
};

export default Footer;
