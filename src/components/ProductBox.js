import { styled } from "styled-components";
import Button from "./Button";
import CartIcon from "./icons/CartIcon";

const ProductWrapper = styled.div`

`;

const WhiteBox = styled.div`
    background-color: #fff;
    padding: 20px;
    height: 240px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    img {
        max-width: 100%;
        max-height: 100%;
    }
`;

const Title = styled.h2`
    font-weight: normal;
    font-size: 1rem;
    margin: 0;
`;

const ProductInfoBox = styled.div`
    margin-top: 10px;
`;

const PriceBox = styled.div`
    display: flex;
`;

export default function ProductBox({_id, name, description, price, images}) {
    return (
        <ProductWrapper>
            <WhiteBox> 
                <div>
                    <img src={images[0]} alt={name} />
                </div>
            </WhiteBox>
            <ProductInfoBox>
                <Title>{name}</Title>
                <PriceBox>
                    <div>
                        ${price}
                    </div>
                </PriceBox>
                <Button primary>
                    <CartIcon />
                </Button>
            </ProductInfoBox>
        </ProductWrapper>
    );
}