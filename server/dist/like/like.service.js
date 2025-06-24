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
exports.LikeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const like_entity_1 = require("../entities/like.entity");
const murmur_entity_1 = require("../entities/murmur.entity");
const user_entity_1 = require("../entities/user.entity");
let LikeService = class LikeService {
    constructor(likeRepo, murmurRepo, userRepo) {
        this.likeRepo = likeRepo;
        this.murmurRepo = murmurRepo;
        this.userRepo = userRepo;
    }
    async likeMurmur(userId, murmurId) {
        const user = await this.userRepo.findOneBy({ id: userId });
        const murmur = await this.murmurRepo.findOneBy({ id: murmurId });
        if (!user || !murmur)
            throw new common_1.NotFoundException('User or Murmur not found');
        const alreadyLiked = await this.likeRepo.findOneBy({ userId, murmurId });
        if (alreadyLiked)
            return alreadyLiked;
        const like = this.likeRepo.create({ userId, murmurId, user, murmur });
        return this.likeRepo.save(like);
    }
    async unlikeMurmur(userId, murmurId) {
        const like = await this.likeRepo.findOneBy({ userId, murmurId });
        if (!like)
            throw new common_1.NotFoundException('Like not found');
        return this.likeRepo.remove(like);
    }
};
exports.LikeService = LikeService;
exports.LikeService = LikeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(like_entity_1.Like)),
    __param(1, (0, typeorm_1.InjectRepository)(murmur_entity_1.Murmur)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], LikeService);
//# sourceMappingURL=like.service.js.map