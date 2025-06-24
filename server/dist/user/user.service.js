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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const murmur_entity_1 = require("../entities/murmur.entity");
const follow_entity_1 = require("../entities/follow.entity");
let UserService = class UserService {
    constructor(userRepo, murmurRepo, followRepo) {
        this.userRepo = userRepo;
        this.murmurRepo = murmurRepo;
        this.followRepo = followRepo;
    }
    async getUserProfile(userId) {
        const user = await this.userRepo.findOneBy({ id: userId });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const murmurs = await this.murmurRepo.find({
            where: { user: { id: userId } },
            order: { createdAt: 'DESC' },
        });
        const followCount = await this.followRepo.count({ where: { followerId: userId } });
        const followedCount = await this.followRepo.count({ where: { followingId: userId } });
        return {
            user,
            followCount,
            followedCount,
            murmurs,
        };
    }
    async followUser(followerId, followingId) {
        if (followerId === followingId)
            throw new Error("Can't follow yourself");
        const user = await this.userRepo.findOneBy({ id: followingId });
        if (!user)
            throw new common_1.NotFoundException('Target user not found');
        const existing = await this.followRepo.findOneBy({ followerId, followingId });
        if (existing)
            return existing;
        const follow = this.followRepo.create({ followerId, followingId });
        return this.followRepo.save(follow);
    }
    async unfollowUser(followerId, followingId) {
        const follow = await this.followRepo.findOneBy({ followerId, followingId });
        if (!follow)
            throw new common_1.NotFoundException('Not following');
        return this.followRepo.remove(follow);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(murmur_entity_1.Murmur)),
    __param(2, (0, typeorm_1.InjectRepository)(follow_entity_1.Follow)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map