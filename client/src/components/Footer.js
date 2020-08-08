import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
      <div className="end center">
    <footer>
      <p>Copyright ⓒ {year}</p>
    </footer>
    </div>
  );
};

export default Footer;
