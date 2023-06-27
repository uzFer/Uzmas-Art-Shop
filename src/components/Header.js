import Link from "next/link";
import styled, { css } from "styled-components";
import Center from "./Center";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import HamburgerIcon from "./icons/HamburgerIcon";
import CloseIcon from "./icons/CloseIcon";
import SearchButton from "./SearchButton";

const StyledHeader = styled.header`
    background-color: #222;
    position: relative;
    z-index: 3;
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
    ${props => props.showMobileNav ? `
        display: block;
    ` : `
        display: none;
    `};
    ${props => props.showSearch && css`
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
    svg {
        height: 20px;
        margin-right: 5px;
        cursor: pointer;
    }
    @media screen and (min-width: 790px) {
        display: flex;
        position: static;
        align-items: center;
        padding: 0;
        gap: 20px;
    }
`;

const NavLink = styled(Link)` 
    color: #aaa;
    display: block;
    text-decoration: none;
    padding: 10px 0;
    margin-bottom: 20px;
    text-align: left;
    &:hover {
        color: #9e9e9e;
    }
    @media screen and (min-width: 790px) {
        padding: 0;
        margin: 0;
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
    @media screen and (min-width: 790px) {
        display: none;
    }
`;

const Searchbar = styled.input`
    border-radius: 5px;
    padding: 5px;
    margin-right: 10px;
    font-family: inherit;
    box-sizing: border-box;
    border: none;
`;

const SuggestionWrapper = styled.div`
    flex-direction: column;
    position: absolute;
    overflow-x: hidden;
    padding: 2px 2px;
`;

const Suggestion = styled(Link)`
    ${props => props.show ? `
        display: block;
    ` : `
        display: none;
    `};
    border: 1px solid #f3f3f3;
    background-color: white;
    text-decoration: none;
    color: #000;
    padding: 10px 0 10px 4px;
    &:hover {
        background-color: #ccc;
        cursor: pointer;
    }
`;

const SearchWrapper = styled.div`
    display: flex;
    align-items: center;
`;

export default function Header({products}) {
    const {cartProducts} = useContext(CartContext);
    const [showMobileNav, setShowMobileNav] = useState(false);
    const [searchEntry, setSearchEntry] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(true);

    const handleChange = (search) => {
        setSearchEntry(search);
    }

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

                    <StyledNav showMobileNav={showMobileNav}>
                        <NavLink href={'/'}>Home</NavLink>
                        <NavLink href={'/products'}>Paintings</NavLink>
                        <NavLink href={'/account'}>Account</NavLink>
                        <NavLink href={'/cart'}>Cart ({cartProducts.length})</NavLink>
                       
                        <div>
                            <SearchWrapper>
                                <Searchbar 
                                    type="text" 
                                    onFocus={() => setShowSuggestions(true)}
                                    placeholder="Search"
                                    value={searchEntry}
                                    onChange={(e) => handleChange(e.target.value)}
                                />

                                <SearchButton
                                    onClick={() => setShowMobileNav(false)} 
                                    url={searchEntry === '' ? '/' : '/search/' + searchEntry} /> 
                            </SearchWrapper>
                            
                            <SuggestionWrapper>
                                {products?.map(product => (
                                    <>
                                    {searchEntry !== '' && product.name.toLowerCase().includes(searchEntry.toLowerCase()) &&
                                        <Suggestion
                                            href={'/product/' + product._id}
                                            onClick={() => {setShowMobileNav(false), setShowSuggestions(false)}} 
                                            show={showSuggestions}
                                            >
                                            {product.name}
                                        </Suggestion>
                                    }
                                    </>
                                ))}
                            </SuggestionWrapper>
                        </div>
                    </StyledNav> 
                    
                    <NavButton onClick={() => setShowMobileNav(!showMobileNav)}>
                        {showMobileNav ? <CloseIcon /> : <HamburgerIcon />}
                    </NavButton>
                </Wrapper>
            </Center>
        </StyledHeader>
    );
}