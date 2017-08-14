import axios from 'axios';
import qs from 'qs';
import { Message } from 'element-ui';
import router from 'src/router';

const appKey = '728546026281111356';

const defaultVersion = '1.0';

const instance = axios.create({
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

export default async (data, method, type = 'POST', version) => {
  var responseJson = null;
  if (!version) {
    version = defaultVersion;
  }
  type = type.toUpperCase();
    try {
      var response = await instance({
        method: type,
        url: '/router',
        data: data,
        params: {
          appKey: appKey,
          method: method,
          v: version,
          sessionId: sessionStorage.getItem('sessionId')
        }
      });
      let code = await response.data.code;
      if (code === '21') {
        Message.error('登录超时，请重新登录');
        router.push({path: '/login'});
        return;
      }
      if (code !== '0') {
        handleBusinessServiceError(response.data);
      } else {
        responseJson = await response.data.data;
      }
    } catch (error) {
      Message.error(error);
    }
    return responseJson;
};

function handleBusinessServiceError(errmsg) {
  if (errmsg.subError) {
    let msg = '';
    errmsg.subError.forEach(error => {
      msg += error.message;
    });
    Message.error(msg);
  } else {
    Message.error(errmsg.message);
  };
};
