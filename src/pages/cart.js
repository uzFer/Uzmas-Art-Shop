import Box from "@/components/Box";
import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Table from "@/components/Table";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import mongooseConnect from "@/lib/mongoose";
import { Product } from "@/models/Product";

const ColWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px;
    margin-top: 40px;
    @media screen and (min-width: 768px) {
        grid-template-columns: 1.3fr 0.7fr;
    }
`;

const ProductInfoBox = styled.td`
    padding: 10px 0;
`;

const ProductImageBox = styled.div`
    width: 100%;
    height: 100%;
    padding: 2px;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    img {
        max-width: 100%;
        max-height: 130px;
        margin-right: 30px;
    }
    @media screen and (min-width: 768px) {
        background-color: #eee;
        margin-right: 0px;
        padding: 10px;
        height: 130px;
        width: 160px;
        img {
            margin-right: 0px;
        }
    }
`;

const QuantityWrapper = styled.div`
    text-align: center;
`;

const QuantityLabel = styled.span`
    padding: 0 3px;
    display: block;
    text-align: center;
    @media screen and (min-width: 830px) {
        display: inline-block;
    }
`;

const CityHolder = styled.div`
    display: flex;
    gap: 5px;
`;

export default function CartPage({allProducts}) { 
    const {cartProducts, addProduct, removeProduct, clearCart} = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('');
    const [paymentSuccessful, setPaymentSuccessful] = useState(false);

    function increaseProduct(id) {
        addProduct(id);
    }

    function decreaseProduct(id) {
        removeProduct(id);
    }

    let total = 0;
    for(const productId of cartProducts) {
        const price = products.find(p => p._id === productId)?.price || 0;
        total += price;
    }

    async function goToPayment() {
        const response = await axios.post('/api/checkout', {
            name, email, city, postalCode, address, country, 
            cartProducts,
        });

        if(response.data.url) {
            window.location = response.data.url;
        }
    }

    useEffect(() => {
        if(cartProducts.length > 0) {
            axios.post('/api/cart', {ids: cartProducts}).then(response => {
                setProducts(response.data);
            })
        }
        else {
            setProducts([]);
        }
    }, [cartProducts]); 

    useEffect(() => {
        if(typeof window === 'undefined') {
            return;
        }
        if(window?.location.href.includes('success')) {
            setPaymentSuccessful(true);
            clearCart();
        }
        else {
            setPaymentSuccessful(false);
        }
    }, []); 

    
    if(paymentSuccessful) {
        return (
            <>
                <Header products={allProducts} />
                <Center>
                    <ColWrapper>
                    </ColWrapper>
                    <Box>
                        <h1>Thanks for your order!</h1>
                        <p>We will email you about your delivery details!</p>
                    </Box>
                </Center>
            </>
        );
    }

    return (
        <div>
            <Header products={allProducts} />
            <Center> 
                <ColWrapper>
                    <Box>
                        <h2>Cart</h2>
                        {!cartProducts?.length &&
                            <div>Your cart is empty.</div>
                        }
                        {products?.length > 0 && (
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr> 
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product}>
                                            <ProductInfoBox>
                                                <ProductImageBox>
                                                    <img src={product.images[0]}></img>
                                                </ProductImageBox>
                                                {product.name}
                                            </ProductInfoBox>  
                                            <td>
                                                <QuantityWrapper>
                                                    <Button  onClick={() => increaseProduct(product._id)}>+</Button>
                                                    <QuantityLabel>
                                                        {cartProducts.filter(id => id === product._id).length}
                                                    </QuantityLabel>
                                                    <Button onClick={() => decreaseProduct(product._id)}>-</Button>
                                                </QuantityWrapper>
                                            </td>
                                            <td>
                                                ${(cartProducts.filter(id => id === product._id).length * product.price).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td>Total: ${total.toFixed(2)}</td>
                                    </tr>
                                    
                                </tbody>
                            </Table>
                        )}
                    </Box>
                    {!!cartProducts?.length &&
                        <Box>
                            <h2>Order Information</h2> 
                            <Input 
                                type="text" 
                                placeholder="Name" 
                                name="name"
                                value={name} 
                                onChange={(e) => setName(e.target.value)} />
                            <Input 
                                type="text" 
                                placeholder="Email" 
                                name="email"
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} />
                            <CityHolder>
                                <Input 
                                    type="text" 
                                    placeholder="City" 
                                    name="city"
                                    value={city} 
                                    onChange={(e) => setCity(e.target.value)} />
                                <Input 
                                    type="text" 
                                    placeholder="Postal Code" 
                                    name="postalCode"
                                    value={postalCode} 
                                    onChange={(e) => setPostalCode(e.target.value)} />
                            </CityHolder>
                            <Input 
                                type="text" 
                                placeholder="Street Address" 
                                name="address"
                                value={address} 
                                onChange={(e) => setAddress(e.target.value)} />
                            <Input 
                                type="text" 
                                placeholder="Country" 
                                name="country" 
                                value={country} 
                                onChange={(e) => setCountry(e.target.value)} />
                            <Button block black outline 
                                    onClick={goToPayment}>
                                Continue to payment
                            </Button>
                        </Box>
                    }
                </ColWrapper>
            </Center>
        </div>
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