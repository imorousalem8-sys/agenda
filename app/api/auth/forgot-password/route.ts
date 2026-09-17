import { createApiHandler } from "@/server/core/api-handler";
import { apiSuccess } from "@/server/core/api-response";
import { AuthService } from "@/server/services/auth.service";
import { forgotPasswordSchema } from "@/server/schemas/auth.schema";

// POST /api/auth/forgot-password
export const POST = createApiHandler({ requireAuth: false }, async (req) => {
  const body = await req.json();
  const data = forgotPasswordSchema.parse(body);

  const result = await AuthService.forgotPassword(data);
  return apiSuccess(result);
});
