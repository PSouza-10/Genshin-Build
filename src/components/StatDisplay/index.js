import React, { useContext, useState } from 'react'
import {
  Container,
  MainStat,
  Descriptions,
  DescriptionContainer
} from './styles'
import { ItemsContext } from '../../ItemsContext'
import ItemView from './ItemView'
import { StatContext } from '../../StatContext'
import DamageModal from './DamageModal'
import { MdKeyboardArrowRight } from 'react-icons/md'
import AllStats from './AllStatsModal'

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
    weaponStats,
    calculatedStats,
    damage,
    enemy,
    handleEnemy,
    setBonusDescriptions
  } = stats
  const items = {
    ...selectedItems,
    view
  }
  return (
    <>
      <DamageModal
        enemyLevel={enemy}
        setEnemyLevel={handleEnemy}
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
            Damage {damage.normal} | Enemy Lvl. {enemy.level}
          </span>
          <MdKeyboardArrowRight className='icon' />
        </MainStat>
        <MainStat onClick={handleDamageModal} clickable>
          <span>Crit Damage {damage.crit}</span>
          <MdKeyboardArrowRight className='icon' />
        </MainStat>
        <MainStat>Total ATK {Math.round(calculatedStats.ATK)}</MainStat>
        <MainStat>
          Character ATK {characterStats.ATK} | Talent Lvl.{talentLevel}
        </MainStat>
        <MainStat>Weapon ATK {weaponStats.main}</MainStat>
        <AllStats
          stats={calculatedStats}
          element={selectedItems.character.element}
        />
        <SetBonuses descriptions={setBonusDescriptions} />
      </Container>
    </>
  )
}

const SetBonuses = ({ descriptions = [] }) => {
  return (
    <Descriptions>
      {descriptions.map(({ name, equiped, 4: piece4, 2: piece2 }) => (
        <DescriptionContainer key={name}>
          <h4>
            {name}({equiped})
          </h4>
          {piece2 && (
            <p>
              <span>2 piece bonus: </span> {piece2}
            </p>
          )}
          {piece4 && (
            <p>
              <span>4 piece bonus: </span> {piece4}
            </p>
          )}
        </DescriptionContainer>
      ))}
    </Descriptions>
  )
}
