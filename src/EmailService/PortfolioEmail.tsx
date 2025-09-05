import React from 'react';
import { Head, Html, Text, Container, Body, Heading } from '@react-email/components';
import dotenv from "dotenv";
dotenv.config();

interface WelcomeEmailProps {
  name: string;
  message: string;
  email?: string;
}

export const PortfolioEmail = ({ name, message, email }: WelcomeEmailProps) => {
  return (
    
   <Html>
     <Head />
     <Body
       style={{
         fontFamily: "Arial, sans-serif",
         padding: "20px",
         backgroundColor: "#f4f4f4",
       }}
     >
       <Container
         style={{
           maxWidth: "600px",
           margin: "auto",
           backgroundColor: "#ffffff",
           padding: "20px",
           borderRadius: "8px",
           boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
         }}
       >
         <Heading
           style={{
             color: "#333",
             textAlign: "center",
             marginBottom: "20px",
             fontSize: "28px",
           }}
         >
           Message from {name}
         </Heading>

         <Text
           style={{
             fontSize: "16px",
             lineHeight: "1.5",
             color: "#333",
             marginBottom: "20px",
           }}
         >
           {email}
         </Text>

         <Text
           style={{
             fontSize: "16px",
             lineHeight: "1.5",
             color: "#333",
             marginBottom: "20px",
           }}
         >
           {message}
         </Text>
         
       </Container>
     </Body>
   </Html>
  )
};

export default PortfolioEmail;