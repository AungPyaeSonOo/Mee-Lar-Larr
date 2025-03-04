import React, { useState, useEffect } from "react";

const Schedule = ({ currentSchedule, schedules, displayChangeTimes }) => {
  const [schedule, setSchedule] = useState([]);
  const [playedIntervals, setPlayedIntervals] = useState({});

  const playSound = () => {
    const audio = new Audio("/မီးလာပါပြီရှင်.mp3");
    audio.play().then(() => {
      console.log("Sound played");
    }).catch(error => {
      console.log("Audio error:", error);
    });
  };

  useEffect(() => {
    const generateIntervals = () => {
      const now = new Date();
      const intervals = [];
      const { start, duration } = schedules[currentSchedule];
      const currentHour = now.getHours();
      const intervalStartHour = Math.floor((currentHour - start) / duration) * duration + start;

      let current = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        intervalStartHour
      );
      if (current > now) {
        current.setHours(intervalStartHour - duration);
      }

      for (let i = 0; i < 6; i++) {
        const startTime = new Date(current);
        const endTime = new Date(current);
        endTime.setHours(endTime.getHours() + duration);

        intervals.push({
          startTime,
          endTime,
          startLabel: startTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          endLabel: endTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          date: `${startTime.getDate()}.${startTime.getMonth() + 1}.${startTime.getFullYear()}`,
          isCurrent: now >= startTime && now < endTime,
        });

        current.setHours(current.getHours() + duration);
      }

      setSchedule(intervals);
    };

    generateIntervals();
    const intervalId = setInterval(generateIntervals, 60000);

    return () => clearInterval(intervalId);
  }, [currentSchedule, JSON.stringify(schedules[currentSchedule])]);

  useEffect(() => {
    if (!displayChangeTimes) return;
    const now = new Date();

    schedule.forEach((entry) => {
      Object.keys(displayChangeTimes).forEach((scheduleKey) => {
        const changeTime = new Date(displayChangeTimes[scheduleKey]);

        if (
          Math.floor(changeTime.getTime() / 1000) === Math.floor(entry.endTime.getTime() / 1000) &&
          !playedIntervals[entry.key]
        ) {
          playSound();
          setPlayedIntervals((prev) => ({ ...prev, [entry.key]: true }));
        }
      });
    });
  }, [schedule, displayChangeTimes, playedIntervals]);

  return (
    <div
      className="mt-4"
      style={{
        maxHeight: "400px",
        overflowY: "auto",
        padding: "10px",
        border: "none",
        borderRadius: "8px",
      }}
    >
      {schedule.map((entry, index) => {
        let bgColor = entry.isCurrent ? "#66C4FF" : "#343a40";
        let textColor = entry.isCurrent ? "#000000" : "#ffffff";

        return (
          <div
            key={index}
            className="px-3 py-3 rounded-3 mt-2 d-flex justify-content-between align-items-center"
            style={{
              backgroundColor: bgColor,
              color: textColor,
              cursor: "pointer",
            }}
          >
            <div>
              <h5 className="mb-0">{`${entry.startLabel} - ${entry.endLabel}`}</h5>
              <h6 className="mt-2">{entry.date}</h6>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Schedule;
