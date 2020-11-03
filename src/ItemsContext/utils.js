export function findItem(slot, id, data) {
  let arr = []

  switch (slot) {
    case 'weapon':
      arr = data.weapons
      break
    case 'character':
      arr = data.characters
      break
    default:
      arr = data.artifacts
  }

  return arr.find(item => item.id === id)
}

export function formatSlot(slot = '') {
  return slot.toLowerCase().split(' ')[0]
}
