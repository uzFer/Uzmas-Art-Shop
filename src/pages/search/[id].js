import ButtonLink from "@/components/ButtonLink";
import Center from "@/components/Center";
import Header from "@/components/Header";
import mongooseConnect from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useRouter } from 'next/router';
import { styled } from "styled-components";

const ProductWrapper = styled.div`
    padding: 15px;
    border-radius: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    margin: 10px;
    background-color: #fff;
    @media screen and (min-width: 700px) {
        grid-template-columns: 0.5fr 1.5fr;
    }
`;

const ProductImage = styled.img`
    max-height: 100%;
    width: 150px;
`;

const ImageWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const ProductInfo = styled.div`
    background: linear-gradient(180deg, rgba(0, 0, 0, 1) 10%, rgba(255, 255, 255, 0) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;


export default function SearchResultPage({allProducts}) {
    const router = useRouter();
    const searchEntry = router.query.id;

    return (
        <>
            <Header products={allProducts} />
            <Center>
                <h2>Search Results for: &quot;{searchEntry}&quot;</h2>
                {allProducts?.map(product => (
                    <>
                    {searchEntry !== '' && product.name.toLowerCase().includes(searchEntry.toLowerCase()) &&
                        <ProductWrapper>
                            <ImageWrapper>
                                <ProductImage src={product?.images[0]} />
                            </ImageWrapper>
                            <div>
                                <h2>{product.name}</h2>
                                <ProductInfo>{product.description.substring(0, 110)}...</ProductInfo>
                                
                                <ButtonLink 
                                    href={'/product/' + product._id} 
                                    black={1} outline={1} size="m">
                                    Read more
                                </ButtonLink>
                            </div>
                        </ProductWrapper>
                    }
                    </>
                ))}
            </Center>
        </>
    );
}

export async function getServerSideProps(context) {
    await mongooseConnect();
    const {id} = context.query;
    const products = await Product.find({}, null, {sort:{'_id': -1}});

    return {
        props: {
            allProducts: JSON.parse(JSON.stringify(products)),
        }
    };
}