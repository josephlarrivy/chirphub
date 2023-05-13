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

  static async addTag(data) {
    return (
      await this.makeRequest('post', '/addTag', null, data)
    )
  }

  static async getChirps() {
    return (
      await this.makeRequest('get', '/getChirps', null)
    )
  }

  static async likeChirp(data) {
    return (
      await this.makeRequest('post', `/likeChirp/${data.chirp_id}/${data.user_id}`, null)
    )
  }

  static async deleteChirp(data) {
    return (
      await this.makeRequest('post', `/deleteChirp/${data.chirp_id}`, null)
    )
  }

  static async postChirpComment(data) {
    return (
      await this.makeRequest('post', '/postChirpComment', null, data)
    )
  }

  static async getCommentsByChirpId(data) {
    return (
      await this.makeRequest('post', `/getCommentsByChirpId/${data.chirp_id}`, null, data)
    )
  }

  static async getTagsByChirpId(data) {
    return (
      await this.makeRequest('post', `/getTagsByChirpId/${data.chirp_id}`, null, data)
    )
  }

  static async getChirpsByTagId(data) {
    return (
      await this.makeRequest('post', `/getChirpsByTagId/${data.tag_id.tagId}`, null, data)
    )
  }

  static async getAllTagsButCurrent(data) {
    // console.log(data.tag_id.tagId)
    return (
      await this.makeRequest('post', `/getAllTagsButCurrent/${data.tag_id.tagId}`, null, data)
    )
  }

  static async getAllTagsAsObjects() {
    return (
      await this.makeRequest('get', `/getAllTagsAsObjects`, null)
    )
  }



}


export default ApiRequest;