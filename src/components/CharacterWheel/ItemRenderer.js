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
  IconButton,
  AscensionStar
} from './styles'
export default function ItemRenderer({
  isArtifact,
  slotType,
  isMaxLevel,
  handleLevel,
  handleUpgrade,
  item
}) {
  const {
    image,
    name,
    type,
    level,
    stars,
    ascension,
    maxLevel,
    minRarity,
    maxRarity
  } = item
  const { handleSelectItem, handleItemDisplay } = useContext(ItemsContext)
  const [inputLevel, setLevel] = useState(level)
  const onChange = val => setLevel(parseInt(val))
  const checkLevel = () => {
    if (inputLevel >= 1 && inputLevel <= maxLevel) {
      handleLevel(inputLevel)
    } else {
      setLevel(level)
    }
  }
  const itemSlot = type ? type.toLowerCase().split(' ')[0] : ''
  const displayItem = () => {
    if (itemSlot) {
      handleItemDisplay(itemSlot)
    }
  }
  const removeItem = () => {
    handleSelectItem(item, itemSlot)
  }
  const placeholderIcon = {
    character: <CharactersIcon />,
    weapon: <WeaponsIcon />,
    artifact: <ArtifactsIcon />
  }
  useEffect(() => {
    setLevel(level)
  }, [level, setLevel])

  const upgradeLevel = isArtifact ? stars : ascension
  const minUpgrade = isArtifact ? minRarity : 0
  const maxUpgrade = isArtifact ? maxRarity : 7
  return (
    <ItemSlot stars={stars}>
      <span className='stars'>
        <Icon
          negative
          onClick={() => handleUpgrade('minus')}
          disabled={upgradeLevel === minUpgrade}
        />
        <span className='text'>
          {isArtifact ? <StarIcon /> : <AscensionStar />} {upgradeLevel}
        </span>
        <Icon
          onClick={() => handleUpgrade('plus')}
          disabled={upgradeLevel === maxUpgrade}
        />
      </span>
      <span
        className='imgWrapper'
        title={name}
        onDoubleClick={removeItem}
        onClick={displayItem}>
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
