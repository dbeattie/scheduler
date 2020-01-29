import { useReducer, useEffect } from "react";
import axios from "axios";

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

export default function useApplicationData() {

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatch({ type: SET_DAY, day });

  useEffect(() => {
    const daysData = axios.get("/api/days");
    const appointmentsData = axios.get("/api/appointments");
    const interviewersData = axios.get("/api/interviewers");
    Promise.all([daysData, appointmentsData, interviewersData]).then(all => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      });
    });
  }, []);

  //Saves Interview Data into Appointments Database API
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview,
    };

    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => {
      //Removes an spot from days.spots API, only if the interview slot is null
      if (state.appointments[id].interview === null) {
        let dayObj = state.days.find(day => day.name === state.day);
        state.days[dayObj.id - 1].spots-- 
      }
      dispatch({ type: SET_INTERVIEW, id, interview })
    }) 
  }

  //Deletes interview data in appointments database API -- sets interview to null
  function cancelInterview(id) {
    // const appointment = {
    //   ...state.appointments[id],
    //   interview: null
    // };

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        //Adds an integer to the days.spots API, indicating availability
        let dayObj = state.days.find(day => day.name === state.day);
        state.days[dayObj.id - 1].spots++
        dispatch({ type: SET_INTERVIEW, id, interview: null })
      })
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
};