"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioEmail = void 0;
const react_1 = __importDefault(require("react"));
const components_1 = require("@react-email/components");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PortfolioEmail = ({ name, message, email }) => {
    return (react_1.default.createElement(components_1.Html, null,
        react_1.default.createElement(components_1.Head, null),
        react_1.default.createElement(components_1.Body, { style: {
                fontFamily: "Arial, sans-serif",
                padding: "20px",
                backgroundColor: "#f4f4f4",
            } },
            react_1.default.createElement(components_1.Container, { style: {
                    maxWidth: "600px",
                    margin: "auto",
                    backgroundColor: "#ffffff",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                } },
                react_1.default.createElement(components_1.Heading, { style: {
                        color: "#333",
                        textAlign: "center",
                        marginBottom: "20px",
                        fontSize: "28px",
                    } },
                    "Message from ",
                    name),
                react_1.default.createElement(components_1.Text, { style: {
                        fontSize: "16px",
                        lineHeight: "1.5",
                        color: "#333",
                        marginBottom: "20px",
                    } }, email),
                react_1.default.createElement(components_1.Text, { style: {
                        fontSize: "16px",
                        lineHeight: "1.5",
                        color: "#333",
                        marginBottom: "20px",
                    } }, message)))));
};
exports.PortfolioEmail = PortfolioEmail;
exports.default = exports.PortfolioEmail;
