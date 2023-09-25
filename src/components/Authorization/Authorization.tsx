import { useEffect, useState } from "react";
import Tabs, { Tab } from "../Tabs/Tabs";
import SignUp from "./SignUp/SignUp";
import styles from "./Authorization.module.css";
import SignIn from "./SignIn/SignIn";
import clsx from "clsx";

const tabs: Tab[] = [
  { label: "SIGN IN", value: "signIn" },
  { label: "SIGN UP", value: "signUp" },
];

const Authorization = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].value);

  const handleChangeTab = (tab: Tab) => setActiveTab(tab.value);

  useEffect(() => {
    document.title = "Authorization";
  }, []);

  return (
    <div className={styles.AuthorizationWrapper}>
      <Tabs
        className={clsx(styles.tabs, styles.authTabs)}
        activeTab={activeTab}
        tabs={tabs}
        onTabClick={handleChangeTab}
      />
      {activeTab === "signIn" && <SignIn />}
      {activeTab === "signUp" && <SignUp />}
    </div>
  );
};

export default Authorization;
