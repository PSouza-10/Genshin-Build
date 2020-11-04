import { FaStar } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
import styled, { css } from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--bgSecondary);
  flex: 1;
  transition: width 0.3s ease;

  ${({ isItemView, displayed }) =>
    isItemView &&
    css`
      /* visibility: ${displayed ? 'visible' : 'hidden'}; */
      z-index: 5;
      width: ${displayed ? `30%` : '0'};
      position: fixed;
      right: 0;
      bottom: 0;
      top:0;
    
      overflow: hidden;
      z-index: 15;
      height: 100%;
      
      @media (max-width: 576px) {
        width: ${displayed ? `100%` : '0'};
      }
    }
    `}

  h1.title {
    text-align: center;
    font-weight: 600;
    font-size: 1.6rem;
    padding: 10px 0;
  }

  span.layoutControl {
    background-color: var(--bgPrimary);
    font-size: 1.6rem;

    position: relative;
    p {
      width: 100%;
      text-align: center;
      font-weight: 560;
      padding: 5px 0;
    }
  }
  @media (max-width: 576px) {
    ${({ isItemView }) =>
      !isItemView &&
      css`
        z-index: 5;
        position: sticky;
        bottom: 0;
        height: 70px;
      `}
  }
`

export const ItemImage = styled.div`
  flex-basis: 33%;
  max-height: 200px;
  max-width: 100%;
  text-align: center;
  img {
    max-height: 200px;
    max-width: 100%;
  }
`
export const MainStat = styled.span`
  padding: 12px 12px;
  margin: 12px 12px;
  background-color: var(--bgPrimary);
  font-size: 1.4rem;
  font-weight: 550;
`
export const ItemInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.6rem;
  padding: 12px 12px;
`

export const StarIcon = styled(FaStar)`
  fill: yellow;
  height: 24px;
  width: 24px;
`

export const ArrowIcon = styled(MdClose)`
  fill: var(--primary);
  height: 100%;
  position: absolute;
  left: 0;
  width: 47px;
  cursor: pointer;
  transition: all 0.4s ease;
  &:hover {
    background-color: var(--primary);
    fill: var(--bgPrimary);
  }
`
export const SelectButton = styled.button`
  height: auto;
  width: 100%;
  text-align: center;
  padding: 15px 0;
  font-size: 15pt;
  background-color: transparent;
  margin-top: auto;
  transition: all 0.2s ease;
  &:focus {
    background-color: var(--primary);
    color: var(--bgSecondary);
  }
`
