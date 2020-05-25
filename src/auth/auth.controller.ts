import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) { }

    @Post('/signup')
    @UsePipes(ValidationPipe)
    signUp(@Body() authCredetialsDto: AuthCredentialsDto) {
        return this.authService.signUp(authCredetialsDto);
    }
}
