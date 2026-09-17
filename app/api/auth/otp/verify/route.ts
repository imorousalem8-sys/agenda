import { createApiHandler } from "@/server/core/api-handler";
import { apiSuccess } from "@/server/core/api-response";
import { AuthService } from "@/server/services/auth.service";
import { verifyOtpSchema } from "@/server/schemas/auth.schema";

// POST /api/auth/otp/verify
export const POST = createApiHandler({ requireAuth: false }, async (req) => {
  const body = await req.json();
  const data = verifyOtpSchema.parse(body);

  const result = await AuthService.verifyRegistrationOtp(data);
  return apiSuccess(result);
});
