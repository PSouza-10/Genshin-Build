import React, { useState } from 'react'
import {
  Container,
  UploadIcon,
  SelectFileModal,
  Overlay,
  ModalContent,
  CloseIcon,
  CloseArrow
} from './styles'

export default function LoadFile() {
  const [modalOpen, setOpen] = useState(false)
  const [fileData, setData] = useState({})
  const [fileName, setFileName] = useState('Select')
  const handleModal = () => {
    setOpen(!modalOpen)
  }

  const handleChange = ({ target }) => {
    const files = target.files
    if (files.lenght <= 0) return false
    const fileReader = new FileReader()
    fileReader.onload = e => {
      const result = JSON.parse(e.target.result)
      setData(result)
    }
    fileReader.readAsText(files.item(0))

    const name = files[0].name

    setFileName(name.length > 8 ? name.substring(0, 8) + '..' : name)
  }
  const handleUpload = () => {
    console.log(fileData)
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
                <input type='file' onChange={handleChange} accept='*' />
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
