import Button from "@/components/Button";
import Center from "@/components/Center";
import { FavouritesContext } from "@/components/FavouritesContext";
import Header from "@/components/Header";
import Table from "@/components/Table";
import Title from "@/components/Title";
import mongooseConnect from "@/lib/mongoose";
import { Product } from "@/models/Product";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";

const ProductInfoBox = styled.td`
    padding: 10px 0;
`;

const ProductImageBox = styled.div`
    width: 100%;
    height: 100%;
    padding: 2px;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    img {
        max-width: 100%;
        max-height: 130px;
        margin-right: 30px;
    }
    @media screen and (min-width: 768px) {
        background-color: #eee;
        margin-right: 0px;
        padding: 10px;
        height: 130px;
        width: 160px;
        img {
            margin-right: 0px;
        }
    }
`;

const QuantityWrapper = styled.div`
    text-align: center;
`;

const QuantityLabel = styled.span`
    padding: 0 3px;
    display: block;
    text-align: center;
    @media screen and (min-width: 830px) {
        display: inline-block;
    }
`;


export default function AccountPage({allProducts}) {
    const {favourites, removeFavourite} = useContext(FavouritesContext);
    const [favProducts, setFavProducts] = useState([]);

    function removeFav(id) {
        removeFavourite(id);
    }

    useEffect(() => {
        if(favourites.length > 0) {
            axios.post('/api/favourites', {ids: favourites}).then(response => {
                setFavProducts(response.data);
            })
        }
        else {
            setFavProducts([]);
        }
    }, [favourites]); 

    return (
        <>
            <Header products={allProducts} />
            <Center>
                <Title props={'Your favourites'} />

                {favProducts.map(product => (
                    <div key={product}>
                        <ProductInfoBox>
                            <ProductImageBox>
                                <img src={product.images[0]}></img>
                            </ProductImageBox>
                            {product.name}
                        </ProductInfoBox>  
                        
                        <Button 
                            black outline 
                            onClick={() => removeFav(product._id)}>
                            Remove Favourite
                        </Button>
                        <p> ${product.price.toFixed(2)}</p>
                    </div>
                ))}
            </Center> 
        </>
    );
}

export async function getServerSideProps() {
    await mongooseConnect();
    const products = await Product.find({}, null, {sort:{'_id': -1}});
    
    return { 
        props: {
            allProducts: JSON.parse(JSON.stringify(products)),
        }
    };
}