import { styled } from "styled-components";
import Button from "./Button";
import CartIcon from "./icons/CartIcon";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const ProductWrapper = styled.div`

`;

const WhiteBox = styled(Link)`
    background-color: #eee;
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

const Title = styled(Link)`
    font-weight: normal;
    font-size: 1rem;
    color: #000;
    text-decoration: none;
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
    const {addProduct} = useContext(CartContext);
    const url = '/products' + _id;
    
    return (
        <ProductWrapper> 
            <WhiteBox href={url}> 
                <div>
                    <img src={images?.[0]} alt={name} />
                </div>
            </WhiteBox> 
            <ProductInfoBox>
                <Title href={url}>{name}</Title>
                <PriceBox>
                    <Price>
                        ${price}
                    </Price>
                    <Button 
                        onClick={() => addProduct(_id)}
                        black outline size="m" >
                        Add to cart
                    </Button>
                </PriceBox>
            </ProductInfoBox>
        </ProductWrapper>
    );
}