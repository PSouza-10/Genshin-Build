import React from 'react'
import { MainStat } from '../styles'
export default function WeaponView({ itemInfo, data, item }) {
  return (
    <>
      <a href={item.pageUrl} className='title'>
        {item.name}
      </a>
      <MainStat>{itemInfo.mainStat}</MainStat>
      <MainStat>{`${itemInfo.secondaryType} ${itemInfo.subStat}`}</MainStat>

      {item.passive !== 'None' && (
        <>
          <h3 className='passiveName'>{item.passive}</h3>
          <p className='passiveDescription'>{data.passives[item.passive]}</p>
        </>
      )}
    </>
  )
}
