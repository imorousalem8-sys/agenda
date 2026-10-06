import { createApiHandler } from "@/server/core/api-handler";
import { apiSuccess, apiCreated } from "@/server/core/api-response";
import { TasksService } from "@/server/services/tasks.service";
import { taskSchema } from "@/server/schemas/tasks.schema";

// GET /api/tasks
export const GET = createApiHandler({ requireAuth: true }, async (req, { user }) => {
  const { searchParams } = new URL(req.url);
  const done = searchParams.get("done");

  const tasks = await TasksService.listTasks(user!.id, done);
  return apiSuccess({ tasks });
});

// POST /api/tasks
export const POST = createApiHandler({ requireAuth: true }, async (req, { user }) => {
  const body = await req.json();
  const data = taskSchema.parse(body);

  const task = await TasksService.createTask(user!.id, data);
  return apiCreated({ task });
});
