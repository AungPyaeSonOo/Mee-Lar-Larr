import React, { useState, useEffect } from "react";
import { FaCalendar, FaBell } from "react-icons/fa";

const HeaderInfoComponent = ({ displayStates, notificationCounts, shakingSchedule , onCalendarButtonClick }) => {
  const [hover, setHover] = useState(false);
  const [shake, setShake] = useState(false);

 
  const [prevDisplayStates, setPrevDisplayStates] = useState(displayStates);

  useEffect(() => {
    
    Object.keys(displayStates).forEach((scheduleKey) => {
      if (!prevDisplayStates[scheduleKey] && displayStates[scheduleKey]) {
        
        setShake(true);
        setTimeout(() => {
          setShake(false);
        }, 5000);  
      }
    });

    
    setPrevDisplayStates(displayStates);
  }, [displayStates, prevDisplayStates]); 

  const getNotificationButtonStyle = () => {
    if (shakingSchedule) {
      return { backgroundColor: "red" };  
    }
    return {};
  };

  return (
    <div className="container-fluid p-3">
      <div className="row align-items-center">
        <div className="col-12 col-sm-4 text-start ms-2">
          <h4>
            Created By{" "}
            <span
              className="text-3d"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              style={{
                color: " #f78a0e",
                display: "inline-block",
                transition: "transform 0.3s ease, text-shadow 0.3s ease",
                transform: hover ? "perspective(500px)" : "none",
                textShadow: hover ? "10px 10px 20px rgba(255, 102, 0, 0.7)" : "none",
              }}
            >
              Aung Pyae Son Oo
            </span>
          </h4>
        </div>

        <div className="col-12 col-sm-4 text-center">
          <h2 className="font-weight-bold">မီးလာလား</h2>
        </div>

        <div className="col-12 col-sm-4 text-end">
          <div className="d-flex align-items-center justify-content-end">
            
              <button className="calendar-button mt-1 me-3" onClick={onCalendarButtonClick}>
                <FaCalendar/>Calendar
              </button>
            <button
              className={`notification-button mt-1 me-5 ${shake ? "shake-animation" : ""}`}
              style={getNotificationButtonStyle()}
            >
              <FaBell />
              {shakingSchedule && (
                <div className="notification-text">
                  {shakingSchedule} 
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderInfoComponent;
