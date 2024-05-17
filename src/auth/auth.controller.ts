// NestJS
import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// Application
import { AuthService } from './auth.service';
import { AuthenticateRequestDTO } from './dto';
import { Public } from './public.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    public constructor(private authService: AuthService) { }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post()
    public signIn(@Body() signInDto: AuthenticateRequestDTO) {
        return this.authService.authenticate(signInDto.email, signInDto.secret);
    }
}
