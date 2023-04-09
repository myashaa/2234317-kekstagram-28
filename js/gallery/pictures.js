import {RANDOM_PICTURES_COUNT} from '../setup.js';

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const picturesFragment = document.createDocumentFragment();
const titleTemplate = document.querySelector('.pictures__title');
const imgUploadTemplate = document.querySelector('.img-upload');

const comparePictures = (firstPicture, secondPicture) => secondPicture.comments.length - firstPicture.comments.length;

const compareRandom = () => Math.random() - 0.5;

const createUsersPictures = (pictures) => {
  const imgFilterActive = document.querySelector('.img-filters__button--active');
  const picturesCopy = pictures.slice();
  if (imgFilterActive.id === Filter.DISCUSSED) {
    picturesCopy
      .sort(comparePictures);
  }
  if (imgFilterActive.id === Filter.RANDOM) {
    picturesCopy
      .sort(compareRandom)
      .splice(0, RANDOM_PICTURES_COUNT);
  }

  picturesCopy.forEach(({id, url, likes, comments}) => {
    const picture = pictureTemplate.cloneNode(true);

    picture.dataset.id = id;
    picture.querySelector('.picture__img').src = url;
    picture.querySelector('.picture__likes').textContent = likes;
    picture.querySelector('.picture__comments').textContent = comments.length;

    picturesFragment.appendChild(picture);
  });

  const title = titleTemplate.cloneNode(true);
  const imgUpload = imgUploadTemplate.cloneNode(true);
  picturesList.innerHTML = '';
  picturesList.appendChild(title);
  picturesList.appendChild(imgUpload);
  picturesList.appendChild(picturesFragment);
};

export {createUsersPictures};
