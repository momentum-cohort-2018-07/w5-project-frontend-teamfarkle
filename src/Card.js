import Api from './api'
import shortid from 'shortid'

let api = new Api()
class Card {
  constructor (properties) {
    this.question = properties.question
    this.answer = properties.answer
    this.id = properties.id || shortid.generate()
    this.deck = properties.deck || null
  }

  static getAll () {
    console.log("static getAll")
    return api.get()
      .then(response => {
        let cards = response.body
        return cards.map(cardData => new Card(cardData))
      })
  }

  create () {
    console.log("create")
    return api.post()
      .send({
        id: this.id,
        answer: this.answer,
        question: this.question
      })
      .then(response => {
        this.id = response.body.id
        return response.body
      })
  }

  update () {
    console.log("update")
    if (!this.id) return
    return api.put(this.id)
      .send({
        answer: this.answer,
        question: this.question
      })
      .then(response => {
        this.updated = response.body.updated
        return response.body
      })
  }

  delete () {
    console.log("delete")
    if (!this.id) return
    console.log('delete')
    return api.delete(this.id)
      .then(response => {
        this.id = null
      })
  }
}

export default Card
