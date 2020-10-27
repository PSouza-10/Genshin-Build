import React from 'react'
import styled from 'styled-components'
import { Header, ItemPicker, CharacterWheel } from './components'
import FilterProvider from './components/ItemPicker/FilterContext'
const Container = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - 50px);
  .left {
    flex-basis: 70%;
    display: flex;
    flex-direction: column;
  }
  .charWheel {
    display: flex;
    flex: 1;
    align-items: stretch;
    box-shadow: 0 0 4px #000 inset;
    position: relative;
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
      </Container>
    </>
  )
}

export default App
