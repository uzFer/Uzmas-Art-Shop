import { styled } from "styled-components";
import Center from "./Center";
import ProductsGrid from "./ProductsGrid";
import Title from "./Title";
import Button from "./Button";
import { useRouter } from "next/router";

const Container = styled.div`
    background-color: #222;
    box-shadow: 0px 6px 4px 0 rgba(0, 0, 0, 0.2), 0px 6px 6px 0 rgba(0, 0, 0, 0.1);
    color: #fff;
    margin: 60px 0 0 0;
    padding: 10px 10px 20px 10px;
    text-align: center;
    border-radius: 10px;
`;

export default function NewProducts({products}) {
    const router = useRouter();

    function goToContactForm() {
        router.push('/contact')
    }
    
    return (
        <>
        <Title props={'New Paintings'} />
        <Center>
            <ProductsGrid products={products} />
            <Container>
                <h2>Don&apos;t see the painting you want?</h2>
                <Button primary={1} outline={1} onClick={goToContactForm}>Send commission request</Button>
            </Container> 
        </Center>
        </>
    );
}