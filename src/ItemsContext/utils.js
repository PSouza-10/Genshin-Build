export function findItem(slot, id, data) {
  let arr = []
  console.log(slot)
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
  console.log(arr)

  return arr.find(item => item.id === id)
}
