import { styled } from "styled-components";
import Button from "./Button";
import CartIcon from "./icons/CartIcon";

const ProductWrapper = styled.div`

`;

const WhiteBox = styled.div`
    background-color: #fff;
    padding: 15px;
    height: 260px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
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
    margin-top: 5px;
`;

const PriceBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 2px;
`;

const Price = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
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
                    <Price>
                        ${price}
                    </Price>
                    <Button green outline size="m">
                        Add to cart
                    </Button>
                </PriceBox>
            </ProductInfoBox>
        </ProductWrapper>
    );
}