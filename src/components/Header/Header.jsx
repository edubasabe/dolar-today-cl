import React from "react";

const Header = () => {
  return (
    <h1 className="Header">
      <span role="img" aria-label="Money">
        💵
      </span>{" "}
      Dólar en Chile{" "}
      <span role="img" aria-label="Money">
        🇨🇱
      </span>{" "}
    </h1>
  );
};

export default Header;
