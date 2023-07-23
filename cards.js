const cardSetup = () => {
  const createCardDescription = (cardValue) => {
    let value = cardValue

    if (cardValue === 1) {
      value = 'A'
    }
    if (cardValue === 11) {
      value = 'J'
    }
    if (value === 12) {
      value = 'Q'
    }
    if (value === 13) {
      value = 'K'
    }

    return `${value}`
  }

  const createDeck = () => {
    let deck = []
    for (let i = MIN_CARD_VALUE; i < MAX_CARD_VALUE + 1; i++) {
      for (let j = 0; j < ORDERED_CARD_SUIT.length; j++) {
        const card = {
          suit: ORDERED_CARD_SUIT[j],
          value: i,
          description: createCardDescription(i, ORDERED_CARD_SUIT[j]),
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
      ORDERED_CARD_SUIT.indexOf(card1.card.suit) >
      ORDERED_CARD_SUIT.indexOf(card2.card.suit)
    ) {
      return 1
    } else return -1
  }

  const compareIfSkipRound = (card1, card2, comparisonValue) => {
    if (card1.skipRound && !card2.skipRound) {
      return -1
    } else if (!card1.skipRound && card2.skipRound) {
      return 1
    }
    return comparisonValue
  }

  const sortCards = (playerCards) => {
    //sort by value and by suit
    playerCards.sort((card1, card2) => {
      if (card1.card.value > card2.card.value) {
        return compareIfSkipRound(card1, card2, 1)
      } else if (card1.card.value < card2.card.value) {
        return compareIfSkipRound(card1, card2, -1)
      } else {
        const comparisonSuitValue = compareCardSuit(card1, card2)
        return compareIfSkipRound(card1, card2, comparisonSuitValue)
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
