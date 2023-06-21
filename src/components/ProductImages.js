import { useState } from "react";
import { styled } from "styled-components";

const Image = styled.img`
    max-width: 100%;
    max-height: 100%;
    margin-bottom: 10px;
    box-shadow: 0px 6px 8px 0 rgba(0, 0, 0, 0.2), 0px 6px 20px 0 rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;
    &:hover {
        cursor: pointer;
        box-shadow: none;
        background-color: #fff;
    }
`;

const MiniImage = styled.img`
    max-width: 100%;
    max-height: 100%;
    cursor: pointer;
`;

const ImageButtons = styled.div`
    display: flex;
    gap: 10px;
    flex-grow: 0;
`;

const ImageButton = styled.div`
    border: 1px solid #aaa;
    ${props => props.active ? `
        border-color: #aaa;
    ` : `
        border-color: transparent;
        opacity: 0.8;
    `}
    border-radius: 5px;
    height: 60px;
    padding: 5px;
`;

const ImageWrapper = styled.div`
    text-align: center;
`;

export default function ProductImages({images}) {
    const [activeImage, setActiveImage] = useState(images?.[0]);

    return (
        <>
            <ImageWrapper>
                <Image src={activeImage} />
            </ImageWrapper>
            <ImageButtons>
                {images.map(image => (
                    <ImageButton key={image} active={image === activeImage} onClick={() => setActiveImage(image)}>
                        <MiniImage src={image} alt="" />
                    </ImageButton>
                ))}
            </ImageButtons>
        </>
    );
}