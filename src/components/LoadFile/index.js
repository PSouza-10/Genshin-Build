import React, { useContext, useState } from 'react'
import {
  Container,
  UploadIcon,
  SelectFileModal,
  Overlay,
  ModalContent,
  CloseIcon,
  CloseArrow
} from './styles'
import { ItemsContext } from '../../ItemsContext'
import { MessageContext } from '../../MessageContext'
export default function LoadFile() {
  const [modalOpen, setOpen] = useState(false)
  const [fileData, setData] = useState({})
  const [fileName, setFileName] = useState('Select')
  const { selectItem } = useContext(ItemsContext)
  const { sendMessage } = useContext(MessageContext)
  const { setArtifactAtk } = useContext(MessageContext)
  const handleModal = () => {
    document.body.style.overflow = !modalOpen ? 'hidden' : 'initial'
    setOpen(!modalOpen)
  }

  const handleChange = ({ target }) => {
    const files = target.files

    if (files.lenght <= 0) return false
    if (files[0].type === 'application/json') {
      const fileReader = new FileReader()
      fileReader.onload = e => {
        const result = JSON.parse(e.target.result)
        setData(result)
      }

      fileReader.readAsText(files.item(0))

      const name = files[0].name
      setFileName(name.length > 8 ? name.substring(0, 8) + '..' : name)
    } else {
      sendMessage('Invalid File', 'Warning', 'Warning')
    }
  }
  const handleUpload = () => {
    selectItem(fileData.selectedItems)
    setArtifactAtk(fileData.artifactsAtk)
  }

  return (
    <>
      <Overlay visible={modalOpen} onClick={handleModal} />
      <Container
        selected={modalOpen}
        onClick={() => !modalOpen && handleModal()}>
        <UploadIcon />
        <SelectFileModal open={modalOpen}>
          <ModalContent className='modalContent'>
            <div className='modalHeader'>
              <span>Select file</span>
              <CloseIcon onClick={handleModal} />
            </div>
            <div className='modalBody'>
              <label>
                {fileName}
                <input
                  type='file'
                  onChange={handleChange}
                  accept='application/JSON'
                />
              </label>
              <button onClick={handleUpload} disabled={fileName === 'Select'}>
                Upload
              </button>
            </div>
            <div className='closeArrow' onClick={handleModal}>
              <CloseArrow />
            </div>
          </ModalContent>
        </SelectFileModal>
      </Container>
    </>
  )
}
