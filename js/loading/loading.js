import {
  openPictureModal,
  closePictureModal
} from './viewer.js';
import {validateForm} from './form.js';
import {showSuccessMessage} from '../utils.js';
import {PICTURE_TYPES} from '../setup.js';

const pictureModalElement = document.querySelector('.img-upload__overlay');
const pictureUploadInput = document.querySelector('#upload-file');
const pictureModalCloseElement = pictureModalElement.querySelector('#upload-cancel');
const imgPreview = document.querySelector('.img-upload__preview img');

const closeModalWithMessage = () => {
  closePictureModal();
  showSuccessMessage();
};
validateForm(closeModalWithMessage);

pictureUploadInput.addEventListener('change', () => {
  openPictureModal();

  const file = pictureUploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = PICTURE_TYPES.some((item) => fileName.endsWith(item));

  if (matches) {
    imgPreview.src = URL.createObjectURL(file);
  }
});

pictureModalCloseElement.addEventListener('click', () => {
  closePictureModal();
});
