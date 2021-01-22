import _ from 'lodash';

export const toPrice = (price) => {
  return _.replace(price, /\B(?=(\d{3})+(?!\d))/g, '.');
};

export const toDate = (dateString) => {
  const year = dateString.slice(0, 4);
  const month = dateString.slice(5, 7);
  const day = dateString.slice(8, 10);

  return `${day}/${month}/${year}`;
};

export const toHour = (dateString) => {
  const hour = dateString.slice(11, 13);
  const minute = dateString.slice(14, 16);
  return `${hour}:${minute}`;
};
