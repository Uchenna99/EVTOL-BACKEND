var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { IsNotEmpty, IsString, Length } from "class-validator";
export class CreateEvtolDTO {
}
__decorate([
    IsNotEmpty(),
    IsString(),
    Length(10, 100)
], CreateEvtolDTO.prototype, "serialNumber", void 0);
__decorate([
    IsNotEmpty()
], CreateEvtolDTO.prototype, "model", void 0);
__decorate([
    IsNotEmpty()
], CreateEvtolDTO.prototype, "image", void 0);
__decorate([
    IsNotEmpty()
], CreateEvtolDTO.prototype, "maxWeight", void 0);
