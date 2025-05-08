import React, { useState, useEffect, useCallback, useRef } from 'react';
import TimerDisplay from './components/TimerDisplay.jsx';
import Controls from './components/Controls.jsx';
import Settings from './components/Settings.jsx';
import SessionTracker from './components/SessionTracker.jsx';
import './App.css';

const SESSION_TYPES = {
  WORK: 'Work',
  SHORT_BREAK: 'Short Break',
  LONG_BREAK: 'Long Break',
};

const DEFAULT_CONFIG = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  sessionsBeforeLongBreak: 4,
};

function App() {
  const [config, setConfig] = useState(() => {
    const savedConfig = localStorage.getItem('pomodoroConfig');
    return savedConfig ? JSON.parse(savedConfig) : DEFAULT_CONFIG;
  });

  const [minutes, setMinutes] = useState(config.workDuration);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentSessionType, setCurrentSessionType] = useState(SESSION_TYPES.WORK);
  const [completedSessions, setCompletedSessions] = useState(0);

  const intervalRef = useRef(null);
  const alarmSoundRef = useRef(null);

  useEffect(() => {
    alarmSoundRef.current = document.getElementById('alarm-sound');
  }, []);

  const playAlarm = useCallback(() => {
    if (alarmSoundRef.current) {
      alarmSoundRef.current.currentTime = 0;
      alarmSoundRef.current.play().catch(error => console.warn("Audio play failed:", error));
    }
  }, []);

  const resetTimer = useCallback((sessionType) => {
    setIsActive(false);
    setIsPaused(false);
    clearInterval(intervalRef.current);
    setCurrentSessionType(sessionType);
    switch (sessionType) {
      case SESSION_TYPES.WORK:
        setMinutes(config.workDuration);
        break;
      case SESSION_TYPES.SHORT_BREAK:
        setMinutes(config.shortBreakDuration);
        break;
      case SESSION_TYPES.LONG_BREAK:
        setMinutes(config.longBreakDuration);
        break;
      default:
        setMinutes(config.workDuration);
    }
    setSeconds(0);
  }, [config]);


  useEffect(() => {
    if (!isActive || isPaused) {
      return;
    }

    intervalRef.current = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        }
        setMinutes((prevMinutes) => {
          if (prevMinutes > 0) {
            setSeconds(59);
            return prevMinutes - 1;
          }
          playAlarm();
          if (currentSessionType === SESSION_TYPES.WORK) {
            const newCompletedSessions = completedSessions + 1;
            setCompletedSessions(newCompletedSessions);
            if (newCompletedSessions % config.sessionsBeforeLongBreak === 0) {
              resetTimer(SESSION_TYPES.LONG_BREAK);
            } else {
              resetTimer(SESSION_TYPES.SHORT_BREAK);
            }
          } else {
            resetTimer(SESSION_TYPES.WORK);
          }
          return 0;
        });
        return 59;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isActive, isPaused, currentSessionType, completedSessions, config, resetTimer, playAlarm]);


  useEffect(() => {
    document.title = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} - ${currentSessionType}`;
  }, [minutes, seconds, currentSessionType]);

  const handleStart = () => {
    if (minutes === 0 && seconds === 0) {
        resetTimer(currentSessionType);
    }
    setIsActive(true);
    setIsPaused(false);
  };

  const handleStop = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
    setIsActive(true);
  };

  const handleResetApp = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
    setIsPaused(false);
    setCompletedSessions(0);
    resetTimer(SESSION_TYPES.WORK);
    // setConfig(DEFAULT_CONFIG);
    // localStorage.setItem('pomodoroConfig', JSON.stringify(DEFAULT_CONFIG));
  };

  const handleSaveSettings = (newConfig) => {
    setConfig(newConfig);
    localStorage.setItem('pomodoroConfig', JSON.stringify(newConfig));
    if (!isActive && !isPaused && currentSessionType === SESSION_TYPES.WORK) {
      setMinutes(newConfig.workDuration);
      setSeconds(0);
    } else if (!isActive && !isPaused && currentSessionType === SESSION_TYPES.SHORT_BREAK) {
        setMinutes(newConfig.shortBreakDuration);
        setSeconds(0);
    } else if (!isActive && !isPaused && currentSessionType === SESSION_TYPES.LONG_BREAK) {
        setMinutes(newConfig.longBreakDuration);
        setSeconds(0);
    }
  };

  useEffect(() => {
    if (!isActive && !isPaused) {
        if (currentSessionType === SESSION_TYPES.WORK) {
            setMinutes(config.workDuration);
        } else if (currentSessionType === SESSION_TYPES.SHORT_BREAK) {
            setMinutes(config.shortBreakDuration);
        } else if (currentSessionType === SESSION_TYPES.LONG_BREAK) {
            setMinutes(config.longBreakDuration);
        }
        setSeconds(0);
    }
  }, [config, isActive, isPaused, currentSessionType]);


  return (
    <div className="app-container">
      <h1>Pomodoro Timer</h1>
      <TimerDisplay
        minutes={minutes}
        seconds={seconds}
        sessionType={currentSessionType}
      />
      <Controls
        onStart={handleStart}
        onStop={handleStop}
        onResume={handleResume}
        onReset={handleResetApp}
        isActive={isActive}
        isPaused={isPaused}
      />
      <SessionTracker
        completedSessions={completedSessions}
        sessionsBeforeLongBreak={config.sessionsBeforeLongBreak}
      />
      <Settings
        initialConfig={config}
        onSave={handleSaveSettings}
        isActive={isActive || isPaused}
      />
    </div>
  );
}

export default App;