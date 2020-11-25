import React from 'react'
import { MainStat } from '../styles'
import { MdKeyboardArrowRight, MdClose } from 'react-icons/md'
import { Modal, Overlay, Stat, StatTableColumn } from './styles'

function AllStats({ stats, element }) {
  const [statModal, setStatModal] = React.useState(false)
  const handleAllStatsModal = () => {
    setStatModal(!statModal)
  }

  return (
    <>
      <MainStat onClick={handleAllStatsModal} clickable>
        <span>All Stats</span>
        <MdKeyboardArrowRight />
      </MainStat>
      <Overlay visible={statModal} onClick={handleAllStatsModal} />
      <Modal open={statModal}>
        <div className='header'>
          <h1>Stats</h1>
          <MdClose onClick={handleAllStatsModal} />
        </div>
        <div className='body'>
          <StatTable stats={stats} element={element} />
        </div>
      </Modal>
    </>
  )
}
function StatRow({
  value,
  name,
  even = false,
  isBase = false,
  increaseVal = 0,
  element
}) {
  const displayValue = name.includes('%')
    ? value.toFixed(1) + '%'
    : Math.round(isBase ? value - increaseVal : value)
  const displayName = name.includes('%') ? name.replace('%', '') : name

  return (
    <Stat even={even}>
      <span>
        {displayName === 'Elemental DMG'
          ? displayName.replace('Elemental', element)
          : displayName}
      </span>
      <span className='value'>
        <h4 className='total'>{displayValue}</h4>
        {isBase && (
          <h4 className='increase'>
            {' +' + (isBase && Math.round(increaseVal))}
          </h4>
        )}
      </span>
    </Stat>
  )
}
function StatTable({ stats, element }) {
  const keys = [...Object.keys(stats)]
  const blackList = ['ATK%', 'DEF%', 'HP%', 'DMG%']

  return (
    <StatTableColumn>
      {keys.map(
        (key, index) =>
          !blackList.includes(key) &&
          !key.includes('Bonus') && (
            <StatRow
              value={stats[key]}
              name={key}
              even={index % 2 === 0}
              isBase={blackList.includes(key + '%')}
              increaseVal={stats[key + 'Bonus']}
              element={element}
              key={key}
            />
          )
      )}
    </StatTableColumn>
  )
}

export default AllStats
