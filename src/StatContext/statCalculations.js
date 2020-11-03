import data from '../ItemsContext/data.json'
const { artifactIncreases } = data
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
  const levelsOfAscension = [1, 20, 40, 50, 60, 70, 80]

  const totalAscensionBonus = ascension === 0 ? 0 : ascension * ascensionBonus
  let totalAtkIncrease = 0

  if (level === 1) return baseAtk
  else {
    for (let i = ascension; i >= 0; i--) {
      let levelDiff = 0
      if (i === ascension) {
        levelDiff = level - levelsOfAscension[i]

        totalAtkIncrease +=
          levelDiff * increasesPerLevel[levelsOfAscension[i].toString()]
      } else {
        levelDiff = i > 0 ? levelsOfAscension[i] - levelsOfAscension[i - 1] : 19
        totalAtkIncrease +=
          levelDiff *
          increasesPerLevel[levelsOfAscension[i > 0 ? i - 1 : 0].toString()]
      }
    }
  }

  return Math.floor(baseAtk + totalAtkIncrease + totalAscensionBonus)
}

export function calculateArtifactStats({ stars = 0, slot, level }) {
  const { atkMult, atkPercMult, baseAtk, baseAtkPerc } = artifactIncreases[
    stars.toString()
  ]
  let increase = 0
  let newMain = slot === 'Plume of Death' ? baseAtk : baseAtkPerc
  let newSub = []

  if (level > 0) {
    if (slot === 'Plume of Death') {
      increase = level * (baseAtk * atkMult)
      newMain = Math.ceil(baseAtk + increase)
    } else {
      increase = level * (baseAtkPerc * atkPercMult)
      newMain = (Math.round((baseAtkPerc + increase) * 100) / 100).toFixed(1)
    }
  }

  return { newMain, newSub }
}
