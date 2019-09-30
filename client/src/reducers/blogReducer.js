import {
  GET_BLOG,
  BLOGS_LOADING,
  GET_BLOGS,
  ADD_BLOG,
  EDIT_BLOG,
  DELETE_BLOG
} from '../actions/types';

const initialState = {
  blog: null,
  blogs: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BLOGS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_BLOGS:
      return {
        ...state,
        blog: null,
        blogs: action.payload,
        loading: false
      };
    case GET_BLOG:
      return {
        ...state,
        blog: action.payload,
        loading: false,
        blogs: null
      };
    case DELETE_BLOG:
      return {
        ...state,
        blogs: state.blogs.filter(blog => blog._id !== action.payload.item._id)
      };
    case ADD_BLOG:
      state.blogs.unshift(action.payload.item);
      return {
        ...state,
        blogs: state.blogs
      };
    case EDIT_BLOG:
      return {
        ...state,
        blog: action.payload
      };
    default:
      return state;
  }
};
