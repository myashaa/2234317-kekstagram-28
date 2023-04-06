import {ALERT_SHOW_TIME} from './setup.js';

const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = '#fe4c4c';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const showSuccessMessage = () => {
  const messageTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
  const message = messageTemplate.cloneNode(true);
  document.body.appendChild(message);

  const modalElement = document.querySelector('.success');
  const modalCloseElement = document.querySelector('.success__button');

  modalCloseElement.addEventListener('click', onBtnClick);
  document.addEventListener('keydown', onDocumentKeydown);
  modalElement.addEventListener('click', onClick);
};

const showErrorMessage = () => {
  const messageTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  const message = messageTemplate.cloneNode(true);
  document.body.appendChild(message);

  const modalElement = document.querySelector('.error');
  const modalCloseElement = document.querySelector('.error__button');

  modalCloseElement.addEventListener('click', onBtnClick);
  document.addEventListener('keydown', onDocumentKeydown);
  modalElement.addEventListener('click', onClick);
};

function onClick (evt) {
  if (evt.target.tagName === 'SECTION') {
    onBtnClick();
  }
}

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    onBtnClick();
    document.removeEventListener('keydown', onDocumentKeydown);
  }
}

function onBtnClick() {
  const modalElement = document.querySelector('.success') || document.querySelector('.error');
  modalElement.remove();
}

export {
  createIdGenerator,
  getRandomInteger,
  getRandomArrayElement,
  isEscapeKey,
  showAlert,
  showSuccessMessage,
  showErrorMessage
};
