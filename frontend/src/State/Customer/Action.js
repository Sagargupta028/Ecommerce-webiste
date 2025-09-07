import { api } from '../../config/apiConfig';

// Action Types
export const GET_ALL_CUSTOMERS_REQUEST = 'GET_ALL_CUSTOMERS_REQUEST';
export const GET_ALL_CUSTOMERS_SUCCESS = 'GET_ALL_CUSTOMERS_SUCCESS';
export const GET_ALL_CUSTOMERS_FAILURE = 'GET_ALL_CUSTOMERS_FAILURE';
export const DELETE_CUSTOMER_REQUEST = 'DELETE_CUSTOMER_REQUEST';
export const DELETE_CUSTOMER_SUCCESS = 'DELETE_CUSTOMER_SUCCESS';
export const DELETE_CUSTOMER_FAILURE = 'DELETE_CUSTOMER_FAILURE';

// Action Creators
export const getAllCustomersRequest = () => ({
  type: GET_ALL_CUSTOMERS_REQUEST,
});

export const getAllCustomersSuccess = (customers) => ({
  type: GET_ALL_CUSTOMERS_SUCCESS,
  payload: customers,
});

export const getAllCustomersFailure = (error) => ({
  type: GET_ALL_CUSTOMERS_FAILURE,
  payload: error,
});

export const deleteCustomerRequest = () => ({
  type: DELETE_CUSTOMER_REQUEST,
});

export const deleteCustomerSuccess = (customerId) => ({
  type: DELETE_CUSTOMER_SUCCESS,
  payload: customerId,
});

export const deleteCustomerFailure = (error) => ({
  type: DELETE_CUSTOMER_FAILURE,
  payload: error,
});

// Async Action
export const getAllCustomers = () => async (dispatch) => {
  dispatch(getAllCustomersRequest());
  try {
    const token = localStorage.getItem('jwt');
    const response = await api.get('/api/users/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('All customers:', response.data);
    dispatch(getAllCustomersSuccess(response.data));
  } catch (error) {
    console.log('Error fetching customers:', error);
    dispatch(getAllCustomersFailure(error.message));
  }
};

// Delete Customer Action
export const deleteCustomer = (customerId) => async (dispatch) => {
  dispatch(deleteCustomerRequest());
  try {
    const token = localStorage.getItem('jwt');
    await api.delete(`/api/admin/users/${customerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Customer deleted successfully:', customerId);
    dispatch(deleteCustomerSuccess(customerId));
  } catch (error) {
    console.log('Error deleting customer:', error);
    dispatch(deleteCustomerFailure(error.message));
  }
};
