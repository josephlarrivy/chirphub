import axios from 'axios';

const BASE_URL = 'http://localhost:5000';
// const BASE_URL = 'https://chirphub-server.herokuapp.com'


class ApiRequest {

  // base for class. use this to make requests to the database
  static async makeRequest(method, endpoint, token = null, data = {}) {
    try {
      const headers = { authorization: `Bearer ${token}` }
      // console.log(`${BASE_URL}${endpoint}`)
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

  // registers a new user
  static async register(data) {
    return (
      await this.makeRequest('POST', '/register', null, data)
    )
  }

  // users can log in
  static async login(data) {
    return (
      await this.makeRequest('POST', '/login', null, data)
    )
  }

  // post a chird to the main feed
  static async postChirp(data) {
    return (
      await this.makeRequest('post', '/postChirp', null, data)
    ) 
  }

  // adds tags to chirps =
  static async addTag(data) {
    return (
      await this.makeRequest('post', '/addTag', null, data)
    )
  }

  // gets all chirps from the database
  static async getChirps() {
    return (
      await this.makeRequest('get', '/getChirps', null)
    )
  }

  // sends a like to the database for a chirp
  static async likeChirp(data) {
    return (
      await this.makeRequest('post', `/likeChirp/${data.chirp_id}/${data.user_id}`, null)
    )
  }

  // deletes a chirp from the database
  static async deleteChirp(data) {
    return (
      await this.makeRequest('post', `/deleteChirp/${data.chirp_id}`, null)
    )
  }

  // users can comment on a chirp
  static async postChirpComment(data) {
    return (
      await this.makeRequest('post', '/postChirpComment', null, data)
    )
  }

  // used get comments once a chirp is retreived from the database
  static async getCommentsByChirpId(data) {
    return (
      await this.makeRequest('post', `/getCommentsByChirpId/${data.chirp_id}`, null, data)
    )
  }

  // used to get tags once a chirp is retreived from the database
  static async getTagsByChirpId(data) {
    return (
      await this.makeRequest('post', `/getTagsByChirpId/${data.chirp_id}`, null, data)
    )
  }

  // used to get all chirps that have a specific tag from the database
  static async getChirpsByTagId(data) {
    return (
      await this.makeRequest('post', `/getChirpsByTagId/${data.tag_id.tagId}`, null, data)
    )
  }

  // used to get all tags for database except for the currently selected one
  static async getAllTagsButCurrent(data) {
    // console.log(data.tag_id.tagId)
    return (
      await this.makeRequest('post', `/getAllTagsButCurrent/${data.tag_id.tagId}`, null, data)
    )
  }

  // used to get tags as object to map over on front-end
  static async getAllTagsAsObjects() {
    return (
      await this.makeRequest('get', `/getAllTagsAsObjects`, null)
    )
  }

  // used to bookmark a chirp for a users to 'save'
  static async addBookmark(data) {
    return (
      await this.makeRequest('post', '/addBookmark', null, data)
    )
  }

  // gets all of the chirps that a user has bookmarked
  static async getBookmarkedChirpsByUser(data) {
    return (
      await this.makeRequest('post', '/getBookmarkedChirpsByUser', null, data)
    )
  }

  // allows a user to remove a bookamrk 
  static async removeBookmark(data) {
    return (
      await this.makeRequest('post', '/removeBookmark', null, data)
    )
  }

  // deletes a comment from the database
  static async deleteComment(data) {
    return (
      await this.makeRequest('post', `/deleteComment/${data.comment_id}`, null)
    )
  }

}


export default ApiRequest;