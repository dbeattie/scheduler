function getAppointmentsForDay(state, day) {
  const returnArr = [];
  const filteredAppointments = state.days.filter(d => d.name === day);

  if (filteredAppointments.length === 0) {
    return returnArr;
  } else {
    for (let id of filteredAppointments[0].appointments) {
      returnArr.push(state.appointments[id]);
    }
  }
  return returnArr;
};

function getInterview(state, interview) {
  if (!interview || interview.interviewer === null || interview.student === "") {
    return null;
  } else {
    let result = {
      "student": interview.student,
      "interviewer": state.interviewers[interview.interviewer]
    }
    return result;
  }
};

function getInterviewersForDay(state, day) {
  const returnArr = [];
  const filteredInterviewers = state.days.filter(d => d.name === day);

  if (filteredInterviewers.length === 0) {
    return returnArr;
  } else {
    for (let id of filteredInterviewers[0].interviewers) {
      returnArr.push(state.interviewers[id]);
    }
  }
  return returnArr;
};

module.exports = { getAppointmentsForDay, getInterview, getInterviewersForDay };