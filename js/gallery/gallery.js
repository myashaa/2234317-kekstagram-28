//import {PHOTOS_COUNT} from '../setup.js';
//import {getPhotos} from './data.js';
import {createUsersPictures} from './pictures.js';
import {
  openPictureModal,
  closePictureModal
} from './viewer.js';
import {getData} from '../network/api.js';
import {showAlert} from '../utils.js';

const pictureModalElement = document.querySelector('.big-picture');
const pictureModalOpenElement = document.querySelector('.pictures');
const pictureModalCloseElement = pictureModalElement.querySelector('.big-picture__cancel');

getData()
  .then((data) => {
    createUsersPictures(data);
    createEventListener(data);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

function createEventListener (pictures) {
  pictureModalOpenElement.addEventListener('click', (evt) => {
    const elem = evt.target.closest('.picture');
    if (elem) {
      const currentPicture = pictures.find((item) => item.id === Number(elem.dataset.id));
      openPictureModal(currentPicture);
    }
  });
}

pictureModalCloseElement.addEventListener('click', () => {
  closePictureModal();
});
