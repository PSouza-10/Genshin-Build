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

  let buildString = []

  buildItems.forEach(({ id, level, type, upgrade, slot }) => {
    let itemStr = []

    let idStr = `${type[0]}-${id}`
    itemStr.push(idStr) //https://genshin-build.netlify.app/?b=A-111.l-0.u-4~A-112.l-16.u-4~A-53.l-14.u-4~A-114.l-14.u-5~A-55.l-0.u-3~C-14.l-80.u-5~W-48.l-80.u-5

    itemStr.push(`l-${level}`)
    itemStr.push(`u-${upgrade}`)

    buildString.push(itemStr.join('.'))
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

export function downloadFile(selectedItems, artifactsAtk, totalAtk) {
  let charName = selectedItems.character.id ? selectedItems.character.name : ''
  var dataStr =
    'data:text/json;charset=utf-8,' +
    encodeURIComponent(JSON.stringify({ selectedItems, artifactsAtk }))
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
