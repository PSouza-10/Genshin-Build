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

import {
  generateLink,
  copyLink,
  selectApp,
  downloadFile
} from './shareFunctions'
import Help from './Help'

export function Header() {
  const [shareModal, setShareModal] = useState(false)
  const [helpModal, setHelpModal] = useState(false)
  const { damage, artifactsAtk } = useContext(StatContext)
  const { selectedItems, didMount } = useContext(ItemsContext)
  const [link, setLink] = useState(window.location.href)
  const [linkState, setLinkState] = useState('Copy Link')
  const handleShareModal = () => {
    document.body.style.overflow = !shareModal ? 'hidden' : 'initial'
    setShareModal(!shareModal)
    generateLink(selectedItems)
  }
  const handleHelpModal = () => {
    document.body.style.overflow = !helpModal ? 'hidden' : 'initial'
    setHelpModal(!helpModal)
  }
  useEffect(() => {
    if (didMount()) {
      setLink(generateLink(selectedItems))
    }
  }, [selectedItems, didMount])

  return (
    <>
      <Container>
        <Brand>Genshin Build Planner</Brand>
        <Help toggle={handleHelpModal} state={helpModal} />
        <span className='iconWrapper' title='Share your build'>
          <ShareIcon
            className='icon'
            title='Share your build'
            onClick={handleShareModal}
          />
        </span>
      </Container>
      <Overlay visible={shareModal || helpModal} onClick={handleShareModal} />
      <ShareModal open={shareModal}>
        <ModalContent className='modalContent'>
          <div className='modalHeader'>
            <h1 className='modalTitle'>Share Your Build</h1>

            <CloseIcon onClick={handleShareModal} />
          </div>
          <div className='modalBody'>
            <div
              className='shareOption'
              name='chooseApp'
              onClick={() =>
                selectApp(link, selectedItems.character, damage.normal)
              }>
              <ChooseApp className='icon' />
              <h3>Choose App</h3>
            </div>
            <div
              className='shareOption'
              name='copyLink'
              onClick={() => {
                copyLink(link)
                setLinkState('Link Copied!')
                setTimeout(() => {
                  setLinkState('Copy Link')
                }, 4000)
              }}>
              <CopyLink className='icon' />
              <h3>{linkState}</h3>
              <input id='link' value={link} readOnly />
            </div>
            <div
              className='shareOption'
              name='download'
              onClick={() =>
                downloadFile(selectedItems, artifactsAtk, damage.normal)
              }>
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
