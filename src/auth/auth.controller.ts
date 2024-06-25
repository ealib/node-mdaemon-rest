// NestJS
import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

// Application
import { AuthService } from './auth.service';
import { AuthenticateRequestDTO, AuthenticateResponseDTO } from './dto';
import { Public } from './public.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    public constructor(private authService: AuthService) { }

    /**
     * Authenticate credentials against MDaemon user list.
     * 
     * @param signInDto user's credentials to verify.
     * @returns AuthenticateResponseDTO on success.
     */
    @Public()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ operationId: 'authSignIn' })
    @Post()
    public async signIn(@Body() signInDto: AuthenticateRequestDTO): Promise<AuthenticateResponseDTO> {
        return await this.authService.authenticate(signInDto.email, signInDto.secret);
    }
}
