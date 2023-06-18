import { styled } from "styled-components";
import Center from "./Center";
import ProductBox from "./ProductBox";

const ProductsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 40px;
`;

const Title = styled.h2`
    font-size: 2rem;
    padding: 10px;
    width: 250px;
    border-radius: 20px;
    margin: 30px 0 20px;
    font-weight: bold;
    background-color: #c1d955;
`;

export default function NewProducts({products}) {
    return (
        <Center>
            <Title>New Paintings</Title>
            <ProductsGrid>
                {products?.length > 0 && products.map(product => (
                    <div key={product}>
                        <ProductBox {...product} /> 
                    </div>
                ))}
            </ProductsGrid>
        </Center>
    );
}