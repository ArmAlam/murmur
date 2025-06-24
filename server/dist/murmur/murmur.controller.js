"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MurmurController = void 0;
const common_1 = require("@nestjs/common");
const murmur_service_1 = require("./murmur.service");
let MurmurController = class MurmurController {
    constructor(murmurService) {
        this.murmurService = murmurService;
    }
    create(body) {
        return this.murmurService.createMurmur(body.userId, body.content);
    }
    delete(id, userId) {
        return this.murmurService.deleteMurmur(+id, userId);
    }
    getTimeline(userId, page = 1) {
        return this.murmurService.getTimeline(userId, +page);
    }
    getDetail(id) {
        return this.murmurService.getMurmurDetail(+id);
    }
};
exports.MurmurController = MurmurController;
__decorate([
    (0, common_1.Post)('me/murmurs'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MurmurController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)('me/murmurs/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], MurmurController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('murmurs/timeline'),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], MurmurController.prototype, "getTimeline", null);
__decorate([
    (0, common_1.Get)('murmurs/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MurmurController.prototype, "getDetail", null);
exports.MurmurController = MurmurController = __decorate([
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [murmur_service_1.MurmurService])
], MurmurController);
//# sourceMappingURL=murmur.controller.js.map