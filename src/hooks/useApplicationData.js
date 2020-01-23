import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });
  
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(([daysData, appointmentsData, interviewersData]) => {
      setState(prev => {
        return ({ 
          ...prev, days: daysData.data, appointments: appointmentsData.data, interviewers: interviewersData.data 
        })
      })
    });
  }, []);

  //Saves Interview Data into Appointments Database API
  function bookInterview(id, interview) {
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    return axios.put(`/api/appointments/${id}`, appointment).then(() => setState(prev => ({...state, appointments})))
  }

  //"Deletes Interview Data in Appointments Database API -- Sets to Null
  function cancelInterview(id) {
    
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios.delete(`/api/appointments/${id}`, appointment).then(() => setState(prev => ({...prev, appointments})))
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
};