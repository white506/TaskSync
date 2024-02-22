import { Module } from "@nestjs/common"
import { PrismaService } from "src/prisma.service"
import { TaskController } from "./task.controller"
import { TaskService } from "./task.service"
import { IsBoolean, IsEnum, IsOptional, IsString } from "class-validator"
import { Priority } from "prisma/generated/client"
import { Transform } from "class-transformer"

@Module({
	controllers: [TaskController],
	providers: [TaskService, PrismaService],
	exports: [TaskService],
})
export class TaskModule {
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
