import React, { useState, useEffect } from 'react';

const Settings = ({ initialConfig, onSave, isActive }) => {
  const [config, setConfig] = useState(initialConfig);

  useEffect(() => {
    setConfig(initialConfig);
  }, [initialConfig]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig((prevConfig) => ({
      ...prevConfig,
      [name]: parseInt(value, 10),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(config);
  };

  return (
    <form className="settings" onSubmit={handleSubmit}>
      <h2>Configuration</h2>
      <div className="settings-grid">
        <div className="settings-group">
          <label htmlFor="workDuration">Work Session (minutes):</label>
          <input
            type="number"
            id="workDuration"
            name="workDuration"
            value={config.workDuration}
            onChange={handleChange}
            min="1"
            disabled={isActive}
            aria-label="Work session duration in minutes"
          />
        </div>
        <div className="settings-group">
          <label htmlFor="shortBreakDuration">Short Break (minutes):</label>
          <input
            type="number"
            id="shortBreakDuration"
            name="shortBreakDuration"
            value={config.shortBreakDuration}
            onChange={handleChange}
            min="1"
            disabled={isActive}
            aria-label="Short break duration in minutes"
          />
        </div>
        <div className="settings-group">
          <label htmlFor="longBreakDuration">Long Break (minutes):</label>
          <input
            type="number"
            id="longBreakDuration"
            name="longBreakDuration"
            value={config.longBreakDuration}
            onChange={handleChange}
            min="1"
            disabled={isActive}
            aria-label="Long break duration in minutes"
          />
        </div>
        <div className="settings-group">
          <label htmlFor="sessionsBeforeLongBreak">Sessions before Long Break:</label>
          <input
            type="number"
            id="sessionsBeforeLongBreak"
            name="sessionsBeforeLongBreak"
            value={config.sessionsBeforeLongBreak}
            onChange={handleChange}
            min="1"
            disabled={isActive}
            aria-label="Number of work sessions before a long break"
          />
        </div>
      </div>
      <button type="submit" disabled={isActive} aria-label="Save configuration settings">
        Save Settings
      </button>
    </form>
  );
};

export default Settings;