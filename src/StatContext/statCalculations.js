import data from '../ItemsContext/data.json'
import weaponTypes from '../ItemsContext/weaponTypes.json'
const { artifactIncreases } = data

export function calculateAtkPower(
  characterAtk,
  weaponAtk,
  flatAtk,
  totalAtkPerc
) {
  const baseAtk = characterAtk + weaponAtk
  const percBonus = parseFloat(totalAtkPerc) / 100
  const basePercBonus = percBonus * baseAtk

  return Math.floor(baseAtk + basePercBonus + flatAtk)
}

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

  return Math.ceil(baseAtk + totalAtkIncrease + totalAscensionBonus)
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
      newMain = parseFloat(
        (Math.round((baseAtkPerc + increase) * 100) / 100).toFixed(1)
      )
    }
  }

  return { newMain, newSub }
}

export function calculateWeaponStats({ level, baseAtk = 0, ascension }) {
  const { ascensionBonus, increasesPerLevel } = weaponTypes[baseAtk.toString()]

  const levelsOfAscension = [1, 20, 40, 50, 60, 70, 80]

  const totalAscensionBonus = ascension === 0 ? 0 : ascension * ascensionBonus
  let totalAtkIncrease = 0

  if (level === 1) return { main: baseAtk, sub: 0 }
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
  let main = Math.ceil(baseAtk + totalAtkIncrease + totalAscensionBonus)
  return {
    main,
    sub: 0
  }
}

export const createNewArtifacts = (artifactsAtk, selected) => {
  let newArtifacts = Object.assign({}, artifactsAtk)
  let selectedCopy = Object.assign({}, selected)

  Object.keys(selectedCopy).map(key => {
    if (
      selectedCopy[key].id &&
      !['view', 'character', 'weapon'].includes(key)
    ) {
      const { level, stars, id } = selectedCopy[key]
      const {
        level: currentLevel,
        stars: currentStars,
        id: currentId
      } = newArtifacts[key]

      if (
        level !== currentLevel ||
        stars !== currentStars ||
        id !== currentId
      ) {
        const { newMain, newSub } = calculateArtifactStats(selectedCopy[key])

        newArtifacts = {
          ...newArtifacts,
          [key]: {
            ...newArtifacts[key],
            level,
            upgrade: stars,
            id,
            main: newMain,
            sub: newSub
          }
        }
      }
    }
    return null
  })
  return newArtifacts
}
