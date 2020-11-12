import React, { useContext, useState } from 'react'
import { Container, MainStat } from './styles'
import { ItemsContext } from '../../ItemsContext'
import ItemView from './ItemView'
import { StatContext } from '../../StatContext'
import DamageModal from './DamageModal'
export function StatDisplay() {
  const { selectedItems, displayedItem, setDisplayed, view } = useContext(
    ItemsContext
  )
  const [damageModal, setDamageModal] = useState(false)
  const stats = useContext(StatContext)
  const handleDamageModal = () => {
    setDamageModal(!damageModal)
  }
  const {
    characterAtk,
    weaponAtk,
    flatAtkBonus,
    totalAtkPerc,
    totalAtk,
    damage,
    enemyLevel,
    setEnemyLevel
  } = stats
  const items = {
    ...selectedItems,
    view
  }
  return (
    <>
      <DamageModal
        enemyLevel={enemyLevel}
        setEnemyLevel={setEnemyLevel}
        damage={damage}
        handleDamageModal={handleDamageModal}
        open={damageModal}
      />
      <ItemView
        item={displayedItem === 'stats' ? {} : items[displayedItem]}
        stats={stats}
        displayedItem={displayedItem}
        setDisplayed={setDisplayed}
      />
      <Container>
        <MainStat onClick={handleDamageModal} clickable>
          Damage {damage.normal}
        </MainStat>
        <MainStat onClick={handleDamageModal} clickable>
          Crit Damage {damage.crit}
        </MainStat>
        <MainStat>Total ATK {totalAtk}</MainStat>
        <MainStat>Character ATK {characterAtk}</MainStat>
        <MainStat>Weapon ATK {weaponAtk.main}</MainStat>
        <MainStat>Flat ATK Bonus {flatAtkBonus}</MainStat>
        <MainStat>Total ATK% Bonus {totalAtkPerc}%</MainStat>
      </Container>
    </>
  )
}
