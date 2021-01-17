import _ from 'lodash';

export const toPrice = (price) => {
  return _.replace(price, /\B(?=(\d{3})+(?!\d))/g, '.');
};
