import Box from "@/components/Box";
import Button from "@/components/Button";
import Center from "@/components/Center";
import { FavouritesContext } from "@/components/FavouritesContext";
import Header from "@/components/Header";
import Table from "@/components/Table";
import Title from "@/components/Title";
import mongooseConnect from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";

const ColWrapper = styled.div`
    gap: 40px;
    margin-top: 40px;
`;

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


export default function AccountPage({allProducts, orders}) {
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
                <ColWrapper>
                    <Box>
                        <h1>Your favourites</h1>
                        {!favourites?.length &&
                            <div>Your cart is empty.</div>
                        }
                        {favProducts?.length > 0 && (
                            <Table>
                                <thead>
                                </thead>
                                <tbody>
                                    {favProducts.map(product => (
                                        <tr key={product}>
                                            <ProductInfoBox>
                                                <ProductImageBox>
                                                    <img src={product.images[0]}></img>
                                                </ProductImageBox>
                                                {product.name}
                                            </ProductInfoBox>  
                                            <td>
                                                ${product.price.toFixed(2)}
                                            </td>
                                            <td>
                                                <Button 
                                                    black outline 
                                                    onClick={() => removeFav(product._id)}>
                                                    Remove Favourite
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    
                                </tbody>
                            </Table>
                        )}
                    </Box>
                </ColWrapper>
            <Title props={'Buy it again'} />
            {orders?.length > 0 && orders.map(order => (
                <>
                <p>{(new Date(order.createdAt)).toLocaleString()}</p>
                {order.line_items.map(l => (
                    <>
                        {l.price_data?.product_data.name} x {l.quantity} <br />
                    </>
                ))}
                </>
            ))}
            </Center> 
        </>
    );
}

export async function getServerSideProps() {
    await mongooseConnect();
    const products = await Product.find({}, null, {sort:{'_id': -1}});
    const orders = await Order.find({}, null, {sort:{'_id': -1}});

    return { 
        props: {
            allProducts: JSON.parse(JSON.stringify(products)),
            orders: JSON.parse(JSON.stringify(orders)),
        }
    };
}