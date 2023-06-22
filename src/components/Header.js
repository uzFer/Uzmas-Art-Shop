import Link from "next/link";
import styled, { css } from "styled-components";
import Center from "./Center";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import HamburgerIcon from "./icons/Hamburger";
import CloseIcon from "./icons/Close";


const StyledHeader = styled.header`
    background-color: #222;
`;

const Logo = styled(Link)`
    color: #fff;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    position: relative;
    z-index: 3;
    svg {
        height: 20px;
        margin-right: 10px;
    }
`; 

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    align-items: center;
`;

const StyledNav = styled.nav`
    ${props => props.show ? `
        display: block;
    ` : `
        display: none;
    `};
    transition: all 0.3s ease-in-out;
    gap: 20px;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 70px 20px 20px;
    background-color: #222;

    @media screen and (min-width: 768px) {
        display: flex;
        position: static;
        padding: 0;
    }
`;

const NavLink = styled(Link)` 
    color: #aaa;
    display: block;
    text-decoration: none;
    padding: 10px 0;
    &:hover {
        color: #9e9e9e;
    }
    @media screen and (min-width: 768px) {
        padding: 0;
    }
`;

const NavButton = styled.button`
    background-color: transparent;
    width: 40px;
    height: 40px;
    border: 0;
    color: white;
    cursor: pointer;
    position: relative;
    z-index: 3;
    @media screen and (min-width: 768px) {
        display: none;
    }
`;

export default function Header() {
    const {cartProducts} = useContext(CartContext);
    const [showNav, setShowNav] = useState(false);

    return (
        <StyledHeader>
            <Center>
                <Wrapper>
                    <Logo href={'/'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                        </svg>
                        Uzma&apos;s Art Shop
                    </Logo>
                    <StyledNav show={showNav}>
                        <NavLink href={'/'}>Home</NavLink>
                        <NavLink href={'/products'}>Paintings</NavLink>
                        <NavLink href={'/account'}>Account</NavLink>
                        <NavLink href={'/cart'}>Cart ({cartProducts.length})</NavLink>
                    </StyledNav> 
                    
                    <NavButton onClick={() => setShowNav(!showNav)}>
                        {showNav ? <CloseIcon /> : <HamburgerIcon />}
                    </NavButton>
                </Wrapper>
            </Center>
        </StyledHeader>
    );
}