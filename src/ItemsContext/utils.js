import weapons from './weapons.json'
import characters from './characters.json'
import artifacts from './artifacts.json'
import artifactSets from './artifactSets.json'

export function findItem(type, id) {
  let arr = []

  switch (type) {
    case 'Weapon':
      arr = weapons
      break
    case 'Character':
      arr = characters
      break
    case 'Artifact':
      arr = artifacts
      break
    default:
      arr = artifacts
  }

  return arr[parseInt(id) - 1]
}

export function formatSlot(slot = '') {
  return slot.toLowerCase().split(' ')[0]
}

export function findItems(string = '') {
  const strArr = string.split('~')
  const correspondingType = {
    W: 'Weapon',
    A: 'Artifact',
    C: 'Character'
  }
  let items = {}
  strArr.forEach(itemStr => {
    let id = itemStr.split('.')[0].split('-')[1]

    let type = correspondingType[itemStr[0]]

    let item = findItem(type, id)

    let slotStr = ''
    if (item.type === 'Artifact') {
      slotStr = item.slot.toLowerCase().split(' ')[0]
    } else {
      slotStr = item.type.toLowerCase().split(' ')[0]
    }
    let level = itemStr.split('.')[1].split('-')[1]
    item = {
      ...item,
      level: parseInt(level)
    }
    const isArtifact = item.type === 'Artifact'
    item[isArtifact ? 'stars' : 'ascension'] = parseInt(
      itemStr.split('.')[2].split('-')[1]
    )
    const ascensionMaxLevelTable = [20, 40, 50, 60, 70, 80, 90]
    const artifactMaxLevelTable = [4, 4, 12, 16, 20]
    item.maxLevel = isArtifact
      ? artifactMaxLevelTable[item.stars - 1]
      : ascensionMaxLevelTable[item.ascension]

    if (item.type === 'Artifact') {
      let { minRarity, maxRarity } = artifactSets[item.set]
      item.minRarity = minRarity
      item.maxRarity = maxRarity
    }
    items[slotStr] = item
  })

  return items
}

export function selectedItemsFactory(item, slot, selectedItems, initialState) {
  const selected = selectedItems[slot]
  if (item.type === 'Artifact') {
    const { minRarity, maxRarity } = initialState.data.artifactSets[item.set]
    const currentLevel = selected.level
    const currentStars =
      selected.stars > maxRarity || selected.stars < minRarity
        ? minRarity
        : selected.stars || minRarity
    const maxLevel = currentStars > 2 ? currentStars * 4 : 4

    const newItems = {
      ...selectedItems,
      [slot]: {
        ...selected,
        ...item,
        stars: currentStars,
        maxLevel: maxLevel,
        level: currentLevel > maxLevel ? maxLevel : currentLevel,
        minRarity,
        maxRarity
      }
    }

    return { result: 200, payload: newItems }
  } else {
    if (
      (selectedItems.character.id && slot === 'weapon') ||
      (selectedItems.weapon.id && slot === 'character')
    ) {
      const attemptedCombinations = {
        character: {
          attempted: item.weapon,
          current: selectedItems.weapon.category
        },
        weapon: {
          attempted: item.category,
          current: selectedItems.character.weapon
        }
      }

      const { attempted, current } = attemptedCombinations[slot]

      if (attempted !== current) {
        const message = {
          character: `${current}s cannot be equiped by ${item.name}`,
          weapon: `${selectedItems.character.name} cannot equip ${attempted}s`
        }
        return { result: 300, payload: message[slot] }
      }
    }

    const ascensionTable = [20, 40, 50, 60, 70, 80, 90]

    const currentLevel = selected.level
    const currentAscension = selected.ascension || 0

    const newItems = {
      ...selectedItems,
      [slot]: {
        ...selected,
        ...item,
        level: currentLevel || 1,
        ascension: currentAscension,
        maxLevel: ascensionTable[currentAscension]
      }
    }

    return { result: 200, payload: newItems }
  }
}
