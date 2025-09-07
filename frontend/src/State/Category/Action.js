import { api } from '../../config/apiConfig';
import {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
  GET_CATEGORIES_BY_LEVEL_REQUEST,
  GET_CATEGORIES_BY_LEVEL_SUCCESS,
  GET_CATEGORIES_BY_LEVEL_FAILURE,
  GET_CATEGORIES_BY_PARENT_REQUEST,
  GET_CATEGORIES_BY_PARENT_SUCCESS,
  GET_CATEGORIES_BY_PARENT_FAILURE,
  INITIALIZE_CATEGORIES_REQUEST,
  INITIALIZE_CATEGORIES_SUCCESS,
  INITIALIZE_CATEGORIES_FAILURE
} from './ActionTypes';

export const getAllCategories = () => async (dispatch) => {
  dispatch({ type: GET_CATEGORIES_REQUEST });
  
  try {
    const { data } = await api.get('/api/categories');
    dispatch({
      type: GET_CATEGORIES_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: GET_CATEGORIES_FAILURE,
      payload: error.response?.data?.message || error.message
    });
  }
};

export const getCategoriesByLevel = (level) => async (dispatch) => {
  dispatch({ type: GET_CATEGORIES_BY_LEVEL_REQUEST });
  
  try {
    const { data } = await api.get(`/api/categories/level/${level}`);
    dispatch({
      type: GET_CATEGORIES_BY_LEVEL_SUCCESS,
      payload: { level, categories: data }
    });
  } catch (error) {
    dispatch({
      type: GET_CATEGORIES_BY_LEVEL_FAILURE,
      payload: error.response?.data?.message || error.message
    });
  }
};

export const getCategoriesByParent = (parentId) => async (dispatch) => {
  dispatch({ type: GET_CATEGORIES_BY_PARENT_REQUEST });
  
  try {
    const { data } = await api.get(`/api/categories/parent/${parentId}`);
    dispatch({
      type: GET_CATEGORIES_BY_PARENT_SUCCESS,
      payload: { parentId, categories: data }
    });
  } catch (error) {
    dispatch({
      type: GET_CATEGORIES_BY_PARENT_FAILURE,
      payload: error.response?.data?.message || error.message
    });
  }
};

export const initializeCategories = () => async (dispatch) => {
  dispatch({ type: INITIALIZE_CATEGORIES_REQUEST });
  
  try {
    const { data } = await api.post('/api/categories/initialize');
    dispatch({
      type: INITIALIZE_CATEGORIES_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: INITIALIZE_CATEGORIES_FAILURE,
      payload: error.response?.data?.message || error.message
    });
  }
};
