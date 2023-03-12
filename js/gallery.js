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

const getPictureId = (elem) => {
  let pictureId = 0;
  elem.parentNode.classList.forEach((pictureClass) => {
    if (pictureClass.includes('picture--')) {
      pictureId = pictureClass.slice(9);
    }
  });

  return --pictureId;
};

pictureModalOpenElement.addEventListener('click', (evt) => {
  const elem = evt.target;
  if (elem.classList.contains('picture__img')) {
    const pictureId = getPictureId(elem);
    openPictureModal(pictures[pictureId]);
  }
});

pictureModalCloseElement.addEventListener('click', () => {
  closePictureModal();
});
