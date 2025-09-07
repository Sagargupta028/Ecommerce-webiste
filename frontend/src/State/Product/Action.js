import axios from "axios";

import {
  FIND_PRODUCTS_BY_CATEGORY_REQUEST,
  FIND_PRODUCTS_BY_CATEGORY_SUCCESS,
  FIND_PRODUCTS_BY_CATEGORY_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
  FIND_PRODUCT_BY_ID_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
} from "./ActionType";
import { api,API_BASE_URL } from '../../config/apiConfig';

export const findProducts = (reqData) => async (dispatch) => {
  const {
    colors,
    sizes,
    minPrice,
    maxPrice,
    minDiscount,
    category,
    stock,
    sort,
    pageNumber,
    pageSize,
  } = reqData;
  
  
  try {
    const token = localStorage.getItem('jwt')
    dispatch({ type: FIND_PRODUCTS_BY_CATEGORY_REQUEST });
    console.log('req data', reqData);
    
    // Build query parameters properly, excluding undefined/null values
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (colors) params.append('color', colors);
    if (sizes) params.append('size', sizes);
    if (minPrice) params.append('minPrice', minPrice);
    if (maxPrice) params.append('maxPrice', maxPrice);
    if (minDiscount) params.append('minDiscount', minDiscount);
    if (stock) params.append('stock', stock);
    if (sort) params.append('sort', sort);
    if (pageNumber) params.append('pageNumber', pageNumber);
    if (pageSize) params.append('pageSize', pageSize);
    
    const queryString = params.toString();
    console.log('Query string:', queryString);
    
    const  {data}  = await api.get(`${API_BASE_URL}/api/products?${queryString}`,{
      headers:{
        "Authorization":`Bearer ${token}`
      }
    });
    console.log('API Response:', data);

    console.log("get product by category - ", data);
    dispatch({
      type: FIND_PRODUCTS_BY_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FIND_PRODUCTS_BY_CATEGORY_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const findProductById = (reqData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt")
    dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });

    const {productId} = reqData
    console.log("products by  id : ", productId);
    const { data } = await api.get(`/api/products/id/${reqData.productId}`,{
      headers:{
        "Authorization":`Bearer ${token}`
      }
    });
    // console.log('data',data);
    
    dispatch({
      type: FIND_PRODUCT_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FIND_PRODUCT_BY_ID_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });

    const token = localStorage.getItem("jwt");
    const { data } = await api.post(
      `${API_BASE_URL}/api/admin/products/`,
      product.data,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: data,
    });

    console.log("created product ", data);
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });
    const token = localStorage.getItem('jwt');

    const { data } = await api.put(
      `${API_BASE_URL}/api/admin/products/${product.productId}`,
      product.data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
console.log("update product ",data)
    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  console.log("delete product action",productId)
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const token = localStorage.getItem("jwt");
    const { data } = await api.delete(`/api/admin/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("delete product ",data)

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: productId,
    });

    console.log("product delte ",data)
  } catch (error) {
    console.log("catch error ",error)
    dispatch({
      type: DELETE_PRODUCT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
