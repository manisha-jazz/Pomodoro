import Timer from "./Timer";

export function WorkTimer({ onWorkComplete }) {
  return <Timer presets={[20, 30, 45]} activeTab="Work" onComplete={onWorkComplete} />;
}
