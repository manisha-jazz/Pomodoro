import { useState, useEffect } from "react";
import { WorkTimer } from "./WorkTimer";
import { BreakTimer } from "./BreakTimer";

export const TabSwitch = () => {
  // Initial state from local storage
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("pomo_active_tab") || "Work";
  });

  // Updating local storage whenever tab changes
  useEffect(() => {
    localStorage.setItem("pomo_active_tab", activeTab);
  }, [activeTab]);

  return (
    <div className="w-full">
      <div role="tablist" className="tabs tabs-bordered flex justify-center mb-4">
        <a role="tab"
          className={`tab ${activeTab === "Work" ? "tab-active font-bold" : ""}`}
          onClick={() => setActiveTab("Work")}>Work</a>

        <a role="tab"
          className={`tab ${activeTab === "Break" ? "tab-active font-bold" : ""}`}
          onClick={() => setActiveTab("Break")} >Break</a>
      </div>

      <div key={activeTab}>
        {activeTab === "Work" ? <WorkTimer activeTab={activeTab} /> : <BreakTimer activeTab={activeTab} />}
      </div>
    </div>
  );
};