import Api from './dataApi';

export const IMAGE_DATA = {
  GET: 'GET_IMAGES',
};

export const getImages = (page) => ({
  type: IMAGE_DATA.GET,
  payload: Api.getImages(page),
  meta: {page},
});
