import React, { useEffect, useState, useContext } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { ItemsContext } from '../../ItemsContext'
import {
  ItemSlot,
  Image,
  StarIcon,
  ArtifactsIcon,
  CharactersIcon,
  WeaponsIcon,
  IconButton
} from './styles'
export default function ItemRenderer({
  id,
  level,
  stars,
  name,
  isArtifact,
  image,
  slotType,
  maxLevel,
  isMaxLevel,
  handleLevel,
  handleStars,
  type,
  artifactRarity: { minRarity, maxRarity }
}) {
  const { handleSelectItem } = useContext(ItemsContext)
  const [inputLevel, setLevel] = useState(level)
  const onChange = val => setLevel(parseInt(val))
  const checkLevel = () => {
    console.log(inputLevel)
    if (inputLevel >= 1 && inputLevel <= maxLevel) {
      handleLevel(inputLevel)
    } else {
      setLevel(level)
    }
  }
  const itemSlot = type ? type.toLowerCase().split(' ')[0] : ''
  const removeItem = () => {
    handleSelectItem(id, itemSlot)
  }
  const placeholderIcon = {
    character: <CharactersIcon />,
    weapon: <WeaponsIcon />,
    artifact: <ArtifactsIcon />
  }
  useEffect(() => {
    setLevel(level)
  }, [level, setLevel])
  return (
    <ItemSlot stars={stars}>
      <span className='stars'>
        <Icon
          negative
          onClick={() => handleStars('minus')}
          disabled={stars === minRarity || !isArtifact}
        />
        <span className='text'>
          <StarIcon /> {stars}
        </span>
        <Icon
          onClick={() => handleStars('plus')}
          disabled={stars === maxRarity || !isArtifact}
        />
      </span>
      <span className='imgWrapper' title={name} onDoubleClick={removeItem}>
        {image ? <Image src={image} alt={name} /> : placeholderIcon[slotType]}
      </span>
      <span className='Lvl'>
        <Icon
          negative
          onClick={() => handleLevel('minus')}
          disabled={level === 1}
        />
        <span className='text'>
          Lvl.{' '}
          <input
            className='LvlEdit'
            value={inputLevel}
            onChange={({ target }) => onChange(target.value)}
            onBlur={checkLevel}
            type='number'
          />
        </span>
        <Icon onClick={() => handleLevel('plus')} disabled={isMaxLevel} />
      </span>
      <span className='itemName'>{name}</span>
    </ItemSlot>
  )
}

const Icon = ({ negative = false, disabled = false, ...otherProps }) =>
  negative ? (
    <IconButton negative disabled={disabled} {...otherProps}>
      <FaMinus />
    </IconButton>
  ) : (
    <IconButton disabled={disabled} {...otherProps}>
      <FaPlus />
    </IconButton>
  )
