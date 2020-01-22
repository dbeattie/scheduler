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
  if (!interview) {
    return null;
  } else {
    let result = {
      "student": interview.student,
      "interviewer": state.interviewers[interview.interviewer]
    }
    return result;
  }
}

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

// GET THE INTERVIEWER ID's FOR EACH DAY BASED ON THE APPOINTMENTS KEEP FOR REFERENCE???****
// function getInterviewersForDay(state, day) {
//   const returnArr = [];
//   const appointmentNumbers = state.days.filter(d => d.name === day);

//   console.log('FILTERED APPOINTMENT ##:-->', appointmentNumbers[0].appointments);

//   if (appointmentNumbers.length === 0) {
//     return returnArr;
//   } else {
//     for (let interviewerId of appointmentNumbers[0].appointments) {
//       if (state.appointments[interviewerId].interview !== null) {  
//       console.log('Interview Number LOOP:-->', state.appointments[id].interview.interviewer);
//       returnArr.push(state.appointments[id].interview.interviewer);
//       }
//     }
//   }
//   console.log('RETURN ARRAY:-->', returnArr);
//   return returnArr;
// };


module.exports = { getAppointmentsForDay, getInterview, getInterviewersForDay };