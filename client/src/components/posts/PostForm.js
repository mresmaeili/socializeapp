import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import Dropzone from 'react-dropzone';
// const PostForm = ({ addPost }) => {
//   const [text, setText] = useState('');
//   const [image, setImage] = useState(null);

//   const onSubmit = (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('text', text);
//     formData.append('image', image);

//     addPost(formData);
//     setText('');
//     setImage(null);
//   };

//   return (
//     <div className="post-form">
//       <div className="bg-primary p">
//         <h3>Say Something...</h3>
//       </div>
//       <form className="form my-1" onSubmit={onSubmit}>
//         <textarea
//           name="text"
//           cols="30"
//           rows="5"
//           placeholder="Create a post"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           required
//         />
//         <input type="file" onChange={(e) => setImage(e.target.files[0])} />
//         <input type="submit" className="btn btn-dark my-1" value="Submit" />
//       </form>
//     </div>
//   );
// };

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); // State for image preview
  const [isFocused, setIsFocused] = useState(false);

  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    setImage(selectedFile);

    // Update previewUrl directly within onDrop
    const reader = new FileReader();
    reader.onload = (e) => setPreviewUrl(e.target.result);
    reader.readAsDataURL(selectedFile);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      // Handle no image selected case (optional: display an error message)
      return console.warn('Please select an image');
    }

    const formData = new FormData();
    formData.append('text', text);
    formData.append('image', image);

    try {
      await addPost(formData);
      setText('');
      setImage(null);
      setPreviewUrl(null); // Clear preview on successful submission
    } catch (err) {
      console.error(err);
      // Handle potential errors during image upload (optional: display error message)
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsFocused(true);
  };

  const handleDragLeave = () => {
    setIsFocused(false);
  };

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Share and Discover Lastest Posts</h3>
      </div>

      <form className="form my-1" onSubmit={onSubmit}>
        <div className="image-preview-container">
          {previewUrl && (
            <img src={previewUrl} alt="Preview" className="image-preview" />
          )}
          {!previewUrl && (
            <Dropzone
              onDrop={onDrop}
              accept="image/*"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              {({ getRootProps, getInputProps }) => (
                <section {...getRootProps()}>
                  <input {...getInputProps()} />
                  <img src="/image-upload.svg" className="dropimg" />
                  <p className="dropzone-text">
                    Drag & drop image here, or click to select
                  </p>
                </section>
              )}
            </Dropzone>
          )}
        </div>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="share your thoughts..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          className="text-area"
        />
        <input type="submit" className="btn btn-submit" value="Submit" />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(null, { addPost })(PostForm);
