import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const CalendarPage = ({ timeLeft, displayStates, schedules , onCloseCalendar}) => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [scheduleTimes, setScheduleTimes] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const prevMonth = () => setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  const nextMonth = () => setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));

  const handleDateClick = (day) => {
    const clickedDate = new Date(date.getFullYear(), date.getMonth(), day);
    setSelectedDate(clickedDate);
    setSelectedSchedule(null); 
  };

  const formatTime = (seconds) => {
    let hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    if (hours === 0) hours = 12; 
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${period}`;
  };

  const generateScheduleTimes = (selectedSchedule) => {
    let times = [];
    const now = new Date();
  
    const scheduleConfig = schedules[selectedSchedule];
    
    const baseStart = scheduleConfig.start;
  
    const intervals = [
      { onStart: baseStart, offStart: baseStart + 4 },
      { onStart: baseStart + 8, offStart: baseStart + 12 },
      { onStart: baseStart + 16, offStart: baseStart + 20 },
    ];
  
    intervals.forEach((interval) => {
      const onStart = new Date();
      onStart.setHours(interval.onStart, 0, 0, 0);
      const onEnd = new Date(onStart.getTime() + 4 * 3600 * 1000); 
      const offStart = new Date(onEnd);
      const offEnd = new Date(offStart.getTime() + 4 * 3600 * 1000);
  
      if (selectedSchedule === "C") {
        
        times.push({
          on: `${formatTime(interval.onStart * 3600)} - ${formatTime((interval.onStart + 4) * 3600)}`,
          off: `${formatTime(interval.offStart * 3600)} - ${formatTime((interval.offStart + 4) * 3600)}`,
          expiresAt: offEnd.getTime(), 
        });
      } else {
        
        times.push({
          on: `${formatTime(interval.offStart * 3600)} - ${formatTime((interval.offStart + 4) * 3600)}`,
          off: `${formatTime(interval.onStart * 3600)} - ${formatTime((interval.onStart + 4) * 3600)}`,
          expiresAt: offEnd.getTime(), 
        });
      }
    });
  
    return times;
  };
  

  const handleScheduleSelect = (schedule) => {
    setSelectedSchedule(schedule);
    const times = generateScheduleTimes(schedule);
    setScheduleTimes(times);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      setScheduleTimes((prevTimes) =>
        prevTimes.filter((timeSlot) => now < timeSlot.expiresAt) 
      );
    }, 60000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="calendar-page-container">
      <div className="calendar-header-left">
        <div className="back-link">
          <button className="btn btn-primary" onClick={onCloseCalendar}><FaArrowLeft className='mb-1' /> Back</button>
        </div>
      </div>
      <div className="calendar">
        <div className="calendar-header">
          <button className="btn btn-warning" onClick={prevMonth}><FaArrowLeft /></button>
          <h2>{monthNames[date.getMonth()]} {date.getFullYear()}</h2>
          <button className="btn btn-warning" onClick={nextMonth}><FaArrowRight /></button>
        </div>

        <div className="calendar-grid">
          {daysOfWeek.map((day) => (
            <div key={day} className="calendar-day-header">{day}</div>
          ))}

          {Array.from({ length: new Date(date.getFullYear(), date.getMonth(), 1).getDay() }).map((_, index) => (
            <div key={`empty-${index}`} className="calendar-day empty"></div>
          ))}

          {Array.from({ length: new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() }).map((_, index) => {
            const day = index + 1;
            const currentDate = new Date(date.getFullYear(), date.getMonth(), day);
            const isToday = new Date().toDateString() === currentDate.toDateString();
            const isSelected = selectedDate && selectedDate.toDateString() === currentDate.toDateString();

            return (
              <div
                key={`day-${day}`}
                className={`calendar-day ${isToday ? "today" : ""} ${isSelected ? "active" : ""}`}
                onClick={() => handleDateClick(day)}
                style={{ cursor: "pointer" }}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>

      {selectedDate && (
        <div className="schedule-selection text-center mb-4">
          <h3 className="text-primary mb-3 mt-4">Choose a button for {selectedDate.toDateString()}</h3>
          <div className="btn-group" role="group" aria-label="Schedule Selection">
            <button onClick={() => handleScheduleSelect("A")} className="btn btn-primary m-2">A</button>
            <button onClick={() => handleScheduleSelect("B")} className="btn btn-primary m-2">B</button>
            <button onClick={() => handleScheduleSelect("C")} className="btn btn-primary m-2">C</button>
          </div>
        </div>
      )}

{selectedSchedule && scheduleTimes.length > 0 && (
  <div className="schedule-table">
    <h3 className="schedule-title">
      Line {selectedSchedule} , {selectedDate.toDateString()}
    </h3>
    <div className="table-container">
      <table className="schedule-table-content">
        <thead>
          <tr>
            <th className="table-header-on">မီးလာမည့် အချိန်များ</th>
            <th className="table-header-off">မီးပျက်မည့် အချိန်များ</th>
          </tr>
        </thead>
        <tbody>
          {scheduleTimes.map((timeSlot, index) => (
            <tr key={index}>
              <td>{timeSlot.on}</td>
              <td>{timeSlot.off}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}

    </div>
  );
};

export default CalendarPage;
