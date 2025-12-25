import { useState, useEffect, useRef } from "react";
import peeking from "../assets/cat-peeking.gif";
import falling from "../assets/falling.gif";
import kittensMeowingFile from "../assets/kittensMeowing.mp3";

export default function Timer({ presets, activeTab }) {
  
  const STORAGE_KEY = `pomo_seconds_${activeTab}`;
  const CUSTOM_KEY = `pomo_custom_${activeTab}`;

  const [seconds, setSeconds] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? parseInt(saved) : presets[0] * 60;
  });
  
  const [customMins, setCustomMins] = useState(() => {
    return localStorage.getItem(CUSTOM_KEY) || "";
  });

  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const soundRef = useRef(null);

  const [showToast, setShowToast] = useState(false);

  // Saving seconds to localStorage 
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, seconds);
  }, [seconds, STORAGE_KEY]);

  const start = () => {
    if (isRunning) return;
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setIsRunning(false);

          setShowToast(true);
          setTimeout(() => setShowToast(false), 10000);

          soundRef.current?.play();
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
    const newSeconds = mins * 60;
    setSeconds(newSeconds);
    setIsRunning(false);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (customMins > 0) {
      localStorage.setItem(CUSTOM_KEY, customMins);
      reset(customMins);
    }
  };

  
  useEffect(() => {
    soundRef.current = new Audio(kittensMeowingFile);
    return () => clearInterval(intervalRef.current);
  }, []);

  const format = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col gap-3 items-center">

      {/* Timer Display Card */}
    
        <div className="card w-82 h-40 bg-base-200 shadow-md my-3 relative overflow-hidden">
          <h2 className="text-6xl font-bold flex justify-center items-center mt-12 mr-16">
            {format(seconds)}
          </h2>
        <div>
        
          <img
          src={activeTab === "Work" ? peeking : falling}
          className={`absolute right-2 w-24 ${activeTab === "Work" ? "top-2" : "top-8"}`}
          />
        </div>
      
    </div>

      {/* Preset Buttons */}
      <div className="flex gap-2 flex-wrap justify-center">
        {presets.map((p) => (
          <button key={p} className="btn btn-outline btn-primary" onClick={() => reset(p)}>
            {p}m
          </button>
        ))}
      </div>

      {/* Custom Input Form */}
      <form onSubmit={handleCustomSubmit} className="flex gap-2 items-center mt-2">
        <input 
          type="number" 
          placeholder="Mins" 
          min= "0"
          step="any"
          className="input input-bordered input-sm w-20 text-center border-pink-500 "
          value={customMins}
          onChange={(e) => setCustomMins(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">Set Custom</button>
      </form>

      {/* Control Buttons */}
      <div className="flex gap-2 mt-4">
        <button className={`btn ${isRunning ? 'btn-disabled' : 'btn-primary'}`} onClick={start}>Start</button>
        <button className="btn" onClick={pause}>Pause</button>
        <button className="btn btn-soft btn-error" onClick={() => reset()}>Reset</button>
      </div>

      {/* Adding Toast */}
    {showToast && (
      <div className="toast toast-top toast-center mt-5">
        <div className="alert alert-success shadow-lg bg-pink-200 border-pink-400 text-pink-700">
          <div className="flex items-center gap-2">
            
            {activeTab === "Work" ? <span className="font-bold">Timer is up! Time for a cozy break!</span>
            :
            <span className="font-bold">Timer is up! Let's get back to work!</span> }
            <span>✨</span>
            <button 
              className="btn btn-ghost btn-xs" 
              onClick={() => setShowToast(false)}
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    )}
    </div>
  );
}