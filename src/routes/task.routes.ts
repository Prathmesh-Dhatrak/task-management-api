import { Router } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import taskController from '../controllers/task.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';
import { createTaskSchema, updateTaskSchema } from '../schemas/task.schema';

const router = Router();

router.use(authenticate);

router.post(
  '/',
  validate(createTaskSchema),
  taskController.createTask as any
);

router.get('/', taskController.getUserTasks as any);
router.get('/:id', taskController.getTaskById as any);

router.patch(
  '/:id',
  validate(updateTaskSchema),
  taskController.updateTask as any
);

router.delete('/:id', taskController.deleteTask as any);

export default router;
