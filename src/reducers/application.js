export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

export default function reducer(state, action) {
  
  if (action.type === SET_DAY) {
    return { ...state, day: action.day };
  } else if (action.type === SET_APPLICATION_DATA) {
    return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers };
  } else if (action.type === SET_INTERVIEW) {
    const { id, interview } = action;

    return {
      ...state,
      appointments: {
        ...state.appointments,
        [id]: {
          ...state.appointments[action.id],
          interview: action.interview ? { ...interview } : null
        }
      }
    }
  } else throw new Error(
    `Tried to reduce with unsupported action type: ${action.type}`
  );
}