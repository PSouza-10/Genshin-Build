import React, { useState, useContext, useEffect } from 'react'

import { ItemsContext } from '../../ItemsContext'
import { StatContext } from '../../StatContext'
import {
  Container,
  Brand,
  ShareIcon,
  ShareModal,
  Overlay,
  ModalContent,
  CloseIcon,
  CopyLink,
  DownloadJson,
  ChooseApp
} from './styles'

import { generateLink } from './shareFunctions'
export function Header() {
  const [shareModal, setShareModal] = useState(false)
  const { totalAtk } = useContext(StatContext)
  const { selectedItems } = useContext(ItemsContext)
  const [link, setLink] = useState(window.location.href)
  const [linkState, setLinkState] = useState('Copy Link')
  const handleShareModal = () => {
    setShareModal(!shareModal)
    generateLink(selectedItems)
  }
  useEffect(() => {
    setLink(generateLink(selectedItems))
  }, [selectedItems])

  const copyLink = () => {
    let copyText = document.getElementById('link')
    copyText.select()
    document.execCommand('copy')
    setLinkState('Link Copied!')
    setTimeout(() => {
      setLinkState('Copy Link')
    }, 4000)
    setShareModal(false)
  }

  const downloadFile = () => {
    var dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(selectedItems))
    var dlAnchorElem = document.getElementById('downloadAnchorElem')
    dlAnchorElem.setAttribute('href', dataStr)
    dlAnchorElem.setAttribute('download', `${totalAtk}ATK-build.json`)
    dlAnchorElem.click()
    setShareModal(false)
  }

  const selectApp = () => {
    if (navigator.share) {
      const character = selectedItems.character
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
  return (
    <>
      <Container>
        <Brand>Genshin Character Builder</Brand>
        <span className='iconWrapper' title='Share your build'>
          <ShareIcon
            className='icon'
            title='Share your build'
            onClick={handleShareModal}
          />
        </span>
        <Overlay visible={shareModal} onClick={handleShareModal} />
      </Container>
      <ShareModal open={shareModal}>
        <ModalContent className='modalContent'>
          <div className='modalHeader'>
            <h1 className='modalTitle'>Share Your Build</h1>

            <CloseIcon onClick={handleShareModal} />
          </div>
          <div className='modalBody'>
            <div className='shareOption' name='chooseApp' onClick={selectApp}>
              <ChooseApp className='icon' />
              <h3>Choose App</h3>
            </div>
            <div className='shareOption' name='copyLink' onClick={copyLink}>
              <CopyLink className='icon' />
              <h3>{linkState}</h3>
              <input id='link' value={link} />
            </div>
            <div className='shareOption' name='download' onClick={downloadFile}>
              <DownloadJson className='icon' />
              <h3>Download file</h3>
              <a id='downloadAnchorElem' href='/#' style={{ display: 'none' }}>
                {link}
              </a>
            </div>
          </div>
        </ModalContent>
      </ShareModal>
    </>
  )
}
