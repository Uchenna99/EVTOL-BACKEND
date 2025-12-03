import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Head, Html, Text, Container, Body, Heading } from '@react-email/components';
import dotenv from "dotenv";
dotenv.config();
export const PortfolioEmail = ({ name, message, email }) => {
    return (_jsxs(Html, { children: [_jsx(Head, {}), _jsx(Body, { style: {
                    fontFamily: "Arial, sans-serif",
                    padding: "20px",
                    backgroundColor: "#f4f4f4",
                }, children: _jsxs(Container, { style: {
                        maxWidth: "600px",
                        margin: "auto",
                        backgroundColor: "#ffffff",
                        padding: "20px",
                        borderRadius: "8px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }, children: [_jsxs(Heading, { style: {
                                color: "#333",
                                textAlign: "center",
                                marginBottom: "20px",
                                fontSize: "28px",
                            }, children: ["Message from ", name] }), _jsx(Text, { style: {
                                fontSize: "16px",
                                lineHeight: "1.5",
                                color: "#333",
                                marginBottom: "20px",
                            }, children: email }), _jsx(Text, { style: {
                                fontSize: "16px",
                                lineHeight: "1.5",
                                color: "#333",
                                marginBottom: "20px",
                            }, children: message })] }) })] }));
};
export default PortfolioEmail;
