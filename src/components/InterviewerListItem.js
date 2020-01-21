import React from "react";

import classNames from "classnames";

import "components/InterviewerListItem.scss";

export default function InterviewListItem(props) {
  
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected === true
  });

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );

}
