import axios from 'axios';

// Create an instance of axios
const api = axios.create({
  baseURL: 'https://menu-randomizer-api.onrender.com/api', // you can update this to your API URL (e.g., 'http://localhost:5000/api')
});

// Request interceptor for adding token to headers and configuring content type
api.interceptors.request.use(
  (config) => {
    // Check if the data being sent is an instance of FormData
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
