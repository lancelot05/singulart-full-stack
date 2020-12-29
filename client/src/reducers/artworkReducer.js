import {
  ADD_FAVORITE_FAIL,
  ADD_FAVORITE_SUCCESS,
  ARTWORKS_LOADED,
  ARTWORKS_LOADING,
  ARTWORKS_LOADING_FAIL,
  ARTWORKS_POST_FAIL,
  ARTWORKS_POST_SUCCESS,
  REMOVE_FAVORITE_FAIL,
  REMOVE_FAVORITE_SUCCESS,
} from '../actions/types';

const initialState = {
  isLoading: null,
  artwork: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ARTWORKS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ARTWORKS_LOADED:
      return {
        ...state,
        isLoading: false,
        artwork: action.payload,
      };
    case ARTWORKS_LOADING_FAIL:
    case ARTWORKS_POST_FAIL:
    case ADD_FAVORITE_FAIL:
    case REMOVE_FAVORITE_FAIL:
      return {
        ...state,
        artwork: null,
        isLoading: false,
      };
    case ARTWORKS_POST_SUCCESS:
      return {
        ...state,
        artwork: action.payload,
        isLoading: false,
      };
    case ADD_FAVORITE_SUCCESS:
    case REMOVE_FAVORITE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        artwork: action.payload,
      };
    default:
      return state;
  }
}
