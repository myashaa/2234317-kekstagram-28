import {
  createIdGenerator,
  getRandomInteger,
  getRandomArrayElement
} from '../utils.js';

const MIN_USER_PHOTOS_COUNT = 1;
const MAX_USER_PHOTOS_COUNT = 6;
const MAX_COMMENTS_COUNT = 13;
const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;
const NAMES = [
  'Саша',
  'Глаша',
  'Миша',
  'Ксюша',
  'Гриша',
  'Проша',
  'Паша',
  'Наташа',
  'Даша'
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const generateCommentId = createIdGenerator();
const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(MIN_USER_PHOTOS_COUNT, MAX_USER_PHOTOS_COUNT)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const getComments = () => {
  const commentsCount = getRandomInteger(0, MAX_COMMENTS_COUNT);
  const comments = [];
  for (let i = 1; i <= commentsCount; i++) {
    comments.push(createComment());
  }

  return comments;
};

const createPhoto = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: 'Описание фотографии',
  likes: getRandomInteger(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
  comments: getComments()
});

const getPhotos = (photosCount) => {
  const photos = [];
  for (let i = 1; i <= photosCount; i++) {
    photos.push(createPhoto(i));
  }

  return photos;
};

export {getPhotos};
