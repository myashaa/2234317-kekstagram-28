import { getPhotos } from './data.js';

const PHOTOS_COUNT = 25;

const picturesList = document.querySelector('.pictures');
const pictures = getPhotos(PHOTOS_COUNT);
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const picturesFragment = document.createDocumentFragment();

pictures.forEach(({url, likes, comments}) => {
  const picture = pictureTemplate.cloneNode(true);

  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.querySelector('.picture__comments').textContent = comments.length;

  picturesFragment.appendChild(picture);
});

picturesList.appendChild(picturesFragment);
