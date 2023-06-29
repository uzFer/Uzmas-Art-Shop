import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import mongooseConnect from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { useEffect, useState } from "react";
import Select from "react-select";
import { styled } from "styled-components";
import ReactLoading from "react-loading";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
    @media screen and (min-width: 768px) {
        flex-direction: row;
        justify-content: space-between;
    }
`;

const LoadingWrapper = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const options = [ 
    {value: 'abstract', label: 'Show abstract only'},
    {value: 'realistic', label: 'Show realistic only'},
    {value: 'lowtohigh', label: 'Price low to high'},
    {value: 'hightolow', label: 'Price high to low'},
];

const customStyles = {
    option: (defaultStyles, state) => ({
      ...defaultStyles,
      color: state.isSelected ? "#212529" : "#fff",
      cursor: "pointer",
      backgroundColor: state.isSelected ? "#a0a0a0" : "#212529",
    }),

    control: (defaultStyles) => ({
      ...defaultStyles,
      backgroundColor: "#222",
      border: "none",
      boxShadow: "none",
      cursor: "pointer",
    }),
    singleValue: (defaultStyles) => ({ ...defaultStyles, color: "#fff" }),
};

export default function ProductsPage({products}) {
    const [selected, setSelected] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [loading, setLoading] = useState(true);

    const handleChange = (selectedOption) => {
        setSelected(selectedOption);
        if(selectedOption?.value === 'abstract') {
            setFilteredProducts(products.filter(product => (
                product.category === '648ca6ed48dac8a0f94dc51e'
            )));
        }
        else if(selectedOption?.value === 'realistic') {
            setFilteredProducts(products.filter(product => (
                product.category === '648ca6f248dac8a0f94dc522'
            )));
        }
        else if(selectedOption?.value === 'lowtohigh') {
            setFilteredProducts(products.sort(
                (a, b) => (a.price > b.price) ? 1 : -1
            ));
        }
        else if(selectedOption?.value === 'hightolow') {
            setFilteredProducts(products.sort(
                (a, b) => (a.price < b.price) ? 1 : -1
            ));
        }
        else {
            setFilteredProducts(products);
        }
    };

    useEffect(() => {
        setLoading(false)
    }, [])

    if(loading) {
        return (
            <>
                <Header products={products} />
                <LoadingWrapper>
                        <ReactLoading type="spin" color="#0000FF"
                        height={100} width={50}/>
                </LoadingWrapper>
            </>
        );
    }
    return (
        <>
            <Header products={products} />
            <Center>
                <Wrapper>
                    <Title props={'All Paintings'} />
                    { /* <select style={dropdownStyle} name="dropdown" onChange={e => changeFilter(e.target.value)}>
                        <option value="">Sort by</option>
                        <option value="abstract">Show abstract only</option>
                        <option value="realistic">Show realistic only</option>
                        <option value="ltoh">Price low to high</option>
                        <option value="htol">Price high to low</option>
                        </select> */ }
                    <Select 
                        onChange={handleChange}
                        styles={customStyles}
                        autoFocus={true}
                        isClearable={true}
                        options={options} />
                </Wrapper>
                <ProductsGrid products={filteredProducts} />
            </Center>
        </>
    );
}

export async function getServerSideProps() {
    await mongooseConnect();
    const categories = await Category.find({}, null, {sort:{'_id': -1}});
    const products = await Product.find({}, null, {sort:{'_id': -1}});
    
    return { 
        props: {
            categories: JSON.parse(JSON.stringify(categories)),
            products: JSON.parse(JSON.stringify(products)),
        }
    };
}