import React from 'react';

import "./styles.scss";

import useVisualMode from "hooks/useVisualMode";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import Create from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";

export default function Appointment(props) {
  
  const EMPTY = "EMPTY";
  const CREATE = "CREATE";
  const SHOW = "SHOW";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";

  //OnSave TRANSITIONS TO SPINNER THEN SHOW PAGE
  function saveAppointment(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then(
      () => transition(SHOW)
    )
  }
  
  //OnDelete TRANSITIONS TO SPINNER THEN SHOW PAGE
  function deleteAppointment(name, interviewer) {
    transition(CONFIRM);
  }

  function confirmDelete() {
    transition(DELETING, true);
    props.deleteInterview(props.id).then(() => transition(EMPTY))
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
          onSave={saveAppointment}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview && props.interview.student}
          interviewer={props.interview && props.interview.interviewer}
          onDelete={deleteAppointment}
        />
      )}
      {mode === SAVING && (
        <Status
        message={SAVING}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you want to delete?"}
          onConfirm={confirmDelete}
          onCancel={() => back()}
        />
      )}
      {mode === DELETING && (
        <Status
        message={DELETING}
        />
      )}
    </article>
  );
}