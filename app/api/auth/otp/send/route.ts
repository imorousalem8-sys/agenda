import { createApiHandler } from "@/server/core/api-handler";
import { apiSuccess } from "@/server/core/api-response";
import { AuthService } from "@/server/services/auth.service";
import { sendOtpSchema } from "@/server/schemas/auth.schema";

// POST /api/auth/otp/send
export const POST = createApiHandler({ requireAuth: false }, async (req) => {
  const body = await req.json();
  const data = sendOtpSchema.parse(body);

  const result = await AuthService.sendRegistrationOtp(data);
  return apiSuccess(result);
});
