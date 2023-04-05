import {
  setUiSlider,
  updateUiSlider,
  resetUiSlider
} from './filter-settings.js';

const effectBtns = document.querySelectorAll('.effects__radio');
const imgPreview = document.querySelector('.img-upload__preview img');
const sliderElement = document.querySelector('.effect-level');

const toggleFilter = (evt) => {
  const elemValue = evt.target.value;

  if (sliderElement.classList.contains('hidden')) {
    sliderElement.classList.remove('hidden');
  }
  if (elemValue === 'none') {
    sliderElement.classList.add('hidden');
  }

  imgPreview.classList.value = '';
  imgPreview.classList.add(`effects__preview--${elemValue}`);

  updateUiSlider(elemValue);
};

const setFilters = () => {
  sliderElement.classList.add('hidden');
  setUiSlider();

  effectBtns.forEach((btn) => {
    btn.addEventListener('click', toggleFilter);
  });
};

const resetFilters = () => {
  imgPreview.classList.value = '';
  resetUiSlider();

  effectBtns.forEach((btn) => {
    btn.removeEventListener('click', toggleFilter);
  });
};

export {
  setFilters,
  resetFilters
};
