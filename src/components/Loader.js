import { styled } from "styled-components";
import Header from "./Header";
import Center from "./Center";
import { primary } from "@/lib/colours";
import { HashLoader } from "react-spinners";

const LoadingWrapper = styled.div`
    height: 85vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default function Loader({loadingPathname}) {
    return (
    <>
        <Header  />
        <Center>
            <LoadingWrapper>
                <HashLoader color={primary} size={70} />
            </LoadingWrapper>
        </Center>
    </>
    );
}