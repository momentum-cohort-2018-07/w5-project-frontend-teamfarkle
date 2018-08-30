import Api from './api'
let api = new Api()
class Card {
  constructor (properties) {
    debugger
    this.question = properties.question
    this.answer = properties.answer
    this.id = properties.id
    this.updated = properties.updated || null
    this.deck = properties.deck || null
  }

  static getAll () {
    return api.get()
      .then(response => {
        let cards = response.body
        console.log('cards data', cards)
        return cards.map(cardData => new Card(cardData))
      })
  }

  create () {
    return api.post()
      .send({
        answer: this.answer,
        question: this.question
      })
      .then(response => {
        this.id = response.body._id
        this.updated = response.body.updated
        return response.body
      })
  }

  update () {
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
    if (!this.id) return
    return api.delete(this.id)
      .then(response => {
        this.id = null
      })
  }
}

export default Card
