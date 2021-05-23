import React, {useEffect} from 'react';
import {LogoGithub, LogoLinkedin, Mail} from "react-ionicons";
import Particles from "react-tsparticles";
import {PARTICLES_CONFIG} from "./particles_config";
import ContactInfo from "../contact_info/contact_info";

const Header = () => {
  return (
    <div className="header section" id="large-header">
      <Particles
        id="tsparticles"
        options={PARTICLES_CONFIG as any}
      />
      <div className="section-inner">
        <div className="row">
          <div className="col-md-4">
            <div className="d-flex justify-content-center">
              <div className="portrait" />
            </div>
          </div>
          <div className="col-md-8">
            <div className="description-container-outer">
              <div className="description-container">
                <p className="description">
                  <span className="color-green">Hey!</span> Nice to meet you. My name is
                  <span className="color-yellow"> Brendan</span>. I graduated from <span className="color-red">Brown University</span> in 2020 and am currently a
                  <span className="color-pink"> full stack engineer</span> at Uncountable.
                  I am passionate about <span className="color-blue">web development</span> and <span className="color-blue">machine learning</span>. Please read about some of my projects below!
                </p>
                <ContactInfo />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
