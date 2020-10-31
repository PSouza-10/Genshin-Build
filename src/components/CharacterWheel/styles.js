import { FaStar, FaTrash } from 'react-icons/fa'
import styled, { css } from 'styled-components'
import { Character, Artifacts, Weapons, Star } from '../../assets/icons'

export const Container = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  flex-direction: column;
  background-color: var(--bgSecondary);
  flex: 1;
  ${({ RightColumn }) =>
    RightColumn &&
    css`
      flex: 0.3;
      align-items: center;
      justify-content: center;
      flex-basis: 10%;
    `}
`

export const ItemRow = styled.div`
  display: flex;
  justify-content: ${({ justify }) => justify};
  padding: 6px 75px;
  align-items: center;
  flex-basis: 33%;
  max-height: 33%;
`
export const ItemSlot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100px;
  border-radius: 0.5em;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.6);

  .imgWrapper {
    background-color: ${({ stars }) => `var(--stars${stars})`};
    text-align: center;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  .Lvl,
  .stars {
    padding: 1px 2px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .itemName {
    text-align: center;
    font-size: 12px;
  }
  .text {
    display: flex;
    align-items: center;
  }
  .LvlEdit {
    background-color: transparent;
    border: none;
    width: 25px;
    text-align: center;
  }
`
export const IconButton = styled.button`
  border-radius: 50%;
  background-color: var(--primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
  svg {
    fill: var(--outline);
    height: 12px;
    width: 12px;
  }
  padding: 3px;

  &:active {
    background-color: white;
  }

  &:hover {
    background-color: ${({ negative }) =>
      negative ? 'var(--negative)' : 'var(--positive)'};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      filter: brightness(50%);
      &:active {
        background-color: var(--primary);
      }

      &:hover {
        background-color: var(--primary);
      }
    `}
`
export const StarIcon = styled(FaStar)`
  fill: yellow;
`
export const AscensionStar = styled(Star)`
  fill: white;
  height: 16px;
  width: 16px;
  transform: translateX(-3px);
`
export const ClearIcon = styled(FaTrash)`
  fill: var(--primary);
  width: 30px;
  height: 30px;
  cursor: pointer;
  position: absolute;
  top: 12px;
  left: 12px;
  &:hover {
    fill: var(--negative);
  }
  transition: background-color 0.2s ease;
`
export const Image = styled.img`
  width: 45px;
  height: 47px;
`

const placeholderIconCSS = css`
  fill: white;
  height: 47px;
  width: 45px;
  &:hover {
    fill: var(--primary);
  }
`

export const ArtifactsIcon = styled(Artifacts)`
  ${placeholderIconCSS}
`
export const CharactersIcon = styled(Character)`
  ${placeholderIconCSS}
`
export const WeaponsIcon = styled(Weapons)`
  ${placeholderIconCSS}
`
