import React from "react";

const Header = (props) => {
  return (
    <h1 className={`${props.className} text-center text-4xl font-bold`}>
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
