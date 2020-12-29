import Axios from 'axios';
import { loadUser, tokenConfig } from './authActions';
import { clearErrors, returnErrors } from './errorActions';
import {
  ARTWORKS_LOADED,
  ARTWORKS_LOADING,
  ARTWORKS_LOADING_FAIL,
  ARTWORKS_POST_FAIL,
  ARTWORKS_POST_SUCCESS,
  ADD_FAVORITE_FAIL,
  ADD_FAVORITE_SUCCESS,
  REMOVE_FAVORITE_FAIL,
  REMOVE_FAVORITE_SUCCESS,
} from './types';

export const loadArtworks = () => (dispatch, getState) => {
  dispatch({ type: ARTWORKS_LOADING });

  Axios.get('/api/artworks')
    .then((res) => {
      dispatch({
        type: ARTWORKS_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: ARTWORKS_LOADING_FAIL });
    });
};

export const postArtworks = (formData) => (dispatch, getState) => {
  Axios.post('/api/artworks', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-auth-token': getState().auth.token,
    },
  })
    .then((res) => {
      dispatch({
        type: ARTWORKS_POST_SUCCESS,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          'ARTWORKS_POST_FAIL'
        )
      );
      dispatch({ type: ARTWORKS_POST_FAIL });
    });
};

export const addFavorite = (id) => (dispatch, getState) => {
  Axios.post('/api/artworks/favorite/', { id: id }, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADD_FAVORITE_SUCCESS,
        payload: res.data,
      });
      dispatch(clearErrors());
      dispatch(loadArtworks());
      dispatch(loadUser());
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          'ADD_FAVORITE_FAIL'
        )
      );
      dispatch({ type: ADD_FAVORITE_FAIL });
    });
};

export const removeFavorite = (id) => (dispatch, getState) => {
  Axios.delete(`/api/artworks/favorite/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: REMOVE_FAVORITE_SUCCESS,
        payload: res.data,
      });
      dispatch(clearErrors());
      dispatch(loadArtworks());
      dispatch(loadUser());
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          'REMOVE_FAVORITE_FAIL'
        )
      );
      dispatch({ type: REMOVE_FAVORITE_FAIL });
    });
};
