import React from "react";
import './styles.scss'
import {LogoGithub} from "react-ionicons";

const BuiltWith = (props: {
  tags?: string[],
  githubUrl?: string,
  showPrompt?: boolean,
}) => {
  return (
    <div className="built-with">
      { props.githubUrl && (
        <div className="github-container">
          <a href={props.githubUrl} className="mr-4">
            <LogoGithub color="black" height="40px" width="40px"/>
          </a>
        </div>
      )}
      <div className="pills">
        { props.showPrompt && (
          <div className="prompt">
            <a href={props.githubUrl!}>
              View the source code!
            </a>
          </div>
        )}
        { (props.tags || []).map(tag => (
          <div className="pill">
            { tag }
          </div>
        ))}
      </div>
    </div>
    )
}


export default BuiltWith
