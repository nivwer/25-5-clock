import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setBreakLength,
  setSessionLength,
  setTimerLabel,
  decrementTimeLeft,
  setIsRunning,
  resetClock,
} from '../features/clock/clockSlice';

const Clock = () => {
  const dispatch = useDispatch();
  const {
    breakLength,
    sessionLength,
    timerLabel,
    timeLeft,
    isRunning,
  } = useSelector((state) => state.clock);

  const handleReset = () => {
    dispatch(resetClock());
    const audio = document.getElementById('beep');
    audio.pause();
    audio.currentTime = 0;
  };

  const handleBreakDecrement = () => {
    if (breakLength > 1) { 
      dispatch(setBreakLength(breakLength - 1));
    }
  };

  const handleBreakIncrement = () => {
    if (breakLength < 60) {
      dispatch(setBreakLength(breakLength + 1));
    }
  };

  const handleSessionDecrement = () => {
    if (sessionLength > 1) {
      dispatch(setSessionLength(sessionLength - 1));
    }
  };

  const handleSessionIncrement = () => {
    if (sessionLength < 60) {
      dispatch(setSessionLength(sessionLength + 1));
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        dispatch(decrementTimeLeft());
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, dispatch]);

  return (
    <div className="text-gray-dark container h-100">
      <div className='row justify-content-center align-content-center h-100'>
      <h1 className="text-center text-gray-light">Pomodoro Clock</h1>
      <div className='col-lg-6 col-sm-12'>
        <div className="settings text-center justify-coontent-center row">
        <div className="length-control col-sm-6 p-2">
          <h2 className='fs-4 mx-auto' id="break-label">Break Length</h2>
          <div className="controls">
            <button
              id="break-decrement"
              onClick={handleBreakDecrement}
              disabled={isRunning}
              className='btn btn-primary rounded-0 m-1'
              style={{width: "40px", height: "40px"}}
            >
              -
            </button>
            <span className='align-middle fs-3 mx-2' id="break-length">{breakLength}</span>
            <button
              id="break-increment"
              onClick={handleBreakIncrement}
              disabled={isRunning}
              className='btn btn-primary rounded-0 m-1'
              style={{width: "40px", height: "40px"}}
            >
              +
            </button>
          </div>
        </div>
        <div className="length-control col-sm-6 p-2">
          <h2 className='fs-4' id="session-label">Session Length</h2>
          <div className="controls">
            <button
              id="session-decrement"
              onClick={handleSessionDecrement}
              disabled={isRunning}
              className='btn btn-primary rounded-0 m-1'
              style={{width: "40px", height: "40px"}}
            >
              -
            </button>
            <span className='align-middle fs-3 mx-2' id="session-length">{sessionLength}</span>
            <button
              id="session-increment"
              onClick={handleSessionIncrement}
              disabled={isRunning}
              className='btn btn-primary rounded-0 m-1'
              style={{width: "40px", height: "40px"}}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="timer text-center p-2">
        <h2 className='text-gray-light' id="timer-label">{timerLabel}</h2>
        <div className='fs-2 pb-2' id="time-left">{formatTime(timeLeft)}</div>
        <button
          id="start_stop"
          onClick={() => dispatch(setIsRunning(!isRunning))}
          className='btn btn-primary rounded-0 m-1'
        >
          {isRunning ? 'Pause' : 'Start'}
          
        </button>
        <button id="reset" onClick={handleReset} className='btn btn-primary rounded-0 m-1' >
          Reset
        </button>
      </div>
        </div>
      <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
      </div>
      <div id="nivwer">
        <a href="https://github.com/nivwer" target="_blank">by nivwer</a>
      </div>
    </div>
  );
};

export default Clock;
