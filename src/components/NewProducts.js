import Center from "./Center";
import ProductsGrid from "./ProductsGrid";
import Title from "./Title";

export default function NewProducts({products}) {
    return (
        <Center>
            <Title props={'New Paintings'} />
            <ProductsGrid products={products} />
        </Center>
    );
}