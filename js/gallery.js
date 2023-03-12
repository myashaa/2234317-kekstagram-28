import {getPhotos} from './data.js';
import {createUsersPictures} from './pictures.js';
import {
  openPictureModal,
  closePictureModal
} from './viewer.js';

const PHOTOS_COUNT = 25;
const pictureModalElement = document.querySelector('.big-picture');
const pictureModalOpenElement = document.querySelector('.pictures');
const pictureModalCloseElement = pictureModalElement.querySelector('.big-picture__cancel');

const pictures = getPhotos(PHOTOS_COUNT);
createUsersPictures(pictures);

pictureModalOpenElement.addEventListener('click', (evt) => {
  const elem = evt.target.closest('.picture');
  if (elem) {
    const currentPicture = pictures.find((item) => item.id === Number(elem.dataset.id));
    openPictureModal(currentPicture);
  }
});

pictureModalCloseElement.addEventListener('click', () => {
  closePictureModal();
});
