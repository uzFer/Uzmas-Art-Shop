import Center from "./Center";
import styled from "styled-components";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const Background = styled.div`
    background-color: #222; 
    color: #fff;
    padding: 50px 0;
`;

const Title = styled.h1`
    margin: 0;
    font-weight: normal;
    font-size: 3.5rem;
    @media screen and (min-width: 768px) {
        font-size: 5rem;
    }
`;

const Description = styled.p`
    color: #aaa;
    font-size: 1rem;
`;

const ColWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px;
    img {
        max-width: 100%;
        max-height: 300px;
    }
    div:nth-child(1) {
        order: 2;
    }
    @media screen and (min-width: 768px) {
        grid-template-columns: 1fr 1fr;
        div:nth-child(1) {
            order: 0;
        }
        img {
            max-width: 100%;
        }
    }
`;

const Col = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    flex-direction: column;
    @media screen and (min-width: 768px) {
        text-align: left;
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 30px;
    @media screen and (min-width: 768px) {
        justify-content: start;
    }
`;

export default function Featured({product}) {
    const {addProduct} = useContext(CartContext);
    
    function addFeaturedToCart() {
      addProduct(product._id);
    }

    return (
        <Background> 
            <Center>
                <ColWrapper>
                    <Col>
                        <div>
                            <Title>{product?.name}</Title>
                            <Description>{product?.description}</Description>
                            <ButtonWrapper>
                                <ButtonLink 
                                    href={'/product/' + product._id} 
                                    outline={1} white={1} size="l">
                                    Read more
                                </ButtonLink>
                                <Button primary={1} size="l" onClick={addFeaturedToCart}>
                                    <CartIcon />
                                    Add to cart
                                </Button>
                            </ButtonWrapper>
                        </div>
                    </Col>
                    <Col>
                        <img src="https://uzmasartshop.s3.amazonaws.com/1686939680684.jpg" alt="The S.h.o.t."></img>
                    </Col>
                </ColWrapper>
            </Center>
        </Background>
    );
}