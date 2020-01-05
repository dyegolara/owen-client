import styled from 'styled-components';
import {
  desktopWidth,
  menuHeight,
  menuWidth,
} from 'styles/variables';

export const Menu = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 2;
  display: flex;
  grid-area: menu;
  justify-content: space-between;
  width: 100%;
  height: ${menuHeight};
  box-shadow: 0 -2px 6px rgba(grey, 0.5);

  @media (min-width: ${desktopWidth}) {
    flex-direction: column;
    justify-content: flex-start;
    max-width: ${menuWidth};
    height: 100%;
`;

export default { Menu };
