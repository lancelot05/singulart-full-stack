import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import artworkReducer from './artworkReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  error: errorReducer,
  artwork: artworkReducer,
});

export default rootReducer;
