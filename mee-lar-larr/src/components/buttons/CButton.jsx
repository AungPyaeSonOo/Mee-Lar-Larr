import React, { useState } from "react";
import Button from "react-bootstrap/Button";

const CButton = ({ onClick, isActive }) => {
  const [hover, setHover] = useState(false);

  return (
    <Button
      style={{
        backgroundColor: isActive ? "#48A2B7" : "#6D7A48",
        borderColor: "#A2B748",
        color: "#fff",
        boxShadow: hover
          ? isActive
            ? "0 0 40px #0ed0f3" 
            : "0 0 40px #E1A74A" 
          : "none",
      }}
      size="lg"
      className="px-5 rounded-3"
      onClick={() => onClick("C")}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      C
    </Button>
  );
};

export default CButton;
