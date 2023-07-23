const playersSetup = () => {
  /**
   * @param {string} player takes in player name and updat the list of players
   */
  const getAllPlayers = (player, initialPlayerList) => {
    initialPlayerList.push(player)
    return initialPlayerList
  }

  /**
   * @param {number} playerNum takes in max number of player allowed
   * @param {number} maxPlayers changes the max players
   * @return {void}
   */
  const setMaxPlayers = (playerNum) => {
    return parseInt(playerNum)
  }

  return {
    getAllPlayers,
    setMaxPlayers,
  }
}
