import { styled } from "styled-components";
import ProductBox from "./ProductBox";

const StyledProductsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    @media screen and (min-width: 630px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
`;

export default function ProductsGrid({products}) {
    return ( 
        <StyledProductsGrid>
            {products?.length > 0 && products.map(product => (
                <div key={product}>
                    <ProductBox {...product} /> 
                </div>
            ))}
        </StyledProductsGrid>
    );
}