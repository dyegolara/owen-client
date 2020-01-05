import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { desktopWidth } from "styles/variables";

export const Item = styled(Link)`
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin: 0.25rem;
  text-decoration: none;
  border-radius: 5px;
  ${({ active }) =>
    active &&
    css`
      background-color: rgba(grey, 0.2);
    `}

  &:hover {
    color: grey;
  }

  @media (min-width: ${desktopWidth}) {
    flex: 0 1 auto;
    flex-direction: row;
    justify-content: flex-start;
    height: 3rem;
    margin: 0.5rem;
    padding-left: 1rem;
    font-size: 1.5rem;
  }
`;

export const Label = styled.span`
  font-size: 0.75rem;
  @media (min-width: ${desktopWidth}) {
    margin-left: 1rem;
    font-size: 0.875rem;
  }
`;

export default { Item };
