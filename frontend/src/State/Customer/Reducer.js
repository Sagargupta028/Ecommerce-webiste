import {
  GET_ALL_CUSTOMERS_REQUEST,
  GET_ALL_CUSTOMERS_SUCCESS,
  GET_ALL_CUSTOMERS_FAILURE,
  DELETE_CUSTOMER_REQUEST,
  DELETE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_FAILURE,
} from './Action';

const initialState = {
  customers: [],
  loading: false,
  error: null,
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CUSTOMERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ALL_CUSTOMERS_SUCCESS:
      return {
        ...state,
        loading: false,
        customers: action.payload,
        error: null,
      };
    case GET_ALL_CUSTOMERS_FAILURE:
      return {
        ...state,
        loading: false,
        customers: [],
        error: action.payload,
      };
    case DELETE_CUSTOMER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        customers: state.customers.filter(customer => customer._id !== action.payload),
        error: null,
      };
    case DELETE_CUSTOMER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default customerReducer;
