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
      await this.makeRequest('POST', '/test', null, data)
    )
  }

  static async register(data) {
    return (
      await this.makeRequest('POST', '/register', null, data)
    )
  }

  static async login(data) {
    return (
      await this.makeRequest('POST', '/login', null, data)
    )
  }

  static async postChirp(data) {
    return (
      await this.makeRequest('post', '/postChirp', null, data)
    ) 
  }
}

export default ApiRequest;