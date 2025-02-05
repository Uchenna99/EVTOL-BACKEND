"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServicesImpl = void 0;
const db_1 = require("../../config/db");
const password_utils_1 = require("../../utils/password.utils");
const email_1 = require("../../otp/email");
const otp_utils_1 = require("../../utils/otp.utils");
class UserServicesImpl {
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const findUser = yield db_1.db.user.findUnique({
                where: { email: data.email }
            });
            if (findUser) {
                throw new Error('Sorry, this email has already been used');
            }
            else {
                const otp = (0, otp_utils_1.generateOtp)();
                const newUser = yield db_1.db.user.create({
                    data: {
                        firstName: data.firstName,
                        lastName: data.lastName,
                        age: data.age,
                        phoneNumber: data.phoneNumber,
                        region: data.region,
                        email: data.email,
                        password: yield (0, password_utils_1.hashPassword)(data.password)
                    }
                });
                yield (0, email_1.sendOtpEmail)({
                    to: data.email,
                    subject: "Verify your email",
                    otp: otp,
                })
                    .then(() => __awaiter(this, void 0, void 0, function* () {
                    yield db_1.db.user.update({
                        where: { email: data.email },
                        data: {
                            otp: yield (0, password_utils_1.hashPassword)(otp),
                            otpExpiry: this.generateOtpExpiration()
                        }
                    });
                }));
                return newUser;
            }
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findUser = yield db_1.db.user.findFirst({
                where: { id }
            });
            if (!findUser) {
                throw new Error(`User with id: ${id} not found`);
            }
            else {
                return findUser;
            }
        });
    }
    updateUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const findUser = yield db_1.db.user.findUnique({
                where: { id }
            });
            if (!findUser) {
                throw new Error(`User with id: ${id} not found`);
            }
            else {
                const updatedUser = yield db_1.db.user.update({
                    where: { id },
                    data
                });
                return updatedUser;
            }
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.db.user.delete({
                where: { id }
            });
        });
    }
    createOrder(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newOrder = yield db_1.db.order.create({
                data
            });
            return newOrder;
        });
    }
    getAllMeds() {
        return __awaiter(this, void 0, void 0, function* () {
            const allMeds = yield db_1.db.medications.findMany({});
            return allMeds;
        });
    }
    generateOtpExpiration() {
        return new Date(Date.now() + 10 * 60 * 1000);
    }
}
exports.UserServicesImpl = UserServicesImpl;
