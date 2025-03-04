import React from "react";

const ClockDisplay = ({ formatTime, currentSchedule, timeLeft, isDisplayOn, photoOnUrl, photoOffUrl }) => {
  const scheduleMessages = {
    A: isDisplayOn ? "မီးပျက်နေပါသည်။" : "မီးလာနေပါသည်။",
    B: isDisplayOn ? "မီးပျက်နေပါသည်။" : "မီးလာနေပါသည်။",
    C: isDisplayOn ? "မီးလာနေပါသည်။" : "မီးပျက်နေပါသည်။",
  };

  const scheduleH3Messages = {
    A: isDisplayOn ? "မီးလာရန်" : "မီးပြန်ပျက်ရန်",
    B: isDisplayOn ? "မီးလာရန်" : "မီးပြန်ပျက်ရန်",
    C: isDisplayOn ? "မီးပြန်ပျက်ရန်" : "မီးလာရန်",
  };

  return (
    <div className="container d-flex flex-column lg:flex-row justify-center lg:justify-around align-items-center mt-2">
  
      <div className="photo-card mt-2 lg:mb-0 lg:mr-6">
        <img
          src={(currentSchedule === "C" ? !isDisplayOn : isDisplayOn) ? photoOffUrl : photoOnUrl}
          alt="Schedule"
          className="img-fluid rounded"
          style={{ width: "350px", height: "300px", objectFit: "cover",opacity: 0.8,}}
        />
      </div>

      
      <div className="text-center lg:text-left mt-0 lg:mt-0 lg:ml-5">
        <h2 className="schedule-message">{scheduleMessages[currentSchedule]}</h2>
        <h3 className="schedule-h3-message mt-3">{scheduleH3Messages[currentSchedule]}</h3>

        <div className="timer-container mt-2">
          <h1 className="display-1 fw-bold text-center lg:text-left bold-timer">
            {formatTime(timeLeft)}
          </h1>
        </div>

        <h3 className="schedule mt-3">လိုပါသေးသည်</h3>
      </div>
    </div>
  );
};

export default ClockDisplay;
