import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Body, Container, Head, Heading, Html, Text } from '@react-email/components';
export const OtpEmail = ({ otp }) => {
    return (_jsxs(Html, { children: [_jsx(Head, {}), _jsx(Body, { style: {
                    fontFamily: "Arial, sans-serif",
                    padding: "20px",
                    backgroundColor: "#f9f9f9",
                }, children: _jsxs(Container, { style: {
                        maxWidth: "600px",
                        margin: "auto",
                        backgroundColor: "#ffffff",
                        padding: "20px",
                        borderRadius: "8px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }, children: [_jsx(Heading, { style: { color: "#333", textAlign: "center", marginBottom: "20px" }, children: "Email Verification" }), _jsx(Text, { style: { fontSize: "16px", lineHeight: "1.5", color: "#333" }, children: "Thank you for signing up! Please use the OTP below to verify your email address:" }), _jsx(Text, { style: {
                                fontSize: "24px",
                                fontWeight: "bold",
                                textAlign: "center",
                                margin: "20px 0",
                                color: "#007BFF",
                            }, children: otp }), _jsx(Text, { style: {
                                fontSize: "14px",
                                lineHeight: "1.5",
                                color: "#777",
                                textAlign: "center",
                            }, children: "This OTP is valid for 10 minutes. If you did not request this, please ignore this email." })] }) })] }));
};
export default OtpEmail;
