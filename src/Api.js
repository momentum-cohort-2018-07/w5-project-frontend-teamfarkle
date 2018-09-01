
import request from 'superagent'

class Api {
  constructor () {
    this.baseUrl = 'http://localhost:3000/cards'
  }

  get () {
    return request.get(this.baseUrl)
  }

  post () {
    return request.post(this.baseUrl)
  }

  put (id) {
    return request.put(`${this.baseUrl}/${id}`)
  }

  patch (id) {
    return request.put(`${this.baseUrl}/${id}`)
  }

  delete (id) {
    return request.delete(`${this.baseUrl}/${id}`)
  }
}

export default Api
