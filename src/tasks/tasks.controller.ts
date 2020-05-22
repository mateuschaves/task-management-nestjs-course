import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model'
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) { }

    @Get()
    getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
        if (Object.keys(filterDto).length)
            return this.taskService.getTasksWithFilters(filterDto);
        else
            return this.taskService.getAllTasks();
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.taskService.getTaskById(id);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.taskService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
        this.taskService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Task {
        return this.taskService.updateTask(id, updateTaskDto);
    }
}
