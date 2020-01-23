import React from 'react';

import "./styles.scss";

import useVisualMode from "hooks/useVisualMode";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

export default function Appointment(props) {
  
  const EMPTY = "EMPTY";
  const CREATE = "CREATE";
  const SHOW = "SHOW";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT"
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  //Transitions to Save Spinner, then Show Page
  function saveAppointment(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));

    // props.bookInterview(props.id, interview).then(
    //   () => transition(SHOW)
    // )
  }
  
  //Transitions to Confirm Form
  function destroyAppointment(name, interviewer) {
    transition(CONFIRM);
  }

  //Confirms the Delete from the Confirm Form
  function confirmDestroy(event) {
    transition(DELETING, true);
    
    props
      .deleteInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  }

  //Transtitions to the Edit (Similar to Create) Form view
  function editAppointment(name, interviewer) {
    transition(EDIT);
  }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY);
  
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={saveAppointment}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview && props.interview.student}
          interviewer={props.interview && props.interview.interviewer}
          onEdit={editAppointment}
          onDelete={destroyAppointment}
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
          onConfirm={confirmDestroy}
          onCancel={() => back()}
        />
      )}
      {mode === DELETING && (
        <Status
        message={DELETING}
        />
      )}
      {mode === EDIT && (
        <Form
        name={props.interview && props.interview.student}
        interviewers={props.interviewers}
        interviewer={props.interview && props.interview.interviewer.id}
        onCancel={() => back()}
        onSave={saveAppointment}
      />
      )}
      {mode === ERROR_SAVE && (
        <Error
        message={"Could not save appointment."}
        onClose={back}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
        message={"Could not delete appointment."}
        onClose={back}
        />
      )}
    </article>
  );
}