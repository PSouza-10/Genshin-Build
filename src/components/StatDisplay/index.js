import React, { useContext } from 'react'
import { Container, MainStat } from './styles'
import { ItemsContext } from '../../ItemsContext'
import ItemView from './ItemView'
import { StatContext } from '../../StatContext'

export function StatDisplay() {
  const { selectedItems, displayedItem, setDisplayed, view } = useContext(
    ItemsContext
  )
  const stats = useContext(StatContext)

  const {
    characterAtk,
    weaponAtk,
    artifactsAtk,
    totalAtkPerc,
    totalAtk
  } = stats
  const items = {
    ...selectedItems,
    view
  }
  return (
    <>
      <ItemView
        item={displayedItem === 'stats' ? {} : items[displayedItem]}
        stats={stats}
        displayedItem={displayedItem}
        setDisplayed={setDisplayed}
      />
      <Container>
        <MainStat>Total ATK {totalAtk}</MainStat>
        <MainStat>Character ATK {characterAtk}</MainStat>
        <MainStat>Weapon ATK {weaponAtk.main}</MainStat>
        <MainStat>Flat ATK Bonus {artifactsAtk.plume.main}</MainStat>
        <MainStat>Total ATK% Bonus {totalAtkPerc}%</MainStat>
      </Container>
    </>
  )
}
