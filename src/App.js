import React from 'react'
import styled from 'styled-components'
import { Header, ItemPicker, CharacterWheel, StatDisplay } from './components'
import FilterProvider from './components/ItemPicker/FilterContext'
const Container = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - 50px);
  max-height: calc(100% - 50px);
  overflow-x: hidden;
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

        <StatDisplay />
      </Container>
    </>
  )
}

export default App
