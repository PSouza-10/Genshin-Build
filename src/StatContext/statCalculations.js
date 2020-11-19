import data from '../ItemsContext/data.json'
import weaponTypes from '../ItemsContext/weaponTypes.json'
const { artifactIncreases } = data

export function calculateDamage(stats, talentLevel, character, enemyLevel) {
  let talentAtkMult =
    ((character.talentBase || 0) *
      data.talentLevelMultipliers[talentLevel - 1]) /
    100

  let normalDMG =
    stats.ATK *
    talentAtkMult *
    ((100 + character.level) / (200 + character.level + enemyLevel))

  if (character.weapon === 'Catalyst') {
    normalDMG *= 1 + stats['Elemental DMG%'] / 100
  } else {
    normalDMG *= 1 + stats['Physical DMG%'] / 100
  }

  let critDMG = normalDMG * (1 + stats['CRIT DMG%'] / 100)

  return {
    normal: Math.round(normalDMG),
    crit: Math.round(critDMG)
  }
}

export function calculateStats(characterStats, weaponAtk, artifactStats) {
  const baseStats = {
    ATK: characterStats.ATK + weaponAtk.main,
    DEF: characterStats.DEF,
    HP: characterStats.HP
  }

  let baseStatObj = Object.assign({}, baseStats)

  const totalBonus = calculateTotalBonus(
    artifactStats,
    weaponAtk,
    characterStats
  )

  const baseStatKeys = ['ATK', 'HP', 'DEF']
  let increases = {
    ATK: 0,
    HP: 0,
    DEF: 0
  }
  baseStatKeys.forEach(key => {
    const perc = key + '%'

    increases[key] += totalBonus[key]
    increases[key] += (totalBonus[perc] / 100) * baseStats[key]

    baseStatObj[key] += increases[key]
  })
  let newStats = {
    ATK: baseStatObj.ATK,
    DEF: baseStatObj.DEF,
    HP: baseStatObj.HP,
    ATKBonus: increases.ATK,
    DEFBonus: increases.DEF,
    HPBonus: increases.HP
  }

  for (const key in totalBonus) {
    if (!baseStatKeys.includes(key)) {
      newStats[key] = totalBonus[key]
    }
  }
  console.log(newStats)

  return newStats
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
    'CRIT Rate%': 5,
    'CRIT DMG%': 50,
    ATK: 0,
    DEF: 0,
    'Elemental Mastery': 0,
    'Energy Recharge%': 100,
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

export function calculateTotalBonus(artifactsAtk, weapon, characterStats) {
  let statBonus = {
    ATK: 0,
    DEF: 0,
    HP: 0,
    'ATK%': 0,
    'DEF%': 0,
    'HP%': 0,
    'Elemental Mastery': 0,
    'Energy Recharge%': 0,
    'CRIT Rate%': 0,
    'CRIT DMG%': 0,
    'Elemental DMG%': 0,
    'Physical DMG%': 0,
    'Healing Bonus%': 0
  }

  const stats = [...Object.keys(statBonus)]

  Object.keys(artifactsAtk).forEach(key => {
    const { id, mainType, main, sub } = artifactsAtk[key]
    if (id) {
      if (stats.includes(mainType)) {
        statBonus[mainType] += main
      }

      sub.forEach(({ type, value }) => {
        if (stats.includes(type)) {
          statBonus[type] += value
        }
      })
    }
  })

  if (stats.includes(weapon.subType)) {
    stats[weapon.subType] += weapon.sub
  }

  for (const key in characterStats) {
    if (!['ATK', 'HP', 'DEF'].includes(key)) {
      statBonus[key] += characterStats[key]
    }
  }
  return statBonus
}

export function calculateTotalAtkPerc(artifacts, weaponAtk, characterStats) {
  let total = 0
  const artifactsAtkCopy = Object.assign({}, artifacts)
  Object.keys(artifactsAtkCopy).forEach(key => {
    if (artifactsAtkCopy[key].mainType === 'ATK%') {
      total += artifactsAtkCopy[key].main
    }

    artifactsAtkCopy[key].sub.forEach(({ type, value }) => {
      if (type === 'ATK%') {
        total += value
      }
    })
  })

  if (weaponAtk.subType === 'ATK%') {
    total += weaponAtk.sub
  }

  if (characterStats['ATK%']) {
    total += characterStats['ATK%']
  }

  return (Math.round(total * 100) / 100).toFixed(1)
}
