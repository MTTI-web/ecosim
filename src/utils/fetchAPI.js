import getApiUrl from './getAPIURL.js';

const fetchAPI = async ({
  url,
  method = 'get',
  body = {},
  api = true,
  headers = {},
}) => {
  const apiURL = getApiUrl();
  let response = {};
  console.log(`${method} request to ${api ? apiURL + url : url}`);
  if (method === 'get') {
    response = await fetch(api ? `${apiURL}${url}` : url, {
      credentials: api ? 'include' : 'omit',
      headers:
        api && !Object.keys(headers).length
          ? {
              'Content-Type': 'application/json',
              ...headers,
            }
          : {},
    }).catch((err) => {
      console.log('Could not fetch from the API. Error:', err);
    });
  } else if (method === 'post') {
    response = await fetch(api ? `${apiURL}${url}` : url, {
      method: 'POST',
      body: JSON.stringify({ ...body }),
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      credentials: api ? 'include' : 'omit',
    }).catch((err) => {
      console.log('Could not fetch from the API. Error:', err);
    });
    console.log('Response:', response);
  }
  const data = await response.json().catch((err) => {
    console.log('Could not convert to JSON.\nError:', err);
  });
  return data;
};

export default fetchAPI;
