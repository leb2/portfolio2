import React from 'react';
import './styles.scss'
import classNames from "classnames";

const Navbar = (props: { positionAbsolute?: boolean }) => {
  return (
    <div className={classNames("section page-navbar", { absolute: props.positionAbsolute })}>
      <div className="section-inner">
        <div className="row">
          <div className="col-md-12">
            <div className="navbar-item">
              <a href="/">
                &lt;BrendanLe/&gt;
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
