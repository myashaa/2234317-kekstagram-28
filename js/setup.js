const PHOTOS_COUNT = 25;
const COMMENTS_COUNT = 5;
const MAX_HASHTAG_COUNT = 5;
const MAX_DESCRIPTION_SYMBOLS_COUNT = 140;
const HASHTAG_REGEXP = /^#[a-zA-Zа-яА-ЯёЁ0-9]{1,19}$/;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const SCALING_STEP_VALUE = 25;
const DEFAULT_FILTER = 'none';
const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const ALERT_SHOW_TIME = 5000;

const FILTER_PARAMS = {
  'none': {
    filter: 'none',
    min: 0,
    max: 1,
    step: 0.1,
    unitsOfMeasurement: ''
  },
  'chrome': {
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unitsOfMeasurement: ''
  },
  'sepia': {
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unitsOfMeasurement: ''
  },
  'marvin': {
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unitsOfMeasurement: '%'
  },
  'phobos': {
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unitsOfMeasurement: 'px'
  },
  'heat': {
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unitsOfMeasurement: ''
  },
};

export {
  PHOTOS_COUNT,
  COMMENTS_COUNT,
  MAX_HASHTAG_COUNT,
  MAX_DESCRIPTION_SYMBOLS_COUNT,
  HASHTAG_REGEXP,
  MIN_SCALE_VALUE,
  MAX_SCALE_VALUE,
  SCALING_STEP_VALUE,
  DEFAULT_FILTER,
  FILTER_PARAMS,
  BASE_URL,
  ALERT_SHOW_TIME
};
