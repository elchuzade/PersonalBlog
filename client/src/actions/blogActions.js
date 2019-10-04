import axios from 'axios';
import { GET_BLOGS, GET_BLOG, DELETE_BLOG, ADD_BLOG, EDIT_BLOG } from './types';
import {
  refreshErrors,
  refreshResponse,
  getError,
  getResponse
} from './commonActions';

export const getBlogs = () => dispatch => {
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
  dispatch(refreshErrors());
  dispatch(refreshResponse());
  axios
    .post(`/api/blogs/avatar/${id}`, imageData, config)
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

export const editTextElement = (blogId, elementId, text) => dispatch => {
  dispatch(refreshErrors());
  dispatch(refreshResponse());
  axios
    .put(`/api/blogs/text/${blogId}/${elementId}`, text)
    .then(res => {
      dispatch({
        type: GET_BLOG,
        payload: res.data.item
      });
    })
    .catch(err => {
      dispatch(getError(err.response.data));
    });
};

export const deleteTextElement = (blogId, elementId) => dispatch => {
  dispatch(refreshErrors());
  dispatch(refreshResponse());
  axios
    .delete(`/api/blogs/text/${blogId}/${elementId}`)
    .then(res => {
      dispatch({
        type: GET_BLOG,
        payload: res.data.item
      });
    })
    .catch(err => {
      dispatch(getError(err.response.data));
    });
};

export const addTextElement = (blogId, text) => dispatch => {
  dispatch(refreshErrors());
  dispatch(refreshResponse());
  axios
    .post(`/api/blogs/text/${blogId}/`, text)
    .then(res => {
      dispatch({
        type: GET_BLOG,
        payload: res.data.item
      });
    })
    .catch(err => {
      dispatch(getError(err.response.data));
    });
};

export const deleteElementImage = (id, elementId) => dispatch => {
  dispatch(refreshErrors());
  dispatch(refreshResponse());
  axios
    .delete(`/api/blogs/image/${id}/${elementId}`)
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

export const editElementImage = (
  imageData,
  config,
  id,
  elementId
) => dispatch => {
  dispatch(refreshErrors());
  dispatch(refreshResponse());
  axios
    .put(`/api/blogs/image/${id}/${elementId}`, imageData, config)
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

export const addElementImage = (
  imageData,
  config,
  id,
  elementId
) => dispatch => {
  dispatch(refreshErrors());
  dispatch(refreshResponse());
  axios
    .delete(`/api/blogs/image/${id}/${elementId}`, imageData, config)
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
