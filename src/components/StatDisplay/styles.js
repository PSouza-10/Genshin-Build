import { FaStar } from 'react-icons/fa'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--bgSecondary);
  width: 100%;

  h1.title {
    text-align: center;
    font-weight: 600;
    font-size: 1.6rem;
    padding: 10px 0;
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
