import styled, {css} from "styled-components";

export const ButtonStyle = css`
  font-family: 'Courier New', monospace;
  border: 0;
  cursor: pointer;
  padding: 5px 15px;
  border-radius: 5px;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  ${props => props.white && !props.outline && css`
    background-color: #fff;
    color: #000;
  `}
  ${props => props.white && props.outline && css`
    background-color: transparent;
    color: #fff;
    border: 1px solid #fff;
    &:hover {
      background-color: #fff;
      color: #000;
    }
  `}
  ${props => props.primary && css`
    background-color: #8f5cf7;
    border: 1px solid #8f5cf7;
    color: #fff;
    &:hover {
      background-color: transparent;
    }
  `}
  ${props => props.size === 'l' && css`
    font-size: 1.2rem;
    padding: 10px 20px;
    svg {
      height: 20px;
      margin-right: 10px;
    }
  `}
`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;


export default function Button({children, ...rest}) {
    return (
        <StyledButton {...rest}>{children}</StyledButton>
    );
}