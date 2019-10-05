import React from 'react';
import PropTypes from 'prop-types';
import FileInputGroup from '../../common/FileInputGroup';

const ShowEditTextImageElement = ({
  isAuthenticated,
  editBlog,
  body,
  DeleteTextElement,
  OpenTextElementModal,
  onChangeImage,
  onSubmitImage,
  imageObject,
  onDeleteImage,
  errors
}) => {
  return (
    <div className="row mx-0 mx-lg-5 px-lg-5">
      {editBlog ? (
        <div className="col-12">
          {isAuthenticated &&
            body.map(element => (
              <div key={element._id} className="mt-3 border">
                {element.type == 'text' ? (
                  <div>
                    <div
                      className="lead mx-2 mx-md-5"
                      dangerouslySetInnerHTML={{
                        __html: element.text
                      }}
                    ></div>
                    <div className="row mt-2 mb-5">
                      <div className="col text-center">
                        <button
                          className="btn btn-danger mx-2"
                          onClick={(e, id = element._id) =>
                            DeleteTextElement(e, id)
                          }
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-info mx-2"
                          onClick={(e, id = element._id, text = element.text) =>
                            OpenTextElementModal(e, id, text)
                          }
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center border">
                    <img
                      src={
                        element.image.location
                          ? element.image.location
                          : 'https://picsum.photos/1200/300'
                      }
                      alt="image"
                      className="img-fluid"
                    />
                    <form onSubmit={e => onSubmitImage(e, element._id)}>
                      <FileInputGroup
                        name="blogImage"
                        placeholder="Image"
                        onChange={onChangeImage}
                        sendFile={imageObject}
                        error={errors.image}
                        accept="image/png, image/jpg, image/jpeg"
                      />
                      <div className="row mt-2 mb-5">
                        <div className="col text-center">
                          <button
                            className="btn btn-danger mx-2"
                            onClick={e => onDeleteImage(e, element._id)}
                          >
                            Delete
                          </button>
                          <button className="btn btn-info mx-2" type="submit">
                            Upload
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            ))}
        </div>
      ) : (
        <div className="col-12">
          {body.map(element => (
            <div key={element._id} className="mt-3">
              {element.type == 'text' ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: element.text
                  }}
                ></div>
              ) : (
                <img
                  src={element.image.location}
                  alt="image icon"
                  className="img-fluid text-center"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

ShowEditTextImageElement.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  editBlog: PropTypes.bool.isRequired,
  body: PropTypes.array.isRequired,
  DeleteTextElement: PropTypes.func.isRequired,
  OpenTextElementModal: PropTypes.func.isRequired,
  onChangeImage: PropTypes.func.isRequired,
  onSubmitImage: PropTypes.func.isRequired,
  imageObject: PropTypes.object.isRequired,
  onDeleteImage: PropTypes.func.isRequired,
  errors: PropTypes.object
};

export default ShowEditTextImageElement;
