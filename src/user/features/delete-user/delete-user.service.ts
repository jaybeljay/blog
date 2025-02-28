import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/repositories/user.repository';

@Injectable()
export class DeleteUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async handle(id: string): Promise<void> {
    await this.userRepository.findOneOrFail({ where: { id } });

    await this.userRepository.delete(id);

    return;
  }
}
