import {isEscapeKey} from '../utils.js';

const pictureModalElement = document.querySelector('.img-upload__overlay');
const pictureUploadInput = document.querySelector('#upload-file');
const pictureHashtagsInput = document.querySelector('.text__hashtags');
const pictureDescriptionInput = document.querySelector('.text__description');

const clearFieldsValue = () => {
  pictureUploadInput.value = '';
  pictureHashtagsInput.value = '';
  pictureDescriptionInput.value = '';
};

const openPictureModal = () => {
  pictureModalElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

const closePictureModal = () => {
  pictureModalElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  clearFieldsValue();

  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt) &&
    (evt.target !== pictureHashtagsInput) && (evt.target !== pictureDescriptionInput)) {
    evt.preventDefault();
    closePictureModal();
  }
}

export {
  openPictureModal,
  closePictureModal
};
