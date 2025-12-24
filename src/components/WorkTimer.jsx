import Timer from "./Timer";

export function WorkTimer({ onWorkComplete }) {
  return <Timer presets={[1, 30, 45]} activeTab="Work" onComplete={onWorkComplete} />;
}
