import styled, { css } from 'styled-components'
import { Character, Artifacts, Weapons } from '../../assets/icons'

import { FaFilter } from 'react-icons/fa'

export const Container = styled.div`
  display: flex;
  max-height: 40%;
  flex-basis: 40%;
`

export const NavContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
`

export const NavItem = styled.li`
  padding: 15px 15px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    ${({ selected }) =>
      !selected
        ? css`
            fill: white;
          `
        : null}
  }
  ${({ selected }) =>
    selected
      ? css`
          background-color: var(--primary);
          fill: var(--bgSecondary);
          font-weight: 600;
        `
      : css`
          background-color: var(--bgSecondary);
          fill: var(--primary);
        `}
`

export const Items = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  .itemTable {
    display: flex;
    flex-wrap: wrap;
    padding: 3px 15px;

    align-items: flex-start;
    align-content: flex-start;
    overflow-y: auto;
    min-height: 0;
  }

  .itemTable::-webkit-scrollbar-thumb {
    background-color: var(--primary);
    opacity: 0.2;
    border-radius: 1em;
  }
  .itemTable::-webkit-scrollbar {
    background-color: transparent;
  }
`

const iconCSS = css`
  height: 30px;
  width: 30px;
  fill: inherit;
`
export const CharacterIcon = styled(Character)`
  ${iconCSS}
`
export const WeaponsIcon = styled(Weapons)`
  ${iconCSS}
`
export const ArtifactsIcon = styled(Artifacts)`
  ${iconCSS}
`
export const FilterIcon = styled(FaFilter)`
  cursor: pointer;
  fill: var(--primary);
  flex-shrink: 0;
  height: 22px;
  width: 20px;
  margin-left: auto;
  margin-right: 6px;
  &:hover {
    fill: var(--icon);
  }
`
export const SearchContainer = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 15px;
  margin-top: 12px;
  flex-basis: 10%;
  max-height: 10%;
`

export const SearchBar = styled.input`
  border-radius: 1em;
  padding: 2.5px 15px;
  flex: 0.9;
  background-color: transparent;
  border: 1px solid var(--outline);
  &:hover {
    border-color: var(--primary);
  }

  &:focus {
    border-color: var(--primary);
    border-width: 2px;
    background-color: var(--bgSecondary);
  }

  ::placeholder {
    color: var(--primary);
    opacity: 0.7;
  }
  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
  }
`
