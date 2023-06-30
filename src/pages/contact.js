import { useState } from 'react';
import Header from "@/components/Header";
import Button from '@/components/Button';
import mongooseConnect from '@/lib/mongoose';
import { Product } from '@/models/Product';
import Input from '@/components/Input';
import { useSession } from "next-auth/react";
import Box from '@/components/Box';
import Center from '@/components/Center';
import Title from '@/components/Title';
import { styled } from 'styled-components';

const Textarea = styled.textarea`
    width: 100%;
    padding: 5px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-family: inherit;
    box-sizing: border-box;
`;

const Label = styled.div`
    font-size: 1rem;
    font-weight: bold;
    margin: 10px 0;
`;

export default function ContactPage({allProducts}) {
    const { data: session } = useSession();
    const [name, setName] = useState(session ? session.user.name : '');
    const [email, setEmail] = useState(session ? session.user.email : '');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    function submitRequest() {
        if(!email && !name && !subject && !message) {
            return;
        }
        const info = {name, email, subject, message}
        console.log(info)
    }

    return (
    <>
        <Header products={allProducts}/>
        <Title props={'Contact me'} />
        <Center>
            <Box>
                <Label>Name:</Label>
                <Input type="text" name="name" value={name} 
                    onChange={(e) => {setName(e.target.value)}}
                />
                <Label>Email:</Label>
                <Input type="text" name="email" value={email}
                    onChange={(e) => {setEmail(e.target.value)}}
                />

                <Label>Subject:</Label>
                <Input type="text" name="subject" value={subject}
                    onChange={(e) => {setSubject(e.target.value)}}
                />

                <Label>Message:</Label>
                <Textarea name="message" value={message}
                    onChange={(e) => {setMessage(e.target.value)}}
                />

                <Button black outline onClick={submitRequest}>Submit Request</Button>
            </Box>
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