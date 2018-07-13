const { API_BASE_URL } = global;
const version = 'v1';

const handleResponse = (d) => {
  if (d.status >= 200 && d.status <= 300) {
    let data;
    try {
      data = d.json();
    } catch (e) {
      data = d.text();
    }
    return data;
  }
  throw new Error(d.statusText);
};

class API {
  constructor(baseUrl, config) {
    this.config = { ...config };
    this.baseURL = baseUrl;
  }

  get(endpoint, params) {
    const url = `${this.baseURL}/${version}/${endpoint}${params ? `?${params}` : ''}`;
    return fetch(url, this.config).then(handleResponse);
  }
}

const config = {
  headers: {
    client: 'front'
  }
};

export default new API(API_BASE_URL, config);
