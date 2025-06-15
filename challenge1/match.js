
let cards_array = ['mosquito', 'duck', 'elephant', 'mosquito', 'duck', 'elephant']
let section_one = document.querySelector('.section-one_solution')
let counter = 0
let counterElement = document.querySelector('.section-one .counter span')
let button = document.querySelector('.start-button')
let timerElement = document.querySelector('.section-one .timer span')
let intervalCounter = 0
let intervalId
let matchedCounter = 0
let currentIndex = null
let prevIndex = null

button.addEventListener('click', function () {
  section_one.style.display = 'flex'

  intervalId = setInterval(() => {
    intervalCounter += 1
    timerElement.innerText = `${intervalCounter} s`
  }, 1000)

  button.disabled = true
})


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }

  return array
}


shuffleArray(cards_array)

// Create cards with front/back flip faces
cards_array.map((cardText) => {
  let cardContainer = document.createElement('div')
  cardContainer.classList.add('cards')

  let flipper = document.createElement('div')
  flipper.classList.add('flipper')

  let front = document.createElement('div')
  front.classList.add('cards-front')
  front.innerText = cardText

  let back = document.createElement('div')
  back.classList.add('cards-back')
  back.innerText = '?'

  flipper.appendChild(front)
  flipper.appendChild(back)
  cardContainer.appendChild(flipper)
  section_one.appendChild(cardContainer)
})

// Flip and match logic
let get_all_cards = document.querySelectorAll('.section-one_solution .cards')

get_all_cards.forEach((card, index) => {
  card.addEventListener('click', () => {
    if (card.classList.contains('disable') || card.classList.contains('is-flipped')) return

    card.classList.add('is-flipped')
    counter += 1
    counterElement.innerText = counter

    prevIndex = currentIndex
    currentIndex = index

    let prevCard = prevIndex !== null ? get_all_cards[prevIndex] : null
    let currentCard = get_all_cards[currentIndex]

    let prevText = prevCard?.querySelector('.cards-front').innerText
    let currText = currentCard.querySelector('.cards-front').innerText

    if (currentIndex !== prevIndex && prevCard && currentCard) {
      if (prevText === currText) {
        prevCard.classList.add('disable')
        currentCard.classList.add('disable')
        matchedCounter += 1
        currentIndex = null
        prevIndex = null
      } else {
        setTimeout(() => {
          prevCard.classList.remove('is-flipped')
          currentCard.classList.remove('is-flipped')
          currentIndex = null
          prevIndex = null
        }, 800)
      }
    }

    if (matchedCounter * 2 === get_all_cards.length) {

      clearInterval(intervalId)

    }
  })
})

