export function formatViewMode(item, data) {
  const { type, element, category, slot, minRarity, maxRarity } = item

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
      newInfo.baseAtk = artifactStats.baseAtk
    } else if (slot === 'Flower of Life') {
      newInfo.baseAtk = 0
    } else {
      newInfo.baseAtk = `${artifactStats.baseAtkPerc} ~ ${
        data.artifactIncreases[maxRarity.toString()].baseAtkPerc
      }%`
    }
  } else if (['Character', 'Weapon'].includes(type)) {
    newInfo.baseAtk = item.baseAtk
    newInfo.displayStars = item.rarity
  }

  return newInfo
}

export function formatEditMode(item, data, stats) {
  if (item.id) {
    const { type, stars, element, category, slot, rarity } = item
    const { characterAtk, artifactsAtk, weaponAtk } = stats

    let newInfo = {}

    const displayCategory = {
      Character: `${element} (${item.weapon})`,
      Weapon: category,
      Artifact: slot
    }
    let slotKey = ''
    let statString = ''
    if (type === 'Artifact') {
      slotKey = slot.toLowerCase().split(' ')[0]

      if (slot !== 'Plume of Death') {
        statString = ' %'
      }
    }

    const correspondingStats = {
      Character: characterAtk,
      Artifact: artifactsAtk[slotKey || 'flower'].main,
      Weapon: weaponAtk.main
    }
    newInfo = {
      ...item,
      baseAtk: correspondingStats[type] + statString,
      displayStars: type === 'Artifact' ? stars : rarity,
      category: displayCategory[type]
    }

    return newInfo
  }
}
