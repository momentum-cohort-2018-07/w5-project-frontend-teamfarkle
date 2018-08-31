import 'shoelace-css/dist/shoelace.css'
import './styles.css'
import Card from './src/Card'
import Router from 'vanilla-router'

document.addEventListener('DOMContentLoaded', function (event) {
  Card.getAll().then(allTheCards => {
    for (let card of allTheCards) {
      createCardDom(card)
    }
  })

  document.getElementById('submit-button').addEventListener('click', function (event) {
    event.preventDefault()
    let cardData = {
      answer: document.getElementById('input-answer').value,
      question: document.getElementById('input-question').value
    }
    let newCard = new Card(cardData)
    newCard.create().then(card => {
      createCardDom(card)
    })
  })
})

function createCardDom (card) {
  let form = document.getElementById('form')
  let cardDom = document.createElement('li')
  cardDom.classList.add('flash-card')

  cardDom.classList.add('card-Dom')
  cardDom.innerHTML = `<h3 class = 'question'>${card.question}</h3>
                      <p class = 'answer'>${card.answer}</p>`

  let newDeleteButton = createDeleteButton(card, cardDom)
  let newEditButton = createEditButton(card)
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

function createEditButton (card) {
  let editButton = document.createElement('button')
  editButton.classList.add('fas', 'fa-edit')
  editButton.addEventListener('click', function (event) {
    event.preventDefault()
    createForm(card)
  })
  return editButton
}

function createForm (card) {
  let gameContainer = document.getElementById('gameContainer')
  let createForm = document.createElement('form')
  createForm.classList.add('edit-form')

  let createInputQuestion = document.createElement('input')
  createInputQuestion.classList.add('input-question')
  let createInputAnswer = document.createElement('input')
  createInputAnswer.classList.add('input-answer')

  createInputQuestion.type = 'text'
  createInputQuestion.value = card.question

  createInputAnswer.type = 'text'
  createInputAnswer.value = card.answer

  createForm.appendChild(createInputQuestion)
  createForm.appendChild(createInputAnswer)
  gameContainer.appendChild(createForm)
}
