import Timer from "./Timer";

export const BreakTimer = ({activeTab}) => {
  return (
    <Timer presets={[5, 15, 30]} activeTab = {activeTab} />
  );
};
