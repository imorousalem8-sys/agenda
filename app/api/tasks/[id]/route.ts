import { createApiHandler } from "@/server/core/api-handler";
import { apiSuccess } from "@/server/core/api-response";
import { TasksService } from "@/server/services/tasks.service";

type TaskParams = { id: string };

// PUT /api/tasks/[id]
export const PUT = createApiHandler<TaskParams>({ requireAuth: true }, async (req, { user, params }) => {
  const body = await req.json();
  const task = await TasksService.updateTask(params!.id, user!.id, body);
  return apiSuccess({ task });
});

// DELETE /api/tasks/[id]
export const DELETE = createApiHandler<TaskParams>({ requireAuth: true }, async (_req, { user, params }) => {
  await TasksService.deleteTask(params!.id, user!.id);
  return apiSuccess({ success: true, message: "Tâche supprimée avec succès." });
});
