"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MurmurModule = void 0;
const common_1 = require("@nestjs/common");
const murmur_service_1 = require("./murmur.service");
const murmur_controller_1 = require("./murmur.controller");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entities/user.entity");
const murmur_entity_1 = require("../entities/murmur.entity");
let MurmurModule = class MurmurModule {
};
exports.MurmurModule = MurmurModule;
exports.MurmurModule = MurmurModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, murmur_entity_1.Murmur])],
        providers: [murmur_service_1.MurmurService],
        controllers: [murmur_controller_1.MurmurController]
    })
], MurmurModule);
//# sourceMappingURL=murmur.module.js.map