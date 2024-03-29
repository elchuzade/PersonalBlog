import { GET_ERRORS, GET_RESPONSE, BLOGS_LOADING, GET_THEME } from './types';

export const changeTheme = dark => {
  return {
    type: GET_THEME,
    payload: dark
  };
};

export const refreshErrors = () => {
  return {
    type: GET_ERRORS,
    payload: {}
  };
};

export const refreshResponse = () => {
  return {
    type: GET_RESPONSE,
    payload: {}
  };
};

export const getError = data => {
  return {
    type: GET_ERRORS,
    payload: data
  };
};

export const getResponse = data => {
  return {
    type: GET_RESPONSE,
    payload: data
  };
};

export const setLoading = data => {
  switch (data) {
    case 'blog': {
      return {
        type: BLOGS_LOADING
      };
    }
  }
};
