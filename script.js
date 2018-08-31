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
document.getElementsByClassName('fa-edit').addEventListener('click', function (event) {
  event.preventDefault()
  createForm()
})

function createCardDom (card) {
  let form = document.getElementById('form')
  let cardDom = document.createElement('li')
  cardDom.classList.add('flash-card')

  cardDom.dataset.id = card.id
  cardDom.classList.add('card-Dom')
  cardDom.innerHTML = `<h3 class = 'question'>${card.question}</h3>
                      <p class = 'answer'>${card.answer}</p>`

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
  createEdit.addEventListener('click', function (event) {
    createForm()
  })
  return createEdit
}
function createForm () {
  let createForm = document.createElement('form')
  createForm.classList.add('edit-form')
  let getQuestion = document.getElementById('question').value
  let getAnswer = document.getElementById('answer').value
  let createInputQuestion = document.createElement('input-question')
  let createInputAnswer = document.createElement('input-answer')
  createInputQuestion.type('text')
  createInputQuestion.placeholder(getQuestion)
  createInputAnswer.type('text')
  createInputAnswer.placeholder(getAnswer)
  createForm.appendChild(createInputQuestion)
  createForm.appendChild(createInputAnswer)
}
