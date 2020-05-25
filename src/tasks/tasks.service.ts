import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm'
import { Task } from './task.entity';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) { }

    async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto);
    }

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`Task with ID: ${id} not found`);
        }

        return found;
    }


    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);
    }

    async deleteTask(id: number): Promise<void> {
        const found = await this.getTaskById(id);
        await found.remove();
    }

    async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
        const { status } = updateTaskDto;
        const task = await this.getTaskById(id);
        task.status = status;
        await task.save();
        return task;
    }
}
