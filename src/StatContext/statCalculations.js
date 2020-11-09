import data from '../ItemsContext/data.json'
import weaponTypes from '../ItemsContext/weaponTypes.json'
const { artifactIncreases } = data

export function calculateDamage(atkPower, talentMultiplier) {
  return Math.round(atkPower * (talentMultiplier / 100))
}

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

export function calculateArtifactStats(
  { stars = 0, slot, level },
  mainType = 'ATK%'
) {
  const { mult, base } = artifactIncreases[stars.toString()][mainType]

  let increase = level * (base * mult)
  let newMain = base
  let newSub = []

  if (level > 0) {
    if (['Plume of Death', 'Flower of Life'].includes(slot)) {
      newMain = Math.ceil(base + increase)
    } else {
      newMain = parseFloat(
        (Math.round((base + increase) * 100) / 100).toFixed(1)
      )
    }
  }

  return { newMain, newSub }
}

export function calculateWeaponStats({
  level,
  baseAtk = 0,
  ascension,
  secondaryBase
}) {
  const { ascensionBonus, increasesPerLevel } = weaponTypes[baseAtk.toString()]

  const levelsOfAscension = [1, 20, 40, 50, 60, 70, 80]

  const totalAscensionBonus = ascension === 0 ? 0 : ascension * ascensionBonus
  let totalAtkIncrease = 0
  let newSubStatValue = 0
  if (level === 1) return { main: baseAtk, sub: secondaryBase }
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
    if ([25, 50, 75].includes(level)) {
      let multiplier = [25, 50, 75].findIndex(el => el === level) + 2

      newSubStatValue = multiplier * secondaryBase
    } else {
      const percentualIncrease = 0.2 * secondaryBase
      const increase = Math.floor(level / 5) * percentualIncrease
      newSubStatValue = secondaryBase + increase
    }
  }
  let main = Math.ceil(baseAtk + totalAtkIncrease + totalAscensionBonus)
  return {
    main,
    sub: newSubStatValue
  }
}

export const createNewArtifacts = (artifactsAtk, selected) => {
  let newArtifacts = Object.assign({}, artifactsAtk)
  let selectedCopy = Object.assign({}, selected)
  let { character, weapon, ...artifacts } = selectedCopy
  selectedCopy = artifacts
  Object.keys(selectedCopy).map(key => {
    if (selectedCopy[key].id) {
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
        const { newMain, newSub } = calculateArtifactStats(
          selectedCopy[key],
          newArtifacts[key].mainType
        )

        newArtifacts = {
          ...newArtifacts,
          [key]: {
            ...newArtifacts[key],
            level,
            upgrade: stars,
            id,
            main: newMain,
            sub: newSub,
            mainType: newArtifacts[key].mainType
          }
        }
      }
    } else {
      const { level, stars } = selectedCopy[key]
      newArtifacts = {
        ...newArtifacts,
        [key]: {
          level,
          upgrade: stars,
          main: 0,
          sub: [],
          mainType: newArtifacts[key].mainType
        }
      }
    }
    return null
  })
  return newArtifacts
}
