import weapons from './weapons.json'
import characters from './characters.json'
import artifacts from './artifacts.json'

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

    items[slotStr] = item
  })

  return items
}
