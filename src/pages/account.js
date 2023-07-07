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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Title from "@/components/Title";

const EmptyWrapper = styled.div`
    background-color: #fff;
    padding: 25px;
    border-radius: 20px;
`;

const Container = styled.div`
    background-color: #222;
    color: #fff;
    margin: 30px 0 60px 0;
    padding: 20px 0 20px 0;
    text-align: center;
    border-radius: 10px;
    font-size: 0.8rem;
    img {
        height: 25px;
        width: 25px;
        border-radius: 15px;
        margin-right: 15px;
    }
    @media screen and (min-width: 768px) {
        font-size: 1rem;
    }
`;

const ContainerHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ContainerHeaderBg = styled.div`
    display: inline-block;
    background-color: #555;
    padding: 0 10px;
    border-radius: 15px;
    margin: 15px 0;
`;

const StyledProductsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    @media screen and (min-width: 700px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
`;

const ProductWrapper = styled.div`

`;

const WhiteBox = styled.div`
    background-color: #eee;
    padding: 15px;
    height: 350px;  
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

const ProductTitle = styled(Link)`
    font-weight: normal;
    font-size: 1rem;
    color: #000;
    text-decoration: none;
    margin: 0;
`;

const ProductInfoBox = styled.div`
    text-align: center;
    margin-top: 0;
    @media screen and (min-width: 768px) {
        text-align: left;
        margin-top: 5px;
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

const ImageWrapper = styled.div`
    
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
                    <ContainerHeaderBg>
                        <ContainerHeader>
                            <img src={session.user.image} alt="User image" />
                            <p>{session.user.name}</p>
                        </ContainerHeader>
                    </ContainerHeaderBg>
                    <p>Signed in as {session.user.email} </p>
                    <Button white={1} outline={1} onClick={logOut}>Sign out</Button>
                    <ToastContainer theme="dark" />
                </Container>

                    <Title props={'Your favourites'} />
                    {!favourites?.length && !session &&
                        <EmptyWrapper>No favourites yet!</EmptyWrapper>
                    }
                    {!favProducts?.length && session &&
                        <EmptyWrapper>No favourites yet!</EmptyWrapper>
                    }
                    {favProducts?.length > 0 && (
                        <StyledProductsGrid>
                        {favProducts.map(product => (
                            <div key={product}>
                                <ProductWrapper> 
                                <WhiteBox> 
                                    <ImageWrapper>
                                        <Link href={'/product/' + product.productID}>
                                            <img src={product.images?.[0]} alt={product.name} />
                                        </Link>
                                    </ImageWrapper>
                                </WhiteBox> 
                                <ProductInfoBox>
                                    <ProductTitle href={'/product/' + product.productID}>{product.name}</ProductTitle>
                                    <PriceBox>
                                        <Price>
                                            ${product.price}
                                        </Price>
                                        <Button 
                                            red={1} outline={1} 
                                            onClick={() => removeFav(product._id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Remove
                                        </Button>
                                    </PriceBox>
                                </ProductInfoBox>
                            </ProductWrapper>
                            </div>
                        ))}
                        </StyledProductsGrid>
                    )}
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
                    <Title props={'Your favourites'} />
                    {!favourites?.length &&
                        <Box>No favourites yet!</Box>
                    }
                    {favProducts?.length > 0 && (
                        <StyledProductsGrid>
                        {favProducts.map(product => (
                            <div key={product}>
                                <ProductWrapper> 
                                <WhiteBox> 
                                    <ImageWrapper>
                                        <Link href={'/product/' + product._id}>
                                            <img src={product.images?.[0]} alt={product.name} />
                                        </Link>
                                    </ImageWrapper>
                                </WhiteBox> 
                                <ProductInfoBox>
                                    <ProductTitle href={'/product/' + product.productID}>{product.name}</ProductTitle>
                                    <PriceBox>
                                        <Price>
                                            ${product.price}
                                        </Price>
                                        <Button 
                                            red={1} outline={1} 
                                            onClick={() => removeFav(product._id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Remove
                                        </Button>
                                    </PriceBox>
                                </ProductInfoBox>
                            </ProductWrapper>
                            </div>
                        ))}
                        </StyledProductsGrid>
                    )}
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