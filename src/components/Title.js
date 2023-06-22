import { primary } from "@/lib/colours";
import { styled } from "styled-components";

const TitleWrapper = styled.h2`
    padding: 10px;
    margin: 30px 0 20px;
`;

const TitleText = styled.span`
    font-size: 1.9rem;
    padding: 10px;
    border-radius: 20px;
    font-weight: bold;
    background-color: #222;
    color: #fff;
`;

export default function Title({props}) {
    return (
        <TitleWrapper>
            <TitleText>{props}</TitleText>
        </TitleWrapper>
    );
}