import React from 'react';
import styled from 'styled-components';

const Card: React.FC = ({ children }) => <StyledCard>{children}</StyledCard>;

const StyledCard = styled.div`
  background-color: #53475f; //${(props) => props.theme.color.grey[800]};
  color: #d151de !important;
  display: flex;
  flex: 1;
  flex-direction: column;
  border-bottom-left-radius: 40px;
  border-top-right-radius: 40px;
`;

export default Card;
