import React from 'react';
import ContactInfo from "../contact_info/contact_info";

const Footer = () => {
  return (
    <div className="section footer">
      <div className="section-inner">
        <div className="row">
          <p>
            Don't Hesitate to reach out!
          </p>
        </div>
        <div className="row">
          <ContactInfo />
        </div>
      </div>
    </div>
  );
}

export default Footer;
