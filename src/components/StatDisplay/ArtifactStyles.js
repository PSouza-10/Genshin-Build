import styled, { css } from 'styled-components'
import { MdClose, MdKeyboardArrowDown } from 'react-icons/md'
import { FaPlus } from 'react-icons/fa'

export const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  font-size: 1.4rem;
  z-index: 7;
  margin: 12px 12px;
`

export const ArrowIcon = styled(MdKeyboardArrowDown)`
  fill: inherit;
  transition: transform 0.2s ease;
  ${({ open }) =>
    open &&
    css`
      transform: rotate(180deg);
    `}
`
export const Bar = styled.div`
  position: relative;
  z-index: 7;
  display: flex;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 12px 12px;
  cursor: pointer;
  justify-content: space-between;
  align-items: center;
  background-color: var(--bgPrimary);

  font-weight: 550;

  .close {
    display: flex;
    fill: var(--primary);
    align-items: center;
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
      fill: white;
    }
  }
`
export const Items = styled.ul`
  visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
  max-height: ${({ open }) => (open ? '250px' : '0')};
  overflow: ${({ open }) => (open ? 'scroll' : 'hidden')};
  color: ${({ open }) => (open ? 'var(--primary)' : 'rgba(0,0,0,0)')};
  transition: all 0.3s ease;
  background-color: var(--bgPrimary);
  position: absolute;
  top: 55px;
  left: 0;
  right: 0;
  z-index: 6;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const Item = styled.li`
  padding: 5px 0;
  padding-left: 20px;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: var(--bgSecondary);
  }

  ${({ selected }) =>
    selected &&
    css`
      font-weight: 560;
      background-color: var(--primary);
      color: var(--bgSecondary);
      &:hover {
        font-weight: 560;
        background-color: var(--primary);
        color: var(--bgSecondary);
      }
    `}
`
export const SubStatsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 32px;
`
export const SubStatDropdown = styled.div`
  position: relative;
  color: white;
  .selected {
    z-index: 6;
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    background-color: var(--bgPrimary);
    padding: 6px 0;
    padding-left: 8px;
    fill: var(--primary);
    .dropdownControl {
      display: flex;
      align-items: center;
      fill: var(--primary);
      cursor: pointer;
      flex: 1;
    }
    .value {
      font-size: 1.2rem;
      flex-basis: 20%;
      font-weight: 550;
    }
    .buttons {
      display: flex;
      flex-direction: column;
    }
  }

  .statList {
    list-style: none;

    position: absolute;
    z-index: 7;
    left: 0;
    right: 0;
    top: 39px;
    height: ${({ open }) => (open ? '225px' : '0')};
    visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
    overflow: ${({ open }) => (open ? 'scroll' : 'hidden')};
    transition: all 0.3s ease;

    display: flex;
    flex-direction: column;
    background-color: var(--bgPrimary);
    &::-webkit-scrollbar {
      display: none;
    }
  }
`
export const Stat = styled.li`
  height: 25px;
  padding: 3px;
  font-size: 1rem;
  padding-left: 20px;
  transition: all 0.1s ease;
  cursor: pointer;
  &:hover {
    background-color: var(--primary);
    font-weight: 560;
    color: var(--bgPrimary);
  }
`

export const PlusIcon = styled(FaPlus)`
  fill: inherit;
`
export const AddStatButton = styled.button`
  border-radius: 50%;
  background-color: var(--primary);
  fill: var(--bgSecondary);
  cursor: pointer;
  padding: 3px;
  display: flex;
  align-self: center;
  margin-left: 6px;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
  svg {
    width: 12px;
    height: 12px;
  }
  &:hover {
    background-color: var(--positive);
  }
  ${({ disabled }) =>
    disabled &&
    css`
      filter: brightness(60%);
      &:hover {
        background-color: var(--primary);
      }
    `}
`
export const DeleteStat = styled(MdClose)`
  fill: var(--primary);
  height: 26px;
  width: 26px;
  position: absolute;
  right: -30px;
  top: 6px;
  cursor: pointer;
  transition: fill 0.1s ease;

  &:hover {
    fill: var(--negative);
  }
`
