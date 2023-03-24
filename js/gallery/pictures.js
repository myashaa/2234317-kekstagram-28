const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const picturesFragment = document.createDocumentFragment();

const createUsersPictures = (pictures) => {
  pictures.forEach(({id, url, likes, comments}) => {
    const picture = pictureTemplate.cloneNode(true);

    picture.dataset.id = id;
    picture.querySelector('.picture__img').src = url;
    picture.querySelector('.picture__likes').textContent = likes;
    picture.querySelector('.picture__comments').textContent = comments.length;

    picturesFragment.appendChild(picture);
  });

  picturesList.appendChild(picturesFragment);
};

export {createUsersPictures};
