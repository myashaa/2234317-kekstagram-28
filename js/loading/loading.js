import {
  openPictureModal,
  closePictureModal
} from './viewer.js';
import {
  validateForm,
  resetErrors
} from './form.js';

const pictureModalElement = document.querySelector('.img-upload__overlay');
const pictureUploadInput = document.querySelector('#upload-file');
const pictureModalCloseElement = pictureModalElement.querySelector('#upload-cancel');

pictureUploadInput.addEventListener('change', () => {
  openPictureModal();
  validateForm();
});

pictureModalCloseElement.addEventListener('click', () => {
  closePictureModal();
  resetErrors();
});
