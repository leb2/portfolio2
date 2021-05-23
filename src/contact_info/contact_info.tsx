import {LogoGithub, LogoLinkedin, Mail} from "react-ionicons";
import React from "react";

const ContactInfo = () => {
  return (
    <div>
      <div className="logos">
        <a href="https://www.linkedin.com/in/brendan-le-2490001bb/" className="mr-4">
          <LogoLinkedin color="white" height="31px" width="29px"/>
        </a>
        <a href="https://github.com/leb2" className="mr-4">
          <LogoGithub color="white" height="31px" width="31px"/>
        </a>
        <a href="mailto:le.brendan@gmail.com">
          <Mail color="white" height="34px" width="34px"/>
        </a>
      </div>
      <div className="buttons">
        <a href='https://drive.google.com/file/d/1NOsJYhia_5B6N4JGhQ0AbBBsONgMXQaP/view' target="_blank">
          <button>
            Resume
          </button>
        </a>
      </div>
    </div>
  )

}

export default ContactInfo
