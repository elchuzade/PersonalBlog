import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import responseReducer from './responseReducer';
import blogReducer from './blogReducer';
import themeReducer from './themeReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  blogs: blogReducer,
  response: responseReducer,
  theme: themeReducer
});
