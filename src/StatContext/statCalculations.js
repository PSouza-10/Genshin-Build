import data from '../ItemsContext/data.json'
import weaponTypes from '../ItemsContext/weaponTypes.json'
const { artifactIncreases } = data

export function calculateDamage(
  atkPower,
  talentMultiplier,
  artifactsAtk,
  weaponType,
  weaponAtk,
  characterLevel,
  enemyLevel
) {
  const { subType, sub } = weaponAtk

  let elBonus = 0
  let physBonus = subType === 'Physical DMG Bonus' ? sub / 100 : 0
  let critMult = 0.5
  Object.keys(artifactsAtk).forEach(artKey => {
    if ('Elemental DMG%' === artifactsAtk[artKey].mainType) {
      elBonus += artifactsAtk[artKey].main / 100
    } else if ('Physical DMG%' === artifactsAtk[artKey].mainType) {
      physBonus += artifactsAtk[artKey].main / 100
    }

    if ('CRIT DMG%' === artifactsAtk[artKey].mainType) {
      critMult += artifactsAtk[artKey].main / 100
    }

    artifactsAtk[artKey].sub
      .filter(({ type }) => type === 'CRIT DMG%')
      .forEach(({ value }) => {
        critMult += value / 100
      })
  })

  let normalDMG =
    atkPower *
    (talentMultiplier / 100) *
    ((100 + characterLevel) / (200 + characterLevel + enemyLevel))

  if (weaponType === 'Catalyst') {
    normalDMG *= 1 + elBonus
  } else {
    normalDMG *= 1 + physBonus
  }

  let critDMG = normalDMG * (1 + critMult)

  return {
    normal: Math.round(normalDMG),
    crit: Math.round(critDMG)
  }
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
  levelATKIncrease,
  ascension,
  rarity,
  name
}) {
  const levelsOfAscension = [1, 20, 40, 50, 60, 70, 80]
  const stars = parseInt(rarity)
  const ascensionBonuses = {
    small:
      stars === 5 && name !== 'Traveler'
        ? Math.ceil(0.55 * baseAtk)
        : Math.ceil(0.55 * baseAtk),
    big:
      stars === 5 && name !== 'Traveler'
        ? Math.floor(0.85 * baseAtk)
        : Math.floor(0.75 * baseAtk)
  }

  let totalAscensionBonus = 0
  levelsOfAscension.forEach((lvl, index) => {
    if (index > 0 && index <= ascension) {
      if (lvl < 60) {
        totalAscensionBonus +=
          index % 2 > 0 ? ascensionBonuses.big : ascensionBonuses.small
      } else {
        console.log('level ' + lvl)
        console.log('fixed ' + ascensionBonuses.small)

        totalAscensionBonus += ascensionBonuses.small
      }
    }
  })

  let totalAtkIncrease = 0
  if (level === 1) return baseAtk
  else {
    totalAtkIncrease = levelATKIncrease * (level - 1)
  }

  return Math.floor(baseAtk + totalAtkIncrease + totalAscensionBonus)
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

export function calculateTotalAtkPerc(artifacts, weaponAtk) {
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

  return (Math.round(total * 100) / 100).toFixed(1)
}
