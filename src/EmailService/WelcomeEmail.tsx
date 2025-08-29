import React from 'react';
import { Button, Head, Html, Text, Container, Section } from '@react-email/components';
import dotenv from "dotenv";
dotenv.config();

interface WelcomeEmailProps {
  name: string;
}

export const WelcomeEmail = ({ name }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Container style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <Section>
        <Text style={{ fontSize: '24px', fontWeight: 'bold' }}>
          Welcome, {name}!
        </Text>
        <Text>
          Thank you for joining {process.env.SMTP_APPNAME || 'our app'}! We're excited to have you on board.
        </Text>
        <Button
          href="http://localhost:5174"
          style={{
            backgroundColor: '#2563eb',
            color: '#ffffff',
            padding: '10px 20px',
            borderRadius: '5px',
            textDecoration: 'none',
          }}
        >
          Visit Our App
        </Button>
      </Section>
    </Container>
  </Html>
);

export default WelcomeEmail;