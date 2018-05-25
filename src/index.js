import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Axios from "axios";

//some global defaults
Axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
Axios.defaults.headers.common["Authorization"] = "myTOKEN";
Axios.defaults.headers.post["Test"] = "test";

//common use case here is to add headers
Axios.interceptors.request.use(requestConfig => {
  console.log(requestConfig);
  //whole point is to edit the request config before returning it
  return requestConfig;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

Axios.interceptors.response.use(responseConfig => {
  console.log(responseConfig);
  //can also edit response config before returning it
  return responseConfig;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
