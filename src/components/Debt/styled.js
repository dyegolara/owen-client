import styled from "styled-components";

export const Debt = styled.li`
  padding: 2rem 0;
  margin: 0 1rem;
  &:not(:last-child) {
    border-bottom: 1px solid black;
  }
`;

export default { Debt };
