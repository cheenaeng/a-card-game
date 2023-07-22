/**
 * They would like more than 4 players in the game.
All players who draw the card must now show the card.
Subsequent players are allowed to skip the round.

There are now two decks of playing cards available per game
 */

const SUITS = {
  HEARTS: 'HEARTS',
  SPADES: 'SPADES',
  CLUBS: 'CLUBS',
  DIAMONDS: 'DIAMONDS',
}

// max players can be adjusted
let maxPlayers = 4

//order matters here
const CARD_SUIT = [SUITS.DIAMONDS, SUITS.CLUBS, SUITS.HEARTS, SUITS.SPADES]
const players = ['player1', 'player2', 'player3', 'player4']
const MIN_CARD_VALUE = 1
const MAX_CARD_VALUE = 13

const cardSetup = () => {
  const createCardDescription = (cardValue, suit) => {
    let value = cardValue

    if (cardValue === 1) {
      value = 'Ace'
    }
    if (cardValue === 11) {
      value = 'Jack'
    }

    if (value === 12) {
      value = 'Queen'
    }
    if (value === 13) {
      value = 'King'
    }

    return `${value} of ${suit}`
  }

  const createDeck = () => {
    let deck = []
    for (let i = MIN_CARD_VALUE; i < MAX_CARD_VALUE + 1; i++) {
      for (let j = 0; j < CARD_SUIT.length; j++) {
        const card = {
          suit: CARD_SUIT[j],
          value: i,
          description: createCardDescription(i, CARD_SUIT[j]),
        }
        deck.push(card)
      }
    }
    return deck
  }

  const shuffleDeck = (deck) => {
    for (let i = 0; i < deck.length; i++) {
      const randomIdx = Math.floor(Math.random() * deck.length)
      let temp = deck[i]
      deck[i] = deck[randomIdx]
      deck[randomIdx] = temp
    }
    return deck
  }

  const generateCardsForPlayers = (deck, players) => {
    let playerCards = []
    for (i = 0; i < players.length; i++) {
      const drawnCard = deck.pop()
      const drawnPlayerCardDetails = {
        player: players[i],
        card: drawnCard,
      }
      playerCards.push(drawnPlayerCardDetails)
    }
    return playerCards
  }
  const compareCardSuit = (card1, card2) => {
    if (
      CARD_SUIT.indexOf(card1.card.suit) > CARD_SUIT.indexOf(card2.card.suit)
    ) {
      return 1
    } else return -1
  }

  const sortCards = (playerCards) => {
    //sort by value and by suit
    playerCards.sort((card1, card2) => {
      if (card1.card.value > card2.card.value) {
        return 1
      } else if (card1.card.value < card2.card.value) {
        return -1
      } else {
        return compareCardSuit(card1, card2)
      }
    })
  }

  return {
    createDeck,
    shuffleDeck,
    generateCardsForPlayers,
    sortCards,
  }
}

const scoreBoardSetup = () => {
  const createInitialScoreBoard = (players) => {
    let initial = {}
    for (let i = 0; i < players.length; i++) {
      initial[players[i]] = 0
    }
    return initial
  }

  const tallyScore = (playerCards, scoreBoard) => {
    const highestCardIdx = playerCards.length - 1
    const highestCard = playerCards[highestCardIdx]
    scoreBoard[highestCard.player] += 1
  }

  const sortScoreBoard = (scoreBoard, playerNames) => {
    const scores = playerNames.map((pName) => {
      return {
        playerName: pName,
        score: scoreBoard[pName],
      }
    })

    scores.sort((player1, player2) => {
      if (player1.score > player2.score) {
        return -1
      } else return 1
    })
    return scores
  }

  return {
    createInitialScoreBoard,
    tallyScore,
    sortScoreBoard,
  }
}

const { createDeck, shuffleDeck, generateCardsForPlayers, sortCards } =
  cardSetup()
const { createInitialScoreBoard, tallyScore, sortScoreBoard } =
  scoreBoardSetup()

const cardDeck = createDeck()
const shuffledDeck = shuffleDeck(cardDeck)
const scoreBoard = createInitialScoreBoard(players)

const startGame = () => {
  if (shuffledDeck.length === 0) {
    console.log('---------GAME END--------')
    process.exit()
    return scoreBoard
  }

  const cardsDrawnByPlayers = generateCardsForPlayers(shuffledDeck, players)
  sortCards(cardsDrawnByPlayers)
  tallyScore(cardsDrawnByPlayers, scoreBoard)
  console.log('---------CARDS DRAWN--------')
  console.log(cardsDrawnByPlayers)

  console.log('---------SCOREBOARD--------')
  const sortedScores = sortScoreBoard(scoreBoard, players)
  console.log(sortedScores)
}

setInterval(() => {
  startGame()
}, 1000)
