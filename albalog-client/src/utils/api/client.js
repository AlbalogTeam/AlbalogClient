import axios from 'axios';

const client = axios.create();
client.defaults.baseURL = 'http://localhost:5000/api/v1';
client.interceptors.request.use(
  function (config) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    config.headers.Authorization = `Bearer ${user.token}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

export default client;
