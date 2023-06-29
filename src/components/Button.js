import { highlight, primary, red, redHighlight } from "@/lib/colours";
import styled, {css} from "styled-components";

export const ButtonStyle = css`
  border: 0;
  cursor: pointer;
  padding: 5px 15px;
  border-radius: 5px;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  font-family: 'Courier New', monospace;
  ${props => props.white && !props.outline && css`
    background-color: #fff;
    color: #000;
  `}
  ${props => props.block && css`
    display: block;
    width: 100%;
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
  ${props => props.primary && !props.outline && css`
    background-color: ${primary}; 
    border: 1px solid ${primary};
    color: #fff;
    &:hover {
      background-color: transparent;
    }
  `}
  ${props => props.red && props.outline && css`
    background-color: ${red}; 
    border: 1px solid ${red};
    color: #fff;
    &:hover {
      background-color: ${redHighlight};
    }
    svg {
      height: 18px;
      margin-right: 5px;
    }
  `}
  ${props => props.primary && props.outline && css`
    background-color: ${primary}; 
    border: 1px solid ${primary};
    color: #fff;
    &:hover {
      background-color: ${highlight};
    }
  `}
  ${props => props.black && props.outline && css`
    background-color: #222;
    border: 1px solid #222;
    color: #fff;
    font-weight: bold;
    &:hover {
      background-color: ${primary};
      color: #fff;
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
  ${props => props.size === 'm' && css`
    padding: 5px 15px;
    svg {
      height: 20px;
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