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
<<<<<<< HEAD
    // let tagInputValue = document.getElementById('form').value
    let cardData = {
      // tags: tagInputValue.split(' '),
      question: document.getElementById('input-question').value,
      answer: document.getElementById('input-answer').value
      debugger
    }

    let newCard = new Card(cardData)
    newCard.createCardDom(cardData => {
      createCardDom(cardData)
    })
=======
    let cardData = {
      answer: document.getElementById('input-answer').value,
      question: document.getElementById('input-question').value
    }

    let newCard = new Card(cardData)
    createCardDom(newCard)
>>>>>>> d69d94a02f0d06d804f61e265ae00d4adee51320
  })
})

function createCardDom (card) {
  let form = document.getElementById('cardView')
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
  debugger
  form.appendChild(cardDom)
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
