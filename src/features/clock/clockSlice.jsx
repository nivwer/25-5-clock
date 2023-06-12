import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  breakLength: 5,
  sessionLength: 25,
  timerLabel: 'Session',
  timeLeft: 25 * 60,
  isRunning: false,
};

const clockSlice = createSlice({
  name: 'clock',
  initialState,
  reducers: {
    setBreakLength: (state, action) => {
      state.breakLength = action.payload;
    },
    setSessionLength: (state, action) => {
      state.sessionLength = action.payload;
      state.timeLeft = action.payload * 60;
    },
    setTimerLabel: (state, action) => {
      state.timerLabel = action.payload;
    },
    decrementTimeLeft: (state) => {
      if (state.timeLeft > 0) {
        state.timeLeft--;
      } else {
        const audio = document.getElementById('beep');
        audio.play();

        if (state.timerLabel === 'Session') {
          state.timerLabel = 'Break';
          state.timeLeft = state.breakLength * 60;
        } else {
          state.timerLabel = 'Session';
          state.timeLeft = state.sessionLength * 60;
        }
      }
    },
    setIsRunning: (state, action) => {
      state.isRunning = action.payload;
    },
    resetClock: (state) => {
      state.breakLength = 5;
      state.sessionLength = 25;
      state.timerLabel = 'Session';
      state.timeLeft = 25 * 60;
      state.isRunning = false;
    },
  },
});

export const {
  setBreakLength,
  setSessionLength,
  setTimerLabel,
  decrementTimeLeft,
  setIsRunning,
  resetClock,
} = clockSlice.actions;

export default clockSlice.reducer;