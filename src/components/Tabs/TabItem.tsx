import React from "react";
import clsx from "clsx";

import Button from "../Button/Button";

import { Tab } from "./Tabs";
import styles from "./Tabs.module.css";

interface TabItemProps {
  tab: Tab;
  onTabClick: (tab: Tab) => void;
  className?: string;
}

const TabItem: React.FC<TabItemProps> = ({ tab, onTabClick, className }) => {
  const handleClick = () => onTabClick(tab);

  return (
    <li>
      <Button
        design="light"
        className={clsx(styles.btnTab, className)}
        onClick={handleClick}
        text={tab.label}
      />
    </li>
  );
};

export default TabItem;
