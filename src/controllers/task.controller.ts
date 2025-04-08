import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import taskService from '../services/task.service';
import { CreateTaskInput, UpdateTaskInput } from '../schemas/task.schema';

export class TaskController {
  async createTask(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          status: 'error',
          message: 'Unauthorized'
        });
        return;
      }

      const data = req.body as CreateTaskInput;
      const task = await taskService.createTask(req.user.userId, data);

      res.status(201).json({
        status: 'success',
        message: 'Task created successfully',
        data: task
      });
    } catch (error: any) {
      res.status(400).json({
        status: 'error',
        message: error.message
      });
    }
  }

  async getUserTasks(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          status: 'error',
          message: 'Unauthorized'
        });
        return;
      }

      const tasks = await taskService.getUserTasks(req.user.userId);

      res.status(200).json({
        status: 'success',
        message: 'Tasks retrieved successfully',
        data: tasks
      });
    } catch (error: any) {
      res.status(400).json({
        status: 'error',
        message: error.message
      });
    }
  }

  async getTaskById(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          status: 'error',
          message: 'Unauthorized'
        });
        return;
      }

      const taskId = req.params.id;
      const task = await taskService.getTaskById(taskId, req.user.userId);

      res.status(200).json({
        status: 'success',
        message: 'Task retrieved successfully',
        data: task
      });
    } catch (error: any) {
      res.status(404).json({
        status: 'error',
        message: error.message
      });
    }
  }

  async updateTask(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          status: 'error',
          message: 'Unauthorized'
        });
        return;
      }

      const taskId = req.params.id;
      const data = req.body as UpdateTaskInput;
      const task = await taskService.updateTask(taskId, req.user.userId, data);

      res.status(200).json({
        status: 'success',
        message: 'Task updated successfully',
        data: task
      });
    } catch (error: any) {
      res.status(400).json({
        status: 'error',
        message: error.message
      });
    }
  }

  async deleteTask(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          status: 'error',
          message: 'Unauthorized'
        });
        return;
      }

      const taskId = req.params.id;
      await taskService.deleteTask(taskId, req.user.userId);

      res.status(200).json({
        status: 'success',
        message: 'Task deleted successfully'
      });
    } catch (error: any) {
      res.status(400).json({
        status: 'error',
        message: error.message
      });
    }
  }
}

export default new TaskController();
