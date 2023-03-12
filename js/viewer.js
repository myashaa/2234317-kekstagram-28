import { isEscapeKey } from './utils.js';

const pictureModalElement = document.querySelector('.big-picture');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const commentsList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('.social__comment');
const commentsFragment = document.createDocumentFragment();

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePictureModal();
  }
};

const setPicture = ({url, description, likes, comments}) => {
  pictureModalElement.querySelector('.big-picture__img > img').src = url;
  pictureModalElement.querySelector('.social__caption').textContent = description;
  pictureModalElement.querySelector('.likes-count').textContent = likes;
  pictureModalElement.querySelector('.comments-count').textContent = comments.length;
};

const clearComments = () => {
  commentsList.innerHTML = '';
};

const setComments = (comments) => {
  const comment = commentTemplate.cloneNode(true);
  clearComments();

  comments.forEach(({avatar, message, name}) => {
    const commentCopy = comment.cloneNode(true);

    commentCopy.querySelector('.social__picture').src = avatar;
    commentCopy.querySelector('.social__picture').alt = name;
    commentCopy.querySelector('.social__text').textContent = message;

    commentsFragment.appendChild(commentCopy);
  });

  commentsList.appendChild(commentsFragment);
};

function openPictureModal (picture) {
  pictureModalElement.classList.remove('hidden');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.body.classList.add('modal-open');

  setPicture(picture);
  setComments(picture.comments);

  document.addEventListener('keydown', onDocumentKeydown);
}

function closePictureModal () {
  pictureModalElement.classList.add('hidden');
  socialCommentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  document.body.classList.remove('modal-open');

  clearComments();

  document.removeEventListener('keydown', onDocumentKeydown);
}

export {
  openPictureModal,
  closePictureModal
};
