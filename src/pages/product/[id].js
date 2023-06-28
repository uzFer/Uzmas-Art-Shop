import Box from "@/components/Box";
import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import { FavouritesContext } from "@/components/FavouritesContext";
import Header from "@/components/Header";
import ProductImages from "@/components/ProductImages";
import FilledHeartIcon from "@/components/icons/FilledHeartIcon";
import HeartIcon from "@/components/icons/HeartIcon";
import mongooseConnect from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { useContext, useEffect, useState } from "react";
import { css, styled } from "styled-components";
import { useSession } from "next-auth/react";
import axios from "axios";

const ColWrapper = styled.div` 
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px;
    margin-top: 40px;
    @media screen and (min-width: 768px) {
        grid-template-columns: 1fr 1fr;
    }
`;

const Wrapper = styled.div` 
    text-align: center;
    @media screen and (min-width: 768px) {
        text-align: left;
    }
`;

const ProductInfo = styled.div`
    margin-bottom: 30px;
`;

const Price = styled.span`
    font-size: 1.6rem;
    font-weight: bold;
`;

const Tag = styled.div`
    padding: 10px 0;
    margin-bottom: 20px;
`;

const TagTitle = styled.span`
    ${props => props.type === 'Realistic' && css`
    background: #2193b0;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #6dd5ed, #2193b0);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #6dd5ed, #2193b0); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    border: 1px solid #5481c4;
    `}
    ${props => props.type === 'Abstract' && css`
        background: #A770EF;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #FDB99B, #CF8BF3, #A770EF);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #FDB99B, #CF8BF3, #A770EF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        border: 1px solid #8562b3;
    `}
    
    font-size: 1rem;
    font-weight: bold;
    border-radius: 20px;
    padding: 5px 10px;
`;

const Heart = styled.div`  
    position: absolute;
`;

const PriceWrapper = styled.div` 
    margin: 40px 0;
`;

const ReviewWrapper = styled.div` 
    display: flex;
    margin-top: 40px;
    padding: 10px;
    @media screen and (min-width: 768px) {
        grid-template-columns: 1fr 1fr;
    }
`;


export default function ProductPage({product, categories, allProducts}) {
    const {addProduct} = useContext(CartContext);
    const {favourites, addFavourite, removeFavourite} = useContext(FavouritesContext);
    const [favProducts, setFavProducts] = useState([]);
    const { data: session } = useSession();

    /* USER FAVOURITES */
    async function removeFav(id) {
        await axios.delete('/api/userfavourites?_id=' + id); 
    }

    async function addFav(name, email, description, price, images) {
        const _id = product._id;
        const data = {
            _id, name, email, description, price, images
        };
        await axios.post('/api/userfavourites', data);
    }

    /* NON USER FAVOURITES */
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
    

    return (
        <Wrapper>
            <Header products={allProducts}/>
            <Center>
                <ColWrapper>
                    <Box>
                        <ProductImages images={product.images}></ProductImages>
                    </Box>
                    <div>
                        <ProductInfo>
                            <h1>{product.name}</h1>
                            <p>{product.description}</p>
                        </ProductInfo>
                        {categories?.map(category => (
                            <>
                            {category._id === product.category &&
                                <Tag>
                                    <TagTitle type={category.name}>{category.name}</TagTitle>
                                </Tag>
                            }
                            </>
                        ))}
                        <PriceWrapper>
                            <Price>
                                ${product.price}
                            </Price>
                        </PriceWrapper>
                        <div style={{marginBottom: '10px'}}>
                            <Button black outline onClick={() => addProduct(product._id)}>
                                Add to cart
                            </Button>
                        </div>

                        <div>
                        {!session &&
                            <Heart onClick={() => {
                                favourites?.includes(product._id) ? 
                                removeFavourite(product._id) : 
                                addFavourite(product._id)
                            }}>
                            {favourites?.length > 0 && favourites.includes(product._id) ? 
                                <Button red outline>Favourited &lt;3</Button> : 
                                <Button red outline>Add to fav &lt;3</Button>
                            }
                            </Heart> 
                        }
                        
                        {session &&
                            <>
                                {favProducts?.length > 0 && favProducts.map(fav => (
                                <>
                                    {fav._id !== product._id &&
                                        <Heart onClick={() => {
                                            addFav(product.name, session.user.email, product.description, product.price, product.images)
                                            }}>   
                                            <Button red outline>Add to fav &lt;3</Button>  
                                        </Heart>
                                    }
                                </>
                                ))}
                                {favProducts?.length > 0 && favProducts.map(fav => (
                                <>
                                    {fav._id === product._id && fav.email === session.user.email &&
                                        <Heart onClick={() => {removeFav(fav._id)}}>   
                                            <Button red outline>Favourited &lt;3</Button>  
                                        </Heart>
                                    }
                                </>
                                ))}
                                {favProducts?.length === 0 &&
                                    <Heart onClick={() => {
                                        addFav(product.name, session.user.email, product.description, product.price, product.images)
                                        }}>   
                                        <Button red outline>Add to fav &lt;3</Button>  
                                    </Heart>
                                }
                            </>
                        }
                        </div>
                    </div>
                </ColWrapper>
                <ReviewWrapper>
                    <h2>Reviews</h2>
                    {session &&
                        <input type="text" placeholder="Leave a review" />
                    }
                </ReviewWrapper>
            </Center>
        </Wrapper>
    );
}

export async function getServerSideProps(context) {
    await mongooseConnect();
    const {id} = context.query;
    const product = await Product.findById(id);
    const products = await Product.find({}, null, {sort:{'_id': -1}});
    const categories = await Category.find({}, null, {sort:{'_id': -1}});

    return {
        props: {
            categories: JSON.parse(JSON.stringify(categories)),
            product: JSON.parse(JSON.stringify(product)),
            allProducts: JSON.parse(JSON.stringify(products)),
        }
    };
}