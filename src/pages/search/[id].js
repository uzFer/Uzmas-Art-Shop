import ButtonLink from "@/components/ButtonLink";
import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductBox from "@/components/ProductBox";
import ProductImages from "@/components/ProductImages";
import mongooseConnect from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useRouter } from 'next/router';
import { styled } from "styled-components";

const ProductWrapper = styled.div`
    background-color: #fff;
    padding: 15px;
    border-radius: 10px;
    display: grid;
    grid-template-columns: 0.8fr 1.4fr;
    text-align: left;
    align-items: center;
    margin: 10px;
`;

const ProductImage = styled.img`
    height: 150px;
    max-width: 100%;
`;

const ProductInfo = styled.div`
    
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
                            <ProductImage src={product?.images[0]} />
                            <ProductInfo>
                                <h2>{product.name}</h2>
                                <p>{product.description}</p>
                                <ButtonLink 
                                    href={'/product/' + product._id} 
                                    black={1} outline={1} size="m">
                                    Read more
                                </ButtonLink>
                            </ProductInfo>
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