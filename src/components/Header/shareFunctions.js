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

    let idStr = `${type[0]}-${id}`
    itemStr.push(idStr)

    itemStr.push(`l-${level}`)
    itemStr.push(`u-${upgrade}`)

    buildString.push(itemStr.join('.'))
    return itemStr
  })
  const joinedString = buildString.join('~')
  localStorage.setItem('buildStr', joinedString)
  return window.location.href.split('?b=')[0] + '?b=' + joinedString
}

export function copyLink() {
  let copyText = document.getElementById('link')
  copyText.select()
  document.execCommand('copy')
}

export function downloadFile(selectedItems, totalAtk) {
  let charName = selectedItems.character.id ? selectedItems.character.name : ''
  var dataStr =
    'data:text/json;charset=utf-8,' +
    encodeURIComponent(JSON.stringify(selectedItems))
  var dlAnchorElem = document.getElementById('downloadAnchorElem')
  dlAnchorElem.setAttribute('href', dataStr)
  dlAnchorElem.setAttribute(
    'download',
    `${charName || ''}${totalAtk}ATK-build.json`
  )
  dlAnchorElem.click()
}

export function selectApp(link, character, totalAtk) {
  if (navigator.share) {
    const text = `My ${totalAtk} DMG ${
      character.id ? character.name : ''
    } Build`
    navigator.share({
      title: document.title,
      url: link,
      text: text
    })
  } else {
    alert('Browser/device does not support sharing, link was copied instead.')
    copyLink()
  }
}
