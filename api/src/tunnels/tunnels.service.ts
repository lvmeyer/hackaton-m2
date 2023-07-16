import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tunnel } from './Tunnel';
import { CreateTunnelDto, UpdateTunnelDto } from './dto/tunnels.request';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class TunnelsService {
  constructor(
    @InjectRepository(Tunnel)
    private readonly tunnelsRepository: Repository<Tunnel>,
  ) {}

  async getAllTunnels(): Promise<Tunnel[]> {
    return this.tunnelsRepository.find();
  }

  async getTunnelById(uuid: string): Promise<Tunnel> {
    const options: FindOneOptions<Tunnel> = { where: { id: uuid } };
    const tunnel = await this.tunnelsRepository.findOne(options);
    if (!tunnel) {
      throw new NotFoundException('Tunnel not found');
    }
    return tunnel;
  }

  async createTunnel(createTunnelDto: CreateTunnelDto): Promise<Tunnel> {
    const { tags, ...rest } = createTunnelDto;
  
    const tunnel = this.tunnelsRepository.create({
      ...rest,
      tags: tags.map((tag) => ({ id: tag })),
    });
  
    return this.tunnelsRepository.save(tunnel);
  }
  

  async updateTunnel(uuid: string, updateTunnelDto: UpdateTunnelDto): Promise<Tunnel> {
    const tunnel = await this.getTunnelById(uuid);
    tunnel.comment = updateTunnelDto.comment;
    return this.tunnelsRepository.save(tunnel);
  }

  async deleteTunnel(uuid: string): Promise<void> {
    const tunnel = await this.getTunnelById(uuid);
    await this.tunnelsRepository.remove(tunnel);
  }
}
