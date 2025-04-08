import prisma from '../models';
import { CreateTaskInput, UpdateTaskInput } from '../schemas/task.schema';

export class TaskService {
  async createTask(userId: string, data: CreateTaskInput) {
    return prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        status: data.status || 'pending',
        userId
      }
    });
  }

  async getUserTasks(userId: string) {
    return prisma.task.findMany({
      where: {
        userId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async getTaskById(taskId: string, userId: string) {
    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId
      }
    });

    if (!task) {
      throw new Error('Task not found');
    }

    return task;
  }

  async updateTask(taskId: string, userId: string, data: UpdateTaskInput) {
    // Check if task exists and belongs to user
    await this.getTaskById(taskId, userId);

    return prisma.task.update({
      where: {
        id: taskId
      },
      data
    });
  }

  async deleteTask(taskId: string, userId: string) {
    // Check if task exists and belongs to user
    await this.getTaskById(taskId, userId);

    return prisma.task.delete({
      where: {
        id: taskId
      }
    });
  }
}

export default new TaskService();
