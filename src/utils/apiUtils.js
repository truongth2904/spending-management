import AppConfigs from '../configs/env';

const REQUEST_TIMEOUT = 60000;

const buildURLWithParams = (url, params = {}) => {
  let requestedURL = url;
  if (params) {
    const keys = Object.keys(params);

    if (Array.isArray(keys) && keys.length > 0) {
      requestedURL += '?';
      for (var property of keys) {
        const index = keys.indexOf(property);
        if (index > 0 && index < keys.length) {
          requestedURL += '&';
        }
        requestedURL += `${property}=${params[property]}`;
      }
    }
  }
  return requestedURL;
};

export default class APIUtils {
  static accessToken = '';
  static setAccessToken = accessToken => {
    APIUtils.accessToken = accessToken;
    console.log('APIUtils.accessToken', APIUtils.accessToken);
  };
  static get(url, config = {headers: {}, params: {}}) {
    return new Promise((resolve, reject) => {
      let headersDefault = {
        'Content-Type': 'application/json',
        Accept: 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'x-access-token': APIUtils.accessToken,
      };
      const {headers, params, ...restConfig} = config;
      const requestedURL = buildURLWithParams(url, params);

      // eslint-disable-next-line no-undef
      const controller = new AbortController();
      const signal = controller.signal;

      const fetchConfig = {
        cache: 'default',
        credentials: 'include',
        headers: {
          ...headersDefault,
          ...config.headers,
        },
        ...restConfig,
        method: 'GET',
        signal,
      };

      setTimeout(() => {
        controller.abort();
      }, REQUEST_TIMEOUT);
      if (__DEV__) {
        console.log('>>>>>request>>>>>', {
          url: requestedURL,
          config: fetchConfig,
        });
      }

      fetch(requestedURL, fetchConfig)
        .then(async response => {
          let responseJson = {};
          try {
            responseJson = await response.json();
          } catch (err) {}
          if (__DEV__) {
            console.log('>>>>>response>>>>>', {
              url: requestedURL,
              data: responseJson,
              status: response.status,
            });
          }
          if (response.status >= 400 && response.status <= 499) {
            throw {data: responseJson, status: response.status};
          }
          if (response.status >= 200 && response.status <= 299) {
            return {data: responseJson, status: response.status};
          }
          throw {data: responseJson, status: response.status};
        })
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          console.log('>>>>>error>>>>>', error);
          reject(error);
        });
    });
  }

  static post(url, config = {headers: {}}) {
    return new Promise((resolve, reject) => {
      let headersDefault = {
        'Content-Type': 'application/json',
        Accept: 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'x-access-token': APIUtils.accessToken,
      };
      const {headers, body, params, ...restConfig} = config;

      // eslint-disable-next-line no-undef
      const controller = new AbortController();
      const signal = controller.signal;

      const fetchConfig = {
        cache: 'default',
        credentials: 'include',
        headers: {
          ...headersDefault,
          ...config.headers,
        },
        ...restConfig,
        signal,
        method: 'POST',
        body: JSON.stringify(config.body),
      };
      setTimeout(() => {
        controller.abort();
      }, REQUEST_TIMEOUT);
      if (__DEV__) {
        console.log('>>>>>request>>>>>', {
          url,
          config: fetchConfig,
        });
      }
      fetch(url, fetchConfig)
        .then(async response => {
          console.log('response>>>', response);

          let responseJson = {};
          try {
            responseJson = await response.json();
          } catch (err) {}
          if (__DEV__) {
            console.log('>>>>>response>>>>>', {
              url,
              data: responseJson,
              status: response.status,
            });
          }
          if (response.status >= 400 && response.status <= 499) {
            throw {data: responseJson, status: response.status};
          }
          if (response.status >= 200 && response.status <= 299) {
            return {data: responseJson, status: response.status};
          }
          throw {data: responseJson, status: response.status};
        })
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          console.log('>>>>>error>>>>>', error);
          reject(error);
        });
    });
  }

  static delete(url, config = {headers: {}}) {
    return new Promise((resolve, reject) => {
      let headersDefault = {
        'Content-Type': 'application/json',
        Accept: 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      };
      const {headers, body, params, ...restConfig} = config;

      // eslint-disable-next-line no-undef
      const controller = new AbortController();
      const signal = controller.signal;

      const fetchConfig = {
        cache: 'default',
        credentials: 'include',
        headers: {
          ...headersDefault,
          ...config.headers,
        },
        ...restConfig,
        signal,
        method: 'DELETE',
        body: JSON.stringify(config.body),
      };
      setTimeout(() => {
        controller.abort();
      }, REQUEST_TIMEOUT);
      if (__DEV__) {
        console.log('>>>>>request>>>>>', {
          url,
          config: fetchConfig,
        });
      }
      fetch(url, fetchConfig)
        .then(async response => {
          let responseJson = {};
          try {
            responseJson = await response.json();
          } catch (err) {}
          if (__DEV__) {
            console.log('>>>>>response>>>>>', {
              url,
              data: responseJson,
              status: response.status,
            });
          }
          if (response.status >= 400 && response.status <= 499) {
            throw {data: responseJson, status: response.status};
          }
          if (response.status >= 200 && response.status <= 299) {
            return {data: responseJson, status: response.status};
          }
          throw {data: responseJson, status: response.status};
        })
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          console.log('>>>>>error>>>>>', error);
          reject(error);
        });
    });
  }

  static put(url, config = {headers: {}}) {
    return new Promise((resolve, reject) => {
      let headersDefault = {
        'Content-Type': 'application/json',
        Accept: 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Api-version': AppConfigs.apiVersion,
        'Ocp-Apim-Subscription-Key': AppConfigs.subscriptionKey,
        e_platform: 'mobile',
        'x-access-token': APIUtils.accessToken,
      };
      const {headers, body, params, ...restConfig} = config;

      // eslint-disable-next-line no-undef
      const controller = new AbortController();
      const signal = controller.signal;

      const fetchConfig = {
        cache: 'default',
        credentials: 'include',
        headers: {
          ...headersDefault,
          ...config.headers,
        },
        ...restConfig,
        signal,
        method: 'PUT',
        body: JSON.stringify(config.body),
      };
      setTimeout(() => {
        controller.abort();
      }, REQUEST_TIMEOUT);
      if (__DEV__) {
        console.log('>>>>>request>>>>>', {
          url,
          config: fetchConfig,
        });
      }
      fetch(url, fetchConfig)
        .then(async response => {
          let responseJson = {};
          try {
            responseJson = await response.json();
          } catch (err) {}
          if (__DEV__) {
            console.log('>>>>>response>>>>>', {
              url,
              data: responseJson,
              status: response.status,
            });
          }
          if (response.status >= 400 && response.status <= 499) {
            throw {data: responseJson, status: response.status};
          }
          if (response.status >= 200 && response.status <= 299) {
            return {data: responseJson, status: response.status};
          }
          throw {data: responseJson, status: response.status};
        })
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          console.log('>>>>>error>>>>>', error);
          reject(error);
        });
    });
  }
}
