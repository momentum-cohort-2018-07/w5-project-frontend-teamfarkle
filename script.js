import 'shoelace-css/dist/shoelace.css'
import './styles.css'
import Card from './src/Card'

document.addEventListener('DOMContentLoaded', function (event) {
  Card.getAll().then(allTheCards => {
    for (let card of allTheCards) {
      createCardDom(card)
    }
  })

  document.getElementById('submit-button').addEventListener('click', function (event) {
    event.preventDefault()
    let tagInputValue = document.getElementById('input-tag-field').value
    let cardData = {
      tags: tagInputValue.split(' '),
      text: document.getElementById('input-text-field').value,
      title: document.getElementById('input-card-title').value
    }

    let newCard = new Card(cardData)
    newCard.createCardDom(card => {
      createCardDom(card)
    })
  })
})

function createCardDom (card) {
  let form = document.getElementById('form')
  let cardDom = document.createElement('li')
  cardDom.classList.add('flash-card')

  cardDom.dataset.id = card.id
  cardDom.classList.add('cardDom')
  cardDom.innerHTML = `<h1>${card.id}</h1>
                      <h3>${card.question}</h3>
                      <p>${card.answer}</p>`

  let newDeleteButton = createDeleteButton(card, cardDom)
  let newEditButton = createEditButton()
  cardDom.appendChild(newDeleteButton)
  cardDom.appendChild(newEditButton)
  form.prepend(cardDom)
}
function createDeleteButton (card, cardDom) {
  let newDeleteButton = document.createElement('button')
  newDeleteButton.classList.add('fas', 'fa-trash-alt')
  newDeleteButton.addEventListener('click', function (event) {
    card.delete().then(() => {
      cardDom.remove()
    })
  })
  return newDeleteButton
}

function createEditButton () {
  let createEdit = document.createElement('button')
  createEdit.classList.add('fas', 'fa-edit')
  return createEdit
}
