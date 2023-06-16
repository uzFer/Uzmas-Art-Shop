import Center from "./Center";
import styled from "styled-components";
import Button from "./Button";
import ButtonLink from "./ButtonLink";

const Background = styled.div`
    background-color: #222; 
    color: #fff;
    padding: 50px 0;
`;

const Title = styled.h1`
    margin: 0;
    font-weight: normal;
    font-size: 5rem;
`;

const Description = styled.p`
    color: #aaa;
    font-size: 1rem;
`;

const ColWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    img {
        max-width: 100%;
    }
`;

const Col = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const ButtonWrapper = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 30px;
`;

export default function Featured({product}) {
    return (
        <Background> 
            <Center>
                <ColWrapper>
                    <Col>
                        <div>
                            <Title>{product?.name}</Title>
                            <Description>{product?.description}</Description>
                            <ButtonWrapper>
                                <ButtonLink href={'/products/' + product._id} outline={1} white={1} size="l">Read more</ButtonLink>
                                <Button primary size="l">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                    </svg>
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