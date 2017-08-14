import axios from 'axios';
// import qs from 'qs';
import fetch from './fetch';
import sha1 from './sha1';
// import { Message } from 'element-ui';
// import router from 'src/router';

let base = '';

// const appKey = '728546026281111356';

// const defaultVersion = '1.0';

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, {params: params}); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, {params: params}); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, {params: params}); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, {params: params}); };

export const editUser = params => { return axios.get(`${base}/user/edit`, {params: params}); };

export const addUser = params => { return axios.get(`${base}/user/add`, {params: params}); };

export const post = (data, method, version) => {
  return fetch(data, method, 'POST', version);
};

export const get = (data, method, version) => {
  return fetch(data, method, 'GET', version);
};

export const hexSha1 = (s) => {
  return sha1(s);
};

export const getAppKey = () => {
  let now = Date.now();
  let appKey = sha1('A6902235657073' + 'UZ' + '627AFECD-3EAF-BA8C-B82C-419B8CA426B6' + 'UZ' + now) + '.' + now;
  return appKey;
};
/* const instance = axios.create({
 baseURL: 'http://localhost:8080',
 timeout: 20000,
 headers: {
 'Content-Type': 'application/x-www-form-urlencoded',
 'Accept': 'application/json',
 'X-Requested-With': 'XMLHttpRequest'
 }
 });

 instance.interceptors.request.use((request) => {
 if (request.data && request.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
 request.data = qs.stringify(request.data);
 }
 return request;
 });

 export const post = (data, method, version) => {
 if (!version) {
 version = defaultVersion;
 }
 return instance
 .post('/router', data, {
 params: {
 appKey: appKey,
 method: method,
 v: version,
 sessionId: sessionStorage.getItem('sessionId')
 }
 })
 .catch(handleError);
 };

 export const get = (method, version) => {
 if (!version) {
 version = defaultVersion;
 }
 return instance
 .get('/router', {
 params: {
 appKey: appKey,
 method: method,
 v: version,
 sessionId: sessionStorage.getItem('sessionId')
 }
 })
 .catch(handleError);
 };

 export const handleBusinessServiceError = errmsg => {
 console.log(errmsg);
 if (errmsg.subErrors) {
 let msg = '';
 errmsg.subErrors.forEach(subError => {
 msg += subError.message;
 });
 Message.error(msg);
 } else {
 Message.error(errmsg.message);
 };
 };

 export const proccess = (response, callback) => {
 let code = response.data.code;
 if (code === '21') {
 Message.error('登录超时，请重新登录');
 router.push({path: '/login'});
 return;
 }
 if (code !== '0') {
 handleBusinessServiceError(response.data);
 } else {
 callback();
 }
 };
 function handleError (error) {
 console.error(error);
 Message.error(error);
 Promise.reject(error);
 } */
