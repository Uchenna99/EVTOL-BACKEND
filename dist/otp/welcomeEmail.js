import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Html, Head, Body, Container, Heading, Text, } from "@react-email/components";
const WelcomeEmail = ({ name }) => {
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
                    }, children: [_jsx(Heading, { style: {
                                color: "#333",
                                textAlign: "center",
                                marginBottom: "20px",
                                fontSize: "28px",
                            }, children: "Welcome to EVTOL." }), _jsxs(Text, { style: {
                                fontSize: "16px",
                                lineHeight: "1.5",
                                color: "#333",
                                marginBottom: "20px",
                            }, children: ["Hello ", _jsx("strong", { children: name }), ","] }), _jsx(Text, { style: {
                                fontSize: "16px",
                                lineHeight: "1.5",
                                color: "#333",
                                marginBottom: "20px",
                            }, children: "We're excited to have you join us. Our platform is designed to make your experience seamless and productive. Here, you can explore amazing features and make the most out of your journey with us." }), _jsx(Text, { style: {
                                fontSize: "14px",
                                lineHeight: "1.5",
                                color: "#777",
                                marginBottom: "20px",
                            }, children: "If you have any questions or need assistance, feel free to reach out to our support team. We're here to help!" }), _jsx(Text, { style: {
                                fontSize: "14px",
                                lineHeight: "1.5",
                                color: "#777",
                                textAlign: "center",
                            }, children: "Thank you for choosing us. We're thrilled to have you on board!" })] }) })] }));
};
export default WelcomeEmail;
