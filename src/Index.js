"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const evtol_route_1 = __importDefault(require("./routes/evtol.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
dotenv_1.default.config();
const portEnv = process.env.PORT;
if (!portEnv) {
    console.error('Error: PORT is not defined in .env file');
    process.exit(1);
}
const PORT = parseInt(portEnv, 10);
if (isNaN(PORT)) {
    console.error('Error: PORT is not a number in .env file');
    process.exit(1);
}
const app = (0, express_1.default)();
const corsOptions = {
    origin: '*',
    credentilas: true,
    allowedHeaders: '*',
    methods: 'GET, POST, PUT, PATCH, DELETE, HEAD'
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use('/api/v1/users', user_route_1.default);
app.use('/api/v1/evtol', evtol_route_1.default);
app.use('/api/v1/auth', auth_route_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app;
