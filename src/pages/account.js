import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import mongooseConnect from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function AccountPage({allProducts}) {
    return (
        <>
            <Header products={allProducts} />
            <Center>
                <Title props={'Your account'} />
            </Center>
        </>
    );
}

export async function getServerSideProps() {
    await mongooseConnect();
    const products = await Product.find({}, null, {sort:{'_id': -1}});
    
    return { 
        props: {
            allProducts: JSON.parse(JSON.stringify(products)),
        }
    };
}