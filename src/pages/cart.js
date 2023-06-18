import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Table from "@/components/Table";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";

const ColWrapper = styled.div`
    display: grid;
    grid-template-columns: 1.3fr 0.7fr;
    gap: 40px;
    margin-top: 40px;
`;

const Box = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
`;

const ProductInfoBox = styled.td`
    padding: 10px 0;
`;

const ProductImageBox = styled.div`
    width: 130px;
    height: 130px;
    padding: 10px;
    background-color: #eee;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    display: flex;
    justify-content: center;
    img {
        max-width: 130px;
        max-height: 130px;
    }
`;

export default function CartPage() { 
    const {cartProducts} = useContext(CartContext);
    const [products, setProducts] = useState([]);

    function calculatePrice(product) {
        return (cartProducts.filter(id => id === product._id).length * product.price);
    }

    useEffect(() => {
        if(cartProducts.length > 0) {
            axios.post('/api/cart', {ids: cartProducts}).then(response => {
                setProducts(response.data);
            })
        }
    }, [cartProducts]); 

    return (
        <div>
            <Header />
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
                                            <td>{cartProducts.filter(id => id === product._id).length}</td>
                                            <td>{calculatePrice(product)}</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        
                                    </tr>
                                    
                                </tbody>
                            </Table>
                        )}
                    </Box>
                    {!!cartProducts?.length &&
                        <Box>
                            <h2>Order Information</h2>
                            <input type="text" placeholder="Address"></input>
                            <input type="text" placeholder="Address 2"></input>
                            <Button block black outline>Continue to payment</Button>
                        </Box>
                    }
                </ColWrapper>
            </Center>
        </div>
    );
}