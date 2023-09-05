import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Formations } from './Formations';
import { LessThan, Repository } from 'typeorm';
import { User } from '../users/User';
import {
  CreateFormationRequest,
  UpdateFormationRequest,
} from './dto/formations.request';

@Injectable()
export class FormationsService {
  constructor(
    @InjectRepository(Formations)
    private readonly formationsRepository: Repository<Formations>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async getUserFormation({ query }) {
    try {
      return this.formationsRepository.find({
        where: {
          users: {
            email: query.email,
          },
        },
      });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async getUserFormationAccomplished({ query }) {
    try {
      const formations = await this.formationsRepository.find({
        where: {
          users: {
            email: query.email,
          },
        },
      });

      const accomplishedFormations = await Promise.all(
        formations.map(async (element) => {
          return await this.formationsRepository.find({
            where: {
              language: element.language,
              level: LessThan(element.level),
            },
          });
        }),
      );

      return [].concat(...accomplishedFormations);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async createFormation(
    createFormationRequest: CreateFormationRequest,
  ): Promise<any> {
    try {
      return await this.formationsRepository.save(createFormationRequest);
    } catch (err) {
      throw new InternalServerErrorException(err.driverError.message);
    }
  }

  public getFormations(): Promise<Formations[]> {
    return this.formationsRepository.find({
      relations: {
        users: true,
      },
    });
  }

  async getFormationById(uuid: string): Promise<Formations> {
    const formations = await this.formationsRepository.findOneBy({ id: uuid });
    if (!formations) {
      throw new NotFoundException('formations not found');
    }

    return formations;
  }

  async update(
    uuid: string,
    updateFormationRequest: UpdateFormationRequest,
  ): Promise<any> {
    try {
      if (updateFormationRequest.title) {
        throw new BadRequestException(
          'Formation cannot be updated using this endpoint',
        );
      }
      const formations = await this.formationsRepository.findOneBy({
        id: uuid,
      });
      if (!formations) {
        throw new NotFoundException('Formation not found for update');
      }
      return await this.formationsRepository.update(
        uuid,
        updateFormationRequest,
      );
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async delete(uuid: string): Promise<any> {
    const formations = await this.formationsRepository.findOneBy({ id: uuid });
    if (!formations) {
      throw new NotFoundException('Formation not found for deletion');
    }

    await this.formationsRepository.remove(formations);
  }

  public async seed() {
    const former = 'Jean Pex';
    const formerPhp = 'Jean Php';
    const formerSharp = 'Jean Sharp';
    await this.formationsRepository.delete({});

    const user = await this.usersRepository.findOne({
      where: {
        email: 'user@user.com',
      },
      relations: {
        formations: true,
      },
    });

    let formation = this.formationsRepository.create({
      title: 'Javascript niveau 1',
      level: 1,
      language: 1,
      former,
    });
    await this.formationsRepository.save(formation);

    formation = this.formationsRepository.create({
      title: 'Javascript niveau 2',
      level: 2,
      language: 1,
      former,
    });
    await this.formationsRepository.save(formation);

    formation = this.formationsRepository.create({
      title: 'Javascript niveau 3',
      level: 3,
      language: 1,
      former,
    });
    await this.formationsRepository.save(formation);
    user.formations.push(formation);
    await this.usersRepository.save(user);

    formation = this.formationsRepository.create({
      title: 'Javascript niveau 4',
      level: 4,
      language: 1,
      former,
    });
    await this.formationsRepository.save(formation);

    formation = this.formationsRepository.create({
      title: 'Javascript niveau 5',
      level: 5,
      language: 1,
      former,
    });
    await this.formationsRepository.save(formation);

    formation = this.formationsRepository.create({
      title: 'PHP niveau 1',
      level: 1,
      language: 2,
      former: formerPhp,
    });
    await this.formationsRepository.save(formation);

    formation = this.formationsRepository.create({
      title: 'PHP niveau 2',
      level: 2,
      language: 2,
      former: formerPhp,
    });
    await this.formationsRepository.save(formation);
    user.formations.push(formation);
    await this.usersRepository.save(user);

    formation = this.formationsRepository.create({
      title: 'PHP niveau 3',
      level: 3,
      language: 2,
      former: formerPhp,
    });
    await this.formationsRepository.save(formation);

    formation = this.formationsRepository.create({
      title: 'PHP niveau 4',
      level: 4,
      language: 2,
      former: formerPhp,
    });
    await this.formationsRepository.save(formation);

    formation = this.formationsRepository.create({
      title: 'PHP niveau 5',
      level: 5,
      language: 2,
      former: formerPhp,
    });
    await this.formationsRepository.save(formation);

    formation = this.formationsRepository.create({
      title: 'C# niveau 1',
      level: 1,
      language: 3,
      former: formerSharp,
    });
    await this.formationsRepository.save(formation);
    user.formations.push(formation);
    await this.usersRepository.save(user);

    formation = this.formationsRepository.create({
      title: 'C# niveau 2',
      level: 2,
      language: 3,
      former: formerSharp,
    });
    await this.formationsRepository.save(formation);

    formation = this.formationsRepository.create({
      title: 'C# niveau 3',
      level: 3,
      language: 3,
      former: formerSharp,
    });
    await this.formationsRepository.save(formation);

    formation = this.formationsRepository.create({
      title: 'C# niveau 4',
      level: 4,
      language: 3,
      former: formerSharp,
    });
    await this.formationsRepository.save(formation);

    formation = this.formationsRepository.create({
      title: 'C# niveau 5',
      level: 5,
      language: 3,
      former: formerSharp,
    });
    await this.formationsRepository.save(formation);

    // await this.usersRepository.update();

    // const formationJAVA = await this.formationsRepository.save(formation);

    // const user = this.usersRepository.create({
    //   email: 'user1@user.com',
    //   password: 'user1',
    //   firstname: 'jean',
    //   lastname: 'jaeaje',
    //   formations: [formationJAVA],
    // });
    // await this.usersRepository.save(user);
  }
}
