export function returnNewSubStats(
  action,
  currentStats,
  newStat,
  subStatIndex = 0
) {
  let newSubStats = []
  switch (action) {
    case 'add':
      newSubStats = [...currentStats, newStat]
      return newSubStats

    case 'remove':
      newSubStats = currentStats.filter((stat, index) => index !== subStatIndex)
      return newSubStats

    case 'edit':
      newSubStats = [...currentStats]
      newSubStats[subStatIndex] = newStat
      return newSubStats
    default:
      return []
  }
}

export function generateInitialArtifactState(selectedItems = {}) {
  const { character, view, weapon, ...artifacts } = selectedItems

  let returnObj = {}
  const initialStatMap = {
    flower: 'HP',
    plume: 'ATK'
  }
  Object.keys(artifacts).forEach(key => {
    const { id, level, stars } = artifacts[key]

    const mainType = Object.keys(initialStatMap).includes(key)
      ? initialStatMap[key]
      : 'ATK%'
    returnObj[key] = {
      id,
      level,
      upgrade: stars,
      main: 0,
      sub: [],
      mainType
    }
  })

  return returnObj
}
