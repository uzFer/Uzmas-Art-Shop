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
import { useSession, signIn } from "next-auth/react";
import axios from "axios";
import StarIcon from "@/components/icons/StarIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import EditIcon from "@/components/icons/EditIcon";
import Input from "@/components/Input";
import FilledStarIcon from "@/components/icons/FilledStarIcon";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useConfirm } from "material-ui-confirm";

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
    display: none;
    @media screen and (min-width: 768px) {
        position: absolute;
        display: flex;
    }
`;

const PriceWrapper = styled.div` 
    margin: 40px 0;
`;

const TitleWrapper = styled.div` 
    
`;

const ReviewTitle = styled.span` 
    font-size: 1.6rem;
    font-weight: bold;
    padding: 10px;
    border-radius: 20px;
`;

const ReviewList = styled.div`
    flex-direction: column;
    margin-top: 30px;
    padding: 0;
    text-align: left;
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

const TextAreaWrapper = styled.div`
    margin-right: 30px;
`;

const StyledInput = styled.textarea`
    width: 100%;  
    margin: 5px;
`;

const ReviewBox = styled.div`
    background-color: #fff;
    margin: 30px 0 0 0;
    padding: 10px 30px;
    border-radius: 5px;
    text-align: left;
    box-shadow: 0px 6px 4px 0 rgba(0, 0, 0, 0.2), 0px 6px 6px 0 rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;
    img {
        width: 30px;
        height: 30px;
        border-radius: 30px;
    }
`;

const ReviewHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    p {
        font-weight: bold;
        font-size: 1rem;
    }
    span {
        display: none;
    }
    @media screen and (min-width: 768px) {
        display: flex;
        align-items: center;
        gap: 15px;
        p {
            font-weight: bold;
            font-size: 1.15rem;
        }
        span {
            display: block;
        }
    }
`;

const ReviewDate = styled.div`
    color: #777;
    margin-left: 5px;
    white-space: nowrap;
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

const Container = styled.div`
    background-color: #fff;
    box-shadow: 0px 6px 4px 0 rgba(0, 0, 0, 0.2), 0px 6px 6px 0 rgba(0, 0, 0, 0.1);
    margin: 20px 0;
    padding: 10px 0 20px 0;
    text-align: center;
    border-radius: 10px;
`;

