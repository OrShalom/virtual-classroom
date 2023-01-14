import {
    PATIENTS_CREATE_FAIL,
    PATIENTS_CREATE_SUCCESS,
    PATIENTS_CREATE_REQUEST,
    PATIENTS_LIST_REQUEST,
    PATIENTS_LIST_SUCCESS,
    PATIENTS_LIST_FAIL,
    PATIENTS_UPDATE_REQUEST,
  PATIENTS_UPDATE_SUCCESS,
  PATIENTS_UPDATE_FAIL,
  PATIENTS_DELETE_REQUEST,
  PATIENTS_DELETE_SUCCESS,
  PATIENTS_DELETE_FAIL,
  PATIENTS_START_SCREEN_REQUEST,
  PATIENTS_START_SCREEN_SUCCESS,
  PATIENTS_REPORT_REQUEST,
  PATIENTS_REPORT_SUCCESS,
  PATIENTS_REPORT_FAIL,
  } from "../constants/patientsConstants";
import axios from "axios";

export const listPatients = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PATIENTS_LIST_REQUEST,
    });


    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/patients`, config);

    dispatch({
      type: PATIENTS_LIST_SUCCESS,
      payload: data,
    });
   
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PATIENTS_LIST_FAIL,
      payload: message,
    });
  }
};
export const reportsPatients = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PATIENTS_REPORT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/patients/reports/${id}`, config);

    dispatch({
      type: PATIENTS_REPORT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PATIENTS_REPORT_FAIL,
      payload: message,
    });
  }
};

export const createPatientAction = (firstName, lastName, id, dateOfBirth, gander, email, recommendation, medicines) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: PATIENTS_CREATE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.post(
        `/api/patients/create`,
        { firstName, lastName, id, dateOfBirth, gander, email, recommendation, medicines },
        config
      );
  
      dispatch({
        type: PATIENTS_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: PATIENTS_CREATE_FAIL,
        payload: message,
      });
    }
};
  

  export const updatePatientAction = (id,firstName, lastName, id_p, dateOfBirth, gander, email, recommendation, medicines) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: PATIENTS_UPDATE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  console.log(id_p+"hi")
      const { data } = await axios.put(
        `/api/patients/${id}`,
        { firstName, lastName, id_p, dateOfBirth, gander, email, recommendation, medicines },
        config
      );
  
      dispatch({
        type: PATIENTS_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: PATIENTS_UPDATE_FAIL,
        payload: message,
      });
    }
};
  
export const deletePatientAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PATIENTS_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/patients/${id}`, config);

    dispatch({
      type:PATIENTS_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PATIENTS_DELETE_FAIL,
      payload: message,
    });
  }
};

export const StartScreening = (patientID,SessionLengthInMin, LettersDelayInSec, DisturbanceTimeRangeMin, DisturbanceTimeRangeMax, AmountOfShouldPress, patient) => async (dispatch, getState) => {
 
  try {
    dispatch({
      type: PATIENTS_START_SCREEN_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

      localStorage.setItem("startSceen", "false");

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/users/startScreening`,
      { patientID,SessionLengthInMin, LettersDelayInSec, DisturbanceTimeRangeMin, DisturbanceTimeRangeMax, AmountOfShouldPress, patient },config
    );
    localStorage.setItem("startSceen", "true");
    dispatch({
      type: PATIENTS_START_SCREEN_SUCCESS,
      payload: data,
    });
    //localStorage.setItem("startSceen", "true");
    // const { data } = await axios.post(
    //   "/api/users/startScreening",
    //   {patient},config);

    return true;
  } catch (error) {
    return false;
  }
};

export const StopScreening = () => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      "/api/users/stopScreening",
      config);

    return true;
  } catch (error) {
    return false;
  }
};