import { useState, useEffect, useRef } from "react";
import peeking from "../assets/cat-peeking.gif";
import falling from "../assets/falling.gif";
import kittensMeowingFile from "../assets/kittensMeowing.mp3";
// import catCuteFile from '../assets/catCute.mp3';

export default function Timer({ presets, activeTab }) {
  const [seconds, setSeconds] = useState(presets[0] * 60);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const soundRef = useRef(null);

  const start = () => {
    if (isRunning) return;
    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setIsRunning(false);

          if (soundRef.current) {
            soundRef.current.currentTime = 0;
            soundRef.current.play();
          }

          return 0;
        }

        return prev - 1;
      });
    }, 1000);
  };

  const pause = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const reset = (mins = presets[0]) => {
    clearInterval(intervalRef.current);
    setSeconds(mins * 60);
    setIsRunning(false);
  };

  useEffect(() => {
    soundRef.current = new Audio(kittensMeowingFile);
    // soundRef.current = new Audio(catCuteFile);
    return () => clearInterval(intervalRef.current);
  }, []);

  const format = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col gap-3 items-center">

      <div className="card w-75 h-40 bg-base-200 card-lg shadow-md my-3 relative">
        <h2 className="text-6xl font-bold flex justify-center items-center mt-10 mr-14">
          {format(seconds)}
        </h2>

        <img
          src={activeTab === "Work" ? peeking : falling}
          className={`absolute right-2 w-24 ${
            activeTab === "Work" ? "top-2" : "top-8"
          }`}
        />
      </div>

      <div className="flex gap-2">
        {presets.map((p) => (
          <button key={p} className="btn btn-outline" onClick={() => reset(p)}>
            {p} min
          </button>
        ))}
      </div>

      <div className="flex gap-2 mt-2">
        <button className="btn btn-primary" onClick={start}>
          Start
        </button>
        <button className="btn" onClick={pause}>
          Pause
        </button>
        <button className="btn" onClick={() => reset()}>
          Reset
        </button>
      </div>
    </div>
  );
}
