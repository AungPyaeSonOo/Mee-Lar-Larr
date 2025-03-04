import React, { useState } from "react";
import Button from "react-bootstrap/Button";

const AButton = ({ onClick, isActive }) => {
  const [hover, setHover] = useState(false);

  return (
    <Button
      style={{
        backgroundColor: isActive ? "#6D7A48" : "#48A2B7",
        borderColor: "#A2B748",
        color: "#fff",
        boxShadow: hover
          ? isActive
            ? "0 0 40px #E1A74A " 
            : "0 0 40px #0ed0f3" 
          : "none",
      }}
      size="lg"
      className="px-5 rounded-3"
      onClick={() => onClick("A")}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      A
    </Button>
  );
};

export default AButton;
