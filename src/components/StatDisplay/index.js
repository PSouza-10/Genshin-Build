import React, { useContext } from 'react'
import { Container, MainStat } from './styles'
import { ItemsContext } from '../../ItemsContext'
import ItemView from './ItemView'

export function StatDisplay() {
  const {
    selectedItems,
    displayedItem,
    calculatedStats,
    setDisplayed
  } = useContext(ItemsContext)

  const { characterAtk } = calculatedStats
  return (
    <>
      <ItemView
        item={displayedItem === 'stats' ? {} : selectedItems[displayedItem]}
        stats={calculatedStats}
        displayedItem={displayedItem}
        setDisplayed={setDisplayed}
      />
      <Container>
        <MainStat>Character ATK {characterAtk}</MainStat>
      </Container>
    </>
  )
}
