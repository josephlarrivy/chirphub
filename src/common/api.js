import axios from 'axios';

const BASE_URL = 'http://localhost:5000';


class ApiRequest {

  static async makeRequest(method, endpoint, token = null, data = {}) {
    try {
      const headers = { authorization: `Bearer ${token}` }
      return (
        await axios({ method, url: `${BASE_URL}${endpoint}`, data, headers })
      );
    } catch (err) {
      console.error(err);
    }
  }

  static async test(formData) {
    const data = formData;
    return (
      await this.makeRequest('get', '/test', null, data)
    )
  }

  static async postChirp(formData) {
    const data = formData;
    return (
      await this.makeRequest('post', '/new_chirp', null, data)
    ) 
  }
}

export default ApiRequest;