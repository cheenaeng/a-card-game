const scoreBoardSetup = () => {
  const createInitialScoreBoard = (players, initialScoreboard) => {
    for (let i = 0; i < players.length; i++) {
      initialScoreboard[players[i]] = 0
    }
    return initialScoreboard
  }

  const tallyScore = (playerCards, scoreBoard) => {
    if (playerCards.length === 0) {
      return
    }

    const secondHighestCardIdx = playerCards.length - 2
    const highestCardIdx = playerCards.length - 1
    const highestCard = playerCards[highestCardIdx]
    const secondHighestCard = playerCards[secondHighestCardIdx]

    if (highestCard.skipRound) {
      return
    }

    if (
      highestCard.card.value === secondHighestCard.card.value &&
      highestCard.card.suit === secondHighestCard.card.suit
    ) {
      scoreBoard[highestCard.player] += 1
      scoreBoard[secondHighestCard.player] += 1
      return
    }

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
