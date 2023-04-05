import {
  openPictureModal,
  closePictureModal
} from './viewer.js';
import {
  validateForm,
  resetErrors
} from './form.js';
import {
  setScale,
  resetScale
} from './effects/scale.js';
import {
  setFilters,
  resetFilters
} from './effects/filters.js';

const pictureModalElement = document.querySelector('.img-upload__overlay');
const pictureUploadInput = document.querySelector('#upload-file');
const pictureModalCloseElement = pictureModalElement.querySelector('#upload-cancel');

pictureUploadInput.addEventListener('change', () => {
  openPictureModal();
  validateForm();
  setScale();
  setFilters();
});

pictureModalCloseElement.addEventListener('click', () => {
  closePictureModal();
  resetErrors();
  resetScale();
  resetFilters();
});
