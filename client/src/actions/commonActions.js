import {
  GET_ERRORS,
  GET_RESPONSE,
  WEBINARS_LOADING,
  BLOGS_LOADING
} from './types';

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
    case 'webinar': {
      return {
        type: WEBINARS_LOADING
      };
    }
    case 'blog': {
      return {
        type: BLOGS_LOADING
      };
    }
  }
};