import {removeToken, storeToken} from '../services/storage/Token';

const changeToken = (data) => {
  storeToken(data);
  console.log('storing to redux');
  return {
    type: 'CHANGE',
    data: data,
  };
};

const clearToken = () => {
  removeToken();
  return {
    type: 'CLEAR',
  };
};

const setUser = (user) => {
  return {
    type: 'SET_USER',
    data: user,
  };
};

const setShopId = (data) => {
  return {
    type: 'SET_ID',
    data: data,
  };
};

const setCartData = (data) => {
  return {
    type: 'SET_CART',
    data: data,
  };
};

const setChatBadge = (data) => {
  return {
    type: 'SET_CHAT_BADGE',
    data: data,
  };
};
export {changeToken, clearToken, setUser, setShopId, setCartData, setChatBadge};
