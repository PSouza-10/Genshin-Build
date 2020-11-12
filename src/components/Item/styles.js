import styled, { css } from 'styled-components'
import { Anemo, Cryo, Geo, Electro, Hydro, Pyro } from '../../assets/icons'

export const Wrapper = styled.span`
  position: relative;
  z-index: 0;
  margin-right: 10px;
  cursor: pointer;
  height: 60px;
  width: 57px;
  ${({ selected }) =>
    selected
      ? css`
          background-color: var(--primary);
          &:hover {
            background-color: var(--primary);
            .elementIcon {
              opacity: 1;
            }
          }
        `
      : css`
          &:hover {
            background-color: rgba(255, 255, 255, 0.1);
            .elementIcon {
              opacity: 1;
            }
          }
        `}
`
export const Image = styled.img`
  z-index: 0;
  max-height: 100%;
  max-width: 100%;
  height: 100%;
  width: 100%;
`
export const elementIconCSS = css`
  width: 25px;
  height: 26px;
  opacity: 0.5;
  position: absolute;
  top: 0;
  left: 0;
`
export const elements = { Anemo, Cryo, Geo, Electro, Hydro, Pyro }
