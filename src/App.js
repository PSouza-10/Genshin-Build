import React from 'react'
import styled from 'styled-components'
import { Header, ItemPicker, CharacterWheel, StatDisplay } from './components'
import FilterProvider from './components/ItemPicker/FilterContext'
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
  }
  .charWheel {
    display: flex;
    flex-basis: 60%;
    align-items: stretch;
    position: relative;
    box-shadow: 0 0 4px #000 inset;
  }
`

function App() {
  return (
    <>
      <Header />
      <Container>
        <div className='left'>
          <FilterProvider>
            <ItemPicker />
          </FilterProvider>
          <CharacterWheel />
        </div>
        <div className='right'>
          <StatDisplay />
        </div>
      </Container>
    </>
  )
}

export default App
