import Box from "@/components/Box";
import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import { FavouritesContext } from "@/components/FavouritesContext";
import Header from "@/components/Header";
import ProductImages from "@/components/ProductImages";
import mongooseConnect from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { useContext, useEffect, useState } from "react";
import { css, styled } from "styled-components";
import { useSession } from "next-auth/react";
import axios from "axios";
import StarIcon from "@/components/icons/StarIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import EditIcon from "@/components/icons/EditIcon";
import Input from "@/components/Input";

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
    hr {
        margin: 40px 0;   
        color: #555;
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

const TitleWrapper = styled.div` 
    
`;

const ReviewTitle = styled.span` 
    font-size: 1.5rem;
    font-weight: bold;
    padding: 10px;
    border-radius: 20px;
`;

const ReviewList = styled.div`
    flex-direction: column;
    margin-top: 30px;
    padding: 0;
    textarea {
        width: 100%;
        height: 30px;
        padding: 10px;
        border-radius: 15px;
        font-size: 1rem;
    }
`;

const StarWrapper = styled.div`
    display: flex;
`;

const StyledInput = styled.textarea`
    width: 100%;   
    height: 400px;
    margin: 5px;
`;

const ReviewBox = styled.div`
    background-color: #fff;
    margin: 30px 0 0 0;
    padding: 10px 30px;
    border-radius: 20px;
    img {
        width: 30px;
        height: 30px;
        border-radius: 30px;
    }
`;

const ReviewHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    p {
        font-weight: bold;
        font-size: 1.2rem;
    }
    svg {
        float: right;
    }
`;

const ReviewDate = styled.span`
    color: #555;
`;

const ReviewIconWrapper = styled.div`
    display: flex;
`;

const ButtonHolder = styled.div`
    display: flex;
    gap: 5px;
`;

const DeleteWrapper = styled.div`

`;

const EditWrapper = styled.div`

`;


export default function ProductPage({product, categories, allProducts}) {
    const {addProduct} = useContext(CartContext);
    const {favourites, addFavourite, removeFavourite} = useContext(FavouritesContext);
    const [favProducts, setFavProducts] = useState([]);
    const { data: session } = useSession();
    const [reviews, setReviews] = useState([]);
    const [comment, setComment] = useState('');
    const [editing, setEditing] = useState(false);
    const [editedComment, setEditedComment] = useState('');
    const [editedID, setEditedID] = useState('');

    async function addReview() {
        if(comment === '') {
            return;
        }
        const productID = product._id;
        const name = session.user.name;
        const email = session.user.email;
        const image = session.user.image;
        await axios.post('/api/review', { productID, name, email, comment, image });
        fetchReviews();
        setComment('');
    }

    async function deleteReview(id) {
        await axios.delete('/api/review?_id=' + id);
        fetchReviews();
    }   

    async function editReview(_id) {
        const name = session.user.name;
        const email = session.user.email;
        await axios.put('/api/review', {name, email, comment: editedComment, _id});
        setEditing(false);
        setEditedComment('')
        fetchReviews();    
    }   

    /* USER FAVOURITES */
    async function removeFav(id) {
        await axios.delete('/api/userfavourites?_id=' + id); 
    }

    async function addFav(name, email, description, price, images) {
        const productID = product._id;
        const data = {
            productID, name, email, description, price, images
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

    function fetchReviews() {
        axios.get('/api/review?productID=' + product._id).then(response => {
            setReviews(response.data);
        });
    };

    useEffect(() => {
        fetchReviews();
    }, [])
    

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
                                    {fav.productID !== product._id &&
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
                                    {fav.productID === product._id && fav.email === session.user.email &&
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
                <hr />  
                <TitleWrapper>
                    <ReviewTitle>Reviews</ReviewTitle>
                </TitleWrapper>
                <ReviewList>
                    {session &&
                    <>  
                        <StarWrapper>
                            <StarIcon />
                            <StarIcon />
                            <StarIcon />
                            <StarIcon />
                            <StarIcon />
                        </StarWrapper>
                        
                        <StyledInput
                            placeholder="Leave a review..." 
                            name="comment" 
                            value={comment} 
                            onChange={(e) => setComment(e.target.value)} />
                        <Button black outline 
                                onClick={addReview}>
                            Submit review
                        </Button>
                    </>
                    }
                    {reviews?.length > 0 && reviews.map(review => (
                        <>
                        {review.productID === product._id &&
                            <ReviewBox>
                                <ReviewHeader>
                                    <img src={review.image} alt=""/>
                                    <p>{review.name}</p>

                                    <ReviewDate>
                                        {(new Date(review.updatedAt)).toLocaleString() !== (new Date(review.createdAt)).toLocaleString() &&
                                            <h4>{(new Date(review.updatedAt)).toLocaleString()} (edited)</h4>
                                        }
                                         
                                    </ReviewDate>

                                    {!editing && review.email === session?.user.email && 
                                        <ReviewIconWrapper>
                                            <DeleteWrapper onClick={() => deleteReview(review._id)}>
                                                <TrashIcon />
                                            </DeleteWrapper>
                                            <EditWrapper onClick={() => {
                                                setEditing(true), 
                                                setEditedID(review._id),
                                                setEditedComment(review.comment)
                                            }}>
                                                <EditIcon />
                                            </EditWrapper>   
                                        </ReviewIconWrapper>
                                    }
                                </ReviewHeader>
                                {editing && editedID === review._id && <>
                                    <Input
                                        placeholder={review.comment}
                                        value={editedComment}
                                        onChange={(e) => setEditedComment(e.target.value)}  
                                    />
                                    <ButtonHolder>
                                        <Button black outline onClick={() => {editReview(review._id)}}>Save</Button>
                                        <Button red outline onClick={() => {setEditing(false)}}>Cancel</Button>
                                    </ButtonHolder>   
                                </> }
                                {editing && editedID !== review._id && 
                                    <p>{review.comment}</p>  
                                }
                                {!editing &&
                                    <p>{review.comment}</p>  
                                }
                            </ReviewBox>
                        }   
                        </>
                    ))}
                    {reviews?.length === 0 && 
                        <ReviewBox>
                            <p>Be the first to leave a review!</p>
                        </ReviewBox>
                    }
                </ReviewList>
                
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