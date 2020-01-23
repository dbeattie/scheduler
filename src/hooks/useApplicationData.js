import React, { useReducer, useEffect } from "react";
const axios = require('axios');

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  if (action.type === SET_DAY) {
    return { ...state, day: action.day };
  }
  if (action.type === SET_APPLICATION_DATA) {
    return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers };
  }      
  if (action.type === SET_INTERVIEW) {
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
  }
  throw new Error(
    `Tried to reduce with unsupported action type: ${action.type}`
  );
}

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
        //Removes an integer from days.spots API, lowering availability
        let dayObj = state.days.find(day => day.name === state.day);
        state.days[dayObj.id - 1].spots-- 
        dispatch({ type: SET_INTERVIEW, id, interview })
      }) 
    }

  //"Deletes Interview Data in Appointments Database API -- Sets to Null
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    return axios.delete(`/api/appointments/${id}`, appointment)
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