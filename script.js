import 'shoelace-css/dist/shoelace.css'
import './styles.css'
import Card from './src/Card'
import Router from 'vanilla-router'
import Api from './src/Api'

const router = new Router({
  mode: 'history'
})

router.add('', (id) => {
  document.getElementById('cards-container').innerHTML = ''
  const button = document.createElement('button')
  button.innerText = 'Start Game'
  document.getElementById('cards-container').appendChild(button)
  button.addEventListener('click', function (e) {
    e.preventDefault()
    router.navigateTo('cards/{id}')
  })
})

router.add('cards/{id}', (id) => {
  const api = new Api()
  api.get(id)
    .then(res => {
      const cardData = res.body
      const card = new Card(cardData)
      const dom = createCardDom(card)
      document.getElementById('cards-container').innerHTML = ''
      document.getElementById('cards-container').appendChild(dom)
    })
})

router.addUriListener()
router.check()

// document.getElementById('submit-button').addEventListener('click', function (event) {
//   event.preventDefault()
//   let cardData = {
//     answer: document.getElementById('input-answer').value,
//     question: document.getElementById('input-question').value
//   }
//   let newCard = new Card(cardData)
//   newCard.create().then(card => {
//     createCardDom(card)
//   })
// })

function createCardDom (card) {
  let cardDom = document.createElement('li')
  cardDom.classList.add('flash-card')
  cardDom.dataset.cardId = card.id

  cardDom.classList.add('card-Dom')
  cardDom.innerHTML = `<h3 class = 'question'>${card.question}</h3>
                      <p class = 'answer'>${card.answer}</p>`

  let newDeleteButton = createDeleteButton(card, cardDom)
  let newEditButton = createEditButton(card)
  cardDom.appendChild(newDeleteButton)
  cardDom.appendChild(newEditButton)
  return cardDom
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
  createForm.setAttribute('id', `${card.id}`)

  let createInputQuestion = document.createElement('input')
  createInputQuestion.classList.add('input-question')
  let createInputAnswer = document.createElement('input')
  createInputAnswer.classList.add('input-answer')

  createInputQuestion.type = 'text'
  createInputAnswer.type = 'text'

  createInputQuestion.value = card.question
  createInputAnswer.value = card.answer

  createForm.appendChild(createInputQuestion)
  createForm.appendChild(createInputAnswer)
  gameContainer.appendChild(createForm)

  createSaveButton(card.id)
  createCancelButton(card.id)
}

function createSaveButton (card) {
  let editForm = document.getElementById(card)
  var editButton = document.createElement('button')
  editButton.classList.add('edit-button')
  editButton.innerText = 'Save'
  editForm.appendChild(editButton)
  editButton.addEventListener('click', function (e) {
    Card.update().then(card => {
      card.remove()
      createCardDom(card)
    })
  })
}

function createCancelButton (card) {
  let editForm = document.getElementById(card)
  var cancelButton = document.createElement('button')
  cancelButton.classList.add('cancel-button')
  cancelButton.innerText = 'Cancel'
  editForm.appendChild(cancelButton)
}
