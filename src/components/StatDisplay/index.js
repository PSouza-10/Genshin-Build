import React, { useContext, useState } from 'react'
import { Container, MainStat } from './styles'
import { ItemsContext } from '../../ItemsContext'
import ItemView from './ItemView'
import { StatContext } from '../../StatContext'
import DamageModal from './DamageModal'
import { MdKeyboardArrowRight } from 'react-icons/md'
export function StatDisplay() {
  const {
    selectedItems,
    displayedItem,
    setDisplayed,
    view,
    talentLevel
  } = useContext(ItemsContext)
  const [damageModal, setDamageModal] = useState(false)
  const stats = useContext(StatContext)
  const handleDamageModal = () => {
    document.body.style.overflow = !damageModal ? 'hidden' : 'initial'
    setDamageModal(!damageModal)
  }
  const {
    characterStats,
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
          <span>
            Damage {damage.normal} | Enemy Lvl. {enemyLevel}
          </span>
          <MdKeyboardArrowRight />
        </MainStat>
        <MainStat onClick={handleDamageModal} clickable>
          <span>Crit Damage {damage.crit}</span>
          <MdKeyboardArrowRight />
        </MainStat>
        <MainStat>Total ATK {totalAtk}</MainStat>
        <MainStat>
          Character ATK {characterStats.ATK} | Talent Lvl.{talentLevel}
        </MainStat>
        <MainStat>Weapon ATK {weaponAtk.main}</MainStat>
        <MainStat>Flat ATK Bonus {flatAtkBonus}</MainStat>
        <MainStat>Total ATK% Bonus {totalAtkPerc}%</MainStat>
      </Container>
    </>
  )
}
