import React from "react";

const Header = (props) => {
  return (
    <h1 className="App-header">
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
