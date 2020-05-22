export class UpdateTaskDto {
    status: TaskStatus
}


export enum TaskStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
} 