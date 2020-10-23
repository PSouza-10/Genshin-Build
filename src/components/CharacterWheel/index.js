import React, { useContext, useState } from 'react'
import {
  Container,
  ItemRow,
  ItemSlot,
  Image,
  IconButton,
  StarIcon,
  ArtifactsIcon
} from './styles'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { ItemsContext } from '../../ItemsContext'

export function CharacterWheel() {
  const { selectedItems } = useContext(ItemsContext)

  return (
    <Container>
      <ItemRow justify='center'>
        <Item {...selectedItems.flower} />
      </ItemRow>
      <ItemRow justify='space-around'>
        <Item {...selectedItems.circlet} />
        <Item {...selectedItems.character} />
        <Item {...selectedItems.plume} />
      </ItemRow>
      <ItemRow justify='space-around'>
        <Item {...selectedItems.goblet} />
        <Item {...selectedItems.sands} />
      </ItemRow>
    </Container>
  )
}

const Item = ({ image, name = '', type }) => {
  const [level, setLevel] = useState(1)
  const [stars, setStars] = useState(1)
  const [maxLevel, setMaxLevel] = useState(4)

  const handleLevel = operation => {
    const newLevel = operation === 'plus' ? level + 1 : level - 1

    setLevel(newLevel)
  }
  const handleStars = operation => {
    const newStars = operation === 'plus' ? stars + 1 : stars - 1
    const newMaxLevel = newStars > 2 ? newStars * 4 : 4

    if (level > newMaxLevel) setLevel(newMaxLevel)
    setMaxLevel(newMaxLevel)
    setStars(newStars)
  }
  const isMaxLevel = level === maxLevel
  return (
    <ItemSlot stars={stars}>
      <span className='stars'>
        <Icon
          negative
          onClick={() => handleStars('minus')}
          disabled={stars === 1}
        />
        <span className='text'>
          <StarIcon /> {stars}
        </span>
        <Icon onClick={() => handleStars('plus')} disabled={stars === 5} />
      </span>
      <span className='imgWrapper'>
        {image ? <Image src={image} alt={name} /> : <ArtifactsIcon />}
      </span>
      <span className='Lvl'>
        <Icon
          negative
          onClick={() => handleLevel('minus')}
          disabled={level === 1}
        />
        <span className='text'>Lvl. {level}</span>
        <Icon onClick={() => handleLevel('plus')} disabled={isMaxLevel} />
      </span>
    </ItemSlot>
  )
}

const Icon = ({ negative = false, disabled = false, ...otherProps }) =>
  negative ? (
    <IconButton disabled={disabled} {...otherProps}>
      <FaMinus />
    </IconButton>
  ) : (
    <IconButton disabled={disabled} {...otherProps}>
      <FaPlus />
    </IconButton>
  )
