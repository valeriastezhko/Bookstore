import React from "react";
import clsx from "clsx";
import styles from "./Tabs.module.css";
import TabItem from "./TabItem";

export interface Tab {
  label: string;
  value: string | number;
  disabled?: boolean;
}

interface TabsProps {
  activeTab: Tab["value"];
  tabs: Tab[];
  onTabClick: (tab: Tab) => void;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({
  activeTab,
  tabs,
  onTabClick,
  className,
}) => {
  return (
    <div className={clsx(styles.wrapper, className)}>
      <ul className={styles.tabs}>
        {tabs.map((tab) => (
          <TabItem
            key={tab.label}
            tab={tab}
            onTabClick={onTabClick}
            className={clsx(className, {
              [styles.active]: activeTab === tab.value,
            })}
          />
        ))}
      </ul>
    </div>
  );
};

export default Tabs;
