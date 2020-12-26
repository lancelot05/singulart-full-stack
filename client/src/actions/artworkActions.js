import Axios from 'axios';
import { clearErrors, returnErrors } from './errorActions';
import {
  ARTWORKS_LOADED,
  ARTWORKS_LOADING,
  ARTWORKS_LOADING_FAIL,
  ARTWORKS_POST_FAIL,
  ARTWORKS_POST_SUCCESS,
} from './types';

export const loadArtworks = () => (dispatch, getState) => {
  dispatch({ type: ARTWORKS_LOADING });

  Axios.get('/api/artworks')
    .then((res) => {
      console.log(res);
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
  // const body = {
  //   title: title,
  //   price: price,
  //   desc: desc,
  //   isFramed: isFramed,
  //   category: category,
  //   artworkImg: artworkImg,
  //   artist: artist,
  // };
  for (var key of formData.entries()) {
    console.log(key[0] + ', ' + key[1]);
  }
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
