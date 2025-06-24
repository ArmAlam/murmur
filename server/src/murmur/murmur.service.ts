import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, In } from "typeorm";
import { Murmur } from "../entities/murmur.entity";
import { User } from "../entities/user.entity";

@Injectable()
export class MurmurService {
  constructor(
    @InjectRepository(Murmur)
    private murmurRepo: Repository<Murmur>,

    @InjectRepository(User)
    private userRepo: Repository<User>
  ) {}

  async createMurmur(userId: number, content: string) {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new NotFoundException("User not found");

    const murmur = this.murmurRepo.create({ user, content });
    return this.murmurRepo.save(murmur);
  }

  async deleteMurmur(murmurId: number, userId: number) {
    const murmur = await this.murmurRepo.findOne({
      where: { id: murmurId },
      relations: ["user"],
    });

    if (!murmur || murmur.user.id !== userId) {
      throw new NotFoundException("Murmur not found or not owned by user");
    }

    return this.murmurRepo.remove(murmur);
  }

  async getTimeline(userId: number, page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;

    // user follows + self
    const followed = await this.userRepo
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.following", "follow")
      .where("user.id = :id", { id: userId })
      .getOne();

    if (!followed) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const ids = followed.following.map((f) => f.followingId).concat(userId);

    return this.murmurRepo.find({
      where: { user: { id: In(ids) } },
      order: { createdAt: "DESC" },
      skip: offset,
      take: limit,
      relations: ["user", "likes"],
    });
  }

  async getMurmurDetail(id: number) {
    const murmur = await this.murmurRepo.findOne({
      where: { id },
      relations: ["user", "likes"],
    });
    if (!murmur) throw new NotFoundException("Murmur not found");
    return murmur;
  }
}
