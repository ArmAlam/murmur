import { MurmurService } from './murmur.service';
export declare class MurmurController {
    private readonly murmurService;
    constructor(murmurService: MurmurService);
    create(body: {
        userId: number;
        content: string;
    }): Promise<import("../entities/murmur.entity").Murmur>;
    delete(id: string, userId: number): Promise<import("../entities/murmur.entity").Murmur>;
    getTimeline(userId: number, page?: number): Promise<import("../entities/murmur.entity").Murmur[]>;
    getDetail(id: string): Promise<import("../entities/murmur.entity").Murmur>;
}
