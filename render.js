let gameRound = 0
const { INIT_PLAYERS, INIT_GAME, GAME_END } = GAME_STATES
const CARD_SUITS_SYMBOL = {
  HEARTS: '♥',
  SPADES: '♠',
  CLUBS: '♣',
  DIAMONDS: '♦',
}

const renderParentDivs = () => {
  const maxPlayerDivEl = document.getElementById('set-max-players')
  const playerNamesDivEl = document.getElementById('set-players')
  const playerNamesListEl = document.getElementById('set-players__players-list')
  const cardDisplay = document.querySelector('.container__game-init')
  const scoreBoardContainerEl = document.querySelector('.container__scoreboard')
  const scoreBoardListEl = document.getElementById('scoreboard__tbody')
  const endGameDisplayEl = document.querySelector('.container__gameend')
  return {
    maxPlayerDivEl,
    playerNamesDivEl,
    playerNamesListEl,
    cardDisplay,
    scoreBoardContainerEl,
    scoreBoardListEl,
    endGameDisplayEl,
  }
}

const createOrUpdateScoreboard = (scoreBoard) => {
  const newScoreBoardList = scoreBoard.map((player) => {
    const scoreBoardRowEl = document.createElement('tr')
    const playerEl = document.createElement('td')
    playerEl.innerHTML = player.playerName
    const scoreEl = document.createElement('td')
    scoreEl.innerHTML = player.score
    scoreBoardRowEl.appendChild(playerEl)
    scoreBoardRowEl.appendChild(scoreEl)
    return scoreBoardRowEl
  })
  return newScoreBoardList
}

const scoreBoardRenderer = () => {
  const { scoreBoardListEl, scoreBoardContainerEl } = renderParentDivs()

  const updateScoreboard = (drawnCards, playerDecisions) => {
    scoreBoardListEl.innerHTML = ''
    const scoreBoardList = calculateScore(drawnCards, playerDecisions)
    const newScoreBoardList = createOrUpdateScoreboard(scoreBoardList)
    scoreBoardListEl.append(...newScoreBoardList)
  }

  const showScoreBoard = () => {
    scoreBoardContainerEl.style.visibility = 'visible'
    initScoreBoard()

    const formattedScoreboard = Object.keys(scoreBoard).map((player) => {
      return {
        playerName: player,
        score: scoreBoard[player],
      }
    })
    const scoreBoardList = createOrUpdateScoreboard(formattedScoreboard)
    scoreBoardListEl.append(...scoreBoardList)
  }
  return {
    updateScoreboard,
    showScoreBoard,
  }
}

const cardDisplayRenderer = () => {
  const showCardImage = (drawnCard) => {
    const cardImageWrapper = document.createElement('div')
    const cardImage = document.createElement('img')
    cardImage.src = `images/card/${drawnCard.card.description}_of_${drawnCard.card.suit}.png`
    cardImageWrapper.appendChild(cardImage)

    return cardImageWrapper
  }
  const toggleSkipRoundDisplay = (skipRoundDisplayEl, skipRound) => {
    skipRoundDisplayEl.innerHTML = skipRound ? 'Skip' : 'Continue'
  }

  const showAllCardsDrawnByPlayers = (drawnCards, playerDecisions) => {
    const drawnCardsDivEl = drawnCards.map((drawnCard) => {
      const drawnCardEl = document.createElement('div')
      const playerNameDiv = document.createElement('div')
      playerNameDiv.innerHTML = drawnCard.player
      drawnCardEl.appendChild(playerNameDiv)

      drawnCardEl.id = `card-player-${drawnCard.player}`
      // show card image
      const cardImage = showCardImage(drawnCard)
      const descriptionEl = document.createElement('p')
      descriptionEl.innerHTML = `${drawnCard.card.description} of ${
        CARD_SUITS_SYMBOL[drawnCard.card.suit]
      }`
      drawnCardEl.appendChild(cardImage)
      drawnCardEl.appendChild(descriptionEl)

      const skipBtn = createButton({
        id: `skip-btn-${drawnCard.player}`,
        classAtt: ['btn', 'btn-warning', 'primary-btn'],
        buttonName: 'Skip',
      })

      const skipRoundDisplayEl = document.createElement('div')
      skipRoundDisplayEl.id = `skip-round-${drawnCard.player}`
      toggleSkipRoundDisplay(
        skipRoundDisplayEl,
        playerDecisions[drawnCard.player].skipRound
      )

      skipBtn.addEventListener('click', () => {
        playerDecisions[drawnCard.player].skipRound = true
        toggleSkipRoundDisplay(
          skipRoundDisplayEl,
          playerDecisions[drawnCard.player].skipRound
        )
      })

      const continueBtn = createButton({
        id: `continue-btn-${drawnCard.player}`,
        classAtt: ['btn', 'btn-primary', 'primary-btn'],
        buttonName: 'Continue',
      })

      continueBtn.addEventListener('click', () => {
        playerDecisions[drawnCard.player].skipRound = false
        toggleSkipRoundDisplay(
          skipRoundDisplayEl,
          playerDecisions[drawnCard.player].skipRound
        )
      })

      const buttonWrapper = document.createElement('div')
      buttonWrapper.appendChild(skipBtn)
      buttonWrapper.appendChild(continueBtn)

      drawnCardEl.appendChild(skipRoundDisplayEl)
      drawnCardEl.appendChild(buttonWrapper)

      return drawnCardEl
    })
    return drawnCardsDivEl
  }

  const showCards = (drawnCards, playerDecisions) => {
    gameRound += 1

    const allCardsWrapperDivEl = document.createElement('div')
    allCardsWrapperDivEl.classList.add(
      'container__game-init__cards-wrapper',
      'grid-item'
    )
    const gameRoundInfoEl = document.createElement('p')
    gameRoundInfoEl.innerHTML = `Round ${gameRound}`
    allCardsWrapperDivEl.appendChild(gameRoundInfoEl)

    const drawnCardsWrapperEl = document.createElement('div')
    drawnCardsWrapperEl.classList.add(
      'container__game-init__drawn-cards-wrapper'
    )

    const drawnCardsDivEl = showAllCardsDrawnByPlayers(
      drawnCards,
      playerDecisions
    )

    drawnCardsWrapperEl.append(...drawnCardsDivEl)
    allCardsWrapperDivEl.append(drawnCardsWrapperEl)

    return allCardsWrapperDivEl
  }

  return {
    showCards,
  }
}

