import styled, { css } from "styled-components";

type Props = {
  isFluid?: boolean;
  isWidescreen?: boolean;
  isFullhd?: boolean;
};

// Checar en bulma los breakpoints y el compilado para container
const Container = styled.div`
  margin: 0 auto;
  position: relative;

  @media screen and (min-width: 1088px) {
    max-width: 960px;
    width: 960px;
    ${({ isFluid }: Props) =>
      isFluid &&
      css`
        margin-left: 64px;
        margin-right: 64px;
        max-width: none;
        width: auto;
      `}
  }

  @media screen and (max-width: 1279px) {
    ${({ isWidescreen }: Props) =>
      isWidescreen &&
      css`
        max-width: 1152px;
        width: auto;
      `}
  }

  @media screen and (max-width: 1471px) {
    ${({ isFullhd }: Props) =>
      isFullhd &&
      css`
        max-width: 1344px;
        width: auto;
      `}
  }

  @media screen and (min-width: 1280px) {
    max-width: 1152px;
    width: 1152px;
  }

  @media screen and (min-width: 1472px) {
    max-width: 1344px;
    width: 1344px;
  }
`;

export default Container;
