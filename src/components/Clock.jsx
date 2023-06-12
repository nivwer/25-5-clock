import React, { useState, useEffect } from "react";

const Clock = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timerLabel, setTimerLabel] = useState("Session");
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [isRunning, setIsRunning] = useState(false);

  const handleReset = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimerLabel("Session");
    setTimeLeft(25 * 60);
    setIsRunning(false);
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
  };

  const handleBreakDecrement = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  const handleBreakIncrement = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  const handleSessionDecrement = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setTimeLeft((sessionLength - 1) * 60);
    }
  };

  const handleSessionIncrement = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      setTimeLeft((sessionLength + 1) * 60);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft > 0) {
            return prevTimeLeft - 1;
          } else {
            const audio = document.getElementById("beep");
            audio.play();

            if (timerLabel === "Session") {
              setTimerLabel("Break");
              return breakLength * 60;
            } else {
              setTimerLabel("Session");
              return sessionLength * 60;
            }
          }
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, timerLabel, breakLength, sessionLength]);

  return (
    <div className="container">
      <h1>Pomodoro Clock</h1>
      <div className="settings">
        <div className="length-control">
          <h2 id="break-label">Break Length</h2>
          <div className="controls">
            <button
              id="break-decrement"
              onClick={handleBreakDecrement}
              disabled={isRunning}
            >
              -
            </button>
            <span id="break-length">{breakLength}</span>
            <button
              id="break-increment"
              onClick={handleBreakIncrement}
              disabled={isRunning}
            >
              +
            </button>
          </div>
        </div>
        <div className="length-control">
          <h2 id="session-label">Session Length</h2>
          <div className="controls">
            <button
              id="session-decrement"
              onClick={handleSessionDecrement}
              disabled={isRunning}
            >
              -
            </button>
            <span id="session-length">{sessionLength}</span>
            <button
              id="session-increment"
              onClick={handleSessionIncrement}
              disabled={isRunning}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="timer">
        <h2 id="timer-label">{timerLabel}</h2>
        <div id="time-left">{formatTime(timeLeft)}</div>
        <button id="start_stop" onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button id="reset" onClick={handleReset}>
          Reset
        </button>
      </div>
      <audio id="beep" src="beep.mp3" />
    </div>
  );
};

export default Clock;
