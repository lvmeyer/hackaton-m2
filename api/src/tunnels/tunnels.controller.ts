import {
    Body,
    Controller,
    Get,
    Delete,
    HttpCode,
    HttpStatus,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
    ValidationPipe,
    Req,
    BadRequestException,
  } from '@nestjs/common';
import {
  AuthenticationRequired,
  HasRole,
} from '../authentication/authentication.decorator';
import { Role } from '../authentication/authentication.enum';
import { TunnelsService } from './tunnels.service';
import { Tunnel } from './Tunnel';
import { CreateTunnelDto, UpdateTunnelDto } from './dto/tunnels.request';

@Controller('tunnels')
export class TunnelsController {
  constructor(private readonly tunnelsService: TunnelsService) {}

  @Get()
  @AuthenticationRequired()
  @HttpCode(HttpStatus.OK)
  async getAllTunnels(): Promise<Tunnel[]> {
    return this.tunnelsService.getAllTunnels();
  }

  @Get(':uuid')
  @AuthenticationRequired()
  @HttpCode(HttpStatus.OK)
  async getTunnelById(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<Tunnel> {
    return this.tunnelsService.getTunnelById(uuid);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTunnel(@Body() createTunnelDto: CreateTunnelDto): Promise<Tunnel> {
    return this.tunnelsService.createTunnel(createTunnelDto);
  }

  @Patch(':uuid')
  @AuthenticationRequired()
  @HasRole(Role.WEBMASTER)
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateTunnel(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updateTunnelDto: UpdateTunnelDto,
  ): Promise<Tunnel> {
    return this.tunnelsService.updateTunnel(uuid, updateTunnelDto);
  }
  
  @Delete(':uuid')
  @AuthenticationRequired()
  @HasRole(Role.WEBMASTER)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTag(
    @Param('uuid', ParseUUIDPipe) uuid: string
    ): Promise<void> {
    return await this.tunnelsService.deleteTunnel(uuid);
  }
}
