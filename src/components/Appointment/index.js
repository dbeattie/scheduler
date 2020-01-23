import React from 'react';

import "./styles.scss";

import useVisualMode from "hooks/useVisualMode";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import Create from "components/Appointment/Form";
import Status from "components/Appointment/Status"

export default function Appointment(props) {
  
  const EMPTY = "EMPTY";
  const CREATE = "CREATE";
  const SHOW = "SHOW";
  const SAVING = "SAVING";

  //OnSave TRANSITIONS TO SPINNER THEN SHOW PAGE
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then(
      () => transition(SHOW)
    )
  }
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY);
  
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Create
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview && props.interview.student}
          interviewer={props.interview && props.interview.interviewer}
        />
      )}
      {mode === SAVING && (
        <Status
        message={SAVING}
        />
      )}
    </article>
  );
}