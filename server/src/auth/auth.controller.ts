import {
	Body,
	Controller,
	HttpCode,
	Post,
	Req,
	Res,
	UnauthorizedException,
	UsePipes,
	ValidationPipe,
} from "@nestjs/common"
import { AuthService } from "./auth.service"
import { AuthDto } from "./dto/auth.dto"
import { Request, Response } from "express"

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post("login")
	async login(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
		const { refreshToken, ...responce } = await this.authService.login(dto)
		this.authService.addRefreshTokenToResponce(res, refreshToken)

		return responce
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post("register")
	async register(
		@Body() dto: AuthDto,
		@Res({ passthrough: true }) res: Response,
	) {
		const { refreshToken, ...responce } = await this.authService.register(dto)

		this.authService.addRefreshTokenToResponce(res, refreshToken)

		return this.authService.register(dto)
	}

	@HttpCode(200)
	@Post("login/access-token")
	async getNewToken(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
	) {
		const refreshTokenFromCookies =
			req.cookies[this.authService.REFRESH_TOKEN_NAME]

		if (!refreshTokenFromCookies) {
			this.authService.removeRefreshTokenToResponce(res)
			throw new UnauthorizedException("Refresh token not passed")
		}

		const { refreshToken, ...responce } = await this.authService.getNewTokens(
			refreshTokenFromCookies,
		)
		this.authService.addRefreshTokenToResponce(res, refreshToken)

		return responce
	}

	@HttpCode(200)
	@Post("logout")
	async logout(@Res({ passthrough: true }) res: Response) {
		this.authService.removeRefreshTokenToResponce(res)
		return true
	}
}
