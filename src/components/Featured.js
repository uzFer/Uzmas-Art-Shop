import Center from "./Center";
import styled from "styled-components";

const Background = styled.div`
    background-color: #222; 
    color: #fff;
    padding: 50px 0;
`;

const Description = styled.p`
    color: #aaa;
    font-size: 1rem;
`;

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
`;

const Title = styled.h1`
    margin: 0;
    font-weight: normal;
`;

export default function Featured() {
    return (
        <Background> 
            <Center>
                <Wrapper>
                    <div>
                        <Title>m.A.A.d city</Title>
                        <Description>This painting serves as an homage to Uzma Ferdous&apos; favourite athlete, 
                        Kawhi Leonard, as well as her AUX cord go-to, Kendrick Lamar. 
                        She draws inspiration from the album cover of &apos;good kid, m.A.A.d city&apos;.
                        </Description>
                    </div>
                    <div>
                        
                    </div>
                </Wrapper>
            </Center>
        </Background>
    );
}