export default function ProductPage({product, categories, allProducts}) {
    const {addProduct} = useContext(CartContext);
    const {favourites, addFavourite, removeFavourite} = useContext(FavouritesContext);
    const [favProducts, setFavProducts] = useState([]);
    const { data: session } = useSession();
    const [sortedReviews, setSortedReviews] = useState([]);
    const [comment, setComment] = useState('');
    const [editing, setEditing] = useState(false);
    const [editedComment, setEditedComment] = useState('');
    const [editedID, setEditedID] = useState('');
    const [starsPressed, setStarsPressed] = useState([false, false, false, false, false]);
    const [numOfStars, setNumOfStars] = useState(-1);
    const [editStarsPressed, setEditStarsPressed] = useState([false, false, false, false, false]);
    const confirm = useConfirm();

    function addProductToCart(id) {
        const successMessage = 'Added ' + product.name + ' to cart!';
        addProduct(id);
        toast.success(successMessage, {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    async function addReview() {
        if(comment === '' || numOfStars === -1) {
            toast.error('Your review is not complete', {
                position: "top-right"
            });
            return;
        }
        const productID = product._id;
        const name = session.user.name;
        const email = session.user.email;
        const image = session.user.image;
        await axios.post('/api/review', { productID, name, email, comment, image, numOfStars });
        toast.success('Successfully added your review!', {
            position: toast.POSITION.TOP_RIGHT
        });
        fetchReviews();
        setComment('');
        setNumOfStars(-1);
        setStarsPressed([false, false, false, false, false]);
    }

    async function deleteReview(id) {
        //confirm({ title: 'Are you sure you want to delete your review?', description: "This action is permanent." })
            //.then( async () => {
            await axios.delete('/api/review?_id=' + id);
            //     toast.success('Deleting reivew', {
            //         position: toast.POSITION.TOP_RIGHT
            //     });
            //})
            // .catch(() => {
            //     console.log('no')
            // });
            fetchReviews();
    }   

    async function editReview(_id) {
        const name = session.user.name;
        const email = session.user.email;
        const image = session.user.image;
        await axios.put('/api/review', {name, email, comment: editedComment, _id, image, numOfStars});
        setEditing(false);
        setEditedComment('')
        setEditStarsPressed([false, false, false, false, false]);
        setNumOfStars(0);
        fetchReviews();    
    }   

    function pressedStar(index) {
        if(!editing) {
            for(var i = 0; i < 5; i++) {
                if(i <= index) {
                    starsPressed[i] = true;
                }
                else {
                    starsPressed[i] = false;
                }
            }
        }
        if(editing) {
            for(var i = 0; i < 5; i++) {
                if(i <= index) {
                    editStarsPressed[i] = true;
                }
                else {
                    editStarsPressed[i] = false;
                }
            }
        }
        setNumOfStars(index);
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
        toast.success('Added to favourites!', {
            position: toast.POSITION.TOP_RIGHT
        });
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
            setSortedReviews(response.data.slice(0)
            .reverse()
            .map(element => {
              return element;
            }));
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
                            <Button black outline onClick={() => addProductToCart(product._id)}>
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
                    {!session &&
                        <Container>
                            <h3>Sign in to leave a review!</h3>
                            <Button primary outline onClick={() => signIn()}>Sign in</Button>
                        </Container>
                    }
                    {session &&
                    <>  
                        <StarWrapper>
                            {starsPressed.map((star, index) => (
                                <>
                                    {star && 
                                    <div onClick={() => pressedStar(index)}>
                                        <FilledStarIcon  />
                                    </div>
                                    }
                                    {!star && 
                                    <div onClick={() => pressedStar(index)}>
                                        <StarIcon  />
                                    </div>
                                    }
                                </>
                            ))}
                        </StarWrapper>  
                        
                        <TextAreaWrapper>
                        <StyledInput
                            placeholder="Leave a review..." 
                            name="comment" 
                            value={comment} 
                            onChange={(e) => setComment(e.target.value)} />
                        </TextAreaWrapper>

                        <Button black outline 
                                onClick={addReview}>
                            Submit review
                        </Button>
                    </>
                    }   
                    {sortedReviews?.length > 0 && sortedReviews.map(review => (
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
                                        {(new Date(review.updatedAt)).toLocaleString() === (new Date(review.createdAt)).toLocaleString() &&
                                            <h4>{(new Date(review.createdAt)).toLocaleString()}</h4>
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
                                    <StarWrapper>
                                        {editStarsPressed.map((star, index) => (
                                            <>
                                                {star && 
                                                <div onClick={() => pressedStar(index)}>
                                                    <FilledStarIcon  />
                                                </div>
                                                }
                                                {!star && 
                                                <div onClick={() => pressedStar(index)}>
                                                    <StarIcon  />
                                                </div>
                                                }
                                            </>
                                        ))}
                                    </StarWrapper>  
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
                                    <>
                                    <StarWrapper>
                                        {review.numOfStars === 1 && <FilledStarIcon />}
                                        {review.numOfStars === 2 && <> <FilledStarIcon /> <FilledStarIcon /> </>}
                                        {review.numOfStars === 3 && <> <FilledStarIcon /> <FilledStarIcon /> <FilledStarIcon /> </>}
                                        {review.numOfStars === 4 && <> <FilledStarIcon /> <FilledStarIcon /> <FilledStarIcon /> <FilledStarIcon /></>}
                                        {review.numOfStars === 5 && <> <FilledStarIcon /> <FilledStarIcon /> <FilledStarIcon /> <FilledStarIcon /> <FilledStarIcon /></>}
                                    </StarWrapper> 
                                    <p>{review.comment}</p>  
                                    </> 
                                }
                                {!editing &&
                                    <>
                                    <StarWrapper>
                                        {review.numOfStars === 0 && <FilledStarIcon />}
                                        {review.numOfStars === 1 && <> <FilledStarIcon /> <FilledStarIcon /> </>}
                                        {review.numOfStars === 2 && <> <FilledStarIcon /> <FilledStarIcon /> <FilledStarIcon /> </>}
                                        {review.numOfStars === 3 && <> <FilledStarIcon /> <FilledStarIcon /> <FilledStarIcon /> <FilledStarIcon /></>}
                                        {review.numOfStars === 4 && <> <FilledStarIcon /> <FilledStarIcon /> <FilledStarIcon /> <FilledStarIcon /> <FilledStarIcon /></>}
                                    </StarWrapper> 
                                    <p>{review.comment}</p>  
                                    </>   
                                }
                            </ReviewBox>
                        }   
                        </>
                    ))}
                    {sortedReviews?.length === 0 &&
                        <ReviewBox>
                            <p>Be the first to leave a review!</p>
                        </ReviewBox>
                    }
                </ReviewList>
                <ToastContainer theme="dark" />
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