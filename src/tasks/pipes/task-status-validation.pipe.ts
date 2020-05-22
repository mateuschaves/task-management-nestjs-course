import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus, UpdateTaskDto } from '../dto/update-task.dto';

export class TaskStatusValidationPipe implements PipeTransform {

    readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ]

    transform(body: UpdateTaskDto) {
        const { status } = body;

        if (!this.isStatusValid(status)) {
            throw new BadRequestException(`${status} is an invalid status`);
        }

        return body;
    }

    private isStatusValid(status: any) {
        const idx = this.allowedStatuses.indexOf(status);
        return idx !== -1;
    }
}