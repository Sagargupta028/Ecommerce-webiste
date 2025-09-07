import {
  GET_DASHBOARD_ANALYTICS_REQUEST,
  GET_DASHBOARD_ANALYTICS_SUCCESS,
  GET_DASHBOARD_ANALYTICS_FAILURE
} from './ActionTypes';

const initialState = {
  analytics: null,
  isLoading: false,
  error: null,
};

const analyticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DASHBOARD_ANALYTICS_REQUEST:
      return { ...state, isLoading: true, error: null };
    case GET_DASHBOARD_ANALYTICS_SUCCESS:
      return { ...state, isLoading: false, analytics: action.payload };
    case GET_DASHBOARD_ANALYTICS_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export default analyticsReducer;
