import { createApiHandler } from "@/server/core/api-handler";
import { apiSuccess } from "@/server/core/api-response";
import { AuthService } from "@/server/services/auth.service";
import { resetPasswordSchema } from "@/server/schemas/auth.schema";

// POST /api/auth/reset-password
export const POST = createApiHandler({ requireAuth: false }, async (req) => {
  const body = await req.json();
  const data = resetPasswordSchema.parse(body);

  const result = await AuthService.resetPassword(data);
  return apiSuccess(result);
});
