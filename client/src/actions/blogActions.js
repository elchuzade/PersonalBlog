import axios from 'axios';
import { GET_BLOGS, GET_BLOG, DELETE_BLOG, ADD_BLOG, EDIT_BLOG } from './types';
import {
  refreshErrors,
  refreshResponse,
  getError,
  getResponse,
  setLoading
} from './commonActions';

export const getBlogs = () => dispatch => {
  dispatch(setLoading('webinar'));
  dispatch(refreshErrors());
  axios
    .get('/api/blogs')
    .then(blogs => {
      dispatch({
        type: GET_BLOGS,
        payload: blogs.data
      });
    })
    .catch(err => {
      dispatch(getError(err.response.data));
    });
};

export const getBlog = id => dispatch => {
  dispatch(setLoading('webinar'));
  dispatch(refreshErrors());
  axios
    .get(`/api/blogs/${id}`)
    .then(res => {
      dispatch({
        type: GET_BLOG,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(getError(err.response.data));
    });
};

export const deleteBlog = id => dispatch => {
  dispatch(refreshErrors());
  dispatch(refreshResponse());
  axios
    .delete(`/api/blogs/${id}`)
    .then(res => {
      dispatch(getResponse(res.data));
      dispatch({
        type: DELETE_BLOG,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(getError(err.response.data));
    });
};

export const addBlog = blog => dispatch => {
  dispatch(refreshErrors());
  dispatch(refreshResponse());
  axios
    .post('/api/blogs', blog)
    .then(res => {
      dispatch(getResponse(res.data));
      dispatch({
        type: ADD_BLOG,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(getError(err.response.data));
    });
};

export const editBlog = (id, blog) => dispatch => {
  dispatch(refreshErrors());
  dispatch(refreshResponse());
  axios
    .put(`/api/blogs/${id}`, blog)
    .then(res => {
      dispatch(getResponse(res.data));
      dispatch({
        type: EDIT_BLOG,
        payload: res.data.item
      });
    })
    .catch(err => {
      dispatch(getError(err.response.data));
    });
};

export const uploadBlogAvatar = (imageData, config, id) => dispatch => {
  axios
    .post(`/api/blogs/avatar/${id}`, imageData, config)
    .then(res => {
      dispatch(refreshErrors());
      dispatch(refreshResponse());
      dispatch({
        type: GET_BLOG,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(getError(err.response.data));
    });
};

export const deleteBlogAvatar = id => dispatch => {
  dispatch(refreshErrors());
  dispatch(refreshResponse());
  axios
    .delete(`/api/blogs/avatar/${id}`)
    .then(res => {
      dispatch({
        type: GET_BLOG,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(getError(err.response.data));
    });
};