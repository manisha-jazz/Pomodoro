import { useState } from "react";
import { WorkTimer } from "./WorkTimer";
import { BreakTimer } from "./BreakTimer";

export const TabSwitch = () => {
  const [activeTab, setActiveTab] = useState("Work");

  return (
    <div className="w-full">
      <div role="tablist" className="tabs tabs-bordered flex justify-center ">
        <a role="tab"
          className={`tab ${activeTab === "Work" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("Work")}> Work</a>

        <a role="tab"
          className={`tab ${activeTab === "Break" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("Break")} >Break</a>
      </div>

      {activeTab === "Work" ? <WorkTimer activeTab = {activeTab} /> : <BreakTimer activeTab = {activeTab} />}
    </div>
  );
};
