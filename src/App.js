import React, { useContext } from 'react'
import styled from 'styled-components'
import { Header, ItemPicker, CharacterWheel } from './components'
import FilterProvider from './components/ItemPicker/FilterContext'
import { ItemsContext } from './ItemsContext'
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
  }
`
// const items = {
//   flower: {
//     name: "Gladiator's Flower",
//     image: GladiatorSet.GladiatorFlower,
//     set: "Gladiator's Finale"
//   },
//   plume: {
//     name: "Gladiator's Plume",
//     image: GladiatorSet.GladiatorPlume,
//     set: "Gladiator's Finale"
//   },
//   sands: {
//     name: "Gladiator's Sands",
//     image: GladiatorSet.GladiatorSands,
//     set: "Gladiator's Finale"
//   },
//   goblet: {
//     name: "Gladiator's Goblet",
//     image: GladiatorSet.GladiatorGoblet,
//     set: "Gladiator's Finale"
//   },
//   circlet: {
//     name: "Gladiator's Circlet",
//     image: GladiatorSet.GladiatorCirclet,
//     set: "Gladiator's Finale"
//   }
// }

function App() {
  const { data } = useContext(ItemsContext)

  return (
    <>
      <Header />
      <Container>
        <div className='left'>
          <FilterProvider>
            <ItemPicker />
          </FilterProvider>
          <CharacterWheel items={data.artifactSets["Gladiator's Finale"]} />
        </div>
      </Container>
    </>
  )
}

export default App
