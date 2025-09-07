import { api } from '../../config/apiConfig';
import {
  GET_DASHBOARD_ANALYTICS_REQUEST,
  GET_DASHBOARD_ANALYTICS_SUCCESS,
  GET_DASHBOARD_ANALYTICS_FAILURE
} from './ActionTypes';

export const getDashboardAnalytics = () => async (dispatch) => {
  dispatch({ type: GET_DASHBOARD_ANALYTICS_REQUEST });
  try {
    const token = localStorage.getItem("jwt");
    const response = await api.get("/api/analytics/dashboard", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    dispatch({ type: GET_DASHBOARD_ANALYTICS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_DASHBOARD_ANALYTICS_FAILURE, payload: error.message });
  }
};
