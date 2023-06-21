import Box from "@/components/Box";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import mongooseConnect from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { styled } from "styled-components";

const ColWrapper = styled.div` 
    display: grid;
    grid-template-columns: 0.8fr 1.2fr;
    gap: 40px;
    margin-top: 40px;
    img {
        max-width: 100%;
        max-height: 100%;
        box-shadow: 0px 6px 8px 0 rgba(0, 0, 0, 0.2), 0px 6px 20px 0 rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease-in-out;
        &:hover {
            cursor: pointer;
            box-shadow: none;
            background-color: #fff;
        }
    }
`;


export default function ProductPage({product}) {
    return (
        <>
            <Header />
            <Center>
                <ColWrapper>
                    <Box>
                        <img src={product.images?.[0]} />
                    </Box>
                    <div>
                        <Title>{product.name}</Title>
                        <p>{product.description}</p>
                    </div>
                </ColWrapper>
            </Center>
        </>
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