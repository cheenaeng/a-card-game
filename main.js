// game state
let allPlayers = []
let scoreBoard = {}

const { createDeck, shuffleDeck, generateCardsForPlayers, sortCards } =
  cardSetup()
const { createInitialScoreBoard, tallyScore, sortScoreBoard } =
  scoreBoardSetup()
const { setMaxPlayers, getAllPlayers } = playersSetup()
const { createButton, createInput } = displaySetup()

// creating card decks
const cardDeck = createDeck()
const doubleCardDeck = [...cardDeck, ...cardDeck]
const shuffledDeck = shuffleDeck(doubleCardDeck)

const dealCards = (players) => {
  if (players.length > shuffledDeck.length) {
    return []
  }
  const cardsDrawnByPlayers = generateCardsForPlayers(shuffledDeck, players)
  return cardsDrawnByPlayers
}

const initScoreBoard = () => {
  createInitialScoreBoard(allPlayers, scoreBoard)
}

const calculateScore = (playerDrawnCards, playerDecisions) => {
  const allCards = playerDrawnCards.map((playerCard) => {
    return {
      ...playerCard,
      skipRound: playerDecisions[playerCard.player].skipRound,
    }
  })
  sortCards(allCards)

  tallyScore(allCards, scoreBoard)
  console.log('---------CARDS DRAWN--------')
  console.log(allCards)

  //get user input here whether to skip or not

  console.log('---------SCOREBOARD--------')
  const sortedScores = sortScoreBoard(scoreBoard, allPlayers)
  console.log(sortedScores)

  return sortedScores
}
