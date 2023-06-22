import Center from "@/components/Center";
import Header from "@/components/Header";
import { styled } from "styled-components";

const Title = styled.h2`
    font-size: 2rem;
    padding: 10px;
    width: 235px;
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
                <Title>Your Account</Title>
            </Center>
        </>
    );
}