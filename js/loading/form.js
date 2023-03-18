import '/vendor/pristine/pristine.min.js';
import {
  MAX_HASHTAG_COUNT,
  MAX_DESCRIPTION_SYMBOLS_COUNT
} from '../setup.js';

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

let hashtagErrorMessage = '';

const validateHashtag = (hashtag) => {
  const hashtagRegexp = /^#[a-zA-Zа-яА-ЯёЁ0-9]{1,19}$/;
  hashtagErrorMessage = 'Неверный хеш-тег';

  return hashtagRegexp.test(hashtag);
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

const validateForm = () => {
  pictureForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      pictureForm.submit();
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
    pictureFormSubmitBtn.removeAttribute('disabled');
  }
}

pictureInputs.forEach((item) => {
  observer.observe(item, mutationConfig);
});

export {
  validateForm,
  resetErrors
};
