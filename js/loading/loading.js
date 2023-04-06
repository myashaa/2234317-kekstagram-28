import {
  openPictureModal,
  closePictureModal
} from './viewer.js';
import {validateForm} from './form.js';
import {showSuccessMessage} from '../utils.js';

const pictureModalElement = document.querySelector('.img-upload__overlay');
const pictureUploadInput = document.querySelector('#upload-file');
const pictureModalCloseElement = pictureModalElement.querySelector('#upload-cancel');

const closeModalWithMessage = () => {
  closePictureModal();
  showSuccessMessage();
};
validateForm(closeModalWithMessage);

pictureUploadInput.addEventListener('change', () => {
  openPictureModal();
});

pictureModalCloseElement.addEventListener('click', () => {
  closePictureModal();
});
