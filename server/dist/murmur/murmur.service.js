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
exports.MurmurService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const murmur_entity_1 = require("../entities/murmur.entity");
const user_entity_1 = require("../entities/user.entity");
let MurmurService = class MurmurService {
    constructor(murmurRepo, userRepo) {
        this.murmurRepo = murmurRepo;
        this.userRepo = userRepo;
    }
    async createMurmur(userId, content) {
        const user = await this.userRepo.findOneBy({ id: userId });
        if (!user)
            throw new common_1.NotFoundException("User not found");
        const murmur = this.murmurRepo.create({ user, content });
        return this.murmurRepo.save(murmur);
    }
    async deleteMurmur(murmurId, userId) {
        const murmur = await this.murmurRepo.findOne({
            where: { id: murmurId },
            relations: ["user"],
        });
        if (!murmur || murmur.user.id !== userId) {
            throw new common_1.NotFoundException("Murmur not found or not owned by user");
        }
        return this.murmurRepo.remove(murmur);
    }
    async getTimeline(userId, page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const followed = await this.userRepo
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.following", "follow")
            .where("user.id = :id", { id: userId })
            .getOne();
        if (!followed) {
            throw new common_1.NotFoundException(`User with ID ${userId} not found`);
        }
        const ids = followed.following.map((f) => f.followingId).concat(userId);
        return this.murmurRepo.find({
            where: { user: { id: (0, typeorm_2.In)(ids) } },
            order: { createdAt: "DESC" },
            skip: offset,
            take: limit,
            relations: ["user", "likes"],
        });
    }
    async getMurmurDetail(id) {
        const murmur = await this.murmurRepo.findOne({
            where: { id },
            relations: ["user", "likes"],
        });
        if (!murmur)
            throw new common_1.NotFoundException("Murmur not found");
        return murmur;
    }
};
exports.MurmurService = MurmurService;
exports.MurmurService = MurmurService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(murmur_entity_1.Murmur)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], MurmurService);
//# sourceMappingURL=murmur.service.js.map