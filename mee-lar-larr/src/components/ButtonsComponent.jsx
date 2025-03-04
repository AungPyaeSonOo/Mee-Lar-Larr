import React from "react";
import AButton from "./buttons/AButton";
import BButton from "./buttons/BButton";
import CButton from "./buttons/CButton";

const ButtonsComponent = ({ onButtonClick, displayStates }) => {
  return (
    <div className="container-fluid mt-3">
      <div className="row justify-content-evenly">
        <div className="col-12 col-sm-4 mb-2 d-flex justify-content-center">
          <AButton onClick={onButtonClick} isActive={displayStates.A} />
        </div>
        <div className="col-12 col-sm-4 mb-2 d-flex justify-content-center">
          <BButton onClick={onButtonClick} isActive={displayStates.B} />
        </div>
        <div className="col-12 col-sm-4 mb-2 d-flex justify-content-center">
          <CButton onClick={onButtonClick} isActive={displayStates.C} />
        </div>
      </div>
    </div>
  );
};

export default ButtonsComponent;
