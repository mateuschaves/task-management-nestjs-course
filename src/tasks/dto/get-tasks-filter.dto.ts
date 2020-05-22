import { TaskStatus } from './update-task.dto';
export class GetTaskFilterDto {
    status: TaskStatus;
    search: string;
}