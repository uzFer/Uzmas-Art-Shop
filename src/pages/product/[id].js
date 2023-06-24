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
import { useContext, useEffect } from "react";
import { css, styled } from "styled-components";

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

const PriceRow = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: center;
    @media screen and (min-width: 768px) {
        justify-content: left;
    }
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

export default function ProductPage({product, categories, allProducts}) {
    const {addProduct} = useContext(CartContext);
    const {addFavourite} = useContext(FavouritesContext);

    useEffect(() => {

    }, [product]);

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
                        <PriceRow>
                            <div>
                                <Price>
                                    ${product.price}
                                </Price>
                            </div>
                            <div>
                                <Button black outline onClick={() => addProduct(product._id)}>
                                    Add to cart
                                </Button>
                            </div>
                        </PriceRow>
                        <Button primary onClick={() => addFavourite(product._id)}>Add to favourites</Button>
                    </div>
                </ColWrapper>
            </Center>
        </Wrapper>
    );
}

export async function getServerSideProps(context) {
    await mongooseConnect();
    const {id} = context.query;
    console.log(context)
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