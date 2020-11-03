export function calculateAtkPower({
  flower,
  plume,
  sands,
  goblet,
  circlet,
  weapon,
  character
}) {}

export function calculateCharacterAtk({
  level,
  baseAtk,
  ascensionBonus,
  increasesPerLevel,
  ascension
}) {
  const levelsOfAscension = [1, 20, 40, 50, 60, 70, 80, 90]

  const totalAscensionBonus = ascension === 0 ? 0 : ascension * ascensionBonus
  let totalAtkIncrease = 0

  if (level === 1) return baseAtk
  else {
    for (let i = ascension; i >= 0; i--) {
      let levelDiff = 0
      if (i === ascension) {
        levelDiff = level - levelsOfAscension[i]
        console.log(levelDiff)
        totalAtkIncrease +=
          levelDiff * increasesPerLevel[levelsOfAscension[i].toString()]
      } else {
        console.log(levelsOfAscension[i])
        levelDiff = i > 0 ? levelsOfAscension[i] - levelsOfAscension[i - 1] : 19
        totalAtkIncrease +=
          levelDiff *
          increasesPerLevel[levelsOfAscension[i > 0 ? i - 1 : 0].toString()]
      }
    }
  }

  return Math.floor(baseAtk + totalAtkIncrease + totalAscensionBonus)
}
