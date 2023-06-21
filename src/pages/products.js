import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import mongooseConnect from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { styled } from "styled-components";

const Title = styled.h2`
    font-size: 2rem;
    padding: 10px;
    width: 240px;
    border-radius: 20px;
    margin: 30px 0 20px;
    font-weight: bold;
    background-color: #c1d955;
`;

export default function ProductsPage({products}) {
    return (
        <>
            <Header />
            <Center>
                <Title>All products</Title>
                <ProductsGrid products={products} />
            </Center>
        </>
    );
}

export async function getServerSideProps() {
    await mongooseConnect();
    const products = await Product.find({}, null, {sort:{'_id': -1}})
    return {
        props: {
            products: JSON.parse(JSON.stringify(products)),
        }
    };
}