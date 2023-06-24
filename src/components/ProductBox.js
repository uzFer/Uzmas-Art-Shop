import { styled } from "styled-components";
import Button from "./Button";
import CartIcon from "./icons/CartIcon";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import HeartIcon from "./icons/HeartIcon";
import { FavouritesContext } from "./FavouritesContext";
import axios from "axios";
import FilledHeartIcon from "./icons/FilledHeartIcon";

const ProductWrapper = styled.div`

`;

const WhiteBox = styled.div`
    background-color: #eee;
    padding: 15px;
    height: 250px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    transition: all 0.3s ease-in-out;
    img {
        max-width: 100%;
        max-height: 100%;
        box-shadow: 0px 6px 8px 0 rgba(0, 0, 0, 0.2), 0px 6px 20px 0 rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease-in-out;
        &:hover {
            background-color: #fff;
        }
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
    text-align: center;
    margin-top: 5px;
    @media screen and (min-width: 768px) {
        text-align: left;
    }
`;

const PriceBox = styled.div`
    display: block;
    align-items: center;
    justify-content: space-between;
    margin-top: 2px;
    @media screen and (min-width: 768px) {
        display: flex;
        gap: 5px;
    }
`;

const Price = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 10px;
    @media screen and (min-width: 768px) {
        margin-bottom: 0;
    }
`;

const Heart = styled.div`
    position: absolute;
`;

const ImageWrapper = styled.div`
    
`;

export default function ProductBox({_id, name, description, price, images}) {
    const {addProduct} = useContext(CartContext);
    const {favourites, addFavourite, removeFavourite} = useContext(FavouritesContext);
    const url = '/product/' + _id;
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if(favourites.length > 0) {
            axios.post('/api/favourites', {ids: favourites}).then(response => {
                setProducts(response.data);
            })
        }
        else {
            setProducts([]);
        }
    }, [favourites]); 

    return (
        <ProductWrapper> 
            <WhiteBox> 
                <ImageWrapper>
                    <Heart onClick={() => {
                        favourites?.includes(_id) ? removeFavourite(_id) : addFavourite(_id)
                    }}>
                        {favourites?.length > 0 && favourites.includes(_id) ? 
                            <FilledHeartIcon /> : <HeartIcon />
                        }
                    </Heart>

                    <Link href={url}>
                        <img src={images?.[0]} alt={name} />
                    </Link>
                </ImageWrapper>
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