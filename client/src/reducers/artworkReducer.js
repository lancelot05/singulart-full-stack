import {
  ARTWORKS_LOADED,
  ARTWORKS_LOADING,
  ARTWORKS_LOADING_FAIL,
  ARTWORKS_POST_FAIL,
  ARTWORKS_POST_SUCCESS,
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
    case ARTWORKS_POST_FAIL:
      return {
        ...state,
        artwork: null,
        isLoading: false,
      };
    default:
      return state;
  }
}
