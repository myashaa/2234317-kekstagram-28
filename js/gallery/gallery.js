import {createUsersPictures} from './pictures.js';
import {
  openPictureModal,
  closePictureModal
} from './viewer.js';
import {getData} from '../network/api.js';
import {
  showAlert,
  debounce
} from '../utils.js';
import {RERENDER_DELAY} from '../setup.js';

const pictureModalElement = document.querySelector('.big-picture');
const pictureModalOpenElement = document.querySelector('.pictures');
const pictureModalCloseElement = pictureModalElement.querySelector('.big-picture__cancel');
const pictureFiltersElement = document.querySelector('.img-filters');
const pictureFiltersBtns = document.querySelectorAll('.img-filters__button');

getData()
  .then((data) => {
    createUsersPictures(data);
    createEventListener(data);
    pictureFiltersElement.classList.remove('img-filters--inactive');
    setFilter(debounce(
      () => createUsersPictures(data),
      RERENDER_DELAY,
    ));
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

function setFilter (cb) {
  pictureFiltersElement.addEventListener('click', (evt) => {
    const elem = evt.target.closest('.img-filters__button');
    if (elem) {
      pictureFiltersBtns.forEach((btn) => {
        if (btn.classList.contains('img-filters__button--active')) {
          btn.classList.remove('img-filters__button--active');
        }
      });

      elem.classList.add('img-filters__button--active');
    }
    cb();
  });
}

pictureModalCloseElement.addEventListener('click', () => {
  closePictureModal();
});
