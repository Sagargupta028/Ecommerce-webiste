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

const initialState = {
  categories: [],
  categoriesByLevel: {},
  categoriesByParent: {},
  loading: false,
  error: null
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES_REQUEST:
    case GET_CATEGORIES_BY_LEVEL_REQUEST:
    case GET_CATEGORIES_BY_PARENT_REQUEST:
    case INITIALIZE_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
        error: null
      };

    case GET_CATEGORIES_BY_LEVEL_SUCCESS:
      return {
        ...state,
        loading: false,
        categoriesByLevel: {
          ...state.categoriesByLevel,
          [action.payload.level]: action.payload.categories
        },
        error: null
      };

    case GET_CATEGORIES_BY_PARENT_SUCCESS:
      return {
        ...state,
        loading: false,
        categoriesByParent: {
          ...state.categoriesByParent,
          [action.payload.parentId]: action.payload.categories
        },
        error: null
      };

    case INITIALIZE_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      };

    case GET_CATEGORIES_FAILURE:
    case GET_CATEGORIES_BY_LEVEL_FAILURE:
    case GET_CATEGORIES_BY_PARENT_FAILURE:
    case INITIALIZE_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export default categoryReducer;