const initPlayersRenderer = () => {
  const { playerNamesListEl, playerNamesDivEl } = renderParentDivs()
  const { showGamePlay } = renderGameStates()

  const showInputPlayerNamesDisplay = () => {
    const onChangeCallback = (playerInx) => {
      const playerInput = document.getElementById(`player-${playerInx}`)
      allPlayers[playerInx - 1] = playerInput.value
    }
    playerNamesDivEl.style.visibility = 'visible'
    const listOfPlayerInput = document.createElement('div')
    for (let i = 0; i < maxPlayers; i++) {
      // default name
      allPlayers.push(`Player ${i + 1}`)
      const playerInput = createInput({
        type: 'text',
        placeholder: `Default name: Player ${i + 1}`,
        onchange: () => onChangeCallback(i + 1),
      })
      const playerInputWrapper = document.createElement('div')
      playerInputWrapper.appendChild(playerInput)
      playerInput.setAttribute('id', `player-${i + 1}`)
      listOfPlayerInput.appendChild(playerInputWrapper)
    }
    const playButton = createButton({
      text: 'Play',
      id: 'play-btn',
      classAtt: ['btn', 'btn-primary', 'primary-btn'],
      buttonName: 'Start game',
    })
    playButton.addEventListener('click', () => {
      showGamePlay()
    })
    listOfPlayerInput.appendChild(playButton)
    playerNamesListEl.appendChild(listOfPlayerInput)
  }

  return {
    showInputPlayerNamesDisplay,
  }
}

const renderGameStates = () => {
  const { cardDisplay, endGameDisplayEl, playerNamesDivEl } = renderParentDivs()
  const { updateScoreboard, showScoreBoard } = scoreBoardRenderer()
  const { showCards } = cardDisplayRenderer()

  const showGameEnd = () => {
    cardDisplay.remove()
    endGameDisplayEl.style.visibility = 'visible'
  }

  const startGamePlay = () => {
    showScoreBoard()
    cardDisplay.style.visibility = 'visible'
    cardDisplay.classList.add('grid-container')

    const dealCardWrapper = document.createElement('div')

    const dealCardBtn = createButton({
      id: `deal-card-btn-${gameRound}`,
      classAtt: ['btn', 'btn-primary', 'btn-dark', 'deal-btn'],
      buttonName: 'Next Round',
    })

    dealCardWrapper.appendChild(dealCardBtn)
    dealCardWrapper.classList.add('button__wrapper')

    let drawnCards = dealCards(allPlayers)
    let playerDecisions = allPlayers.reduce((acc, player) => {
      acc[player] = {
        skipRound: false,
      }
      return acc
    }, {})

    dealCardBtn.addEventListener('click', () => {
      drawnCards = dealCards(allPlayers)
      if (drawnCards.length < allPlayers.length) {
        return showGameEnd()
      }
      const newCardsDisplayEl = showCards(drawnCards, playerDecisions)
      cardDisplay.appendChild(newCardsDisplayEl)
      updateScoreboard(drawnCards, playerDecisions)
    })

    cardDisplay.appendChild(dealCardWrapper)
    const playerCardsDisplay = showCards(drawnCards, playerDecisions)

    cardDisplay.appendChild(playerCardsDisplay)
  }

  const showGamePlay = () => {
    playerNamesDivEl.remove()
    startGamePlay()
  }

  return {
    showGameEnd,
    showGamePlay,
    startGamePlay,
  }
}

const render = (() => {
  const { maxPlayerDivEl } = renderParentDivs()
  const { showInputPlayerNamesDisplay } = initPlayersRenderer()

  const submitBtn = document.getElementById('submit-max-players_btn')

  submitBtn.addEventListener('click', () => {
    let inputValue = document.getElementById('submit-max-players_input').value

    if (inputValue === '' || parseInt(inputValue) < 2) {
      inputValue = 2
    }

    maxPlayers = setMaxPlayers(inputValue)
    maxPlayerDivEl.remove()
    showInputPlayerNamesDisplay()
  })
})()
