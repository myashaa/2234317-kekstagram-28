import {
  MAX_HASHTAG_COUNT,
  MAX_DESCRIPTION_SYMBOLS_COUNT,
  HASHTAG_REGEXP
} from '../setup.js';
import {sendData} from '../network/api.js';
import {showErrorMessage} from '../utils.js';

const pictureForm = document.querySelector('#upload-select-image');
const pristine = new Pristine(pictureForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span'
}, true);
const pictureHashtagsInput = pictureForm.querySelector('.text__hashtags');
const pictureDescriptionInput = pictureForm.querySelector('.text__description');
const pictureInputs = pictureForm.querySelectorAll('.img-upload__field-wrapper');
const pictureFormSubmitBtn = pictureForm.querySelector('#upload-submit');
const mutationConfig = { attributes: true };
const observer = new MutationObserver(onMutate);
const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

let hashtagErrorMessage = '';
let isSubmit = false;

const validateHashtag = (hashtag) => {
  hashtagErrorMessage = 'Неверный хеш-тег';
  return HASHTAG_REGEXP.test(hashtag);
};

const validateHashtags = () => {
  const hashtags = pictureHashtagsInput.value.trim().split(' ').filter((item) => item.trim() !== '');
  const hashtagsArr = [];

  if (hashtags.length > MAX_HASHTAG_COUNT) {
    hashtagErrorMessage = `Количество хеш-тегов не должно быть более ${MAX_HASHTAG_COUNT}`;
    return false;
  }

  for (let i = 0; i < hashtags.length; i++) {
    const hashtag = hashtags[i].toLowerCase();

    if (!hashtagsArr.includes(hashtag)) {
      hashtagsArr.push(hashtag);
    } else {
      hashtagErrorMessage = `Хеш-тег ${hashtag} уже используется`;
      return false;
    }

    if (!validateHashtag(hashtag)) {
      return false;
    }
  }

  return true;
};

const getHashtagsErrorMessage = () => hashtagErrorMessage;

const validateDescription = () => pictureDescriptionInput.value.length <= MAX_DESCRIPTION_SYMBOLS_COUNT;

pristine.addValidator(pictureHashtagsInput, validateHashtags, getHashtagsErrorMessage);
pristine.addValidator(pictureDescriptionInput, validateDescription, `Длина комментария превышает ${MAX_DESCRIPTION_SYMBOLS_COUNT} символов`);

const blockSubmitButton = () => {
  pictureFormSubmitBtn.textContent = SubmitButtonText.SENDING;
  pictureFormSubmitBtn.setAttribute('disabled', '');
};

const unblockSubmitButton = () => {
  pictureFormSubmitBtn.textContent = SubmitButtonText.IDLE;
  pictureFormSubmitBtn.removeAttribute('disabled');
};

const validateForm = (onSuccess) => {
  pictureForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      isSubmit = true;
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .catch(
          () => {
            showErrorMessage();
          }
        )
        .finally(unblockSubmitButton);
    }
  });
};

const resetErrors = () => pristine.reset();

function onMutate () {
  let isHasDanger = false;

  pictureInputs.forEach((item) => {
    if (item.classList.contains('has-danger')) {
      isHasDanger = true;
    }
  });

  if (isHasDanger) {
    pictureFormSubmitBtn.setAttribute('disabled', '');
  } else {
    if (!isSubmit) {
      pictureFormSubmitBtn.removeAttribute('disabled');
    }
  }
}

pictureInputs.forEach((item) => {
  observer.observe(item, mutationConfig);
});

export {
  validateForm,
  resetErrors
};
