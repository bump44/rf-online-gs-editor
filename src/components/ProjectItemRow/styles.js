import styled from 'styled-components';

export default styled.div`
  padding: 10px;
  height: 100%;
  border-bottom: 1px solid #ddd;
  position: relative;

  &:hover {
    background: #f1f1f1;
  }

  .field:not(:last-child) {
    margin-bottom: 5px;
  }
`;
