var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { IsEmail, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";
export class CreatUserDTO {
}
__decorate([
    IsNotEmpty(),
    IsString()
], CreatUserDTO.prototype, "firstName", void 0);
__decorate([
    IsNotEmpty(),
    IsString()
], CreatUserDTO.prototype, "lastName", void 0);
__decorate([
    IsNotEmpty(),
    IsString(),
    Length(11, 14)
], CreatUserDTO.prototype, "phoneNumber", void 0);
__decorate([
    IsNumber(),
    IsNotEmpty()
], CreatUserDTO.prototype, "age", void 0);
__decorate([
    IsNotEmpty(),
    IsString()
], CreatUserDTO.prototype, "region", void 0);
__decorate([
    IsNotEmpty(),
    IsString(),
    IsEmail()
], CreatUserDTO.prototype, "email", void 0);
__decorate([
    IsNotEmpty(),
    IsString(),
    Length(8, 25)
], CreatUserDTO.prototype, "password", void 0);
