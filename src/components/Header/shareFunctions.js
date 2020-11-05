export function generateLink(selectedItems) {
  const { ...items } = selectedItems

  let buildItems = []
  for (let key in items) {
    const { id, type, level, ascension, slot, stars } = items[key]

    if (id) {
      if (['Character', 'Weapon'].includes(type)) {
        buildItems.push({ id, type, level, upgrade: ascension })
      } else {
        buildItems.push({ id, type, slot, level, upgrade: stars })
      }
    }
  }
  if (buildItems.length === 0) return window.location.href
  let buildString = []

  buildItems.map(({ id, level, type, upgrade, slot }) => {
    let itemStr = []

    let idStr
    if (type === 'Artifact') {
      idStr = `${type[0]}${slot[0]}-${id}`
    } else {
      idStr = `${type[0]}-${id}`
    }

    itemStr.push(idStr)

    itemStr.push(`l-${level}`)
    itemStr.push(`u-${upgrade}`)

    buildString.push(itemStr.join('.'))
    return itemStr
  })

  return window.location.href + '?b=' + buildString.join('~')
}
