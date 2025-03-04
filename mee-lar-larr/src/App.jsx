import React, { useState, useEffect } from "react";
import HeaderButton from "./components/HeaderButton";
import ClockDisplay from "./components/ClockDisplay";
import CalendarPage from "./components/CalendarPage";
import Schedule from "./components/Schedule";
import photoOnUrl from "./photos/Bulb_On_Real-removebg-preview.png";
import photoOffUrl from "./photos/Bulb_Off_real-removebg-preview.png";

const schedules = {
  A: { start: 3, duration: 4 },
  B: { start: 5, duration: 4 },
  C: { start: 3, duration: 4 },
};

const App = () => {
  const [timeLeft, setTimeLeft] = useState({ A: 0, B: 0, C: 0 });
  const [currentSchedule, setCurrentSchedule] = useState("A");
  const [displayStates, setDisplayStates] = useState(() => {
    const savedStates = localStorage.getItem("displayStates");
    return savedStates ? JSON.parse(savedStates) : { A: true, B: false, C: false };
  });
  const [displayChangeTimes, setDisplayChangeTimes] = useState(() => {
    const savedTimes = localStorage.getItem("displayChangeTimes");
    return savedTimes ? JSON.parse(savedTimes) : { A: null, B: null, C: null };
  });

  const playSound = () => {
    const audio = new Audio("/မီးလာပါပြီရှင်.mp3");
    audio.play().then(() => {
      console.log("Sound played");
    }).catch(error => {
      console.log("Audio error:", error);
    });
  };

  const [notificationButtonColor, setNotificationButtonColor] = useState("");
  const [shakingSchedule, setShakingSchedule] = useState(null);
  const notificationCounts= { A: 1, B: 2, C: 3 };
  const [showCalendar, setShowCalendar] = useState(false);

  const onCalendarButtonClick = () => {
    setShowCalendar(true); 
  };

  const handleCloseCalendar = () => {
    setShowCalendar(false);
  };

  const changeNotificationButtonColor = () => {
    setNotificationButtonColor("red");
    console.log("Red Change...");
    setTimeout(() => {
      setNotificationButtonColor("");
    }, 5000);
  };

  const calculateTimeLeft = (scheduleKey) => {
    const now = new Date();
    const { start, duration } = schedules[scheduleKey];
    const currentHour = now.getHours();
  
    let firstIntervalStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), start);
    
    if (now < firstIntervalStart) {
      return Math.floor((firstIntervalStart - now) / 1000);
    }
  
    let intervalStartHour = start;
    while (intervalStartHour + duration <= currentHour) {
      intervalStartHour += 4;
    }
  
    if (intervalStartHour >= 24) {
      intervalStartHour = start; 
      firstIntervalStart.setDate(firstIntervalStart.getDate() + 1);
      firstIntervalStart.setHours(start);
      return Math.floor((firstIntervalStart - now) / 1000);
    }
  
    const intervalStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), intervalStartHour);
    const intervalEnd = new Date(intervalStart.getTime() + duration * 3600000);
  
    return Math.max(Math.floor((intervalEnd - now) / 1000), 0);
  };

  useEffect(() => {
    const updateTimeLeftAndDisplayStates = () => {
      const newTimeLeft = {};
      let updatedDisplayStates = { ...displayStates };
      let shouldUpdateDisplay = false;

      Object.keys(schedules).forEach((scheduleKey) => {
        newTimeLeft[scheduleKey] = calculateTimeLeft(scheduleKey);

        if (newTimeLeft[scheduleKey] === 0) {
          if (!displayStates[scheduleKey]) {
            updatedDisplayStates[scheduleKey] = true;
            shouldUpdateDisplay = true;
            playSound();
            changeNotificationButtonColor();
            setShakingSchedule(scheduleKey);
            setTimeout(() => setShakingSchedule(null), 10000);
          } else {
            updatedDisplayStates[scheduleKey] = false;
            shouldUpdateDisplay = true;
          }
        }
      });

      setTimeLeft(newTimeLeft);

      if (shouldUpdateDisplay) {
        setDisplayStates(updatedDisplayStates);
        localStorage.setItem("displayStates", JSON.stringify(updatedDisplayStates));
      }
    };

    updateTimeLeftAndDisplayStates();
    const interval = setInterval(updateTimeLeftAndDisplayStates, 1000);

    return () => clearInterval(interval);
  }, []);
  
  const handleButtonClick = (schedule) => {
    setCurrentSchedule(schedule);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const getStyles = () => {
    const isDisplayOn = displayStates[currentSchedule];
    const baseStyles = isDisplayOn
      ? { backgroundColor: "#66785F", color: "#ffffff" }
      : { backgroundColor: "#2C2F38", color: "#ffffff" };
  
    if (currentSchedule === "C") {
      baseStyles.backgroundColor = isDisplayOn ? "#2C2F38" : "#66785F";
      baseStyles.color = "#ffffff";
    }
  
    return baseStyles;
  };

  return showCalendar ? (
    <CalendarPage
      timeLeft={timeLeft}
      displayStates={displayStates}
      schedules={schedules}
      onCloseCalendar={() => setShowCalendar(false)}
    />
  ) : (
    <div style={{ minHeight: "100vh", ...getStyles() }}>
      <HeaderButton
        onButtonClick={setCurrentSchedule}
        displayStates={displayStates}
        notificationButtonColor={notificationButtonColor}
        notificationCounts={notificationCounts}
        shakingSchedule={shakingSchedule}
        onCalendarButtonClick={() => setShowCalendar(true)}
      />
      <div>
        <ClockDisplay
          formatTime={formatTime}
          currentSchedule={currentSchedule}
          timeLeft={timeLeft[currentSchedule]}
          isDisplayOn={displayStates[currentSchedule]}
          photoOnUrl={photoOnUrl}
          photoOffUrl={photoOffUrl}
        />
        <Schedule currentSchedule={currentSchedule} schedules={schedules} />
      </div>
    </div>
  );
};

export default App;