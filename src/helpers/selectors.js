export default function getAppointmentsForDay(state, day) {
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