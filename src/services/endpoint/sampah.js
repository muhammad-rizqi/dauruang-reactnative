import {api} from '../API/webapi';

export const getSampahCategory = () => {
  return api('GET', '/sampah');
};
