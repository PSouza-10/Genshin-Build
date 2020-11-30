import { VERSION } from '../../meta'

export function generateLink(selectedItems, talentLevel) {
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

  let buildString = []

  buildItems.forEach(({ id, level, type, upgrade }) => {
    let itemStr = []

    let idStr = `${type[0]}-${id}`
    itemStr.push(idStr)

    itemStr.push(`l-${level}`)
    itemStr.push(`u-${upgrade}`)

    buildString.push(itemStr.join('.'))
  })

  const joinedString = buildString.join('~') + `~T-${talentLevel}`

  return window.location.href.split('?b=')[0] + '?b=' + joinedString
}

export function copyLink() {
  let copyText = document.getElementById('link')
  copyText.select()
  document.execCommand('copy')
}

export function downloadFile(
  selectedItems,
  artifactStats,
  totalAtk,
  talentLevel
) {
  let charName = selectedItems.character.id ? selectedItems.character.name : ''
  var dataStr =
    'data:text/json;charset=utf-8,' +
    encodeURIComponent(
      JSON.stringify({
        selectedItems,
        artifactStats,
        talentLevel,
        version: VERSION
      })
    )
  var dlAnchorElem = document.getElementById('downloadAnchorElem')
  dlAnchorElem.setAttribute('href', dataStr)
  dlAnchorElem.setAttribute(
    'download',
    `${charName || ''}${totalAtk}DMG-build.json`
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
