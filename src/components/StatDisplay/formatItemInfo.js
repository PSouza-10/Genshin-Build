export function formatViewMode(item, data) {
  const { type, element, category, slot, minRarity, maxRarity, stats } = item

  let newInfo = {}
  const displayCategory = {
    Character: `${element} (${item.weapon})`,
    Weapon: category,
    Artifact: slot
  }
  newInfo.category = displayCategory[type]

  if (type === 'Artifact') {
    const artifactStats = data.artifactIncreases[minRarity.toString()]
    newInfo.displayStars = `${minRarity}~${maxRarity}`
    if (slot === 'Plume of Death') {
      newInfo.mainStat = 'ATK ' + artifactStats['ATK'].base
    } else if (slot === 'Flower of Life') {
      newInfo.mainStat = 'HP ' + artifactStats['HP'].base
    } else {
      newInfo.mainStat = `ATK ${artifactStats['ATK%'].base} ~ ${
        data.artifactIncreases[maxRarity.toString()]['ATK%'].base
      }%`
    }
  } else if (type === 'Weapon') {
    newInfo.mainStat = 'ATK ' + item.baseAtk
    newInfo.displayStars = item.rarity
  } else if (type === 'Character') {
    newInfo.mainStat = 'ATK ' + stats.ATK.base
    newInfo.displayStars = item.rarity
  }

  if (type === 'Weapon') {
    const { secondaryStat, secondaryBase } = item
    newInfo.secondaryType = secondaryStat.replace('%', '')
    newInfo.subStat =
      secondaryStat === 'Elemental Mastery'
        ? Math.round(secondaryBase)
        : `${secondaryBase.toFixed(2)}%`
  }
  if (type === 'Character') {
    const { type: bonusType, base: bonusBase } = item.bonusStat

    newInfo.secondaryType = bonusType
    newInfo.subStat =
      bonusBase === 'Elemental Mastery' ? bonusBase : `${bonusBase.toFixed(2)}%`
  }
  return newInfo
}

export function formatEditMode(item, data, stats) {
  if (item.id) {
    const { type, stars, element, category, slot, rarity } = item
    const { characterStats, artifactStats, weaponStats } = stats

    let newInfo = {}

    const displayCategory = {
      Character: `${element} (${item.weapon})`,
      Weapon: category,
      Artifact: slot
    }

    newInfo.category = displayCategory[type]

    let slotKey = ''
    let statString = ''

    if (type === 'Artifact') {
      slotKey = slot.toLowerCase().split(' ')[0]
    }

    const correspondingStats = {
      Character: characterStats.ATK,
      Artifact: artifactStats[slotKey || 'flower'],
      Weapon: weaponStats.main
    }

    if (type === 'Artifact') {
      statString = `${correspondingStats[type].mainType} ${correspondingStats[type].main}`
      if (!['plume', 'flower'].includes(slotKey)) {
        statString = statString + ' %'
      }
    } else {
      statString = `ATK ${correspondingStats[type]}`
    }
    let subStats = []
    if (type === 'Artifact') {
      let artifactSubStats = correspondingStats[type].sub.map(stats => stats)

      artifactSubStats.forEach(({ type, value }) => {
        let valueString = '+' + type.replace('%', '') + ' ' + value.toString()
        if (type.includes('%')) {
          valueString = valueString + '%'
        }
        subStats.push(valueString)
      })
      newInfo.subStats = subStats
    }

    newInfo = {
      ...item,
      ...newInfo,
      mainStat: statString,
      displayStars: type === 'Artifact' ? stars : rarity
    }

    if (type === 'Weapon') {
      const { subType, sub } = weaponStats

      newInfo.secondaryType = subType.replace('%', '')

      newInfo.subStat =
        subType === 'Elemental Mastery' ? Math.round(sub) : `${sub.toFixed(2)}%`
    }

    return newInfo
  }
}
