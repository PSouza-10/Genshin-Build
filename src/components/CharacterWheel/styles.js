import { FaStar, FaTrash } from 'react-icons/fa'
import styled, { css } from 'styled-components'
import {
  Character,
  Weapons,
  Star,
  Circlet,
  Flower,
  Goblet,
  Plume,
  Sands
} from '../../assets/icons'
import React from 'react'

export const Message = styled.div`
  position: fixed;

  bottom: 30px;
  left: 30px;
  @media (max-width: 576px) {
    bottom: 2vh;
    left: 3vw;
    right: 3vw;
  }

  display: flex;
  flex-direction: column;
  font-size: 1.3rem;
  background-color: var(--bgPrimary);
  z-index: 999;
  padding: 20px 40px;

  h3 {
    text-align: center;
    max-width: 300px;
    word-wrap: normal;
  }

  div {
    display: flex;
    justify-content: space-between;
    padding: 15px 50px;

    button {
      transition: all 0.2s ease;
      border: 2px solid var(--primary);
      padding: 10px 25px;
      background-color: transparent;
      font-size: 1.2rem;
      cursor: pointer;
      &:hover {
        font-weight: 560;
        background-color: var(--primary);
        color: var(--bgPrimary);
      }
    }
  }
  transition: all 0.3s ease;
  ${({ open }) =>
    open
      ? css`
          visibility: visible;
          transform: translateY(0);
          opacity: 1;
        `
      : css`
          visibility: hidden;
          transform: translateY(150%);
          opacity: 0;
        `}
`

export const Container = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  flex-direction: column;
  background-color: var(--bgSecondary);
  flex: 1 0 90%;
  ${({ RightColumn }) =>
    RightColumn &&
    css`
      flex: 0.3 0 10%;
      align-items: center;
      justify-content: center;

      @media (max-width: 576px) {
        flex: 0.25 0 5%;
      }
    `}
  @media (max-width: 576px) {
    padding-bottom: 80px;
    flex: 1 0 95%;
  }
`

export const ItemRow = styled.div`
  display: flex;
  justify-content: ${({ justify }) => justify};
  padding: 6px 75px;
  align-items: center;
  flex: auto 0 33%;
  @media (max-width: 576px) {
    padding: 6px 6px;
  }
`
export const ItemSlot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100px;
  border-radius: 0.5em;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.6);
  @media (max-width: 576px) {
    width: 85px;
  }
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
  transition: fill 0.3s ease;
  &:hover {
    fill: var(--negative);
  }
`
export const Image = styled.img`
  width: 45px;
  height: 47px;
`

const placeholderIconCSS = css`
  fill: #fff;
  height: 47px;
  width: 45px;
  &:hover {
    fill: var(--primary);
  }
`

const FlowerIcon = styled(Flower)`
  ${placeholderIconCSS}
`
const PlumeIcon = styled(Plume)`
  ${placeholderIconCSS}
`
const SandsIcon = styled(Sands)`
  ${placeholderIconCSS}
`
const GobletIcon = styled(Goblet)`
  ${placeholderIconCSS}
`
const CircletIcon = styled(Circlet)`
  ${placeholderIconCSS}
`
const CharactersIcon = styled(Character)`
  ${placeholderIconCSS}
`
const WeaponsIcon = styled(Weapons)`
  ${placeholderIconCSS}
`

export const placeholderIcon = {
  character: <CharactersIcon />,
  weapon: <WeaponsIcon />,
  flower: <FlowerIcon />,
  goblet: <GobletIcon />,
  circlet: <CircletIcon />,
  plume: <PlumeIcon />,
  sands: <SandsIcon />
}
