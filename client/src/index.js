import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from "axios";

axios.interceptors.request.use((res) =>
{
  if (localStorage.getItem("authToken"))
  {
    res.headers["authToken"] = localStorage.getItem("authToken");
  }

  return res;
}, (err) =>
{
  return Promise.reject(err)
});

ReactDOM.render(<App/>, document.getElementById('root'));
