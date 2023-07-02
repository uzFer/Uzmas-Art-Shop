import { useState, useRef } from 'react';
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
import emailjs from '@emailjs/browser';
import { useRouter } from "next/router";

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

const Form = styled.form`
    
`;

const Subtitle = styled.div`
    font-size: 1rem;
    font-weight: bold;
    margin: 10px 0 25px 0;
`;

export default function ContactPage({allProducts}) {
    const { data: session } = useSession();
    const form = useRef();
    const router = useRouter();

    const sendEmail = (e) => {
        e.preventDefault();
       
        emailjs.sendForm('service_tarhdfv', 'template_pju7lfh', form.current, 'u2q1TMt9Ia_zTe7CC')
        .then((result) => {
            console.log(result.text);
            router.push('/');

        }, (error) => {
            console.log(error.text);
        });
    }

    return (
    <>
        <Header products={allProducts}/>
        <Title props={'Contact me'} />
        <Center>
            <Box>
                <Form ref={form} onSubmit={sendEmail}>
                    <Subtitle>Please fill out the following fields with your request: </Subtitle>
                    <Label>Name:</Label>
                    <Input type="text" name="user_name" placeholder={session?.user.name} required />
                    <Label>Email:</Label>
                    <Input type="text" name="user_email" placeholder={session?.user.email} required />
                    <Label>Subject:</Label>
                    <Input type="text" name="subject" required />
                    <Label>Message:</Label>
                    <Textarea name="message" rows={5} required />
                    <Button black={1} outline={1} type="submit">Submit Request</Button>
                </Form>
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