import { styled } from "styled-components";
import Center from "./Center";
import ProductsGrid from "./ProductsGrid";
import Title from "./Title";
import Button from "./Button";

const Container = styled.div`
    background-color: #222;
    box-shadow: 0px 6px 4px 0 rgba(0, 0, 0, 0.2), 0px 6px 6px 0 rgba(0, 0, 0, 0.1);
    color: #fff;
    margin: 60px 0 0 0;
    padding: 10px 0 20px 0;
    text-align: center;
    border-radius: 10px;
`;

export default function NewProducts({products}) {
    return (
        <Center>
            <Title props={'New Paintings'} />
            <ProductsGrid products={products} />
            <Container>
                <h2>Have a specific request?</h2>
                <Button primary outline>Send commission request</Button>
            </Container>
        </Center>
    );
}