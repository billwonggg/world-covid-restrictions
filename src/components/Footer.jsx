import React from "react";

const Footer = () => {
  return (
    <div>
      &copy; {new Date().getFullYear()} Bill Wong.&nbsp;
      <a
        href="https://github.com/billwonggg/world-covid-restrictions"
        target="_blank"
        rel="noreferrer"
      >
        GitHub
      </a>
    </div>
  );
};

export default Footer;
