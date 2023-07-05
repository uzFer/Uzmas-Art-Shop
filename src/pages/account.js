import Box from "@/components/Box";
import Button from "@/components/Button";
import Center from "@/components/Center";
import { FavouritesContext } from "@/components/FavouritesContext";
import Header from "@/components/Header";
import Table from "@/components/Table";
import mongooseConnect from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { primary } from "@/lib/colours";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TableWrapper = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 50px;
    max-height: 100%;
`;

const ProductInfoBox = styled(Link)`
    text-decoration: none;
    color: #000;
    padding: 12px;
`;

const ProductImageBox = styled.div`
    width: 100%;
    height: 100%;
    padding: 2px;
    margin: 10px 0;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    img {
        max-width: 100%;
        max-height: 160px;
        margin-right: 30px;
    }
    @media screen and (min-width: 768px) {
        background-color: #eee;
        margin-right: 0px;
        padding: 10px;
        height: 160px;
        width: 160px;
        img {
            margin-right: 0px;
        }
    }
`;

const Container = styled.div`
    background-color: #222;
    color: #fff;
    margin: 20px 0;
    padding: 10px 0 20px 0;
    text-align: center;
    border-radius: 10px;
`;

const Wrapper = styled.div`
    display: none;
`;


export default function AccountPage({allProducts, orders}) {
    const {favourites, removeFavourite} = useContext(FavouritesContext);
    const [favProducts, setFavProducts] = useState([]);
    const { data: session } = useSession();
    const router = useRouter();

    async function removeFav(id) {
        if(!session) {
            removeFavourite(id);
        }
        else {
            await axios.delete('/api/userfavourites?_id=' + id); 
        }
    }

    function logOut() {
        signOut();
        toast('Signing out of your account', {
            position: "top-right"
        });
    }

    useEffect(() => {
        if(!session) {
            if(favourites.length > 0) {
                axios.post('/api/favourites', {ids: favourites}).then(response => {
                    setFavProducts(response.data);
                })
            }
            else {
                setFavProducts([]);
            }
        }
    }, [favourites]); 


    useEffect(() => {
        if(session) {
            axios.get('/api/userfavourites').then(response => {
                setFavProducts(response.data);
            });
        }
    }, [favProducts]);
    
    if(session) {
        return (
        <>
            <Header products={allProducts} />
            <Center>
                <Container>
                    <p>Signed in as {session.user.email} </p>
                    <Button primary={1} outline={1} onClick={logOut}>Sign out</Button>
                    <ToastContainer theme="dark" />
                </Container>
                <TableWrapper>
                    <h1>Your favourites</h1>
                    {!favourites?.length && !session &&
                        <div>No favourites yet!</div>
                    }
                    {!favProducts?.length && session &&
                        <div>No favourites yet!</div>
                    }
                    {favProducts?.length > 0 && (
                        <Table>
                            <thead>
                            </thead>
                            <tbody>
                                {favProducts.map(product => (
                                    <tr key={product}>
                                        <td>
                                        <ProductInfoBox href={session ? '/product/' + product.productID : '/product/' + product._id}>
                                            <ProductImageBox>
                                                <img src={product.images[0]}></img>
                                            </ProductImageBox>   
                                            <p>{product.name}</p>
                                            <p>${product.price.toFixed(2)}</p>
                                        </ProductInfoBox>  
                                        </td>
                                        <td>
                                            <Button 
                                                red={1} outline={1}
                                                onClick={() => removeFav(product._id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                Remove fav
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
                </TableWrapper>
            </Center> 
        </>
        );
    }
    
    return (
        <>
            <Header products={allProducts} />
            <Center>
                <Container>
                    <h2>Sign in to save your info</h2>
                    <Button primary={1} outline={1} onClick={() => signIn()}>Sign in</Button>
                </Container>

                    <Box>
                        <h1>Your favourites</h1>
                        {!favourites?.length &&
                            <div>No favourites yet!</div>
                        }
                        {favProducts?.length > 0 && (
                            <Table>
                                <thead>
                                </thead>
                                <tbody>
                                    {favProducts.map(product => (
                                        <tr key={product}>
                                            <ProductInfoBox href={'/product/' + product._id}>
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
                                                    red={1} outline={1} 
                                                    onClick={() => removeFav(product._id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
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