import React from "react";
import HeaderInfoComponent from "./HeaderInfoComponent";
import ButtonsComponent from "./ButtonsComponent";

const HeaderButton = ({ onButtonClick, displayStates , notificationButtonColor , notificationCounts , shakingSchedule , onCalendarButtonClick}) => {
  return (
    <div>
      <HeaderInfoComponent displayStates={displayStates}  notificationButtonColor={notificationButtonColor} notificationCounts={notificationCounts} shakingSchedule={shakingSchedule} onCalendarButtonClick={onCalendarButtonClick}/>
      <ButtonsComponent onButtonClick={onButtonClick} displayStates={displayStates}/>
    </div>
  );
};

export default HeaderButton;
