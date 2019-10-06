import { GET_THEME } from '../actions/types';

const initialState = {
  dark: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_THEME:
      return {
        ...state,
        dark: action.payload
      };
    default:
      return state;
  }
};
