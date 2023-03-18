import { isEscapeKey } from './utils.js';

const COMMENTS_COUNT = 5;

const pictureModalElement = document.querySelector('.big-picture');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const commentsList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('.social__comment');
const commentsFragment = document.createDocumentFragment();

const setPicture = ({url, description, likes, comments}) => {
  pictureModalElement.querySelector('.big-picture__img > img').src = url;
  pictureModalElement.querySelector('.social__caption').textContent = description;
  pictureModalElement.querySelector('.likes-count').textContent = likes;
  pictureModalElement.querySelector('.comments-count').textContent = comments.length;
};

const clearComments = () => {
  commentsList.innerHTML = '';
  commentsLoader.classList.remove('hidden');
};

const setComments = (comments) => {
  const comment = commentTemplate.cloneNode(true);
  clearComments();

  comments.forEach(({avatar, message, name}) => {
    const commentCopy = comment.cloneNode(true);

    commentCopy.classList.add('hidden');
    commentCopy.querySelector('.social__picture').src = avatar;
    commentCopy.querySelector('.social__picture').alt = name;
    commentCopy.querySelector('.social__text').textContent = message;

    commentsFragment.appendChild(commentCopy);
  });

  commentsList.appendChild(commentsFragment);
};

const loadComments = () => {
  const comments = commentsList.children;

  const lowerBound = Number(commentsLoader.dataset.value);
  let upperBound = lowerBound + COMMENTS_COUNT;
  const maxValue = Number(commentsLoader.dataset.maxValue);

  if (upperBound >= maxValue) {
    upperBound = maxValue;
    commentsLoader.classList.add('hidden');
  }

  for (let i = lowerBound; i < upperBound; i++) {
    comments[i].classList.remove('hidden');
  }

  commentsLoader.dataset.value = upperBound;
  socialCommentCount.innerHTML = `${upperBound} из <span class="comments-count">${maxValue}</span> комментариев`;
};

const openPictureModal = (picture) => {
  pictureModalElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  setPicture(picture);
  setComments(picture.comments);

  commentsLoader.dataset.value = 0;
  commentsLoader.dataset.maxValue = picture.comments.length;
  loadComments();

  commentsLoader.addEventListener('click', onButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const closePictureModal = () => {
  pictureModalElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  clearComments();

  commentsLoader.removeEventListener('click', onButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePictureModal();
  }
}

function onButtonClick() {
  loadComments();
}

export {
  openPictureModal,
  closePictureModal
};
