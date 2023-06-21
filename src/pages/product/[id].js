import Box from "@/components/Box";
import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductImages from "@/components/ProductImages";
import Title from "@/components/Title";
import mongooseConnect from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useContext } from "react";
import { styled } from "styled-components";

const ColWrapper = styled.div` 
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px;
    margin-top: 40px;
    @media screen and (min-width: 768px) {
        grid-template-columns: 0.8fr 1.2fr;
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


export default function ProductPage({product}) {
    const {addProduct} = useContext(CartContext);

    return (
        <Wrapper>
            <Header />
            <Center>
                <ColWrapper>
                    <Box>
                        <ProductImages images={product.images}></ProductImages>
                    </Box>
                    <div>
                        <ProductInfo>
                            <Title>{product.name}</Title>
                            <p>{product.description}</p>
                        </ProductInfo>
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
                    </div>
                </ColWrapper>
            </Center>
        </Wrapper>
    );
}

export async function getServerSideProps(context) {
    await mongooseConnect();
    const {id} = context.query;
    const product = await Product.findById(id);
    
    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
        }
    };
}