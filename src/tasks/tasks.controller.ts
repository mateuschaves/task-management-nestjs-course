import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Logger } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {

    private logger = new Logger('TasksController');

    constructor(private taskService: TasksService) { }

    @Get()
    getTasks(
        @GetUser() user: User,
        @Query(ValidationPipe)
        filterDto: GetTaskFilterDto,
    ) {
        this.logger.verbose(`User ${user.username} retrieving all tasks. Filters ${JSON.stringify(filterDto)}`);
        return this.taskService.getTasks(filterDto, user);
    }

    @Get('/:id')
    getTaskById(
        @GetUser() user: User,
        @Param('id', ParseIntPipe) id: number
    ): Promise<Task> {
        console.log(user);
        return this.taskService.getTaskById(id, user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @GetUser() user: User,
        @Body() createTaskDto: CreateTaskDto
    ): Promise<Task> {
        this.logger.verbose(`User ${user.username} creating a new task. Data: ${JSON.stringify(createTaskDto)}`)
        return this.taskService.createTask(createTaskDto, user);
    }

    @Delete('/:id')
    deleteTask(
        @GetUser() user: User,
        @Param('id') id: number
    ): void {
        this.taskService.deleteTask(id, user);
    }

    @Patch('/:id/status')
    updateTask(
        @GetUser() user: User,
        @Param('id') id: number,
        @Body(TaskStatusValidationPipe) updateTaskDto: UpdateTaskDto
    ): Promise<Task> {
        return this.taskService.updateTask(id, updateTaskDto, user);
    }
}
