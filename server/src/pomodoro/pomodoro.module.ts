import { Module } from "@nestjs/common"
import { PrismaService } from "src/prisma.service"
import { PomodoroController } from "./pomodoro.controller"
import { PomodoroService } from "./pomodoro.service"
import { IsBoolean, IsEnum, IsOptional, IsString } from "class-validator"
import { Priority } from "prisma/generated/client"
import { Transform } from "class-transformer"

@Module({
	controllers: [PomodoroController],
	providers: [PomodoroService, PrismaService],
	exports: [PomodoroService],
})
export class PomodoroModule {
	@IsString()
	@IsOptional()
	name: string

	@IsBoolean()
	@IsOptional()
	isComleted?: boolean

	@IsString()
	@IsOptional()
	createdAt?: string

	@IsEnum(Priority)
	@IsOptional()
	@Transform(({ value }) => ("" + value).toLowerCase())
	priority?: Priority
}
