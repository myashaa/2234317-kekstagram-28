import { isEscapeKey } from '../utils.js';
import {
  setScale,
  resetScale
} from './effects/scale.js';
import {
  setFilters,
  resetFilters
} from './effects/filters.js';
import {resetErrors} from './form.js';

const pictureModalElement = document.querySelector('.img-upload__overlay');
const pictureUploadInput = document.querySelector('#upload-file');
const pictureHashtagsInput = document.querySelector('.text__hashtags');
const pictureDescriptionInput = document.querySelector('.text__description');
const mutationConfig = { childList: true };
const observer = new MutationObserver(onMutate);

const clearFieldsValue = () => {
  pictureUploadInput.value = '';
  pictureHashtagsInput.value = '';
  pictureDescriptionInput.value = '';
};

const openPictureModal = () => {
  setScale();
  setFilters();

  pictureModalElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  observer.observe(document.body, mutationConfig);
};

const closePictureModal = () => {
  resetErrors();
  resetScale();
  resetFilters();

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

function onMutate (mutations) {
  const parentNode = mutations[0];

  if (parentNode.addedNodes[0]) {
    if ((parentNode.addedNodes[0].tagName === 'SECTION')
      && parentNode.addedNodes[0].classList.contains('error')) {
      document.removeEventListener('keydown', onDocumentKeydown);
    }
  }

  if (parentNode.removedNodes[0]) {
    if ((parentNode.removedNodes[0].tagName === 'SECTION')
      && parentNode.removedNodes[0].classList.contains('error')) {
      document.addEventListener('keydown', onDocumentKeydown);
    }
  }
}

export {
  openPictureModal,
  closePictureModal
};
