import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import {
  Header,
  ItemPicker,
  CharacterWheel,
  StatDisplay,
  WarningMessage
} from './components'
import FilterProvider from './components/ItemPicker/FilterContext'

import { ItemsContext } from './ItemsContext'
import { StatContext } from './StatContext'

const Container = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - 50px);
  max-height: calc(100% - 50px);
  .left {
    flex-basis: 70%;
    display: flex;
    flex-direction: column;
    max-height: 100%;
  }
  .right {
    flex: 1;
    display: flex;
    align-items: stretch;
    position: relative;
  }
  .charWheel {
    display: flex;
    flex-basis: 60%;
    align-items: stretch;
    position: relative;
    box-shadow: 0 0 4px #000 inset;
  }

  @media (max-width: 576px) {
    flex-direction: column;

    .charWheel {
      flex-basis: 1;
    }
    .left {
      flex: 1;
    }
  }
`

function App() {
  const { dataFromUrl, selectItem, selectedItems, setTalent } = useContext(
    ItemsContext
  )
  const { setArtifactStats } = useContext(StatContext)

  useEffect(() => {
    const url = window.location.href
    const savedData = JSON.parse(localStorage.getItem('buildStr'))

    if (url.includes('/?b=')) {
      let param = url.split('/?b=')[1]
      dataFromUrl(param)
    } else if (savedData) {
      selectItem({
        ...selectedItems,
        ...savedData.selectedItems
      })
      setArtifactStats({
        ...savedData.artifactStats
      })
      if (savedData.talentLevel) {
        setTalent(savedData.talentLevel)
      }
    }
    //eslint-disable-next-line
  }, [])
  return (
    <>
      <WarningMessage />
      <Header />
      <Container>
        <div className='left'>
          <FilterProvider>
            <ItemPicker />
          </FilterProvider>
          <CharacterWheel />
        </div>
        <StatDisplay />
      </Container>
    </>
  )
}

export default App
