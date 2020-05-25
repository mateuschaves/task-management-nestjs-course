import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) { }

    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.signUp(authCredentialsDto);
    }

    async singIn(authCredentialsDto: AuthCredentialsDto) {
        const username = await this.userRepository.validateUserPassword(authCredentialsDto);

        if (!username) {
            throw new UnauthorizedException('Invalid credentials');
        }
    }
}
