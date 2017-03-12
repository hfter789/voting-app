import axios from 'axios';

const localCache = {};
export const getUser = (authToken, ip) => {
  if (localCache[authToken]) {
    return localCache[authToken];
  }
  return axios.get(`https://graph.facebook.com/me?access_token=${authToken}`)
  .then(response => {
    localCache[authToken] = response.data.id;
    return response.data.id;
  })
  .catch(error => {
    // throw error;
  });
};