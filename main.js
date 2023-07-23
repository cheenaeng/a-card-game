/**
 * They would like more than 4 players in the game.
All players who draw the card must now show the card.
Subsequent players are allowed to skip the round.

There are now two decks of playing cards available per game
 */

//add another deck of playing cards

//need to state the number of max players

//need to have a show card function to flip card

// before each round start can choose to skip or continue

// if user skip will be zero score

//at the end calculate score, if tie and happens to be the highest then check if the second index in the array happens to have the same card, if same card then got 2 highest

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

// startGame()

// setInterval(() => {
//   startGame()
// }, 1000)
