import styled from 'styled-components';

const StyledDebt = styled.li`
  padding: 2rem 0;
  margin: 0 1rem;
  &:not(:last-child){
    border-bottom: 1px solid black;
  }
`;

export default StyledDebt;
