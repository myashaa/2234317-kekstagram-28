const PHOTOS_COUNT = 25;
const MIN_USER_PHOTOS_COUNT = 1;
const MAX_USER_PHOTOS_COUNT = 6;
const MAX_COMMENTS_COUNT = 5;
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

getPhotos(PHOTOS_COUNT);
