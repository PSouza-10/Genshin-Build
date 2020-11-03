import React, { useContext } from 'react'
import { Container, MainStat } from './styles'
import { ItemsContext } from '../../ItemsContext'
import ItemView from './ItemView'
import { StatContext } from '../../StatContext'

export function StatDisplay() {
  const { selectedItems, displayedItem, setDisplayed } = useContext(
    ItemsContext
  )

  const stats = useContext(StatContext)
  const { characterAtk } = stats
  return (
    <>
      <ItemView
        item={displayedItem === 'stats' ? {} : selectedItems[displayedItem]}
        stats={stats}
        displayedItem={displayedItem}
        setDisplayed={setDisplayed}
      />
      <Container>
        <MainStat>Character ATK {characterAtk}</MainStat>
      </Container>
    </>
  )
}
