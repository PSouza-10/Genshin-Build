import data from '../ItemsContext/data.json'
import weaponTypes from '../ItemsContext/weaponTypes.json'
const { artifactIncreases } = data

export function calculateDamage(
  totalAtk,
  talentLevel,
  artifactsAtk,
  characterStats,
  weaponAtk,
  character,
  enemyLevel
) {
  console.log(arguments)

  let bonuses = {
    'CRIT DMG%': 0,
    'Physical DMG%': 0,
    'Elemental DMG%': 0
  }

  let bonusKeys = [...Object.keys(bonuses)]

  for (let key in characterStats) {
    if (bonusKeys.includes(key)) {
      bonuses[key] += characterStats[key] / 100
    }
  }

  const { subType, sub } = weaponAtk

  if (bonusKeys.includes(subType)) {
    bonuses[subType] += sub / 100
  }

  for (let key in artifactsAtk) {
    const { main, mainType, sub } = artifactsAtk[key]

    if (bonusKeys.includes(mainType)) {
      bonuses[mainType] += main / 100
    }

    sub
      .filter(({ type }) => type === 'CRIT DMG%')
      .forEach(({ value }) => {
        bonuses['CRIT DMG%'] += value / 100
      })
  }

  let talentAtkMult =
    ((character.talentBase || 0) *
      data.talentLevelMultipliers[talentLevel - 1]) /
    100

  let normalDMG =
    totalAtk *
    talentAtkMult *
    ((100 + character.level) / (200 + character.level + enemyLevel))

  if (character.weapon === 'Catalyst') {
    normalDMG *= 1 + bonuses['Elemental DMG%']
  } else {
    normalDMG *= 1 + bonuses['Physical DMG%']
  }

  let critDMG = normalDMG * (1 + bonuses['CRIT DMG%'])

  return {
    normal: Math.round(normalDMG),
    crit: Math.round(critDMG)
  }
}

export function calculateAtkPower(
  characterStats,
  weaponAtk,
  flatAtk,
  totalAtkPerc
) {
  const baseAtk = characterStats.ATK + weaponAtk
  const percBonus = parseFloat(totalAtkPerc) / 100
  const basePercBonus = percBonus * baseAtk

  return Math.floor(baseAtk + basePercBonus + flatAtk)
}

export function calculateCharacterStats({
  level,
  stats,
  ascension,
  rarity,
  name,
  bonusStat
}) {
  const levelsOfAscension = [1, 20, 40, 50, 60, 70, 80]
  const stars = parseInt(rarity)
  let newStats = {
    HP: 0,
    'CRIT Rate%': 0,
    'CRIT DMG%': 50,
    ATK: 0,
    DEF: 0,
    'Elemental Mastery': 0,
    'Energy Recharge': 0,
    'Elemental DMG%': 0,
    'Physical DMG%': 0
  }
  for (let key in stats) {
    const { base, lvlIncrease } = stats[key]

    const ascensionBonuses = {
      small:
        stars === 5 && name !== 'Traveler'
          ? Math.ceil(0.55 * base)
          : Math.ceil(0.55 * base),
      big:
        stars === 5 && name !== 'Traveler'
          ? Math.floor(0.85 * base)
          : Math.floor(0.75 * base)
    }

    let totalAscensionBonus = 0

    levelsOfAscension.forEach((lvl, index) => {
      if (index > 0 && index <= ascension) {
        if (lvl < 60) {
          totalAscensionBonus +=
            index % 2 > 0 ? ascensionBonuses.big : ascensionBonuses.small
        } else {
          totalAscensionBonus += ascensionBonuses.small
        }
      }
    })

    let totalIncrease = 0
    if (level === 1) {
      newStats[key] = base
    } else {
      totalIncrease = lvlIncrease * (level - 1)
      newStats[key] = Math.floor(base + totalAscensionBonus + totalIncrease)
    }
  }

  const { type, base } = bonusStat

  const bonusStatPerAscensionMultiplier = [0, 0, 1, 2, 2, 3, 4]
  let bonusStatValue = bonusStatPerAscensionMultiplier[ascension] * base

  newStats[type] = bonusStatValue

  return newStats
}

export function calculateArtifactStats(
  { stars = 0, slot, level },
  mainType = 'ATK%',
  currentSubStats
) {
  const { mult, base } = artifactIncreases[stars.toString()][mainType]

  let increase = level * (base * mult)
  let newMain = base
  let newSub = currentSubStats

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

  const totalAscensionBonus = ascension * ascensionBonus
  let totalAtkIncrease = 0
  let newSubStatValue = 0
  if (level === 1) return { main: baseAtk, sub: secondaryBase }
  else {
    totalAtkIncrease = increasesPerLevel['1'] * (level - 1)

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
          newArtifacts[key].mainType,
          newArtifacts[key].sub
        )

        newArtifacts = {
          ...newArtifacts,
          [key]: {
            ...newArtifacts[key],
            level,
            upgrade: stars,
            id,
            main: newMain,
            sub: newSub === [] ? newArtifacts[key].sub : newSub,
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
          sub: newArtifacts[key].sub,
          mainType: newArtifacts[key].mainType
        }
      }
    }
    return null
  })

  return newArtifacts
}

export function calculateTotalFlatATK(artifactsAtk) {
  let artifactsFlatATK = 0
  Object.keys(artifactsAtk).forEach(key => {
    let item = artifactsAtk[key]
    if (item.id) {
      if (key === 'plume') {
        artifactsFlatATK += item.main
      }

      item.sub.forEach(({ type, value }) => {
        if (type === 'ATK') {
          console.log(type)
          artifactsFlatATK += value
        }
      })
    }
  })
  return artifactsFlatATK
}

export function calculateTotalAtkPerc(artifacts, weaponAtk, characterStats) {
  let total = 0
  const artifactsAtkCopy = Object.assign({}, artifacts)
  Object.keys(artifactsAtkCopy).forEach(key => {
    if (
      !['plume', 'flower'].includes(key) &&
      artifactsAtkCopy[key].mainType === 'ATK%'
    ) {
      total += artifactsAtkCopy[key].main
    }

    artifactsAtkCopy[key].sub.forEach(({ type, value }) => {
      if (type === 'ATK%') {
        total += value
      }
    })
  })

  if (weaponAtk.subType === 'ATK') {
    total += weaponAtk.sub
  }

  if (characterStats['ATK%']) {
    total += characterStats['ATK%']
  }

  return (Math.round(total * 100) / 100).toFixed(1)
}
