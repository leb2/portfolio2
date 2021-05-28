import React from 'react';
import Navbar from "./navbar/navbar";

const Page = (props: { 
  className?: string,
  absoluteNavbar?: boolean,
  children: React.ReactNode,
  noContainer?: boolean,
}) => {
  return (
    <div className={props.className}>
      <Navbar positionAbsolute={props.absoluteNavbar} />

      {
        props.noContainer
          ? props.children
          : (
            <div className="section padded">
              <div className="section-inner">
                { props.children }
              </div>
            </div>
          )
      }

    </div>
  )
}

export default Page
